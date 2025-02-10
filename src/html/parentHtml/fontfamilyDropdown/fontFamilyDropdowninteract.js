(async function fontFamilyDropdowninteract() {
    let isDropdownOpen = false;
    let dropdownContainer = null;
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

    function toggleDropdown(parentDiv) {
        if (!dropdownContainer) return;
        isDropdownOpen = !isDropdownOpen;
        isDropdownOpen ? setDropdownPosition(parentDiv, dropdownContainer) : dropdownContainer.classList.remove("squareCraft-visible");
    }

    document.addEventListener("click", (event) => {
        let clickedElement = event.target.closest("[id^='block-']");
        let pageElement = event.target.closest("article[data-page-sections]");
        if (!clickedElement || !pageElement) return;
        selectedElement = clickedElement;
        selectedPageId = pageElement.getAttribute("data-page-sections");
        selectedBlockId = clickedElement.id;
    });

    waitForElement("#squareCraft-font-family", (parentDiv) => {
        dropdownContainer = document.createElement("div");
        dropdownContainer.id = "customDropdown";
        dropdownContainer.classList.add("squareCraft-dropdown");
        document.body.appendChild(dropdownContainer);
        fetchGoogleFonts(dropdownContainer, parentDiv);
        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv);
        });
        document.addEventListener("click", function (event) {
            if (!parentDiv.contains(event.target) && !dropdownContainer.contains(event.target)) {
                isDropdownOpen = false;
                dropdownContainer.classList.remove("squareCraft-visible");
            }
        });
    });

    async function fetchGoogleFonts(dropdownContainer, parentDiv) {
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
        let allFonts = [];
        let currentIndex = 0;
        const pageSize = 10;
        let isFetching = false;
        dropdownContainer.innerHTML = `<div class="squareCraft-dropdown-content"></div><div class="squareCraft-loader">Loading fonts...</div>`;
        const dropdownContent = dropdownContainer.querySelector(".squareCraft-dropdown-content");
        const loader = dropdownContainer.querySelector(".squareCraft-loader");

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
            loader.classList.add("squareCraft-hidden");
            isFetching = false;
            document.querySelectorAll(".squareCraft-dropdown-content .squareCraft-dropdown-item").forEach(fontOption => {
                fontOption.addEventListener("click", function () {
                    if (!selectedElement || !selectedPageId || !selectedBlockId) return;
                    const selectedFont = this.getAttribute("data-font");
                    const fontUrl = this.getAttribute("data-font-url");
                    applyFont(selectedFont, fontUrl);
                    saveModifications(selectedElement, { "font-family": selectedFont });
                    toggleDropdown(parentDiv);
                });
            });
        }

        dropdownContainer.addEventListener("scroll", () => {
            if (dropdownContainer.scrollTop + dropdownContainer.clientHeight >= dropdownContainer.scrollHeight - 5) {
                if (!isFetching && currentIndex < allFonts.length) {
                    isFetching = true;
                    loader.classList.remove("squareCraft-hidden");
                    setTimeout(renderFonts, 1000);
                }
            }
        });
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

    async function saveModifications(targetElement, css) {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
        const widgetId = localStorage.getItem("squareCraft_w_id");
        if (!token || !userId || !widgetId) return;
        let modificationData = {
            userId,
            token,
            widgetId,
            modifications: [
                {
                    pageId: selectedPageId,
                    elements: [
                        {
                            elementId: selectedBlockId,
                            css,
                        }
                    ]
                }
            ]
        };
        try {
            const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "userId": userId,
                    "widget-id": widgetId,
                    "pageId": selectedPageId
                },
                body: JSON.stringify(modificationData),
            });
            await response.json();
        } catch (error) {
            console.error("❌ Error saving modifications:", error);
        }
    }
})();
