export async function headerLogo() {
    console.log("🚀 Searching for Squarespace Admin Navbar...");

    // Check if icon exists in localStorage; if not, set it
    const iconURLKey = "squareCraft_icon_url";
    let iconURL = localStorage.getItem(iconURLKey);

    if (!iconURL) {
        iconURL = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; // Default icon URL
        localStorage.setItem(iconURLKey, iconURL);
        console.log("💾 Icon URL stored in localStorage:", iconURL);
    } else {
        console.log("🔄 Loaded Icon URL from localStorage:", iconURL);
    }

    function injectIcon() {
        const targetList = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]')?.closest("ul");

        if (!targetList) {
            console.warn("⚠️ Target Admin Toolbar NOT found. Retrying...");
            setTimeout(injectIcon, 1000);
            return;
        }

        console.log("✅ Target Admin Toolbar FOUND:", targetList);

        // Prevent duplicate icon injection
        if (document.getElementById("squareCraft-icon-button")) {
            console.warn("⚠️ Plugin Icon already exists.");
            return;
        }

        const listItem = document.createElement("li");
        listItem.className = "css-custom-plugin";

        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "css-1j096s0";

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

        const iconImage = document.createElement("img");
        iconImage.src = iconURL;
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        pluginButton.onmouseenter = () => {
            pluginButton.style.transform = "scale(1.1)";
        };
        pluginButton.onmouseleave = () => {
            pluginButton.style.transform = "scale(1)";
        };

        pluginButton.onclick = () => {
            window.open("https://your-plugin-dashboard.com", "_blank");
        };

        pluginButton.appendChild(iconImage);
        buttonWrapper.appendChild(pluginButton);
        listItem.appendChild(buttonWrapper);

        // Insert at the start of the toolbar
        targetList.insertBefore(listItem, targetList.firstChild);

        requestAnimationFrame(() => {
            pluginButton.style.opacity = "1";
        });

        console.log("✅ Plugin Icon Injected Successfully!", targetList.firstChild);
    }

    const observer = new MutationObserver(() => {
        if (!document.getElementById("squareCraft-icon-button")) {
            console.log("🔄 Admin Navbar changed, reinjecting icon...");
            injectIcon();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Wait for DOM to be fully loaded before running
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectIcon);
    } else {
        injectIcon();
    }
}
