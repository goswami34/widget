(async function parent() {
    function injectStylesheet() {
        if (document.getElementById("squareCraft-styles")) {
            console.warn("⚠️ SquareCraft styles already exist.");
            return;
        }

        const link = document.createElement("link");
        link.id = "squareCraft-styles";
        link.rel = "stylesheet";
        link.href = "https://fatin-webefo.github.io/squareCraft-Plugin/src/styles/parent.css";
        link.type = "text/css";
        link.onload = () => console.log("✅ SquareCraft styles loaded successfully!");
        link.onerror = () => console.error("❌ Failed to load SquareCraft styles.");

        document.head.appendChild(link);
    }
    injectStylesheet();

    console.log("🚀 Parent function initialized...");

    function initializeSquareCraft() {
        console.log("⚡ Initializing SquareCraft...");
        createWidget();
        attachEventListeners?.();
        getStyles?.();
        observeDOMChanges?.();
        parentHtmlTab?.();
    }

    let parentHtml, attachEventListeners, observeDOMChanges, getStyles, parentHtmlTab;

    function injectScript(id, url, callback) {
        if (document.getElementById(id)) {
            console.warn(`⚠️ ${id} already exists.`);
            return;
        }

        const script = document.createElement("script");
        script.id = id;
        script.src = url;
        script.defer = true;
        script.onload = callback;
        script.onerror = () => console.error(`❌ Failed to load script: ${url}`);

        document.body.appendChild(script);
    }

    injectScript("squareCraft-parentHtml", "https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml/parentHtml.js", () => {
        parentHtml = window.parentHtml;
        console.log("✅ parentHtml.js loaded!");
    });

    injectScript("squareCraft-parentHtmlTab", "https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml/parentHtmlTab.js", () => {
        parentHtmlTab = window.parentHtmlTab;
        console.log("✅ parentHtmlTab.js loaded!");
    });

    injectScript("squareCraft-attachEventListeners", "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js", () => {
        attachEventListeners = window.attachEventListeners;
        console.log("✅ attachEventListeners.js loaded!");
    });

    injectScript("squareCraft-observeDOMChanges", "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js", () => {
        observeDOMChanges = window.observeDOMChanges;
        console.log("✅ observeDOMChanges.js loaded!");
    });

    injectScript("squareCraft-getStyles", "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js", () => {
        getStyles = window.getStyles;
        console.log("✅ getStyles.js loaded!");
    });

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
                console.log("📌 Appending Widget to DOM...");
                document.body.appendChild(widgetContainer);
                console.log("✅ Widget appended! Checking in DOM:", document.getElementById("squarecraft-widget-container"));
            });
        } else {
            console.log("📌 Appending Widget to DOM immediately...");
            document.body.appendChild(widgetContainer);
            console.log("✅ Widget appended! Checking in DOM:", document.getElementById("squarecraft-widget-container"));
        }

        setTimeout(() => {
            if (!document.getElementById("squarecraft-widget-container")) {
                console.warn("⚠️ Widget was removed! Re-adding...");
                document.body.appendChild(widgetContainer);
            }
        }, 3000);
    }

    setTimeout(() => {
        console.log("🔍 Checking Widget in DOM (After Delay):", document.getElementById("squarecraft-widget-container"));
    }, 1000);

    setInterval(() => {
        if (!document.getElementById("squarecraft-widget-container")) {
            console.warn("⚠️ Widget removed by Squarespace! Re-adding...");
            createWidget();
        }
    }, 1000);

    setTimeout(() => {
        console.log("⚡ Ensuring SquareCraft initializes...");
        initializeSquareCraft();
    }, 1000);
})();
