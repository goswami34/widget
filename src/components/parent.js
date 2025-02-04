(async function parent() {
    console.log("🚀 Parent function initialized...");

    let parentHtml, attachEventListeners, observeDOMChanges, fetchModifications, token;

    async function loadModule(url, globalVarName) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.type = "module"; 
            script.onload = async () => {
                console.log(`✅ Loaded module: ${url}`);

                if (globalVarName === "parentHtml") {
                    parentHtml = (await import(url)).parentHtml;
                } else if (globalVarName === "attachEventListeners") {
                    attachEventListeners = (await import(url)).attachEventListeners;
                } else if (globalVarName === "observeDOMChanges") {
                    observeDOMChanges = (await import(url)).observeDOMChanges;
                } else if (globalVarName === "fetchModifications") {
                    fetchModifications = (await import(url)).fetchModifications;
                } else if (globalVarName === "token") {
                    token = (await import(url)).token;
                }

                resolve();
            };
            script.onerror = (err) => {
                console.error(`❌ Failed to load module: ${url}`, err);
                reject(err);
            };
            document.head.appendChild(script);
        });
    }

    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js", "parentHtml");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js", "attachEventListeners");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js", "observeDOMChanges");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js", "fetchModifications");
    await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js", "token");

    if (!parentHtml || !attachEventListeners || !observeDOMChanges || !fetchModifications || !token) {
        console.error("❌ Some functions failed to load. Check module imports.");
        return;
    }

    console.log("✅ Successfully imported all modules.");
    console.log("📌 HTML Structure:\n", parentHtml());

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

    function initializeSquareCraft() {
        token();
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
    }

    document.addEventListener("DOMContentLoaded", initializeSquareCraft);
})();
