(async function injectAdminPluginIcon() {
    console.log("🚀 Squarespace Plugin Loader Initialized!");

    let iconUrl = localStorage.getItem("squareCraft_icon_url") || "https://i.ibb.co/LXKK6swV/Group-29.jpg";
    localStorage.setItem("squareCraft_icon_url", iconUrl);

    let retryCount = 0, maxRetries = 10;

    function addPluginIcon() {
        if (retryCount >= maxRetries) return console.warn("🚨 Max retries reached. Stopping plugin injection.");
        retryCount++;

        // 1️⃣ Find the Squarespace Admin Navbar
        const adminToolbar = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]')?.closest('ul');

        // If the admin toolbar is not found, retry after a short delay
        if (!adminToolbar) {
            console.warn("⚠️ Squarespace Admin Navbar not found. Retrying...");
            setTimeout(addPluginIcon, 1000);
            return;
        }

        console.log("✅ Admin Toolbar FOUND:", adminToolbar);

        // Prevent duplicate injection
        if (document.getElementById("squareCraft-icon-button")) return console.warn("⚠️ Plugin Icon already exists.");

        // 2️⃣ Create the Plugin Button
        const listItem = document.createElement("li");
        listItem.className = "custom-plugin-icon";

        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "custom-plugin-wrapper";

        const pluginButton = document.createElement("button");
        pluginButton.id = "squareCraft-icon-button";
        pluginButton.className = "custom-plugin-btn";
        pluginButton.setAttribute("aria-label", "My Plugin");
        pluginButton.setAttribute("data-test", "my-plugin-button");
        pluginButton.style.cssText = `
            width: 37px; height: 37px; border-radius: 4px; background-color: transparent;
            display: flex; justify-content: center; align-items: center; border: none;
            cursor: pointer; transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
            opacity: 0;
        `;

        // 3️⃣ Plugin Icon Image
        const iconImage = document.createElement("img");
        iconImage.src = iconUrl;
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        // Button Hover Effects
        pluginButton.onmouseenter = () => pluginButton.style.transform = "scale(1.1)";
        pluginButton.onmouseleave = () => pluginButton.style.transform = "scale(1)";
        pluginButton.onclick = () => window.open("https://your-plugin-dashboard.com", "_blank");

        // Append elements
        pluginButton.appendChild(iconImage);
        buttonWrapper.appendChild(pluginButton);
        listItem.appendChild(buttonWrapper);

        // 4️⃣ Inject Plugin Icon into Admin Toolbar
        adminToolbar.insertBefore(listItem, adminToolbar.firstChild);

        // Fade-in effect
        requestAnimationFrame(() => pluginButton.style.opacity = "1");

        console.log("✅ Plugin Icon Injected Successfully!");
        retryCount = 0;
    }

    // 🕵️ Detect Shadow DOM (if used by Squarespace)
    function detectShadowDOM() {
        let shadowHost = document.querySelector("squarespace-toolbar");
        if (shadowHost && shadowHost.shadowRoot) {
            console.log("✅ Shadow DOM detected. Adding click listener...");
            shadowHost.shadowRoot.addEventListener("click", (event) => {
                console.log("🔥 Clicked inside Shadow DOM:", event.target);
            });
        } else {
            console.warn("⚠️ No Shadow DOM detected.");
        }
    }

    // 🕵️ Detect if Admin Navbar is Inside an iframe
    function detectIframeNavbar() {
        let iframe = document.querySelector("iframe");
        if (iframe) {
            let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                console.log("✅ iframe detected. Adding click listener...");
                iframeDoc.addEventListener("click", (event) => {
                    console.log("🔥 Clicked inside iframe:", event.target);
                });
            }
        }
    }

    // 🛠️ Mutation Observer to Track Admin UI Changes
    const observer = new MutationObserver(() => {
        if (!document.getElementById("squareCraft-icon-button")) {
            console.log("🔄 Admin Navbar changed, reinjecting icon...");
            addPluginIcon();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // ✅ Run Functions After Page Loads
    setTimeout(() => {
        detectShadowDOM();
        detectIframeNavbar();
        addPluginIcon();
    }, 3000);
})();
