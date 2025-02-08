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
            dropdownContainer.style.top = "5px";
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
        let variantParentDiv = document.getElementById("squareCraft-font-varient");
        if (!variantParentDiv) return;

        variantParentDiv.querySelector("p").textContent = variants[0];

        let variantDropdown = document.getElementById("customVariantDropdown");
        if (!variantDropdown) {
            variantDropdown = document.createElement("div");
            variantDropdown.id = "customVariantDropdown";
            variantDropdown.style.position = "absolute";
            variantDropdown.style.top = "5px";
            variantDropdown.style.display = "none";
            variantDropdown.style.background = "#3d3d3d";
            variantDropdown.style.border = "1px solid #585858";
            variantDropdown.style.borderRadius = "6px";
            variantDropdown.style.padding = "8px";
            variantDropdown.style.minWidth = "200px";
            variantDropdown.style.color = "#ffffff";
            variantDropdown.style.fontSize = "14px";
            variantDropdown.style.zIndex = "9999";
            variantDropdown.style.maxHeight = "250px";
            variantDropdown.style.overflowY = "auto";
            document.body.appendChild(variantDropdown);
        }

        variantDropdown.innerHTML = `<div class="dropdown-content">
            ${variants.map(variant => `
                <p class="squareCraft-text-center squareCraft-py-1 squareCraft-text-sm squareCraft-cursor-pointer">
                    ${variant}
                </p>
            `).join("")}
        </div>`;

        let isVariantDropdownOpen = false;

        function toggleVariantDropdown() {
            isVariantDropdownOpen = !isVariantDropdownOpen;
            variantDropdown.style.display = isVariantDropdownOpen ? "block" : "none";
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

        document.querySelectorAll("#customVariantDropdown .dropdown-content p").forEach(variantOption => {
            variantOption.addEventListener("click", function () {
                variantParentDiv.querySelector("p").textContent = this.textContent;
                toggleVariantDropdown();
            });
        });
    }
})();
