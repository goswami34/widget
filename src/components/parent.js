(function injectPluginIcon() {
    console.log("🚀 Checking Squarespace Admin Navbar...");

    function addPluginIcon() {
        const navbar = document.querySelector(".yhtkeO2k7AL1WN9_X2K3.easvSE7V2UO23WuGjRmN.fs-unmask ul");

        if (!navbar) {
            console.error("⚠️ Admin Navbar NOT found. Retrying...");
            setTimeout(addPluginIcon, 1000);
            return;
        }

        console.log("✅ Admin Navbar FOUND:", navbar);

        if (document.getElementById("squareCraft-icon-button")) {
            console.warn("⚠️ Plugin Icon already exists.");
            return;
        }

        // ✅ Create Plugin Container
        const pluginWrapper = document.createElement("li");
        pluginWrapper.className = "squarecraft-plugin-container";
        
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
        iconImage.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; 
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        // ✅ Click Event
        pluginButton.onclick = () => {
            window.open("https://your-plugin-dashboard.com", "_blank");
        };

        // ✅ Append Elements
        pluginButton.appendChild(iconImage);
        pluginWrapper.appendChild(pluginButton);

        // ✅ Prepend instead of append
        navbar.insertBefore(pluginWrapper, navbar.firstChild);

        // ✅ Smooth Fade-in
        requestAnimationFrame(() => {
            pluginButton.style.opacity = "1";
        });

        console.log("✅ Plugin Icon Added to Admin Navbar!");
    }

    document.addEventListener("DOMContentLoaded", addPluginIcon);
})();
