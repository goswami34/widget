(async function squareCraft() {
  console.log("🚀 SquareCraft Loaded!");

  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

  const token = widgetScript?.dataset?.token;
  const userId = widgetScript.dataset?.uId; 
  const widgetId = widgetScript.dataset?.wId; 

  if (token) {
    console.log("🔑 Token received:", token);
    localStorage.setItem("squareCraft_auth_token", token);
    document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
}

if (userId) {
    console.log("👤 User ID received:", userId);
    localStorage.setItem("squareCraft_u_id", userId);
    document.cookie = `squareCraft_u_id=${userId}; path=.squarespace.com;`;

}

if (widgetId) {
    console.log("🛠️ Widget ID received:", widgetId);
    localStorage.setItem("squareCraft_w_id", widgetId);
    document.cookie = `squareCraft_w_id=${widgetId}; path=.squarespace.com;`;
}

  if (!userId || !widgetId) {
    console.warn("⚠️ Missing userId or widgetId. Plugin may not work correctly.");
    return;
  }

  let selectedElement = null;
  let appliedStyles = new Map(); // 🔄 Track applied styles

  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

  let pageId = getPageId();
  if (!pageId) console.warn("⚠️ No page ID found. Plugin may not work correctly.");

  /**
   * 🎨 Apply Styles to Elements (Ensures Persistence)
   */
  function applyStylesToElement(elementId, css) {
    if (!elementId || !css) return;

    // Prevent re-applying styles
    if (appliedStyles.has(elementId)) return;
    
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
    appliedStyles.set(elementId, css);
    console.log(`✅ Styles Persisted for ${elementId}`);
  }

  /**
   * 📡 Fetch and Apply Styles (On Load & After AJAX Navigation)
   */
  async function fetchModifications(retries = 3) {
    if (!pageId) return;

    try {
      console.log(`📄 Fetching modifications for Page ID: ${pageId} and User ID: ${userId}`);

      const response = await fetch(
        `https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📥 Applying stored modifications...", data);

      if (!data.modifications || data.modifications.length === 0) {
        console.warn("⚠️ No styles found for this page.");
        return;
      }

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

  /**
   * 💾 Save Styles (Persists After Reload)
   */
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
      modifications: [{ pageId, elements: [{ elementId, css }] }]
    };

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
          "pageId" : pageId,
          "userId" : userId,
          "widget-id" : widgetId
        },
        body: JSON.stringify(modificationData),
      });

      console.log("✅ Changes Saved Successfully!", await response.json());
    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }

  /**
   * 🎛️ Create Widget UI
   */
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

  /**
   * 🔄 Handle Squarespace AJAX Navigation
   */
  const observer = new MutationObserver(() => {
    console.log("🔄 Page updated via AJAX. Re-fetching styles...");
    pageId = getPageId();
    fetchModifications();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    fetchModifications();
  });
})();
