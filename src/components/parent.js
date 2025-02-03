import { attachEventListeners } from "../DOM/attachEventListeners";
import { observeDOMChanges } from "../DOM/observeDOMChanges";
import { parentHtml } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js";
import { fetchModifications } from "../utils/getStyles";

export async function parent() {
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
        document.body.appendChild(widgetContainer);
    }


    function initializeSquareCraft() {
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
        toggleWidgetVisibility();
    }


    document.addEventListener("DOMContentLoaded", initializeSquareCraft);
    window.addEventListener("hashchange", toggleWidgetVisibility);
    window.addEventListener("popstate", toggleWidgetVisibility);

}