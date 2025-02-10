(async function fontFamilyDropdowninteract() {
    let isDropdownOpen = false;
    let dropdownContainer = null;
    let selectedElement = null;
    let selectedPageId = null;
    let selectedBlockId = null;
    let selectedBlockType = null;

    function waitForElement(selector, callback, timeout = 5000) {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                console.log(`✅ Found element: ${selector}`);
                callback(element);
            } else if (Date.now() - startTime > timeout) {
                console.warn(`⚠️ Timeout waiting for ${selector}`);
                clearInterval(interval);
            }
        }, 200);
    }

    function toggleDropdown(parentDiv) {
        if (!dropdownContainer) {
            console.warn("⚠️ dropdownContainer not found!");
            return;
        }

        isDropdownOpen = !isDropdownOpen;
        console.log(`🔄 Toggling Dropdown → isDropdownOpen: ${isDropdownOpen}`);

        if (isDropdownOpen) {
            dropdownContainer.classList.add("squareCraft-visible");
        } else {
            dropdownContainer.classList.remove("squareCraft-visible");
        }
    }

    document.addEventListener("click", (event) => {
        let clickedElement = event.target.closest("[id^='block-']");
        let pageElement = event.target.closest("article[data-page-sections]");

        if (!clickedElement || !pageElement) return;

        selectedElement = clickedElement;
        selectedPageId = pageElement.getAttribute("data-page-sections");
        selectedBlockId = clickedElement.id;

        selectedBlockType = "Unknown";
        if (clickedElement.classList.contains("sqs-block-html")) selectedBlockType = "Text";
        else if (clickedElement.classList.contains("sqs-block-image")) selectedBlockType = "Image";
        else if (clickedElement.classList.contains("sqs-block-button")) selectedBlockType = "Button";

        console.log(`✅ Selected → Page ID: ${selectedPageId}, Block ID: ${selectedBlockId}, Type: ${selectedBlockType}`);
    });

    waitForElement("#squareCraft-font-family", (parentDiv) => {
        console.log("✅ Attaching dropdown to #squareCraft-font-family");

        dropdownContainer = document.createElement("div");
        dropdownContainer.id = "customDropdown";
        dropdownContainer.classList.add("squareCraft-dropdown");
        document.body.appendChild(dropdownContainer);

        fetchGoogleFonts(dropdownContainer, parentDiv);

        parentDiv.addEventListener("click", function (event) {
            event.stopPropagation();
            console.log("🎯 Font dropdown clicked!");
            toggleDropdown(parentDiv);
        });

        document.addEventListener("click", function (event) {
            if (!parentDiv.contains(event.target) && !dropdownContainer.contains(event.target)) {
                isDropdownOpen = false;
                dropdownContainer.classList.remove("squareCraft-visible");
                console.log("❌ Closing dropdown (clicked outside)");
            }
        });
    });

    async function fetchGoogleFonts(dropdownContainer, parentDiv) {
        const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
        let allFonts = [];
        let currentIndex = 0;
        const pageSize = 10;
        let isFetching = false;

        dropdownContainer.innerHTML = `<div class="squareCraft-dropdown-content"></div><div class="squareCraft-loader"></div>`;
        const dropdownContent = dropdownContainer.querySelector(".squareCraft-dropdown-content");
        const loader = dropdownContainer.querySelector(".squareCraft-loader");

        try {
            console.log("⏳ Fetching fonts from Google API...");
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch fonts");
            const data = await response.json();
            allFonts = data.items;
            console.log("✅ Fonts fetched successfully!", allFonts);
            renderFonts();
        } catch (error) {
            console.error("❌ Error loading fonts:", error);
            dropdownContainer.innerHTML = `<p class="squareCraft-error">❌ Error loading fonts</p>`;
        }

        function renderFonts() {
            if (currentIndex >= allFonts.length) return;

            const fontsToShow = allFonts.slice(currentIndex, currentIndex + pageSize);
            currentIndex += pageSize;

            dropdownContent.innerHTML += fontsToShow.map(font => `
                <p class="squareCraft-dropdown-item" data-font="${font.family}">
                    ${font.family}
                </p>
            `).join("");

            loader.classList.add("squareCraft-hidden");
            isFetching = false;

            document.querySelectorAll(".squareCraft-dropdown-content .squareCraft-dropdown-item").forEach(fontOption => {
                fontOption.addEventListener("click", function () {
                    if (!selectedElement || !selectedPageId || !selectedBlockId) {
                        console.warn("⚠️ No element selected! Click an element first.");
                        return;
                    }
                    const selectedFont = this.getAttribute("data-font");
                    console.log(`🎨 Applying Font: ${selectedFont} to Element: ${selectedBlockId}`);

                    selectedElement.classList.add(`squareCraft-font-${selectedFont.replace(/\s+/g, '-')}`);
                    saveModifications(selectedElement, { "font-family": selectedFont });

                    toggleDropdown(parentDiv);
                });
            });
        }

        dropdownContainer.addEventListener("scroll", () => {
            if (dropdownContainer.scrollTop + dropdownContainer.clientHeight >= dropdownContainer.scrollHeight - 5) {
                if (!isFetching && currentIndex < allFonts.length) {
                    isFetching = true;
                    loader.classList.remove("squareCraft-hidden");
                    setTimeout(renderFonts, 1000);
                }
            }
        });
    }

    async function saveModifications(targetElement, css) {
        const token = localStorage.getItem("squareCraft_auth_token");
        const userId = localStorage.getItem("squareCraft_u_id");
        const widgetId = localStorage.getItem("squareCraft_w_id");

        if (!token || !userId || !widgetId) {
            console.warn("⚠️ Missing authentication details. Cannot save modifications.");
            return;
        }

        let modificationData = {
            userId,
            token,
            widgetId,
            modifications: [
                {
                    pageId: selectedPageId,
                    elements: [
                        {
                            elementId: selectedBlockId,
                            css,
                        }
                    ]
                }
            ]
        };

        try {
            const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "userId": userId,
                    "widget-id": widgetId,
                    "pageId": selectedPageId
                },
                body: JSON.stringify(modificationData),
            });

            const data = await response.json();
            console.log("✅ Changes Saved Successfully!", data);
        } catch (error) {
            console.error("❌ Error saving modifications:", error);
        }
    }

})();
