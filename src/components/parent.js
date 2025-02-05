(async function parent() {
    console.log("🚀 Parent function initialized...");
    function initializeSquareCraft() {
        console.log("⚡ Initializing SquareCraft...");
        createWidget();
        attachEventListeners();
        getStyles();
        observeDOMChanges();
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

    parentHtml = (await loadModule("../../src/html/parentHtml.js"))?.parentHtml;
    attachEventListeners = (await loadModule("../../src/DOM/attachEventListeners.js"))?.attachEventListeners;
    observeDOMChanges = (await loadModule("../../src/DOM/observeDOMChanges.js"))?.observeDOMChanges;
    getStyles = (await loadModule("../../src/utils/getStyles.js"))?.getStyles;
    try {
        const { setToken } = await import("../../src/credentials/setToken.js");
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
        }
    }, 1000);

    setTimeout(() => {
        console.log("⚡ Ensuring SquareCraft initializes...");
        initializeSquareCraft();
    }, 1000);
})();