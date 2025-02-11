(async function fontFamilyDropdownInteract() {
    let selectedElement = null;
    let selectedFont = "", selectedVariant = "", selectedFontSize = "16px", selectedBgColor = "#ffffff";
    let fontDropdown, variantDropdown, sizeDropdown;
    let debounceTimeout;
    let cachedFonts = [], currentFontIndex = 0, fontsPerPage = 10;
    const API_URL = "https://webefo-backend.vercel.app/api/v1/";
    const GOOGLE_FONTS_API = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";

    // **🔥 Fetch & Apply Initial Styles**
    async function fetchAndApplyStyles() {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
        if (!token || !userId || !selectedElement) return;

        try {
            const response = await fetch(`${API_URL}get-modifications?userId=${userId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

            const data = await response.json();
            const styles = data?.modifications?.find(({ elements }) => 
                elements.some(({ elementId }) => elementId === selectedElement.id)
            )?.elements.find(({ elementId }) => elementId === selectedElement.id)?.css;

            if (styles) {
                selectedFont = styles["font-family"] || selectedFont;
                selectedVariant = styles["font-variant"] || selectedVariant;
                selectedFontSize = styles["font-size"] || selectedFontSize;
                selectedBgColor = styles["background-color"] || selectedBgColor;

                applyStyles();
            }
        } catch (error) {
            console.error("❌ Error fetching styles:", error);
        }
    }

    // **🔥 Debounced API Update**
    function postStylesDebounced(css) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => postStyles(css), 500);
    }

    async function postStyles(css) {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
        const widgetId = localStorage.getItem("squareCraft_w_id");
        if (!token || !userId || !widgetId || !selectedElement) return;

        const elementId = selectedElement.id;
        const pageId = selectedElement.closest("article[data-page-sections]")?.getAttribute("data-page-sections");

        const modificationData = {
            userId, token, widgetId,
            modifications: [{ pageId, elements: [{ elementId, css }] }]
        };

        try {
            await fetch(`${API_URL}modifications`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(modificationData),
            });

            console.log("✅ Style updated:", css);
        } catch (error) {
            console.error("❌ Error posting styles:", error);
        }
    }

    // **🔥 Apply Styles to Selected Element**
    function applyStyles() {
        if (!selectedElement) return;
        selectedElement.style.fontFamily = selectedFont ? `'${selectedFont}', sans-serif` : "";
        selectedElement.style.fontVariant = selectedVariant;
        selectedElement.style.fontSize = selectedFontSize;
        selectedElement.style.backgroundColor = selectedBgColor;
    }

    // **🔥 Fetch Google Fonts & Implement Pagination**
    async function fetchGoogleFonts() {
        if (cachedFonts.length) return renderFonts();

        try {
            const response = await fetch(GOOGLE_FONTS_API);
            const data = await response.json();
            cachedFonts = data.items;
            renderFonts();
        } catch (error) {
            console.error("❌ Error fetching fonts:", error);
        }
    }

    function renderFonts() {
        fontDropdown.innerHTML = "";
        const fontsToShow = cachedFonts.slice(currentFontIndex, currentFontIndex + fontsPerPage);
        currentFontIndex += fontsPerPage;

        fontsToShow.forEach(font => {
            const fontItem = document.createElement("p");
            fontItem.classList.add("squareCraft-dropdown-item");
            fontItem.style.fontFamily = `'${font.family}', sans-serif`;
            fontItem.textContent = font.family;

            fontItem.addEventListener("click", function () {
                selectedFont = font.family;
                postStylesDebounced({ "font-family": font.family });
                applyStyles();
                closeAllDropdowns();
            });

            fontDropdown.appendChild(fontItem);
        });

        // "Load More" Button
        if (currentFontIndex < cachedFonts.length) {
            const loadMore = document.createElement("p");
            loadMore.textContent = "Load More Fonts...";
            loadMore.classList.add("squareCraft-dropdown-item", "load-more");
            loadMore.addEventListener("click", renderFonts);
            fontDropdown.appendChild(loadMore);
        }
    }

    // **🔥 Dropdown & Event Listeners**
    function setupDropdowns() {
        fontDropdown = createDropdown("squareCraft-font-dropdown", fetchGoogleFonts);
        variantDropdown = createDropdown("squareCraft-variant-dropdown", renderVariantOptions);
        sizeDropdown = createDropdown("squareCraft-size-dropdown", renderSizeOptions);

        document.getElementById("squareCraft-font-family")?.addEventListener("click", () => toggleDropdown(fontDropdown));
        document.getElementById("squareCraft-font-varient")?.addEventListener("click", () => toggleDropdown(variantDropdown));
        document.getElementById("font-size")?.addEventListener("click", () => toggleDropdown(sizeDropdown));

        document.getElementById("squareCraft-bg-color-input")?.addEventListener("input", (event) => {
            selectedBgColor = event.target.value;
            postStylesDebounced({ "background-color": selectedBgColor });
            applyStyles();
        });
    }

    function renderVariantOptions() {
        variantDropdown.innerHTML = `
            <p class="squareCraft-dropdown-item" data-variant="regular">Regular</p>
            <p class="squareCraft-dropdown-item" data-variant="bold">Bold</p>
            <p class="squareCraft-dropdown-item" data-variant="italic">Italic</p>
        `;

        variantDropdown.querySelectorAll(".squareCraft-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                selectedVariant = item.getAttribute("data-variant");
                postStylesDebounced({ "font-variant": selectedVariant });
                applyStyles();
                closeAllDropdowns();
            });
        });
    }

    function renderSizeOptions() {
        sizeDropdown.innerHTML = Array.from({ length: 76 }, (_, i) => 
            `<p class="squareCraft-dropdown-item" data-size="${i + 5}px">${i + 5}px</p>`
        ).join("");

        sizeDropdown.querySelectorAll(".squareCraft-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                selectedFontSize = item.getAttribute("data-size");
                postStylesDebounced({ "font-size": selectedFontSize });
                applyStyles();
                closeAllDropdowns();
            });
        });
    }

    function createDropdown(id, onOpen) {
        const dropdown = document.createElement("div");
        dropdown.id = id;
        dropdown.classList.add("squareCraft-dropdown", "squareCraft-bg-3d3d3d");
        document.body.appendChild(dropdown);
        dropdown.addEventListener("click", (event) => event.stopPropagation());
        dropdown.addEventListener("mouseenter", onOpen);
        return dropdown;
    }

    function toggleDropdown(dropdown) {
        closeAllDropdowns();
        dropdown.classList.add("squareCraft-visible");
    }

    function closeAllDropdowns() {
        document.querySelectorAll(".squareCraft-dropdown").forEach(d => d.classList.remove("squareCraft-visible"));
    }

    document.addEventListener("click", () => closeAllDropdowns());

    document.addEventListener("click", (event) => {
        let clickedElement = event.target.closest("[id^='block-']");
        if (clickedElement && clickedElement !== selectedElement) {
            selectedElement = clickedElement;
            fetchAndApplyStyles();
        }
    });

    setupDropdowns();
})();
