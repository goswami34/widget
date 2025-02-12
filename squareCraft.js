(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

  const token = widgetScript.dataset?.token || null;
  const userId = widgetScript.dataset?.uId || null;
  const widgetId = widgetScript.dataset?.wId || null;

  if (token) localStorage.setItem("squareCraft_auth_token", token);
  if (userId) localStorage.setItem("squareCraft_u_id", userId);
  if (widgetId) localStorage.setItem("squareCraft_w_id", widgetId);

  let selectedElement = null;
  let appliedStyles = new Set(); // 🛠️ To track applied styles & prevent duplicate applications

  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

  let pageId = getPageId();
  if (!pageId) console.warn("⚠️ No page ID found. Plugin may not work correctly.");

  function applyStylesToElement(elementId, css) {
    if (!elementId || !css || appliedStyles.has(elementId)) return; // ✅ Prevent duplicate styling

    let styleTag = document.getElementById(`style-${elementId}`);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = `style-${elementId}`;
      document.head.appendChild(styleTag);
    }

    let cssText = `#${elementId} { `;
    Object.keys(css).forEach(prop => {
      cssText += `${prop}: ${css[prop]} !important; `;
    });
    cssText += "}";

    styleTag.innerHTML = cssText;
    appliedStyles.add(elementId); // ✅ Mark as styled
    console.log(`✅ Styles Persisted for ${elementId}`);
}



async function fetchModifications(retries = 3) {
  if (!pageId) return;

  try {
      console.log(`📄 Fetching saved modifications for Page ID: ${pageId}`);

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
      if (!data.modifications || data.modifications.length === 0) {
          console.warn("⚠️ No styles found for this page.");
          return;
      }

      console.log("📥 Applying stored modifications...", data);
      data.modifications.forEach(({ page_id, elements }) => {
          if (page_id === pageId) {
              elements.forEach(({ elementId, css }) => {
                  applyStylesToElement(elementId, css);
              });
          }
      });

  } catch (error) {
      console.error("❌ Error fetching modifications:", error);
      if (retries > 0) {
          console.log(`🔄 Retrying fetch... (${retries} left)`);
          setTimeout(() => fetchModifications(retries - 1), 2000);
      }
  }
}


async function saveModifications(elementId, css) {
  if (!pageId || !elementId || !css) {
      console.warn("⚠️ Missing required data to save modifications.");
      return;
  }

  applyStylesToElement(elementId, css);
  console.log("📡 Saving modifications for:", { pageId, elementId, css });

  const modificationData = {
      userId,
      token,
      widgetId,
      modifications: [{ pageId, elements: [{ elementId, css }] }],
  };

  try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
              "userId" : userId,
              "widget-id" : widgetId,
              "pageId" : pageId,
          },
          body: JSON.stringify(modificationData),
      });

      console.log("✅ Changes Saved Successfully!", await response.json());
  } catch (error) {
      console.error("❌ Error saving modifications:", error);
  }
}


  let debounceTimer;
  const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
          console.log("🔄 Page updated via AJAX. Re-fetching styles...");
          pageId = getPageId();
          appliedStyles.clear(); // 🔄 Reset applied styles tracking
          fetchModifications();
      }, 500); // ✅ Prevent excessive calls
  });
  observer.observe(document.body, { childList: true, subtree: true });
  

 
  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
      <div style="width: 300px; background: #2c2c2c; padding: 20px; border-radius: 18px; color: white;">
        <h3>🎨 SquareCraft Widget</h3>
        <label>Font Size:</label>
        <input type="number" id="squareCraftFontSize" value="16" min="10" max="50" style="width: 100%;">
        <label>Background Color:</label>
        <input type="color" id="squareCraftBgColor" value="#ffffff" style="width: 100%;">
        <label>Border Radius:</label>
        <input type="range" id="squareCraftBorderRadius" min="0" max="50" value="0">
        <p>Border Radius: <span id="borderRadiusValue">0px</span></p>
        <button id="squareCraftPublish" style="width: 100%; padding: 10px; background: #EF7C2F; color: white;">
          Publish Changes
        </button>
      </div>
    `;

    document.body.appendChild(widgetContainer);

    /** ✅ Attach Event Listener for Saving Changes */
    document.getElementById("squareCraftPublish").addEventListener("click", async () => {
        if (!selectedElement) {
            console.warn("⚠️ No element selected.");
            return;
        }

        let css = {
            "font-size": document.getElementById("squareCraftFontSize").value + "px",
            "background-color": document.getElementById("squareCraftBgColor").value,
            "border-radius": document.getElementById("squareCraftBorderRadius").value + "px"
        };

        console.log(`📡 Saving CSS for Element: ${selectedElement.id}`, css);
        await saveModifications(selectedElement.id, css);
    });
}


  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    fetchModifications();
  });
})();
