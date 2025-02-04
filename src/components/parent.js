(async function parent() {
    console.log("🚀 Parent function initialized...");

    let parentHtml, attachEventListeners, observeDOMChanges, fetchModifications, token;

    // ✅ Load ES module properly
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

    // ✅ Import modules correctly
    parentHtml = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js"))?.parentHtml;
    attachEventListeners = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js"))?.attachEventListeners;
    observeDOMChanges = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js"))?.observeDOMChanges;
    fetchModifications = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js"))?.fetchModifications;
    token = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js"))?.token;

    if (!parentHtml || !attachEventListeners || !observeDOMChanges || !fetchModifications || !token) {
        console.error("❌ Some functions failed to load. Check module imports.");
        return;
    }

    console.log("✅ Successfully imported all modules.");
    console.log("📌 HTML Structure:\n", parentHtml());

    function createWidget() {
        console.log("🔹 Running createWidget function...");
    
        if (!parentHtml) {
            console.error("❌ parentHtml is not defined. Check imports.");
            return;
        }
    
        // ✅ Check if widget already exists
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
    
        // ✅ Append immediately if body is ready, otherwise wait
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                console.log("📌 Appending Widget to DOM...");
                document.body.appendChild(widgetContainer);
            });
        } else {
            console.log("📌 Appending Widget to DOM immediately...");
            document.body.appendChild(widgetContainer);
        }
    
        // 🔄 Retry appending in case Squarespace removes it
        setTimeout(() => {
            if (!document.getElementById("squarecraft-widget-container")) {
                console.warn("⚠️ Widget was removed! Re-adding...");
                document.body.appendChild(widgetContainer);
            }
        }, 3000);
    }
    
    setTimeout(() => {
        console.log("🔍 Checking Widget in DOM (After Delay):", document.getElementById("squarecraft-widget-container"));
    }, 5000);
    
    function initializeSquareCraft() {
        console.log("⚡ Initializing SquareCraft...");
        token();
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
    }

    window.onload = () => {
        console.log("⚡ Initializing SquareCraft after full page load...");
        initializeSquareCraft();
    };
    })();
