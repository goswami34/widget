(function injectPluginIcon() {
    console.log("🚀 Checking Squarespace Admin Navbar...");

    function addPluginIcon() {
        const navbar = document.querySelector(".sqs-admin-navbar");

        if (!navbar) {
            console.error("⚠️ Admin Navbar NOT found. Retrying...");
            setTimeout(addPluginIcon, 1000);
            return;
        }

        console.log("✅ Admin Navbar FOUND:", navbar);

        if (document.getElementById("squareCraft-icon-button")) {
            console.error("⚠️ Plugin Icon already exists.");
            return;
        }

        // ✅ Create Wrapper
        const pluginWrapper = document.createElement("div");
        pluginWrapper.className = "my-plugin-container";
        pluginWrapper.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
        `;

        // ✅ Create Button
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

        // ✅ Create Image Icon
        const iconImage = document.createElement("img");
        iconImage.src = "https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png";
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        // ✅ Click Event
        pluginButton.onclick = () => {
            window.open("https://your-plugin-dashboard.com", "_blank");
        };

        // ✅ Append Elements
        pluginButton.appendChild(iconImage);
        pluginWrapper.appendChild(pluginButton);
        navbar.appendChild(pluginWrapper);

        // ✅ Smooth Fade-in
        requestAnimationFrame(() => {
            pluginButton.style.opacity = "1";
        });

        console.log("✅ Plugin Icon Added to Admin Navbar!");
    }

    document.addEventListener("DOMContentLoaded", addPluginIcon);
})();
