(async function fontFamilyDropdownInteract() {
    let isDropdownOpen = false;
    let fontDropdown = null;
    let variantDropdown = null;
    let sizeDropdown = null;
    let selectedElement = null;
    let selectedPageId = null;
    let selectedBlockId = null;
    let cachedFonts = [];
    let currentFontIndex = 0;
    const fontsPerPage = 10;
    let selectedFont = "Inter";
    let selectedVariant = "regular";
    let selectedFontSize = "16px";
    let loadedFonts = new Set();

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

    function closeAllDropdowns() {
        document.querySelectorAll(".squareCraft-dropdown").forEach(dropdown => {
            dropdown.classList.remove("squareCraft-visible");
        });
        isDropdownOpen = false;
    }

    function toggleDropdown(parentDiv, dropdown) {
        if (!dropdown) return;
        if (isDropdownOpen) {
            closeAllDropdowns();
        } else {
            setDropdownPosition(parentDiv, dropdown);
            isDropdownOpen = true;
        }
    }

    function addFontToHead(fontFamily) {
        if (loadedFonts.has(fontFamily)) return;
        let fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@100..900&display=swap`;
        document.head.appendChild(fontLink);
        loadedFonts.add(fontFamily);
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

    document.addEventListener("click", () => closeAllDropdowns());

    waitForElement("#squareCraft-font-family", (parentDiv) => {
        fontDropdown = document.createElement("div");
        fontDropdown.id = "squareCraft-font-dropdown";
        fontDropdown.classList.add("squareCraft-dropdown", "squareCraft-w-200", "squareCraft-bg-color-3d3d3d", "squareCraft-scroll");
        document.body.appendChild(fontDropdown);
        fetchGoogleFonts(fontDropdown);

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, fontDropdown);
        });
    });

    async function fetchGoogleFonts(dropdownContainer) {
        if (cachedFonts.length) {
            return renderFonts(dropdownContainer);
        }
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
        dropdownContainer.innerHTML = `<div class="squareCraft-loader">Loading fonts...</div>`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            cachedFonts = data.items;
            renderFonts(dropdownContainer);
        } catch (error) {
            console.error("Font fetch error:", error);
            dropdownContainer.innerHTML = `<p class="squareCraft-error">❌ Error loading fonts</p>`;
        }
    }

    function renderFonts(dropdownContainer) {
        const dropdownContent = document.createElement("div");
        dropdownContent.classList.add("squareCraft-dropdown-content");
        let fontsToShow = cachedFonts.slice(currentFontIndex, currentFontIndex + fontsPerPage);
        currentFontIndex += fontsPerPage;

        fontsToShow.forEach(font => {
            const fontItem = document.createElement("p");
            fontItem.classList.add("squareCraft-dropdown-item");
            fontItem.setAttribute("data-font", font.family);
            fontItem.style.fontFamily = `'${font.family}', sans-serif`;
            fontItem.textContent = font.family;

            if (font.family === selectedFont) fontItem.classList.add("squareCraft-active");

            fontItem.addEventListener("click", function () {
                selectedFont = font.family;
                document.querySelector("#squareCraft-font-family p").textContent = font.family;
                addFontToHead(font.family);
                syncVariantDropdown(font);
                closeAllDropdowns();
            });

            dropdownContent.appendChild(fontItem);
        });

        dropdownContainer.innerHTML = "";
        dropdownContainer.appendChild(dropdownContent);
    }

    waitForElement("#squareCraft-font-varient", (parentDiv) => {
        variantDropdown = document.createElement("div");
        variantDropdown.id = "squareCraft-variant-dropdown";
        variantDropdown.classList.add("squareCraft-dropdown", "squareCraft-w-150", "squareCraft-bg-color-3d3d3d");
        document.body.appendChild(variantDropdown);

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, variantDropdown);
        });
    });

    function syncVariantDropdown(font) {
        variantDropdown.innerHTML = `<div class="squareCraft-dropdown-content"></div>`;
        const dropdownContent = variantDropdown.querySelector(".squareCraft-dropdown-content");

        font.variants.forEach(variant => {
            const variantItem = document.createElement("p");
            variantItem.classList.add("squareCraft-dropdown-item", "squareCraft-w-100");
            variantItem.setAttribute("data-variant", variant);
            variantItem.textContent = variant;

            variantItem.addEventListener("click", function () {
                selectedVariant = variant;
                document.querySelector("#squareCraft-font-varient p").textContent = variant;
                saveModifications({ "font-family": font.family, "font-variant": variant });
                closeAllDropdowns();
            });

            dropdownContent.appendChild(variantItem);
        });

        variantDropdown.appendChild(dropdownContent);
    }

    waitForElement("#font-size", (parentDiv) => {
        sizeDropdown = document.createElement("div");
        sizeDropdown.id = "squareCraft-size-dropdown";
        sizeDropdown.classList.add("squareCraft-dropdown", "squareCraft-w-100", "squareCraft-font-sm", "squareCraft-bg-color-3d3d3d", "squareCraft-scroll");
        document.body.appendChild(sizeDropdown);

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, sizeDropdown);
        });

        sizeDropdown.innerHTML = Array.from({ length: 76 }, (_, i) => i + 5)
            .map(size => `<p class="squareCraft-dropdown-item squareCraft-font-size-dropdown" data-size="${size}">${size}px</p>`)
            .join("");

        sizeDropdown.addEventListener("click", function (event) {
            let sizeOption = event.target.closest(".squareCraft-dropdown-item");
            if (!sizeOption) return;

            selectedFontSize = sizeOption.getAttribute("data-size") + "px";
            document.querySelector("#font-size p").textContent = selectedFontSize;
            if (selectedElement) selectedElement.style.fontSize = selectedFontSize;

            saveModifications({ "font-size": selectedFontSize });
            closeAllDropdowns();
        });
    });

    // Set Initial Values
    waitForElement("#squareCraft-font-family p", el => el.textContent = selectedFont);
    waitForElement("#squareCraft-font-varient p", el => el.textContent = selectedVariant);
    waitForElement("#font-size p", el => el.textContent = selectedFontSize);

})();
