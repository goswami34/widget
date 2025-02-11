(async function fontFamilyDropdownInteract() {
    let isDropdownOpen = false;
    let fontDropdown = null;
    let variantDropdown = null;
    let sizeDropdown = null;
    let selectedElement = null;
    let selectedPageId = null;
    let selectedBlockId = null;
    let cachedFonts = null;

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
        getStyles();
    });

    waitForElement("#squareCraft-font-family", (parentDiv) => {
        fontDropdown = document.createElement("div");
        fontDropdown.id = "fontDropdown";
        fontDropdown.classList.add("squareCraft-dropdown", "squareCraft-w-250", "squareCraft-bg-color-3d3d3d");
        document.body.appendChild(fontDropdown);
        fetchGoogleFonts(fontDropdown, parentDiv);
        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, fontDropdown);
        });
    });

    async function fetchGoogleFonts(dropdownContainer, parentDiv) {
        if (cachedFonts) {
            return renderFonts(cachedFonts, dropdownContainer, parentDiv);
        }

        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
        dropdownContainer.innerHTML = `<div class="squareCraft-loader">Loading fonts...</div>`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch fonts");

            const data = await response.json();
            cachedFonts = data.items;
            renderFonts(cachedFonts, dropdownContainer, parentDiv);
        } catch (error) {
            dropdownContainer.innerHTML = `<p class="squareCraft-error">❌ Error loading fonts</p>`;
            console.error("Font fetch error:", error);
        }
    }

    function renderFonts(fontList, dropdownContainer, parentDiv) {
        dropdownContainer.innerHTML = `<div class="squareCraft-dropdown-content"></div>`;
        const dropdownContent = dropdownContainer.querySelector(".squareCraft-dropdown-content");

        fontList.slice(0, 20).forEach(font => {
            const fontItem = document.createElement("p");
            fontItem.classList.add("squareCraft-dropdown-item");
            fontItem.setAttribute("data-font", font.family);
            fontItem.style.fontFamily = `'${font.family}', sans-serif`;
            fontItem.textContent = font.family;

            fontItem.addEventListener("click", function () {
                openVariantDropdown(font);
                document.querySelector("#squareCraft-font-family p").textContent = font.family;
                toggleDropdown(parentDiv, dropdownContainer);
            });

            dropdownContent.appendChild(fontItem);
        });
    }

    function openVariantDropdown(font) {
        if (!variantDropdown) {
            variantDropdown = document.createElement("div");
            variantDropdown.id = "variantDropdown";
            variantDropdown.classList.add("squareCraft-dropdown", "squareCraft-w-250", "squareCraft-bg-color-3d3d3d");
            document.body.appendChild(variantDropdown);
        }

        variantDropdown.innerHTML = `<div class="squareCraft-dropdown-content"></div>`;
        const dropdownContent = variantDropdown.querySelector(".squareCraft-dropdown-content");

        font.variants.forEach(variant => {
            const variantItem = document.createElement("p");
            variantItem.classList.add("squareCraft-dropdown-item");
            variantItem.setAttribute("data-variant", variant);
            variantItem.textContent = variant;

            variantItem.addEventListener("click", function () {
                applyFont(font.family, font.files[variant] || font.files["regular"]);
                saveModifications({ "font-family": font.family, "font-variant": variant });
                toggleDropdown(null, variantDropdown);
            });

            dropdownContent.appendChild(variantItem);
        });

        setDropdownPosition(document.querySelector("#squareCraft-font-family"), variantDropdown);
        variantDropdown.classList.add("squareCraft-visible");
    }

    function applyFont(fontFamily, fontUrl) {
        if (!document.querySelector(`link[href="${fontUrl}"]`)) {
            let fontLink = document.createElement("link");
            fontLink.rel = "stylesheet";
            fontLink.href = fontUrl;
            document.head.appendChild(fontLink);
        }
        if (selectedElement) {
            selectedElement.style.fontFamily = `'${fontFamily}', sans-serif`;
        }
    }

    async function saveModifications(css) {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
        const widgetId = localStorage.getItem("squareCraft_w_id");

        if (!token || !userId || !widgetId || !selectedElement || !selectedPageId || !selectedBlockId) return;

        let modificationData = {
            userId,
            token,
            widgetId,
            modifications: [{ 
                pageId: selectedPageId, 
                elements: [{ elementId: selectedBlockId, css }] 
            }]
        };

        try {
            const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "userId": userId,
                    "widget-id": widgetId,
                },
                body: JSON.stringify(modificationData),
            });

            if (!response.ok) {
                console.error("Failed to save modifications");
            }
        } catch (error) {
            console.error("Error saving modifications:", error);
        }
    }

    async function getStyles() {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");

        if (!token || !userId || !selectedElement || !selectedPageId || !selectedBlockId) return;

        try {
            const response = await fetch(`https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`);
            if (!response.ok) return;

            const data = await response.json();
            data?.modifications?.forEach(({ pageId: fetchedPageId, elements }) => {
                if (fetchedPageId === selectedPageId) {
                    elements.forEach(({ elementId, css }) => {
                        if (elementId === selectedBlockId) {
                            if (css["font-family"]) {
                                selectedElement.style.fontFamily = css["font-family"];
                                document.querySelector("#squareCraft-font-family p").textContent = css["font-family"];
                            }
                        }
                    });
                }
            });

        } catch (error) {
            console.error("Error fetching modifications:", error);
        }
    }
})();
