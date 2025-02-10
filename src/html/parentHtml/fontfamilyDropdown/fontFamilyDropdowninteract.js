(async function fontFamilyDropdowninteract() {
    let isDropdownOpen = false;
    let fontDropdown = null;
    let sizeDropdown = null;
    let variantDropdown = null;
    let selectedElement = null;
    let selectedPageId = null;
    let selectedBlockId = null;

    function waitForElement(selector, callback, timeout = 5000) {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                callback(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(interval);
            }
        }, 200);
    }

    function setDropdownPosition(parentDiv, dropdown) {
        const rect = parentDiv.getBoundingClientRect();
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.classList.add("squareCraft-visible");
    }

    function toggleDropdown(parentDiv, dropdown) {
        if (!dropdown) return;
        isDropdownOpen = !isDropdownOpen;
        isDropdownOpen ? setDropdownPosition(parentDiv, dropdown) : dropdown.classList.remove("squareCraft-visible");
    }

    document.addEventListener("click", (event) => {
        let clickedElement = event.target.closest("[id^='block-']");
        let pageElement = event.target.closest("article[data-page-sections]");
        if (!clickedElement || !pageElement) return;
        selectedElement = clickedElement;
        selectedPageId = pageElement.getAttribute("data-page-sections");
        selectedBlockId = clickedElement.id;
        getStyles(selectedElement);
    });

    waitForElement("#squareCraft-font-family", (parentDiv) => {
        fontDropdown = document.createElement("div");
        fontDropdown.id = "fontDropdown";
        fontDropdown.classList.add("squareCraft-dropdown");
        document.body.appendChild(fontDropdown);
        fetchGoogleFonts(fontDropdown, parentDiv);
        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, fontDropdown);
        });
    });

    async function fetchGoogleFonts(dropdownContainer, parentDiv) {
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
        let allFonts = [];
        let currentIndex = 0;
        const pageSize = 10;
        let isFetching = false;
        dropdownContainer.innerHTML = `<div class="squareCraft-dropdown-content"></div><div class="squareCraft-loader">Loading...</div>`;
        const dropdownContent = dropdownContainer.querySelector(".squareCraft-dropdown-content");

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch fonts");
            const data = await response.json();
            allFonts = data.items;
            renderFonts();
        } catch (error) {
            dropdownContainer.innerHTML = `<p class="squareCraft-error">❌ Error loading fonts</p>`;
        }

        function renderFonts() {
            if (currentIndex >= allFonts.length) return;
            const fontsToShow = allFonts.slice(currentIndex, currentIndex + pageSize);
            currentIndex += pageSize;
            dropdownContent.innerHTML += fontsToShow.map(font => `
                <p class="squareCraft-dropdown-item" data-font="${font.family}" data-font-url="${font.files.regular}">
                    ${font.family}
                </p>
            `).join("");
            document.querySelectorAll(".squareCraft-dropdown-item").forEach(fontOption => {
                fontOption.addEventListener("click", function () {
                    if (!selectedElement || !selectedPageId || !selectedBlockId) return;
                    const selectedFont = this.getAttribute("data-font");
                    const fontUrl = this.getAttribute("data-font-url");
                    applyFont(selectedFont, fontUrl);
                    document.querySelector("#squareCraft-font-family p").textContent = selectedFont;
                    saveModifications(selectedElement, { "font-family": selectedFont });
                    toggleDropdown(parentDiv, fontDropdown);
                });
            });
        }
    }

    function applyFont(fontFamily, fontUrl) {
        if (!document.querySelector(`link[href="${fontUrl}"]`)) {
            let fontLink = document.createElement("link");
            fontLink.rel = "stylesheet";
            fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
            document.head.appendChild(fontLink);
        }
        selectedElement.style.fontFamily = `'${fontFamily}', sans-serif`;
    }

    // Font Size Dropdown
    waitForElement("#font-size", (parentDiv) => {
        sizeDropdown = document.createElement("div");
        sizeDropdown.id = "fontSizeDropdown";
        sizeDropdown.classList.add("squareCraft-dropdown");
        document.body.appendChild(sizeDropdown);
        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, sizeDropdown);
        });
        sizeDropdown.innerHTML = Array.from({ length: 80 }, (_, i) => i + 1)
            .map(size => `<p class="squareCraft-dropdown-item" data-size="${size}">${size}px</p>`)
            .join("");
        document.querySelectorAll("#fontSizeDropdown .squareCraft-dropdown-item").forEach(sizeOption => {
            sizeOption.addEventListener("click", function () {
                if (!selectedElement) return;
                const selectedSize = this.getAttribute("data-size");
                selectedElement.style.fontSize = `${selectedSize}px`;
                document.querySelector("#font-size p").textContent = `${selectedSize}px`;
                saveModifications(selectedElement, { "font-size": `${selectedSize}px` });
                toggleDropdown(parentDiv, sizeDropdown);
            });
        });
    });

    async function saveModifications(targetElement, css) {
        const token = localStorage.getItem("squareCraft_auth_token");   
        const userId = localStorage.getItem("squareCraft_u_id");
        const widgetId = localStorage.getItem("squareCraft_w_id");
        if (!token || !userId || !widgetId) return;
        let modificationData = { userId, token, widgetId, modifications: [{ pageId: selectedPageId, elements: [{ elementId: selectedBlockId, css }] }] };
        await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`,"userId": userId,
                "widget-id": widgetId,
                "pageId": pageId },
            body: JSON.stringify(modificationData),
        });
    }

    async function getStyles(targetElement) {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
        if (!token || !userId) return;
        try {
            const response = await fetch(`https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`);
            const data = await response.json();
            data?.modifications?.forEach(({ pageId: fetchedPageId, elements }) => {
                if (fetchedPageId === selectedPageId) {
                    elements.forEach(({ elementId, css }) => {
                        if (elementId === selectedBlockId) {
                            targetElement.style.fontFamily = css["font-family"];
                            targetElement.style.fontSize = css["font-size"];
                            document.querySelector("#squareCraft-font-family p").textContent = css["font-family"];
                            document.querySelector("#font-size p").textContent = css["font-size"];
                        }
                    });
                }
            });
        } catch (error) {}
    }
})();
