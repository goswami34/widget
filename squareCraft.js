(async function fontFamilyDropdownInteract() {
  const widgetScript = document.getElementById("squarecraft-script");
  const token = widgetScript?.dataset?.token;
  const userId = widgetScript.dataset?.uId;
  const widgetId = widgetScript.dataset?.wId;

  if (!token || !userId || !widgetId) {
    console.error("❌ Missing authentication data!");
    return;
  }
  let selectedElement = null;
  console.log("🔑 Authenticated:", { token, userId, widgetId });

  localStorage.setItem("squareCraft_auth_token", token);
  localStorage.setItem("squareCraft_u_id", userId);
  localStorage.setItem("squareCraft_w_id", widgetId);

  document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
  document.cookie = `squareCraft_u_id=${userId}; path=.squarespace.com;`;
  document.cookie = `squareCraft_w_id=${widgetId}; path=.squarespace.com;`;

  /**
   * 🎨 Apply Styles Dynamically & Ensure Persistence
   */
  function applyStylesToElement(elementId, css) {
    console.log(`🔍 Searching for element: ${elementId}`);

    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`⚠️ Element ${elementId} not found.`);
      return;
    }

    console.log(`🎨 Applying styles to ${elementId}:`, css);

    Object.keys(css).forEach((prop) => {
      element.style.setProperty(prop, css[prop], "important");
    });

    console.log("✅ Styles Applied Successfully!");
  }

  /**
   * 📡 Fetch Modifications & Apply After Page Reload
   */
  async function fetchModifications() {
    try {
      let pageElement = document.querySelector("article[data-page-sections]");
      let pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;

      if (!pageId) {
        console.warn("⚠️ No valid page ID found. Retrying...");
        setTimeout(fetchModifications, 2000);
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
      console.log("📥 Fetched Modifications:", data);

      if (!data.modifications || data.modifications.length === 0) {
        console.warn("⚠️ No styles found for this page.");
        return;
      }

      data.modifications.forEach(({ page_id, elements }) => {
        if (page_id === pageId) {
          elements.forEach(({ elementId, css }) => {
            console.log(`🎨 Applying styles to ${elementId}`, css);
            applyStylesToElement(elementId, css);
          });
        } else {
          console.warn(`❌ No matching Page ID found. Expected: ${pageId}, Got: ${page_id}`);
        }
      });

    } catch (error) {
      console.error("❌ Error fetching modifications:", error);
    }
  }

  /**
   * 💾 Save Modifications to Database
   */
  async function saveModifications(pageId, elementId, css) {
    if (!pageId || !elementId || !css) return;

    applyStylesToElement(elementId, css);

    console.log("📡 Saving modifications for:", { pageId, elementId, css });

    const modificationData = {
      userId,
      token,
      widgetId,
      modifications: [
        {
          pageId,
          elements: [{ elementId, css }]
        }
      ]
    };

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
           "pageId": pageId,
           "userId": userId,
           "widget-id": widgetId
        },
        body: JSON.stringify(modificationData),
      });

      console.log("✅ Changes Saved Successfully!", await response.json());
    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }

  /**
   * 🎛️ Widget for Editing Elements
   */
  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.cursor = "grab";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
      <div style="width: 300px; background: #2c2c2c; padding: 20px; border-radius: 18px; border: 1.5px solid #3D3D3D; color: white;">
        <h3>🎨 SquareCraft Widget</h3>

        <label>Font Size:</label>
        <input type="number" id="squareCraftFontSize" value="16" min="10" max="50" style="width: 100%;">

        <label>Background Color:</label>
        <input type="color" id="squareCraftBgColor" value="#ffffff" style="width: 100%;">

        <label>Border Radius:</label>
        <input type="range" id="squareCraftBorderRadius" min="0" max="50" value="0">
        <p>Border Radius: <span id="borderRadiusValue">0px</span></p>

        <button id="squareCraftPublish" style="width: 100%; padding: 10px; background: #EF7C2F; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Publish Changes
        </button>
      </div>
    `;

    document.body.appendChild(widgetContainer);
  }

  /**
   * 🎯 Attach Event Listeners for Real-time Changes
   */
  function applyStyle() {
    if (!selectedElement) return;
  
    const fontSize = document.getElementById("squareCraftFontSize").value + "px";
    selectedElement.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, div, li, strong, em").forEach(el => {
      el.style.fontSize = fontSize;
    });
  
    const bgColor = document.getElementById("squareCraftBgColor").value;
    selectedElement.style.backgroundColor = bgColor;
  
    const borderRadius = document.getElementById("squareCraftBorderRadius").value + "px";
    selectedElement.style.borderRadius = borderRadius;
    selectedElement.querySelectorAll("img").forEach(img => {
      img.style.borderRadius = borderRadius;
    });
  }
  
  function attachEventListeners() {
    let selectedElement = null;

    document.addEventListener("click", (event) => {
      let page = event.target.closest("article[data-page-sections]");
      let block = event.target.closest('[id^="block-"]');

      if (!page || !block) return;

      selectedElement = block;
      console.log(`🆔 Page ID: ${page.getAttribute("data-page-sections")}, Element ID: ${block.id}`);
    });

    document.getElementById("squareCraftFontSize").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBgColor").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBorderRadius").addEventListener("input", function () {
      document.getElementById("borderRadiusValue").textContent = this.value + "px";
      applyStyle();
    });

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

      await saveModifications(page.getAttribute("data-page-sections"), selectedElement.id, css);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    attachEventListeners();
    fetchModifications();
  });
})();
