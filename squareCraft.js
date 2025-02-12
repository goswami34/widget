(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  const token = widgetScript?.dataset?.token;
  const userId = widgetScript?.dataset?.uId;
  const widgetId = widgetScript?.dataset?.wId;
  let selectedElement = null; // Track currently selected element

  // Get pageId once (global for the entire page)
  const pageElement = document.querySelector("article[data-page-sections]");
  const pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;

  if (!pageId) {
    console.warn("⚠️ No page ID found. The plugin may not work correctly.");
  } else {
    console.log(`📄 Page ID detected: ${pageId}`);
  }

  // Store credentials if available
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

  /**
   * 🎨 Apply Styles to Selected Element
   */
  function applyStylesToElement(elementId, css) {
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
   * 📡 Fetch and Apply Modifications on Page Load
   */
  async function fetchModifications() {
    if (!pageId) return;

    try {
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
            applyStylesToElement(elementId, css);
          });
        }
      });

    } catch (error) {
      console.error("❌ Error fetching modifications:", error);
    }
  }

  /**
   * 💾 Save Modifications for the Selected Element
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
          "Page-Id": pageId,
          "User-Id": userId,
          "Widget-Id": widgetId
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
  }

  /**
   * 🎯 Handle Element Selection & Style Updates
   */
  function attachEventListeners() {
    document.body.addEventListener("click", (event) => {
      let block = event.target.closest('[id^="block-"]');
      if (!block) return;

      if (selectedElement) selectedElement.style.outline = "";
      selectedElement = block;
      selectedElement.style.outline = "2px dashed #EF7C2F";

      console.log(`✅ Selected Element: ${selectedElement.id}`);
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

      await saveModifications(selectedElement.id, css);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createWidget();
    attachEventListeners();
    fetchModifications();
  });
})();
