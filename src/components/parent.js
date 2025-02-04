(function injectPluginIcon() {
    console.log("🚀 Searching for Squarespace Admin Navbar...");

    function addPluginIcon() {
        // Target the UL element inside the admin toolbar
        const targetList = document.querySelector('.yhtkeO2k7AL1WN9_X2K3 ul.css-1tn5iw9');

        if (!targetList) {
            console.warn("⚠️ Target Admin Toolbar NOT found. Retrying...");
            setTimeout(addPluginIcon, 1000);
            return;
        }

        console.log("✅ Target Admin Toolbar FOUND:", targetList);

        // 🛑 Prevent duplicate icons
        if (document.getElementById("squareCraft-icon-button")) {
            console.warn("⚠️ Plugin Icon already exists.");
            return;
        }

        // ✅ Create the list item wrapper
        const listItem = document.createElement("li");
        listItem.className = "css-custom-plugin"; // Custom class to keep styling

        // ✅ Create the button container
        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "css-1j096s0"; // Consistent with Squarespace styles

        const pluginButton = document.createElement("button");
        pluginButton.id = "squareCraft-icon-button";
        pluginButton.className = "css-110yp2v"; // Follow Squarespace button style
        pluginButton.setAttribute("display", "inline-block");
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

        // ✅ Create Image Icon
        const iconImage = document.createElement("img");
        iconImage.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; // Your Plugin Icon
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        // ✅ Hover Effect
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

        // ✅ Assemble Components
        pluginButton.appendChild(iconImage);
        buttonWrapper.appendChild(pluginButton);
        listItem.appendChild(buttonWrapper);
        targetList.appendChild(listItem);

        // ✅ Smooth Fade-in
        requestAnimationFrame(() => {
            pluginButton.style.opacity = "1";
        });

        console.log("✅ Plugin Icon Injected Successfully!");
    }

    addPluginIcon();
})();
