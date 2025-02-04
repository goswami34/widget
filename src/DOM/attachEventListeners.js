import { applyStyle } from "./applyStyle";
import { getPageAndElement } from "./getPageAndElement";

export function attachEventListeners() {
    let selectedElement = null;
    let lastHighlightedElement = null; 

    document.addEventListener("click", (event) => {
      let { pageId, elementId } = getPageAndElement(event.target);
      if (!pageId || !elementId) return;

      selectedElement = event.target;
      highlightElement(selectedElement);
      console.log(`🆔 Page ID: ${pageId}, Element ID: ${elementId}`);
    });

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