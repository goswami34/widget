(async function fontFamilyDropdowninteract() {
    console.log("🚀 Initializing fontFamilyDropdowninteract...");

    function waitForElement(selector, callback, timeout = 5000) {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                callback(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(interval);
                console.error(`❌ Element ${selector} not found within timeout.`);
            }
        }, 200);
    }

    waitForElement("#squareCraft-font-family", (parentDiv) => {
        console.log("✅ #squareCraft-font-family found! Initializing dropdown...");

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
            dropdownContainer.innerHTML = `<div class="dropdown-content"><p class="dropdown-item">Loading fonts...</p></div>`;
            document.body.appendChild(dropdownContainer);

            fetchGoogleFonts(dropdownContainer, parentDiv);
        }

        let isDropdownOpen = false;

        function toggleDropdown() {
            isDropdownOpen = !isDropdownOpen;
            if (isDropdownOpen) {
                const rect = parentDiv.getBoundingClientRect();
                dropdownContainer.style.left = `${rect.left}px`;
                dropdownContainer.style.top = `${rect.bottom + window.scrollY}px`;
                dropdownContainer.style.display = "block";
                console.log("📌 Dropdown OPENED");
            } else {
                dropdownContainer.style.display = "none";
                console.log("📌 Dropdown CLOSED");
            }
        }

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            console.log("✅ Dropdown parent clicked! Toggling dropdown...");
            toggleDropdown();
        });

        dropdownContainer.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {
            if (!parentDiv.contains(event.target) && !dropdownContainer.contains(event.target)) {
                isDropdownOpen = false;
                dropdownContainer.style.display = "none";
            }
        });

        console.log("✅ Dropdown initialized successfully!");
    });

    async function fetchGoogleFonts(dropdownContainer, parentDiv) {
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";

        try {
            console.log("⏳ Fetching Google Fonts...");
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("✅ Google Fonts Response:", data?.items);

            dropdownContainer.innerHTML = `
                <div class="dropdown-content">
                    ${data.items.slice(0, 10).map(font => `
                        <p class="squareCraft-text-center squareCraft-py-1 squareCraft-text-sm squareCraft-cursor-pointer squareCraft-bg-colo-EF7C2F-hover" data-font='${JSON.stringify(font)}'>
                            ${font.family}
                        </p>
                    `).join("")}
                </div>
            `;

            document.querySelectorAll("#customDropdown .dropdown-content p").forEach(fontOption => {
                fontOption.addEventListener("click", function () {
                    const fontData = JSON.parse(this.getAttribute("data-font"));
                    console.log(`✅ Selected Font: ${fontData.family}`);
                    parentDiv.querySelector("p").textContent = fontData.family;
                    updateFontVariants(fontData.variants);
                    toggleDropdown();
                });
            });

        } catch (error) {
            console.error("❌ Failed to fetch Google Fonts:", error);
            dropdownContainer.innerHTML = `<p class="dropdown-item">❌ Error loading fonts</p>`;
        }
    }

    function updateFontVariants(variants) {
        let varientDropdown = document.getElementById("squareCraft-font-varient");
        if (!varientDropdown) return;
        
        varientDropdown.innerHTML = variants.map(variant => `
            <p class="squareCraft-text-center squareCraft-py-1 squareCraft-text-sm squareCraft-cursor-pointer" data-font='${JSON.stringify(variant)}>
                ${variant}
            </p>
        `).join("");

        document.querySelectorAll("#squareCraft-font-varient p").forEach(variantOption => {
            variantOption.addEventListener("click", function () {
                console.log(`✅ Selected Variant: ${this.textContent}`);
                varientDropdown.textContent = this.textContent;
            });
        });
    }
})();
