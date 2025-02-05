import { getStyles } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js";


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