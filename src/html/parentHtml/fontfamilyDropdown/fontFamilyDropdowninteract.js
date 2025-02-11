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
    document.addEventListener("DOMContentLoaded", function () {
        const colorInput = document.getElementById("squareCraft-bg-color-picker");
    
        colorInput.addEventListener("input", async function () {
            if (selectedElement) {
                selectedElement.style.backgroundColor = colorInput.value;
                console.log(`✅ Background color changed to ${colorInput.value} for element: ${selectedElement.id}`);
    
                // **🔥 Post only background color change**
                postStyles(selectedElement, {
                    "background-color": colorInput.value
                });
            } else {
                console.error("❌ No element selected to apply background color!");
            }
        });
    });
    
    
    function applyFont(fontFamily, fontWeights = "400") {
        console.log(`Applying font: ${fontFamily} with weights: ${fontWeights}`);
    
        addFontToHead(fontFamily);
        
        const formattedFontName = fontFamily.replace(/\s+/g, "+");
        const fontCDN = `https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@${fontWeights}&display=swap`;
    
        let existingFontLink = document.querySelector(`link[data-font="${fontFamily}"]`);
        if (!existingFontLink) {
            let fontLink = document.createElement("link");
            fontLink.rel = "stylesheet";
            fontLink.href = fontCDN;
            fontLink.setAttribute("data-font", fontFamily);
            document.head.appendChild(fontLink);
            console.log(`✅ Font added to head: ${fontCDN}`);
        }
    
        if (selectedElement) {
            selectedElement.style.fontFamily = `'${fontFamily}', sans-serif`;
            console.log(`✅ Font applied to element: ${selectedElement.id}`);
    
            // **🔥 Post only font family change**
            postStyles(selectedElement, {
                "font-family": fontFamily,
                "font-cdn": fontCDN
            });
        }
    }
    
    
    
    
    async function getStyles() {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
    
        if (!token || !userId) return;
    
        let pageElement = document.querySelector("article[data-page-sections]");
        let pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;
    
        try {
            const response = await fetch(
                `https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include"
                }
            );
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json(); // ✅ Moved here before logging it
            console.log("✅ Parsed API Response:", data);
    
            // ✅ Apply modifications
            data?.modifications?.forEach(({ pageId: fetchedPageId, elements }) => {
                if (fetchedPageId === pageId) {
                    elements.forEach(({ elementId, css }) => {
                        const element = document.getElementById(elementId);
                        if (!element) return;
    
                        if (css["font-family"]) applyFont(css["font-family"], css["font-weights"]);
                        if (css["font-size"]) element.style.fontSize = css["font-size"];
                        if (css["font-variant"]) element.style.fontVariant = css["font-variant"];
                        if (css["background-color"]) element.style.backgroundColor = css["background-color"];
                    });
                }
            });
    
        } catch (error) {
            console.error("❌ Error fetching modifications:", error);
        }
    }
    
    
    
getStyles();


async function postStyles(targetElement, css = {}, fontFamily, fontVariant, fontSize, bgColor) {
    const token = localStorage.getItem("squareCraft_auth_token");
    const userId = localStorage.getItem("squareCraft_u_id");
    const widgetId = localStorage.getItem("squareCraft_w_id");

    if (!token || !userId || !widgetId) return;

    let page = targetElement.closest("article[data-page-sections]");
    let block = targetElement.closest('[id^="block-"]');

    if (!page || !block) return;

    let pageId = page.getAttribute("data-page-sections");
    let elementId = block.id;

    // ✅ Ensure all styles are applied properly
    if (fontFamily) {
        css["font-family"] = fontFamily;
        css["font-cdn"] = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@100..900&display=swap`;
    }
    if (fontVariant) css["font-variant"] = fontVariant;
    if (fontSize) css["font-size"] = `${fontSize}px`;  // ✅ Ensure PX is added
    if (bgColor) css["background-color"] = bgColor; // ✅ Background color fixed!

    const modificationData = {
        userId,
        token,
        widgetId,
        modifications: [
            {
                pageId,
                elements: [{ elementId, css }]
            }
        ]
    };

    console.log("🚀 Sending to API:", JSON.stringify(modificationData, null, 2));

    try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(modificationData),
        });

        const responseData = await response.json();
        console.log("✅ API Response:", responseData);
    } catch (error) {
        console.error("❌ Error posting styles:", error);
    }
}

    
    
    
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
        let pageElement = event.target.closest("article[data-page-sections']");
    
        if (!clickedElement || !pageElement) return;
    
        if (selectedElement && selectedElement !== clickedElement) {
            selectedElement.classList.remove("squareCraft-animated-border");
        }
    
        selectedElement = clickedElement;
        selectedPageId = pageElement.getAttribute("data-page-sections");
        selectedBlockId = clickedElement.id;
    
        selectedElement.classList.add("squareCraft-animated-border");
    
        // ✅ Fetch styles only when selecting an element
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
        const dropdownContent = dropdownContainer.querySelector(".squareCraft-dropdown-content") || document.createElement("div");
        dropdownContent.classList.add("squareCraft-dropdown-content");
    
        function loadNextFonts() {
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
    selectedFont = font.family; // Update selected font globally
    applyFont(font.family); // Apply live changes
    syncVariantDropdown(font); // Sync variants
    closeAllDropdowns();
});

    
                dropdownContent.appendChild(fontItem);
            });
    
            dropdownContainer.appendChild(dropdownContent);
        }
    
        loadNextFonts(); // Initial Load
    
        dropdownContainer.addEventListener("scroll", function () {
            if (dropdownContainer.scrollTop + dropdownContainer.clientHeight >= dropdownContainer.scrollHeight) {
                console.log("Loading more fonts...");
                loadNextFonts();
            }
        });
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        const colorInput = document.getElementById("squareCraft-bg-color-picker");
    
        colorInput.addEventListener("input", async function () {
            if (selectedElement) {
                selectedElement.style.backgroundColor = colorInput.value; // 🔥 Live update
                console.log(`✅ Background color changed to ${colorInput.value} for element: ${selectedElement.id}`);
    
                // 🔥 **Post color to API**
                try {
                    await postStyles(selectedElement, {}, null, null, null, colorInput.value);
                    console.log("✅ Background color updated successfully in the backend!");
                } catch (error) {
                    console.error("❌ Error updating background color in API:", error);
                }
            } else {
                console.error("❌ No element selected to apply background color!");
            }
        });
    });
    
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
    
                if (selectedElement) {
                    selectedElement.style.fontVariant = variant;
    
                    // **🔥 Post only font variant change**
                    postStyles(selectedElement, {
                        "font-variant": variant
                    });
                }
    
                closeAllDropdowns();
            });
    
            dropdownContent.appendChild(variantItem);
        });
    
        variantDropdown.appendChild(dropdownContent);
    }
    
    
    sizeDropdown.addEventListener("click", async function (event) {
        let sizeOption = event.target.closest(".squareCraft-dropdown-item");
        if (!sizeOption) return;
    
        selectedFontSize = sizeOption.getAttribute("data-size") + "px";
        document.querySelector("#font-size p").textContent = selectedFontSize;
    
        if (selectedElement) {
            selectedElement.style.fontSize = selectedFontSize; // Apply live change
            console.log(`✅ Font size updated to ${selectedFontSize} on element: ${selectedElement.id}`);
        } else {
            console.error("❌ No element selected to apply font size!");
            return;
        }
    
        try {
            await postStyles(selectedElement, {}, null, null, selectedFontSize);
            console.log("✅ Font size updated successfully in the backend!");
        } catch (error) {
            console.error("❌ Error posting styles:", error);
        }
    
        closeAllDropdowns();
    });
    
    
    

    waitForElement("#font-size", (parentDiv) => {
        sizeDropdown = document.createElement("div");
        sizeDropdown.id = "squareCraft-size-dropdown";
        sizeDropdown.classList.add("squareCraft-dropdown", "squareCraft-w-100", "squareCraft-bg-color-3d3d3d", "squareCraft-scroll");
        document.body.appendChild(sizeDropdown);
    
        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, sizeDropdown);
        });
    
        sizeDropdown.innerHTML = Array.from({ length: 76 }, (_, i) => i + 5)
            .map(size => `<p class="squareCraft-dropdown-item" data-size="${size}">${size}px</p>`)
            .join("");
    
        sizeDropdown.addEventListener("click", async function (event) {
            let sizeOption = event.target.closest(".squareCraft-dropdown-item");
            if (!sizeOption) return;
    
            selectedFontSize = sizeOption.getAttribute("data-size") + "px";
            document.querySelector("#font-size p").textContent = selectedFontSize;
    
            if (selectedElement) {
                selectedElement.style.fontSize = selectedFontSize;
                console.log(`✅ Font size updated to ${selectedFontSize} on element: ${selectedElement.id}`);
    
                // **🔥 Post only font size change**
                postStyles(selectedElement, {
                    "font-size": selectedFontSize
                });
            }
    
            closeAllDropdowns();
        });
    });
    
    
    
    
    
    

    waitForElement("#squareCraft-font-family p", el => el.textContent = selectedFont);
    waitForElement("#squareCraft-font-varient p", el => el.textContent = selectedVariant);
    waitForElement("#font-size p", el => el.textContent = selectedFontSize);

})();
