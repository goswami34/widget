import { getPageAndElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/getPageAndElement.js";
import { applyStyle } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/applyStyle.js";

export function attachEventListeners() {
    let selectedElement = null;
    let lastHighlightedElement = null;

    document.addEventListener("click", (event) => {
        let { pageId, elementId } = getPageAndElement(event.target);
        if (!pageId || !elementId) return;

        if (lastHighlightedElement) {
            lastHighlightedElement.style.outline = "";
            lastHighlightedElement.style.animation = "";
        }

        selectedElement = event.target;
        lastHighlightedElement = selectedElement; 

        selectedElement.style.outline = "3px solid #FF5733";
        selectedElement.style.animation = "squarecraftGlow 1.5s infinite alternate";

        console.log(`🆔 Page ID: ${pageId}, Element ID: ${elementId}`);
    });

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes squarecraftGlow {
            0% { outline-color: rgba(255, 87, 51, 0.7); }
            100% { outline-color: rgba(255, 87, 51, 1); }
        }
    `;
    document.head.appendChild(style);

    document.getElementById("squareCraftFontSize").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBgColor").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBorderRadius").addEventListener("input", function () {
        document.getElementById("borderRadiusValue").textContent = this.value + "px";
        applyStyle();
    });

    document.getElementById("squareCraftPublish").addEventListener("click", async () => {
        if (!selectedElement) {
            console.warn("⚠️ No element selected for publishing.");
            return;
        }

        let { pageId, elementId } = getPageAndElement(selectedElement);
        if (!pageId || !elementId) {
            console.warn("⚠️ No valid page or block found for publishing.");
            return;
        }

        let css = getCSSModifications(selectedElement);
        console.log("🎨 Publishing Changes:", { pageId, elementId, css });

        await saveModifications(pageId, elementId, css);
    });
}
