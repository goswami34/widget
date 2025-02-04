(async function parent() {
    console.log("🚀 Parent function initialized...");

    function initializeSquareCraft() {
        console.log("⚡ Initializing SquareCraft...");
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
    }

    let parentHtml, attachEventListeners, observeDOMChanges, fetchModifications;

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

    parentHtml = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js"))?.parentHtml;
    attachEventListeners = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js"))?.attachEventListeners;
    observeDOMChanges = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js"))?.observeDOMChanges;
    fetchModifications = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js"))?.fetchModifications;

    console.log("✅ Successfully imported all modules.");
    console.log("📌 HTML Structure:\n", parentHtml());

    function createWidget() {
        console.log("🔹 Running createWidget function...");

        if (!parentHtml) {
            console.error("❌ parentHtml is not defined. Check imports.");
            return;
        }

        if (document.getElementById("squarecraft-widget-container")) {
            console.warn("⚠️ Widget already exists.");
            return;
        }

        // ✅ Create Widget
        const widgetContainer = document.createElement("div");
        widgetContainer.id = "squarecraft-widget-container";
        widgetContainer.style.cssText = `
            position: fixed;
            top: 100px;
            left: 100px;
            cursor: grab;
            z-index: 9999;
            background: white;
            border: 1px solid #ddd;
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
        `;

        widgetContainer.innerHTML = parentHtml();

        // ✅ Append Widget
        document.body.appendChild(widgetContainer);

        // ✅ Fade-in Effect
        setTimeout(() => {
            widgetContainer.style.opacity = "1";
        }, 300);

        console.log("✅ Widget Injected Successfully.");
    }

    setTimeout(() => {
        initializeSquareCraft();
    }, 500);
})();
