
import { applyStylesToElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/applyStylesToElement.js";

export async function saveModifications(pageId, elementId, css) {
    if (!pageId || !elementId || !css) return;

    applyStylesToElement(elementId, css);
    console.log("Saving modifications for Page ID and Element ID:", pageId, elementId);

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`
        },
        body: JSON.stringify({ userId: "679b4e3aee8e48bf97172661", modifications: [{ pageId, elements: [{ elementId, css }] }] } ),
      });

      console.log("✅ Changes Saved Successfully!", response);

    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }


  
  