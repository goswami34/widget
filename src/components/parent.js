(async function parent() {
    function injectStylesheet() {
        if (document.getElementById("squareCraft-styles")) {
            console.warn("⚠️ SquareCraft styles already exist.");
            return;
        }

        const link = document.createElement("link");
        link.id = "squareCraft-styles";
        link.rel = "stylesheet";
        link.href = "https://fatin-webefo.github.io/squareCraft-Plugin/src/styles/parent.css"; // Change to your actual CDN or file path
        link.type = "text/css";
        link.onload = () => console.log("✅ SquareCraft styles loaded successfully!");
        link.onerror = () => console.error("❌ Failed to load SquareCraft styles.");

        document.head.appendChild(link);
    }
    injectStylesheet();


   function parentTabFunction() {
    if (document.getElementById("squareCraft-script-tab")) {
        console.warn("⚠️ SquareCraft script already exists.");
        return;
    }

    const script = document.createElement("script");
    script.id = "squareCraft-script-tab";
    script.src = "https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml/parentHtmlTab.js"; // Update URL if needed
    script.defer = true;

    script.onload = () => console.log("✅ parentHtmlTab.js loaded successfully!");
    script.onerror = (e) => console.error("❌ Failed to load parentHtmlTab.js", e);

    document.body.appendChild(script);
}







    console.log("🚀 Parent function initialized...");
    function initializeSquareCraft() {
        console.log("⚡ Initializing SquareCraft...");
        createWidget();
        attachEventListeners();
        getStyles();
        observeDOMChanges();
        parentTabFunction();
    }

    let parentHtml, attachEventListeners, observeDOMChanges, getStyles, token;

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

    parentHtml = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml/parentHtml.js"))?.parentHtml;
    attachEventListeners = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js"))?.attachEventListeners;
    observeDOMChanges = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js"))?.observeDOMChanges;
    getStyles = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js"))?.getStyles;
    try {
        const { setToken } = await import("https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js");
        setToken();
        console.log("✅ setToken function executed successfully.");
    } catch (error) {
        console.error("❌ Failed to import setToken:", error);
    }

  
   if (!attachEventListeners){
        console.error("�� attachEventListeners function not found! Check if the script loaded properly.");
       
    }

   else if(!observeDOMChanges){
    console.error("�� observeDOMChanges function not found! Check if the script loaded properly.");
 
   }

    else if (!parentHtml) {
        console.error("❌ parentHtml function not found! Check if the script loaded properly.");
    }
    else if (!getStyles) {
        console.error("�� getStyles function not found! Check if the script loaded properly.");
    }
   

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
            parentTabFunction();
        }
    }, 1000);

    setTimeout(() => {
        console.log("⚡ Ensuring SquareCraft initializes...");
        initializeSquareCraft();
        parentTabFunction();
    }, 1000);
})();