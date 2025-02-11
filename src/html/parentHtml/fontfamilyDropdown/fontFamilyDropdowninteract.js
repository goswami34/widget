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
    function applyFont(fontFamily, fontWeights = "400") {
        console.log(`Applying font: ${fontFamily} with weights: ${fontWeights}`);
    
        // Add the font to the document head if not already loaded
        const formattedFontName = fontFamily.replace(/\s+/g, "+");
        const fontCDN = `https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@${fontWeights}&display=swap`;
    
        if (!loadedFonts.has(fontFamily)) {
            let fontLink = document.createElement("link");
            fontLink.rel = "stylesheet";
            fontLink.href = fontCDN;
            document.head.appendChild(fontLink);
            loadedFonts.add(fontFamily);
            console.log(`✅ Font added to head: ${fontCDN}`);
        }
    
        // Apply the font immediately to the selected element
        if (selectedElement) {
            selectedElement.style.fontFamily = `'${fontFamily}', sans-serif`;
            console.log(`✅ Font applied to element: ${selectedElement.id}`);
        }
    
        // Update the dropdown text with the selected font
        document.querySelector("#squareCraft-font-family p").textContent = fontFamily;
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
                }
            );
      
            const data = await response.json();
      
            data?.modifications?.forEach(({ pageId: fetchedPageId, elements }) => {
                if (fetchedPageId === pageId) {
                    elements.forEach(({ elementId, css }) => {
                        const element = document.getElementById(elementId);
                        if (!element) return;
      
                        if (css["font-family"]) applyFont(css["font-family"], css["font-weights"]);
                        if (css["font-size"]) element.style.fontSize = css["font-size"];
                        if (css["font-variant"]) element.style.fontVariant = css["font-variant"];
                    });
                }
            });
      
        } catch (error) {
            console.error("❌ Error fetching modifications:", error);
        }
      }



      async function postStyles(targetElement, css = {}, fontFamily, fontVariant, fontSize) {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
        const widgetId = localStorage.getItem("squareCraft_w_id");
      
        if (!token || !userId || !widgetId) return;
      
        let page = targetElement.closest("article[data-page-sections]");
        let block = targetElement.closest('[id^="block-"]');
      
        if (!page || !block) return;
      
        let pageId = page.getAttribute("data-page-sections");
        let elementId = block.id;
      
        if (fontFamily) css["font-family"] = fontFamily;
        if (fontVariant) css["font-variant"] = fontVariant;
        if (fontSize) css["font-size"] = `${fontSize}px`;
      
        const formattedFontName = fontFamily.replace(/\s+/g, "+");
        const fontCDN = `https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@400;700&display=swap`;
        css["font-cdn"] = fontCDN;
      
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
      
        await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(modificationData),
        });
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
        let pageElement = event.target.closest("article[data-page-sections]");
        
        if (!clickedElement || !pageElement) return;
    
        if (selectedElement && selectedElement !== clickedElement) {
            selectedElement.classList.remove("squareCraft-animated-border");
        }
    
        selectedElement = clickedElement;
        selectedPageId = pageElement.getAttribute("data-page-sections");
        selectedBlockId = clickedElement.id;
    
        selectedElement.classList.add("squareCraft-animated-border");
    
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
                postStyles(selectedElement, {}, font.family, variant, null); // ✅ Correct function call
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
        sizeDropdown.classList.add(
            "squareCraft-w-100",
            "squareCraft-dropdown",
            "squareCraft-font-sm",
            "squareCraft-bg-color-3d3d3d",
            "squareCraft-scroll"
        );
        document.body.appendChild(sizeDropdown);
    
        // ✅ Attach click event to open the dropdown when clicking #font-size
        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown(parentDiv, sizeDropdown);
        });
    
        // ✅ Generate Font Size Options (from 5px to 80px)
        sizeDropdown.innerHTML = Array.from({ length: 76 }, (_, i) => i + 5)
            .map(size => `<p class="squareCraft-dropdown-item squareCraft-font-size-dropdown squareCraft-w-100" data-size="${size}">${size}px</p>`)
            .join("");
    
        // ✅ Attach Event Listener for Selecting Font Size
        sizeDropdown.addEventListener("click", async function (event) {
            let sizeOption = event.target.closest(".squareCraft-dropdown-item");
            if (!sizeOption) return;
    
            selectedFontSize = sizeOption.getAttribute("data-size") + "px";
            document.querySelector("#font-size p").textContent = selectedFontSize;
    
            if (selectedElement) {
                selectedElement.style.fontSize = selectedFontSize;
                console.log(`✅ Font size updated to ${selectedFontSize} on element: ${selectedElement.id}`);
            } else {
                console.error("❌ No element selected to apply font size!");
                return;
            }
    
            // ✅ Ensure postStyles is awaited correctly
            try {
                await postStyles(selectedElement, {}, null, null, selectedFontSize);
                console.log("✅ Font size updated successfully in the backend!");
            } catch (error) {
                console.error("❌ Error posting styles:", error);
            }
    
            closeAllDropdowns();
        });
    });
    
    
    
    

    waitForElement("#squareCraft-font-family p", el => el.textContent = selectedFont);
    waitForElement("#squareCraft-font-varient p", el => el.textContent = selectedVariant);
    waitForElement("#font-size p", el => el.textContent = selectedFontSize);

})();
