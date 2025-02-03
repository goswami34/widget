import { attachEventListeners } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js";
import { observeDOMChanges } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js";
import { parentHtml } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js";
import { fetchModifications } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js";
import { token } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js";

export async function parent() {
    function initializeSquareCraft() {
        token()
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
        toggleWidgetVisibility();
    }
    
    function shouldShowWidget() {
        const url = window.location.href;
        const pathname = window.location.pathname;
        return url.includes("#") || pathname !== "/";
    }

    function toggleWidgetVisibility() {
        const widget = document.getElementById("squarecraft-widget-container");
        if (!widget) return;
        widget.style.display = shouldShowWidget() ? "block" : "none";
    }


    setTimeout(() => {
        console.log("🔗 Full URL:", window.location.href);
    }, 1000);

    function createWidget() {
        const widgetContainer = document.createElement("div");
        widgetContainer.id = "squarecraft-widget-container";
        widgetContainer.style.position = "fixed";
        widgetContainer.style.top = "100px";
        widgetContainer.style.left = "100px";
        widgetContainer.style.cursor = "grab";
        widgetContainer.style.zIndex = "9999";

        widgetContainer.innerHTML = parentHtml();

        document.body.appendChild(widgetContainer);
    }


 


    document.addEventListener("DOMContentLoaded", initializeSquareCraft);
    window.addEventListener("hashchange", toggleWidgetVisibility);
    window.addEventListener("popstate", toggleWidgetVisibility);

}