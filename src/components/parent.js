(async function parent() {
    console.log("🚀 Parent function initialized...");

    async function loadModule(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.type = "module";
            script.onload = () => {
                console.log(`✅ Loaded module: ${url}`);
                resolve();
            };
            script.onerror = (err) => {
                console.error(`❌ Failed to load module: ${url}`, err);
                reject(err);
            };
            document.head.appendChild(script);
        });
    }

    // ✅ Load all required modules sequentially
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js");

    // ✅ Ensure `parentHtml` is available
    if (typeof parentHtml !== "function") {
        console.error("❌ parentHtml function not found! Check if the script loaded properly.");
        return;
    }

    console.log("✅ Successfully imported parentHtml:", parentHtml());

    // ✅ Create Widget
    function createWidget() {
        const widgetContainer = document.createElement("div");
        widgetContainer.id = "squarecraft-widget-container";
        widgetContainer.style.position = "fixed";
        widgetContainer.style.top = "100px";
        widgetContainer.style.left = "100px";
        widgetContainer.style.cursor = "grab";
        widgetContainer.style.zIndex = "9999";
        widgetContainer.style.display = "block";

        console.log("🔹 Injecting Widget HTML:", parentHtml());
        widgetContainer.innerHTML = parentHtml();
        document.body.appendChild(widgetContainer);
    }

    // ✅ Initialize SquareCraft
    function initializeSquareCraft() {
        token();
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
    }

    document.addEventListener("DOMContentLoaded", initializeSquareCraft);
})();
