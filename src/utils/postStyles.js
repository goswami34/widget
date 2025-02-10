import { applyStylesToElement } from "https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/applyStylesToElement.js";

export async function saveModifications(pageId, elementId, css) {
    const token = localStorage.getItem("squareCraft_auth_token");
    const userId = localStorage.getItem("squareCraft_u_id");
    const widgetId = localStorage.getItem("squareCraft_w_id");

    if (!pageId || !elementId || !css || !token || !userId || !widgetId) {
        console.warn("⚠️ Missing required parameters. Cannot save modifications.");
        return;
    }

    applyStylesToElement(elementId, css);
    console.log(`💾 Saving modifications for Page ID: ${pageId}, Element ID: ${elementId}`);

    const modificationData = {
        userId,
        token,
        widgetId,
        modifications: [{
            pageId,
            elements: [{ elementId, css }]
        }]
    };

    try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "userId": userId,
                "widget-id": widgetId
            },
            body: JSON.stringify(modificationData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ Changes Saved Successfully!", data);
        } else {
            throw new Error(`❌ Server Error: ${response.status} - ${response.statusText}`);
        }

    } catch (error) {
        console.error("❌ Error saving modifications:", error);
    }
}
