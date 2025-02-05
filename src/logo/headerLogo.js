(async function injectPluginIcon() {
    console.log("🚀 Searching for Squarespace Admin Navbar...");

    // 1️⃣ Check if icon URL exists in localStorage
    let iconUrl = localStorage.getItem("squareCraft_icon_url");
    if (!iconUrl) {
        iconUrl = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; // Default icon
        localStorage.setItem("squareCraft_icon_url", iconUrl);
        console.log("📝 Icon URL set in localStorage:", iconUrl);
    } else {
        console.log("🔄 Loaded Icon URL from localStorage:", iconUrl);
    }

    // 2️⃣ Function to inject icon into Squarespace Admin Toolbar
    function addPluginIcon() {
        const targetList = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]')?.closest('ul');

        if (!targetList) {
            console.warn("⚠️ Target Admin Toolbar NOT found. Retrying...");
            setTimeout(addPluginIcon, 1000);
            return;
        }

        console.log("✅ Target Admin Toolbar FOUND:", targetList);

        // Prevent duplicate icons
        if (document.getElementById("squareCraft-icon-button")) {
            console.warn("⚠️ Plugin Icon already exists.");
            return;
        }

        // 3️⃣ Create list item for the icon
        const listItem = document.createElement("li");
        listItem.className = "css-custom-plugin";

        // Button wrapper
        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "css-1j096s0"; // Mimics Squarespace button wrapper

        // Plugin button
        const pluginButton = document.createElement("button");
        pluginButton.id = "squareCraft-icon-button";
        pluginButton.className = "css-110yp2v";
        pluginButton.setAttribute("aria-label", "My Plugin");
        pluginButton.setAttribute("data-test", "my-plugin-button");

        pluginButton.style.cssText = `
            width: 37px;
            height: 37px;
            border-radius: 4px;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            cursor: pointer;
            transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
            opacity: 0;
        `;

        // 4️⃣ Create Image Icon
        const iconImage = document.createElement("img");
        iconImage.src = iconUrl;
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        // 🖱️ Hover Effect
        pluginButton.onmouseenter = () => {
            pluginButton.style.transform = "scale(1.1)";
        };
        pluginButton.onmouseleave = () => {
            pluginButton.style.transform = "scale(1)";
        };

        // 🔗 Click to Open Plugin Dashboard
        pluginButton.onclick = () => {
            window.open("https://your-plugin-dashboard.com", "_blank");
        };

        // 5️⃣ Assemble Elements
        pluginButton.appendChild(iconImage);
        buttonWrapper.appendChild(pluginButton);
        listItem.appendChild(buttonWrapper);

        // Insert at the **beginning** of the toolbar
        targetList.insertBefore(listItem, targetList.firstChild);

        // Smooth Fade-in
        requestAnimationFrame(() => {
            pluginButton.style.opacity = "1";
        });

        console.log("✅ Plugin Icon Injected Successfully!", targetList.firstChild);
    }

    // 6️⃣ MutationObserver to detect changes & reinject icon if removed
    const observer = new MutationObserver(() => {
        if (!document.getElementById("squareCraft-icon-button")) {
            console.log("🔄 Admin Navbar changed, reinjecting icon...");
            addPluginIcon();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 7️⃣ Initial Injection
    addPluginIcon();
})();
