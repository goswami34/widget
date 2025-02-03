    import { attachEventListeners } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js";
    import { observeDOMChanges } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js";
    import { parentHtml } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js";
    import { fetchModifications } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js";
    import { token } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js";

    export async function parent() {
       console.log("html is " , parentHtml)


        function createWidget() {
            const widgetContainer = document.createElement("div");
            widgetContainer.id = "squarecraft-widget-container";
            widgetContainer.style.position = "fixed";
            widgetContainer.style.top = "100px";
            widgetContainer.style.left = "100px";
            widgetContainer.style.cursor = "grab";
            widgetContainer.style.zIndex = "9999";
            widgetContainer.style.display = "block";
            console.log("🔍 Checking Widget Container:", widgetContainer);

            console.log("🔹 Injecting Widget HTML:", parentHtml());

            widgetContainer.innerHTML = parentHtml();

            document.body.appendChild(widgetContainer);
        }


        function initializeSquareCraft() {
            token()
            createWidget();
            attachEventListeners();
            fetchModifications();
            observeDOMChanges();
        }


        document.addEventListener("DOMContentLoaded", initializeSquareCraft);

    }