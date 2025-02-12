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
  let fonts = [];
  let currentPage = 1;
  const fontsPerPage = 10;
  const API_KEY = "AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk"; // Replace with your Google API Key
  const FONT_API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

  function getPageId() {
    let pageElement = document.querySelector("article[data-page-sections]");
    return pageElement ? pageElement.getAttribute("data-page-sections") : null;
  }

  let pageId = getPageId();
  if (!pageId) console.warn("⚠️ No page ID found. Plugin may not work correctly.");

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
      await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
        },
        body: JSON.stringify(modificationData),
      });

      console.log("✅ Changes Saved Successfully!");
    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }

  async function fetchFonts() {
    try {
      const response = await fetch(FONT_API_URL);
      const data = await response.json();
      fonts = data.items;
      renderFontDropdown();
    } catch (error) {
      console.error("❌ Error fetching fonts:", error);
    }
  }

  function renderFontDropdown() {
    const dropdown = document.getElementById("fontDropdown");
    const paginationContainer = document.getElementById("paginationControls");

    dropdown.innerHTML = "";
    paginationContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * fontsPerPage;
    const endIndex = startIndex + fontsPerPage;
    const paginatedFonts = fonts.slice(startIndex, endIndex);

    paginatedFonts.forEach(font => {
      const option = document.createElement("div");
      option.classList.add("font-option");
      option.style.fontFamily = font.family;
      option.textContent = font.family;
      option.dataset.fontUrl = font.files.regular;

      option.addEventListener("click", () => applyFont(font.family, font.files.regular));
      dropdown.appendChild(option);
    });

    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "⬅️ Previous";
      prevBtn.onclick = () => {
        currentPage--;
        renderFontDropdown();
      };
      paginationContainer.appendChild(prevBtn);
    }

    if (endIndex < fonts.length) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next ➡️";
      nextBtn.onclick = () => {
        currentPage++;
        renderFontDropdown();
      };
      paginationContainer.appendChild(nextBtn);
    }
  }

  function applyFont(fontFamily, fontUrl) {
    if (!selectedElement) {
      console.warn("⚠️ No element selected.");
      return;
    }

    const fontFace = new FontFace(fontFamily, `url(${fontUrl})`);
    document.fonts.add(fontFace);
    fontFace.load().then(() => {
      selectedElement.style.fontFamily = fontFamily;
      console.log(`✅ Applied font: ${fontFamily}`);
      saveModifications(selectedElement.id, { "font-family": fontFamily });
    });
  }

  function createFontSelectorUI() {
    const fontSelector = document.createElement("div");
    fontSelector.id = "fontSelectorContainer";
    fontSelector.style.cssText = `
      position: fixed;
      top: 100px;
      left: 400px;
      width: 300px;
      background: white;
      border: 1px solid #ddd;
      padding: 10px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      z-index: 9999;
    `;

    fontSelector.innerHTML = `
      <h3 style="margin-bottom: 10px;">🎨 Choose Font</h3>
      <div id="fontDropdown" style="max-height: 200px; overflow-y: auto;"></div>
      <div id="paginationControls" style="margin-top: 10px;"></div>
    `;

    document.body.appendChild(fontSelector);
  }

  document.addEventListener("DOMContentLoaded", () => {
    createFontSelectorUI();
    fetchFonts();
    fetchModifications();
  });
})();
