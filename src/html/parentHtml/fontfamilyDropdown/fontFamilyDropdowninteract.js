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
            dropdownContainer.style.minWidth = "200px";
            dropdownContainer.style.color = "#ffffff";
            dropdownContainer.style.fontSize = "14px";
            dropdownContainer.style.zIndex = "9999";
            dropdownContainer.style.maxHeight = "250px";
            dropdownContainer.style.overflowY = "auto";
            dropdownContainer.innerHTML = `<div class="dropdown-content"></div>`;
            document.body.appendChild(dropdownContainer);

            fetchGoogleFonts(dropdownContainer, parentDiv);
        }

        let isDropdownOpen = false;

        function toggleDropdown() {
            isDropdownOpen = !isDropdownOpen;
            dropdownContainer.style.display = isDropdownOpen ? "block" : "none";
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
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) return;
            const data = await response.json();
            dropdownContainer.innerHTML = `<div class="dropdown-content">
                ${data.items.slice(0, 10).map(font => `
                    <p class="squareCraft-text-center squareCraft-py-1 squareCraft-text-sm squareCraft-cursor-pointer" data-font='${JSON.stringify(font)}'>
                        ${font.family}
                    </p>
                `).join("")}
            </div>`;

            document.querySelectorAll("#customDropdown .dropdown-content p").forEach(fontOption => {
                fontOption.addEventListener("click", function () {
                    const fontData = JSON.parse(this.getAttribute("data-font"));
                    parentDiv.querySelector("p").textContent = fontData.family;
                    updateFontVariants(fontData.variants);
                    toggleDropdown();
                });
            });

        } catch (error) {
            dropdownContainer.innerHTML = `<p class="dropdown-item">❌ Error loading fonts</p>`;
        }
    }

    function updateFontVariants(variants) {
        let variantDropdownContainer = document.getElementById("customVariantDropdown");
        let variantParentDiv = document.getElementById("squareCraft-font-varient");
        if (!variantDropdownContainer) {
            variantDropdownContainer = document.createElement("div");
            variantDropdownContainer.id = "customVariantDropdown";
            variantDropdownContainer.style.position = "absolute";
            variantDropdownContainer.style.display = "none";
            variantDropdownContainer.style.background = "#3d3d3d";
            variantDropdownContainer.style.border = "1px solid #585858";
            variantDropdownContainer.style.borderRadius = "6px";
            variantDropdownContainer.style.padding = "8px";
            variantDropdownContainer.style.minWidth = "200px";
            variantDropdownContainer.style.color = "#ffffff";
            variantDropdownContainer.style.fontSize = "14px";
            variantDropdownContainer.style.zIndex = "9999";
            variantDropdownContainer.style.maxHeight = "250px";
            variantDropdownContainer.style.overflowY = "auto";
            document.body.appendChild(variantDropdownContainer);
        }

        variantDropdownContainer.innerHTML = `<div class="dropdown-content">
            ${variants.map(variant => `
                <p class="squareCraft-text-center squareCraft-py-1 squareCraft-text-sm squareCraft-cursor-pointer">
                    ${variant}
                </p>
            `).join("")}
        </div>`;

        variantParentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            variantDropdownContainer.style.display = variantDropdownContainer.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function (event) {
            if (!variantParentDiv.contains(event.target) && !variantDropdownContainer.contains(event.target)) {
                variantDropdownContainer.style.display = "none";
            }
        });

        document.querySelectorAll("#customVariantDropdown .dropdown-content p").forEach(variantOption => {
            variantOption.addEventListener("click", function () {
                variantParentDiv.querySelector("p").textContent = this.textContent;
                variantDropdownContainer.style.display = "none";
            });
        });
    }
})();
