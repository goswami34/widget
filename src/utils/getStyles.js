import { applyStylesToElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/applyStylesToElement.js";
import { isEditingMode } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/isEditingMode.js";

export async function getStyles() {
  const token = localStorage.getItem("squareCraft_auth_token")
  const squareCraft_w_id = localStorage.getItem("squareCraft_w_id")

 

  try {
    const userId = squareCraft_w_id;

    if (isEditingMode()) {
      console.log("🛠 Squarespace is in Edit Mode - Waiting for changes...");
      setTimeout(getStyles, 3000);
      return;
    }

    let pageElement = document.querySelector("article[data-page-sections]");
    let pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;

    if (!pageId) {
      console.warn("⚠️ No valid page ID found. Retrying in 2s...");
      setTimeout(getStyles, 2000);
      return;
    }

    console.log(`📄 Fetching modifications for Page ID: ${pageId}`);

    const response = await fetch(
      `https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
          "pageId": pageId
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log("📥 Fetched Modifications:", response);

    data.modifications.forEach(({ page_id, elements }) => {
      if (page_id === pageId) {
        elements.forEach(({ elementId, css }) => {
          console.log(`🎨 Applying styles to ${elementId}`);
          applyStylesToElement(elementId, css);
        });
      }
    });

  } catch (error) {
    console.error("❌ Error fetching modifications:", error);
  }
}