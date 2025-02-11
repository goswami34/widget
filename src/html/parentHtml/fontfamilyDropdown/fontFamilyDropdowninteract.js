(async function fontFamilyDropdownInteract() {
    let selectedElement = null;
    let selectedFont = "Inter", selectedVariant = "regular", selectedFontSize = "16px", selectedBgColor = "#ffffff";
    let fontDropdown, variantDropdown, sizeDropdown;
    let debounceTimeout;

    const API_URL = "https://webefo-backend.vercel.app/api/v1/";

    // **🔥 Helper: Fetch Styles from API & Apply to Selected Element**
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

    // **🔥 Helper: Post Styles to API (Debounced)**
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

    // **🔥 Helper: Apply Styles to Selected Element**
    function applyStyles() {
        if (!selectedElement) return;
        selectedElement.style.fontFamily = `'${selectedFont}', sans-serif`;
        selectedElement.style.fontVariant = selectedVariant;
        selectedElement.style.fontSize = selectedFontSize;
        selectedElement.style.backgroundColor = selectedBgColor;
    }

    // **🔥 Font Family Selection**
    document.getElementById("squareCraft-font-family")?.addEventListener("click", () => toggleDropdown(fontDropdown));

    fontDropdown = createDropdown("squareCraft-font-dropdown", [
        { label: "Inter", value: "Inter" },
        { label: "Arial", value: "Arial" },
        { label: "Roboto", value: "Roboto" }
    ], (font) => {
        selectedFont = font;
        postStylesDebounced({ "font-family": font });
        applyStyles();
    });

    // **🔥 Font Variant Selection**
    document.getElementById("squareCraft-font-varient")?.addEventListener("click", () => toggleDropdown(variantDropdown));

    variantDropdown = createDropdown("squareCraft-variant-dropdown", [
        { label: "Regular", value: "regular" },
        { label: "Bold", value: "bold" },
        { label: "Italic", value: "italic" }
    ], (variant) => {
        selectedVariant = variant;
        postStylesDebounced({ "font-variant": variant });
        applyStyles();
    });

    // **🔥 Font Size Selection**
    document.getElementById("font-size")?.addEventListener("click", () => toggleDropdown(sizeDropdown));

    sizeDropdown = createDropdown("squareCraft-size-dropdown",
        Array.from({ length: 76 }, (_, i) => ({ label: `${i + 5}px`, value: `${i + 5}px` })),
        (size) => {
            selectedFontSize = size;
            postStylesDebounced({ "font-size": size });
            applyStyles();
        });

    // **🔥 Background Color Selection**
    document.getElementById("squareCraft-bg-color-input")?.addEventListener("input", (event) => {
        selectedBgColor = event.target.value;
        postStylesDebounced({ "background-color": selectedBgColor });
        applyStyles();
    });

    // **🔥 Utility: Create Dropdowns**
    function createDropdown(id, items, onSelect) {
        const dropdown = document.createElement("div");
        dropdown.id = id;
        dropdown.classList.add("squareCraft-dropdown", "squareCraft-bg-3d3d3d");
        dropdown.innerHTML = items.map(item =>
            `<p class="squareCraft-dropdown-item" data-value="${item.value}">${item.label}</p>`
        ).join("");
        document.body.appendChild(dropdown);

        dropdown.addEventListener("click", (event) => {
            const value = event.target.getAttribute("data-value");
            if (value) {
                onSelect(value);
                closeAllDropdowns();
            }
        });

        return dropdown;
    }

    // **🔥 Utility: Toggle Dropdown Visibility**
    function toggleDropdown(dropdown) {
        if (!dropdown) return;
        closeAllDropdowns();
        dropdown.classList.toggle("squareCraft-visible");
    }

    // **🔥 Utility: Close All Dropdowns**
    function closeAllDropdowns() {
        document.querySelectorAll(".squareCraft-dropdown").forEach(d => d.classList.remove("squareCraft-visible"));
    }

    // **🔥 Detect Selected Element on Click**
    document.addEventListener("click", (event) => {
        let clickedElement = event.target.closest("[id^='block-']");
        if (clickedElement && clickedElement !== selectedElement) {
            selectedElement = clickedElement;
            fetchAndApplyStyles();
        }
        closeAllDropdowns();
    });

})();
