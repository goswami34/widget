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
            dropdownContainer.style.minWidth = "180px";
            dropdownContainer.style.color = "#ffffff";
            dropdownContainer.style.fontSize = "14px";
            dropdownContainer.style.zIndex = "9999";
            dropdownContainer.innerHTML = `<p class="dropdown-item">Loading fonts...</p>`; 
            document.body.appendChild(dropdownContainer);

            // 🔥 Fetch fonts and populate dropdown
            fetchGoogleFonts(dropdownContainer);
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

        document.addEventListener("click", function (event) {
            if (!parentDiv.contains(event.target) && !dropdownContainer.contains(event.target)) {
                isDropdownOpen = false;
                dropdownContainer.style.display = "none";
            }
        });

        console.log("✅ Dropdown initialized successfully!");
    });

    // 🔥 Async function to fetch Google Fonts and populate dropdown
    async function fetchGoogleFonts(dropdownContainer) {
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";

        try {
            console.log("⏳ Fetching Google Fonts...");
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ Google Fonts Response:", data?.items);

            dropdownContainer.innerHTML = "";
            data.items.slice(0, 10).forEach(font => {  
                const fontOption = document.createElement("p");
                fontOption.classList.add("dropdown-item");
                fontOption.textContent = font.family;
                fontOption.style.fontFamily = font.family;
                fontOption.style.cursor = "pointer";
                fontOption.style.padding = "5px";

                fontOption.addEventListener("click", () => {
                    console.log(`✅ Selected Font: ${font.family}`);
                    parentDiv.querySelector("p").textContent = font.family;
                    toggleDropdown();
                });

                dropdownContainer.appendChild(fontOption);
            });

        } catch (error) {
            console.error("❌ Failed to fetch Google Fonts:", error);
            dropdownContainer.innerHTML = `<p class="dropdown-item">❌ Error loading fonts</p>`;
        }
    }
})();
