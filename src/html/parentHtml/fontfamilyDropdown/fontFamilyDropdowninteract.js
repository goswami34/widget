(async function fontFamilyDropdowninteract() {
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
    let isDropdownOpen = false;
    function setDropdownPosition(parentDiv, dropdown) {
        const rect = parentDiv.getBoundingClientRect();
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.display = "block";
    }
    function toggleDropdown(dropdownContainer) {
        isDropdownOpen = !isDropdownOpen;
        dropdownContainer.style.display = isDropdownOpen ? "block" : "none";
    }
    waitForElement("#squareCraft-font-family", (parentDiv) => {
        let dropdownContainer = document.getElementById("customDropdown");
        if (!dropdownContainer) {
            dropdownContainer = document.createElement("div");
            dropdownContainer.id = "customDropdown";
            dropdownContainer.style.position = "absolute";
            dropdownContainer.style.display = "none";
            dropdownContainer.style.background = "#3d3d3d";
            dropdownContainer.style.border = "1px solid #585858";
            dropdownContainer.style.borderRadius = "6px";
            dropdownContainer.style.padding = "8px";
            dropdownContainer.style.width = "165px";
            dropdownContainer.style.color = "#ffffff";
            dropdownContainer.style.fontSize = "14px";
            dropdownContainer.style.zIndex = "9999";
            dropdownContainer.style.maxHeight = "250px";
            dropdownContainer.style.overflowY = "auto";
            document.body.appendChild(dropdownContainer);

            fetchGoogleFonts(dropdownContainer, parentDiv);
        }

      

        function toggleDropdown() {
            isDropdownOpen = !isDropdownOpen;
            if (isDropdownOpen) {
                setDropdownPosition(parentDiv, dropdownContainer);
            } else {
                dropdownContainer.style.display = "none";
            }
        }

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown();
        });

        document.addEventListener("click", function (event) {
            if (!parentDiv.contains(event.target) && !dropdownContainer.contains(event.target)) {
                isDropdownOpen = false;
                dropdownContainer.style.display = "none";
            }
        });
    });

    async function fetchGoogleFonts(dropdownContainer, parentDiv) {
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
        let allFonts = [];
        let currentIndex = 0;
        const pageSize = 10;
        let isFetching = false;
    
        dropdownContainer.innerHTML = `
            <div class="dropdown-content"></div>
            <div class="squareCraft-loader"></div>
        `;
        const dropdownContent = dropdownContainer.querySelector(".dropdown-content");
        const loader = dropdownContainer.querySelector(".squareCraft-loader");
    
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch fonts");
            const data = await response.json();
            allFonts = data.items;
    
            renderFonts();
            console.log("✅ Font API Response:", data);
        } catch (error) {
            dropdownContainer.innerHTML = `<p class="dropdown-item">❌ Error loading fonts</p>`;
        }
    
        function renderFonts() {
            if (currentIndex >= allFonts.length) return;
            
            const fontsToShow = allFonts.slice(currentIndex, currentIndex + pageSize);
            currentIndex += pageSize;
    
            const fontsHTML = fontsToShow.map(font => `
                <p class="squareCraft-text-center squareCraft-py-1 squareCraft-bg-colo-EF7C2F-hover squareCraft-text-sm squareCraft-cursor-pointer" data-font='${font.family}'>
                    ${font.family}
                </p>
            `).join("");
    
            dropdownContent.insertAdjacentHTML("beforeend", fontsHTML);
            loader.style.display = "none";
            isFetching = false;
    
            document.querySelectorAll("#customDropdown .dropdown-content p").forEach(fontOption => {
                fontOption.addEventListener("click", function () {
                    const selectedFont = this.getAttribute("data-font");
                    parentDiv.querySelector("p").textContent = selectedFont;
                    updateFontVariants(selectedFont);
                    toggleDropdown();
                });
            });
        }
    
        dropdownContainer.addEventListener("scroll", () => {
            if (dropdownContainer.scrollTop + dropdownContainer.clientHeight >= dropdownContainer.scrollHeight - 5) {
                if (!isFetching && currentIndex < allFonts.length) {
                    isFetching = true;
                    loader.style.display = "block";
                    setTimeout(renderFonts, 1000);
                }
            }
        });
    }
    

    function updateFontVariants(fontData) {
        let variantParentDiv = document.getElementById("squareCraft-font-varient");
        if (!variantParentDiv) return;
    
        let variantDropdown = document.getElementById("customVariantDropdown");
        if (!variantDropdown) {
            variantDropdown = document.createElement("div");
            variantDropdown.id = "customVariantDropdown";
            variantDropdown.style.position = "absolute";
            variantDropdown.style.display = "none";
            variantDropdown.style.background = "#3d3d3d";
            variantDropdown.style.border = "1px solid #585858";
            variantDropdown.style.borderRadius = "6px";
            variantDropdown.style.padding = "8px";
            variantDropdown.style.width = "165px";
            variantDropdown.style.color = "#ffffff";
            variantDropdown.style.fontSize = "14px";
            variantDropdown.style.zIndex = "9999";
            variantDropdown.style.maxHeight = "250px";
            variantDropdown.style.overflowY = "auto";
            document.body.appendChild(variantDropdown);
        }
    
        // ✅ Extract variants safely
        const variants = fontData?.variants || [];
    
        if (!Array.isArray(variants) || variants.length === 0) {
            variantDropdown.innerHTML = `<p class="dropdown-item">❌ No variants available</p>`;
            return;
        }
    
        variantDropdown.innerHTML = `<div class="dropdown-content">
            ${variants.map(variant => `
                <p class="squareCraft-text-center squareCraft-py-1 squareCraft-bg-colo-EF7C2F-hover squareCraft-text-sm squareCraft-cursor-pointer">
                    ${variant}
                </p>
            `).join("")}
        </div>`;
    
        let isVariantDropdownOpen = false;
    
        function toggleVariantDropdown() {
            isVariantDropdownOpen = !isVariantDropdownOpen;
            if (isVariantDropdownOpen) {
                setDropdownPosition(variantParentDiv, variantDropdown);
            } else {
                variantDropdown.style.display = "none";
            }
        }
    
        variantParentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleVariantDropdown();
        });
    
        document.addEventListener("click", function (event) {
            if (!variantParentDiv.contains(event.target) && !variantDropdown.contains(event.target)) {
                isVariantDropdownOpen = false;
                variantDropdown.style.display = "none";
            }
        });
    
        document.querySelectorAll("#customDropdown .dropdown-content p").forEach(fontOption => {
            fontOption.addEventListener("click", function () {
                const selectedFont = this.getAttribute("data-font");
                parentDiv.querySelector("p").textContent = selectedFont;
                updateFontVariants(selectedFont);
                toggleDropdown(document.getElementById("customDropdown")); 
            });
        });
    }
    
    
    

    waitForElement("#font-size", (parentDiv) => {
        let dropdownContainer = document.getElementById("customFontSizeDropdown");
        if (!dropdownContainer) {
            dropdownContainer = document.createElement("div");
            dropdownContainer.id = "customFontSizeDropdown";
            dropdownContainer.style.position = "absolute";
            dropdownContainer.style.display = "none";
            dropdownContainer.style.background = "#3d3d3d";
            dropdownContainer.style.border = "1px solid #585858";
            dropdownContainer.style.borderRadius = "6px";
            dropdownContainer.style.padding = "8px";
            dropdownContainer.style.minWidth = "80px";
            dropdownContainer.style.color = "#ffffff";
            dropdownContainer.style.fontSize = "14px";
            dropdownContainer.style.zIndex = "9999";
            dropdownContainer.style.maxHeight = "250px";
            dropdownContainer.style.overflowY = "auto";
            document.body.appendChild(dropdownContainer);
        }

        let isDropdownOpen = false;

        function toggleDropdown() {
            isDropdownOpen = !isDropdownOpen;
            if (isDropdownOpen) {
                setDropdownPosition(parentDiv, dropdownContainer);
            } else {
                dropdownContainer.style.display = "none";
            }
        }

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleDropdown();
        });

        document.addEventListener("click", function (event) {
            if (!parentDiv.contains(event.target) && !dropdownContainer.contains(event.target)) {
                isDropdownOpen = false;
                dropdownContainer.style.display = "none";
            }
        });

        let fontSizes = Array.from({ length: 80 }, (_, i) => i + 1);
        dropdownContainer.innerHTML = `<div class="dropdown-content">
            ${fontSizes.map(size => `
                <p class="squareCraft-text-center squareCraft-py-1 squareCraft-bg-colo-EF7C2F-hover squareCraft-text-sm squareCraft-cursor-pointer">
                    ${size}px
                </p>
            `).join("")}
        </div>`;

        document.querySelectorAll("#customFontSizeDropdown .dropdown-content p").forEach(sizeOption => {
            sizeOption.addEventListener("click", function () {
                parentDiv.querySelector("#font-size-number").textContent = this.textContent.replace("px", "");
                toggleDropdown();
            });
        });
    });
})();
