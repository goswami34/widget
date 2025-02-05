import { getStyles } from "../../src/utils/getStyles.js";
import { isEditingMode } from "../../src/DOM/isEditingMode.js";


export function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    console.log("🔄 DOM Updated - Checking for changes...");

    if (isEditingMode()) {
      console.log("🛠 Detected Edit Mode - Rechecking modifications...");
      setTimeout(getStyles, 3000);
    } else {
      getStyles();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}