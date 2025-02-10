import { getPageAndElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/getPageAndElement.js";
import { saveModifications } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/saveModifications.js";
import { getStyles } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js";

let selectedElement = null;
let selectedPageId = null;
let selectedElementId = null;

export function attachEventListeners() {
    let lastHighlightedElement = null;

    document.addEventListener("click", (event) => {
        let { pageId, elementId } = getPageAndElement(event.target);
        if (!pageId || !elementId) {
            console.warn("⚠️ No valid page or block found.");
            return;
        }

        if (lastHighlightedElement) {
            lastHighlightedElement.style.outline = "";
            lastHighlightedElement.style.animation = "";
        }

        selectedElement = event.target;
        selectedPageId = pageId;
        selectedElementId = elementId;
        lastHighlightedElement = selectedElement;

        selectedElement.style.outline = "3px solid #FF5733";
        selectedElement.style.animation = "squarecraftGlow 1.5s infinite alternate";

        console.log(`✅ Selected Element → Page ID: ${selectedPageId}, Element ID: ${selectedElementId}`);
    });

    document.getElementById("font-size").addEventListener("input", () => applyStyle(selectedElement));
    document.getElementById("squareCraft-font-family").addEventListener("change", () => applyStyle(selectedElement));
    document.getElementById("squareCraft-font-varient").addEventListener("change", () => applyStyle(selectedElement));

    document.getElementById("squareCraftPublish").addEventListener("click", async () => {
        if (!selectedElement || !selectedPageId || !selectedElementId) {
            console.warn("⚠️ No element selected! Click an element first.");
            return;
        }

        let css = getCSSModifications(selectedElement);
        console.log("🎨 Publishing Changes:", { selectedPageId, selectedElementId, css });

        await saveModifications(selectedElement, css);
    });

    getStyles();

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes squarecraftGlow {
            0% { outline-color: rgba(255, 87, 51, 0.7); }
            100% { outline-color: rgba(255, 87, 51, 1); }
        }
    `;
    document.head.appendChild(style);
}
