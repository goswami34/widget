

export async function getStyles() {
  const token = localStorage.getItem(squareCraft_auth_token)
  function isEditingMode() {
    return document.body.classList.contains("sqs-editing");
  }

  try {
    const userId = "679b4e3aee8e48bf97172661";

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