

export async function saveModifications(targetElement, css = {}, fontFamily, fontVariant, fontSize) {
    const token = localStorage.getItem("squareCraft_auth_token");
    const userId = localStorage.getItem("squareCraft_u_id");
    const widgetId = localStorage.getItem("squareCraft_w_id");

    if (!token || !userId || !widgetId) {
        console.warn("⚠️ Missing authentication details. Cannot save modifications.");
        // return;
    }

    let page = targetElement.closest("article[data-page-sections]");
    let block = targetElement.closest('[id^="block-"]');

    if (!page || !block) {
        console.warn("⚠️ No valid page or block found.");
        // return;
    }

    let pageId = page.getAttribute("data-page-sections");
    let elementId = block.id;

    let blockType = "Unknown";
    if (block.classList.contains("sqs-block-html")) blockType = "Text";
    else if (block.classList.contains("sqs-block-image")) blockType = "Image";
    else if (block.classList.contains("sqs-block-button")) blockType = "Button";

    if (fontFamily) css["font-family"] = fontFamily;
    if (fontVariant) css["font-variant"] = fontVariant;
    if (fontSize) css["font-size"] = `${fontSize}px`;

    console.log(`💾 Saving modifications for Page ID: ${pageId}, Element ID: ${elementId}, Block Type: ${blockType}`, css);

    const modificationData = {
        userId,
        token,
        widgetId,
        modifications: [
            {
                pageId,
                elements: [
                    {
                        elementId,
                        css,
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "userId": userId,
                "widget-id": widgetId,
                "pageId": pageId
            },
            body: JSON.stringify(modificationData),
        });

      

        const data = await response.json();
        console.log("✅ Changes Saved Successfully!", data);

    } catch (error) {
        console.error("❌ Error saving modifications:", error);
    }
}
