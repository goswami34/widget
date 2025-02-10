
(async function fontFamilyDropdowninteract() {
    async function loadModule(url) {
        try {
            const module = await import(url);
            return module;
        } catch (err) {
            console.error(`❌ Failed to load module: ${url}`, err);
            return null;
        }
    }
    postStyles = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/postStyles.js"))?.postStyles;
    getStyles = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js"))?.getStyles;

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

    function toggleDropdown(dropdown) {
        if (!dropdown) return;
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    function setDropdownPosition(parentDiv, dropdown) {
        if (!parentDiv || !dropdown) return;
        const rect = parentDiv.getBoundingClientRect();
        dropdown.style.position = "absolute";
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.zIndex = "9999";
        dropdown.style.display = "block";
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

    // ✅ Font Family Dropdown
    waitForElement("#squareCraft-font-family", (parentDiv) => {
        fontDropdown = document.createElement("div");
        fontDropdown.id = "fontDropdown";
        fontDropdown.style.display = "none";
        document.body.appendChild(fontDropdown);
        fetchGoogleFonts(fontDropdown, parentDiv);

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            setDropdownPosition(parentDiv, fontDropdown);
            toggleDropdown(fontDropdown);
        });

        document.addEventListener("click", function (event) {
            if (!fontDropdown.contains(event.target) && event.target !== parentDiv) {
                fontDropdown.style.display = "none";
            }
        });
    });

    async function fetchGoogleFonts(dropdownContainer, parentDiv) {
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
        let allFonts = [];
        let currentIndex = 0;
        const pageSize = 10;
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
                <p class="squareCraft-dropdown-item" data-font="${font.family}">
                    ${font.family}
                </p>
            `).join("");
            document.querySelectorAll(".squareCraft-dropdown-item").forEach(fontOption => {
                fontOption.addEventListener("click", function () {
                    if (!selectedElement) return;
                    const selectedFont = this.getAttribute("data-font");
                    document.querySelector("#squareCraft-font-family p").textContent = selectedFont;
                    postStyles(selectedElement, { "font-family": selectedFont });
                    fontDropdown.style.display = "none";
                });
            });
        }
    }

    // ✅ Font Size Dropdown
    waitForElement("#font-size", (parentDiv) => {
        sizeDropdown = document.createElement("div");
        sizeDropdown.id = "fontSizeDropdown";
        sizeDropdown.style.display = "none";
        document.body.appendChild(sizeDropdown);

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            setDropdownPosition(parentDiv, sizeDropdown);
            toggleDropdown(sizeDropdown);
        });

        sizeDropdown.innerHTML = Array.from({ length: 80 }, (_, i) => i + 1)
            .map(size => `<p class="squareCraft-dropdown-item" data-size="${size}">${size}px</p>`)
            .join("");

        document.addEventListener("click", function (event) {
            if (!sizeDropdown.contains(event.target) && event.target !== parentDiv) {
                sizeDropdown.style.display = "none";
            }
        });

        document.querySelectorAll("#fontSizeDropdown .squareCraft-dropdown-item").forEach(sizeOption => {
            sizeOption.addEventListener("click", function () {
                if (!selectedElement) return;
                const selectedSize = this.getAttribute("data-size");
                selectedElement.style.fontSize = `${selectedSize}px`;
                document.querySelector("#font-size p").textContent = `${selectedSize}px`;
                postStyles(selectedElement, { "font-size": `${selectedSize}px` });
                sizeDropdown.style.display = "none";
            });
        });
    });

    // ✅ Font Variant Dropdown
    waitForElement("#squareCraft-font-varient", (parentDiv) => {
        variantDropdown = document.createElement("div");
        variantDropdown.id = "fontVariantDropdown";
        variantDropdown.style.display = "none";
        document.body.appendChild(variantDropdown);

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            setDropdownPosition(parentDiv, variantDropdown);
            toggleDropdown(variantDropdown);
        });

        variantDropdown.innerHTML = ["normal", "small-caps", "all-small-caps", "slashed-zero"]
            .map(variant => `<p class="squareCraft-dropdown-item" data-variant="${variant}">${variant}</p>`)
            .join("");

        document.addEventListener("click", function (event) {
            if (!variantDropdown.contains(event.target) && event.target !== parentDiv) {
                variantDropdown.style.display = "none";
            }
        });

        document.querySelectorAll("#fontVariantDropdown .squareCraft-dropdown-item").forEach(variantOption => {
            variantOption.addEventListener("click", function () {
                if (!selectedElement) return;
                const selectedVariant = this.getAttribute("data-variant");
                selectedElement.style.fontVariant = selectedVariant;
                document.querySelector("#squareCraft-font-varient p").textContent = selectedVariant;
                postStyles(selectedElement, { "font-variant": selectedVariant });
                variantDropdown.style.display = "none";
            });
        });
    });

})();
