(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
    console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
    return;
  }

  const token = widgetScript?.dataset?.token || localStorage.getItem("squareCraft_auth_token");
  const userId = widgetScript.dataset?.uId || localStorage.getItem("squareCraft_u_id");
  const widgetId = widgetScript.dataset?.wId || localStorage.getItem("squareCraft_w_id");

  if (token) localStorage.setItem("squareCraft_auth_token", token);
  if (userId) localStorage.setItem("squareCraft_u_id", userId);
  if (widgetId) localStorage.setItem("squareCraft_w_id", widgetId);

  let selectedElement = null;
  let appliedStyles = new Set();

  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

  let pageId = getPageId();
  if (!pageId) console.warn("⚠️ No page ID found. Plugin may not work correctly.");

  /**
   * 🎨 Apply Styles to an Element & Ensure Persistence
   */
  function applyStylesToElement(elementId, css) {
    if (!elementId || !css || appliedStyles.has(elementId)) return;

    let styleTag = document.getElementById(`style-${elementId}`);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = `style-${elementId}`;
      document.head.appendChild(styleTag);
    }

    let cssText = `#${elementId}, #${elementId} * { `;
    Object.keys(css).forEach(prop => {
      cssText += `${prop}: ${css[prop]} !important; `;
    });
    cssText += "}";

    if (css["border-radius"]) {
      cssText += `#${elementId} { overflow: hidden !important; }`;
    }

    styleTag.innerHTML = cssText;
    appliedStyles.add(elementId);
    console.log(`✅ Styles Persisted for ${elementId}`);
  }

  /**
   * 📡 Fetch & Apply Stored Modifications After Page Load
   */
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
      data.modifications.forEach(({ pageId: storedPageId, elements }) => {
        if (storedPageId === pageId) {
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
   * 💾 Save Modifications for Selected Element
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
      modifications: [{ pageId, elements: [{ elementId, css }] }],
    };

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
          "userId": userId,
          "pageId": pageId,
          "widget-id": widgetId,
        },
        body: JSON.stringify(modificationData),
      });

      console.log("✅ Changes Saved Successfully!", await response.json());
    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }

  /**
   * 🎛️ Create Floating Widget for Editing Styles
   */
  async function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
      <div style="width: 300px; background: #2c2c2c; padding: 20px; border-radius: 18px; color: white;">
        <h3>🎨 SquareCraft Widget</h3>

        <label>Font Family:</label>
        <div id="squareCraftFontFamilyContainer" style="height: 150px; overflow-y: auto; border: 1px solid #ccc; background: white;"></div>

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
    await loadGoogleFonts();
  }

  /**
   * 🎯 Load Google Fonts into Dropdown
   */
  async function loadGoogleFonts() {
    try {
      const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk");
      const data = await response.json();

      const fontContainer = document.getElementById("squareCraftFontFamilyContainer");
      data.items.forEach(font => {
        const fontOption = document.createElement("div");
        fontOption.style.fontFamily = font.family;
        fontOption.style.padding = "5px";
        fontOption.style.cursor = "pointer";
        fontOption.innerText = font.family;
        fontOption.onclick = async () => {
          if (selectedElement) {
            applyStylesToElement(selectedElement.id, { "font-family": font.family });
            await saveModifications(selectedElement.id, { "font-family": font.family });
          }
        };
        fontContainer.appendChild(fontOption);
      });

    } catch (error) {
      console.error("❌ Error loading Google Fonts:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    fetchModifications();
  });
})();
