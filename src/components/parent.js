(function () {
    console.log("🚀 Initializing SquareCraft Plugin...");

    function addPluginIcon() {
        console.log("🔍 Searching for Squarespace Admin Navbar...");

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

        // ✅ Mimic SparkPlugin's element structure
        const pluginWrapper = document.createElement("div");
        pluginWrapper.className = "yhtkeO2k7AL1WN9_X2K3 easvSE7V2UO23WuGjRmN fs-unmask";
        pluginWrapper.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
        `;

        const pluginButton = document.createElement("button");
        pluginButton.id = "squareCraft-icon-button";
        pluginButton.className = "bar-open-plugin open-plugin";
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
            opacity: 0;
            transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
        `;

        const iconImage = document.createElement("img");
        iconImage.src = "https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png"; // ✅ Your Plugin Icon
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        // ✅ Hover Effect (Mimics SparkPlugin)
        pluginButton.onmouseenter = () => {
            pluginButton.style.transform = "scale(1.1)";
        };
        pluginButton.onmouseleave = () => {
            pluginButton.style.transform = "scale(1)";
        };

        // ✅ Click to Open Plugin Dashboard
        pluginButton.onclick = () => {
            window.open("https://your-plugin-dashboard.com", "_blank");
        };

        // ✅ Append Image to Button
        pluginButton.appendChild(iconImage);
        pluginWrapper.appendChild(pluginButton);
        navbar.appendChild(pluginWrapper);

        // ✅ Smooth Fade-in Effect
        requestAnimationFrame(() => {
            pluginButton.style.opacity = "1";
        });

        console.log("✅ Plugin Icon Added Successfully!");
    }

    // ✅ Run when DOM is fully loaded
    document.addEventListener("DOMContentLoaded", addPluginIcon);
})();


// 