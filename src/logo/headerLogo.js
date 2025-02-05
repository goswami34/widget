(async function headerLogo() {
    document.addEventListener("click", function (event) {
        console.log("🔥 Clicked Element:", event.target);
        console.log("🔍 Element Selector:", getElementSelector(event.target));
        forceClick(event.target);
    });

    function getElementSelector(element) {
        if (!element) return null;
        if (element.id) return `#${element.id}`;
        if (element.className) {
            return `.${element.className.toString().split(" ").filter(Boolean).join(".")}`;
        }
        return element.tagName.toLowerCase();
    }

    function forceClick(targetElement) {
        if (!targetElement) return console.warn("⚠️ No target element provided.");

        console.log("🔥 Attempting to click:", targetElement);

        if (targetElement.offsetParent === null) {
            console.warn("⚠️ Target is hidden (display: none or visibility: hidden)");
            return;
        }

        try {
            targetElement.focus();
            targetElement.click();
            console.log("✅ Click event dispatched normally.");
            return;
        } catch {
            console.warn("⚠️ Normal click failed, trying other methods...");
        }

        try {
            targetElement.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
            console.log("✅ MouseEvent click dispatched.");
            return;
        } catch {
            console.warn("⚠️ MouseEvent click failed.");
        }

        try {
            targetElement.focus();
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true }));
            console.log("✅ Enter key simulated.");
        } catch {
            console.warn("⚠️ Enter key simulation failed.");
        }
    }

    console.log("🚀 Searching for Squarespace Admin Navbar...");

    let iconUrl = localStorage.getItem("squareCraft_icon_url") || "https://i.ibb.co/LXKK6swV/Group-29.jpg";
    localStorage.setItem("squareCraft_icon_url", iconUrl);
    console.log("📝 Icon URL set in localStorage:", iconUrl);

    let retryCount = 0, maxRetries = 10;

    function addPluginIcon() {
        if (retryCount >= maxRetries) return console.warn("🚨 Max retries reached. Stopping plugin injection.");
        retryCount++;

        const targetList = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]')?.closest('ul');
        if (!targetList) return setTimeout(addPluginIcon, 1000);

        console.log("✅ Target Admin Toolbar FOUND:", targetList);

        if (document.getElementById("squareCraft-icon-button")) return console.warn("⚠️ Plugin Icon already exists.");

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
            width: 37px; height: 37px; border-radius: 4px; background-color: transparent;
            display: flex; justify-content: center; align-items: center; border: none;
            cursor: pointer; transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
            opacity: 0;
        `;

        const iconImage = document.createElement("img");
        iconImage.src = iconUrl;
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = "width: 22px; height: 22px;";

        pluginButton.onmouseenter = () => pluginButton.style.transform = "scale(1.1)";
        pluginButton.onmouseleave = () => pluginButton.style.transform = "scale(1)";
        pluginButton.onclick = () => window.open("https://your-plugin-dashboard.com", "_blank");

        pluginButton.appendChild(iconImage);
        buttonWrapper.appendChild(pluginButton);
        listItem.appendChild(buttonWrapper);

        targetList.insertBefore(listItem, targetList.firstChild);

        requestAnimationFrame(() => pluginButton.style.opacity = "1");
        console.log("✅ Plugin Icon Injected Successfully!", targetList.firstChild);
        retryCount = 0;
    }

    const observer = new MutationObserver(() => {
        if (!document.getElementById("squareCraft-icon-button")) {
            console.log("🔄 Admin Navbar changed, reinjecting icon...");
            addPluginIcon();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    addPluginIcon();
})();
