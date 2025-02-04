(function injectPluginIcon() {
    console.log("🚀 Checking Squarespace Admin Navbar...");

    function addPluginIcon() {
        const navbar = document.querySelector(".sqs-admin-navbar");

        if (!navbar) {
            console.warn("⚠️ Admin Navbar NOT found. Retrying...");
            setTimeout(addPluginIcon, 1000);
            return;
        }

        console.log("✅ Admin Navbar FOUND:", navbar);

        if (document.getElementById("squareCraft-icon-button")) {
            console.warn("⚠️ Plugin Icon already exists.");
            return;
        }

        const pluginWrapper = document.createElement("div");
        pluginWrapper.className = "my-plugin-container";
        pluginWrapper.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
        `;

        const pluginButton = document.createElement("button");
        pluginButton.id = "squareCraft-icon-button";
        pluginButton.style.cssText = `
            width: 37px;
            height: 37px;
            border-radius: 4px;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
            border: none;
            cursor: pointer;
            opacity: 0;
        `;

        const iconImage = document.createElement("img");
        iconImage.src = "https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png";
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        pluginButton.onclick = () => {
            window.open("https://your-plugin-dashboard.com", "_blank");
        };

        pluginButton.appendChild(iconImage);
        pluginWrapper.appendChild(pluginButton);
        navbar.appendChild(pluginWrapper);

        setTimeout(() => {
            pluginButton.style.opacity = "999999";
        }, 300);

        console.log("✅ Plugin Icon Added to Admin Navbar!");
    }

    document.addEventListener("DOMContentLoaded", addPluginIcon);
})();
