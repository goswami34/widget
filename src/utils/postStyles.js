import { getPageAndElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/getPageAndElement.js";
import { saveModifications } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/saveModifications.js";

export function attachEventListeners() {
    let selectedElement = null;
    let selectedPageId = null;
    let selectedElementId = null;

    // 🔥 Click Event: Store selected element details
    document.addEventListener("click", (event) => {
        let { pageId, elementId } = getPageAndElement(event.target);

        if (!pageId || !elementId) {
            console.warn("⚠️ No valid page or block found.");
            return;
        }

        // ✅ Store the selected element data
        selectedElement = event.target;
        selectedPageId = pageId;
        selectedElementId = elementId;

        console.log(`✅ Selected → Page ID: ${selectedPageId}, Element ID: ${selectedElementId}`);

        // Apply highlight effect
        selectedElement.style.outline = "3px solid #FF5733";
        selectedElement.style.animation = "squarecraftGlow 1.5s infinite alternate";
    });

    // 🔥 Apply Styling (Font, Size, Variant)
    document.getElementById("squareCraft-font-family").addEventListener("change", (event) => {
        if (!selectedElement) {
            console.warn("⚠️ No element selected! Click an element first.");
            return;
        }
        selectedElement.style.fontFamily = event.target.value;
    });

    document.getElementById("font-size").addEventListener("input", (event) => {
        if (!selectedElement) {
            console.warn("⚠️ No element selected! Click an element first.");
            return;
        }
        selectedElement.style.fontSize = event.target.value + "px";
    });

    document.getElementById("squareCraft-font-varient").addEventListener("change", (event) => {
        if (!selectedElement) {
            console.warn("⚠️ No element selected! Click an element first.");
            return;
        }
        selectedElement.style.fontVariant = event.target.value;
    });

    // 🔥 Publish Changes (Save to Backend)
    document.getElementById("squareCraftPublish").addEventListener("click", async () => {
        if (!selectedElement || !selectedPageId || !selectedElementId) {
            console.warn("⚠️ No element selected! Click an element first.");
            return;
        }

        let css = {
            fontFamily: selectedElement.style.fontFamily,
            fontSize: selectedElement.style.fontSize,
            fontVariant: selectedElement.style.fontVariant,
        };

        console.log("🎨 Publishing Changes:", { selectedPageId, selectedElementId, css });

        await saveModifications(selectedElement, css);
    });
}
