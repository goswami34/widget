(async function parent() {
    console.log("🚀 Parent function initialized...");

    function initializeSquareCraft() {
        console.log("⚡ Initializing SquareCraft...");
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
    }

    let parentHtml, attachEventListeners, observeDOMChanges, fetchModifications, token, headerLogo;

    async function loadModule(url) {
        try {
            console.log(`🚀 Loading module: ${url}`);
            const module = await import(url);
            console.log(`✅ Successfully loaded: ${url}`);
            return module;
        } catch (err) {
            console.error(`❌ Failed to load module: ${url}`, err);
            return null;
        }
    }

    // ✅ Load modules
    parentHtml = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js"))?.parentHtml;
    attachEventListeners = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js"))?.attachEventListeners;
    observeDOMChanges = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js"))?.observeDOMChanges;
    fetchModifications = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js"))?.fetchModifications;
    token = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js"))?.token;
    headerLogo = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/logo/headerLogo.js"))?.headerLogo;

    // ✅ Run functions after modules are loaded
    headerLogo?.();
    token?.();

    console.log("✅ Successfully imported all modules.");
    console.log("📌 HTML Structure:\n", parentHtml());

    function createWidget() {
        console.log("🔹 Running createWidget function...");

        if (!parentHtml) {
            console.error("❌ parentHtml is not defined. Check imports.");
            return;
        }

        if (document.getElementById("squarecraft-widget-container")) {
            console.warn("⚠️ Widget already exists, skipping creation.");
            return;
        }

        const widgetContainer = document.createElement("div");
        widgetContainer.id = "squarecraft-widget-container";
        widgetContainer.style.position = "fixed";
        widgetContainer.style.top = "100px";
        widgetContainer.style.left = "100px";
        widgetContainer.style.cursor = "grab";
        widgetContainer.style.zIndex = "9999";

        const style = document.createElement("style");
        style.innerHTML = `
          #squarecraft-widget-container {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
        `;
        document.head.appendChild(style);

        console.log("📌 Injecting Widget HTML...");
        widgetContainer.innerHTML = parentHtml();

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                document.body.appendChild(widgetContainer);
                console.log("✅ Widget appended!");
            });
        } else {
            document.body.appendChild(widgetContainer);
            console.log("✅ Widget appended!");
        }

        // 🔄 Retry appending if Squarespace removes it
        let retryCount = 0;
        const checkWidget = setInterval(() => {
            if (!document.getElementById("squarecraft-widget-container")) {
                if (retryCount >= 5) {
                    console.warn("❌ Widget removed too many times. Stopping retries.");
                    clearInterval(checkWidget);
                    return;
                }
                console.warn("⚠️ Widget was removed! Re-adding...");
                document.body.appendChild(widgetContainer);
                retryCount++;
            } else {
                clearInterval(checkWidget);
            }
        }, 3000);
    }

    // ✅ Start widget immediately
    setTimeout(() => {
        console.log("⚡ Ensuring SquareCraft initializes...");
        initializeSquareCraft();
    }, 500);

})();

// ✅ Add Plugin Icon to Admin Navbar
function headerLogo() {
    console.log("🚀 Searching for Squarespace Admin Header...");

    function addPluginIcon() {
        const navbar = document.querySelector(".sqs-admin-navbar");

        if (!navbar) {
            console.warn("⚠️ Admin Navbar NOT found. Retrying in 1s...");
            setTimeout(addPluginIcon, 1000);
            return;
        }
        console.log("✅ Admin Navbar FOUND:", navbar);

        if (document.getElementById("my-plugin-icon")) {
            console.warn("⚠️ Plugin Icon already exists.");
            return;
        }

        const pluginButton = document.createElement("button");
        pluginButton.id = "my-plugin-icon";
        pluginButton.style.cssText = `
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 5px;
        `;

        const iconImage = document.createElement("img");
        iconImage.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg";
        iconImage.alt = "Plugin Icon";
        iconImage.style.cssText = `
            width: 24px;
            height: 24px;
        `;

        const buttonText = document.createElement("span");
        buttonText.innerText = "My Plugin";
        buttonText.style.cssText = `
            color: white;
            font-size: 14px;
        `;

        pluginButton.appendChild(iconImage);
        pluginButton.appendChild(buttonText);
        pluginButton.onclick = () => window.open("https://your-plugin-dashboard.com", "_blank");

        navbar.appendChild(pluginButton);

        console.log("✅ Plugin Icon with Image Added to Admin Navbar!");
    }

    document.addEventListener("DOMContentLoaded", addPluginIcon);
}
