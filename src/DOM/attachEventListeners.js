import { getPageAndElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/getPageAndElement.js";
import { saveModifications } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/saveModifications.js";
import { getStyles } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js";
import { applyStylesToElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/applyStylesToElement.js";

let selectedElement = null;
let selectedPageId = null;
let selectedElementId = null;
let lastHighlightedElement = null;

export function attachEventListeners() {
    console.log("🔗 attachEventListeners Initialized");

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

    document.getElementById("font-size").addEventListener("input", (event) => {
        if (!selectedElement) return;
        selectedElement.style.fontSize = event.target.value + "px";
    });

    document.getElementById("squareCraft-font-family").addEventListener("change", (event) => {
        if (!selectedElement) return;
        selectedElement.style.fontFamily = event.target.value;
    });
    document.getElementById("squareCraft-font-varient").addEventListener("change", (event) => {
        if (!selectedElement) return;
        selectedElement.style.fontVariant = event.target.value;
    });
    document.getElementById("squareCraftPublish").addEventListener("click", async () => {
        if (!selectedElement || !selectedPageId || !selectedElementId) {
            console.warn("⚠️ No element selected! Click an element first.");
            return;
        }

        let css = {
            fontSize: selectedElement.style.fontSize,
            fontFamily: selectedElement.style.fontFamily,
            fontVariant: selectedElement.style.fontVariant,
        };

        console.log("🎨 Publishing Changes:", { selectedPageId, selectedElementId, css });

        await saveModifications(selectedElement, css);

        applyStylesToElement(selectedElementId, css);
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
