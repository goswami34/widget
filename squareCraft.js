(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  const token = widgetScript?.dataset?.token;
  const userId = widgetScript?.dataset?.uId; 
  const widgetId = widgetScript?.dataset?.wId; 

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

  function injectCSS(elementId, css) {
    let styleTag = document.getElementById(`custom-style-${elementId}`);
    
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = `custom-style-${elementId}`;
      document.head.appendChild(styleTag);
    }

    let cssString = Object.keys(css).map(prop => {
      return `#${elementId} { ${prop}: ${css[prop]} !important; }`;
    }).join("\n");

    styleTag.innerHTML = cssString;
  }

  function applyStylesToElement(elementId, css, retries = 5) {
    console.log(`🔍 Searching for element: ${elementId}`);

    const element = document.getElementById(elementId) || document.querySelector(`[id='${elementId}']`);

    if (!element) {
      if (retries === 0) {
        console.warn(`⚠️ Element ${elementId} not found after multiple retries.`);
        return;
      }
      console.warn(`⚠️ Element ${elementId} not found. Retrying in 1s... (${retries} retries left)`);
      setTimeout(() => applyStylesToElement(elementId, css, retries - 1), 1000);
      return;
    }

    console.log(`🎨 Applying styles to ${elementId}:`, css);

    Object.keys(css).forEach((prop) => {
      element.style.setProperty(prop, css[prop], "important");
    });

    injectCSS(elementId, css);

    console.log("✅ Styles Applied:", element.style);
  }

  async function fetchModifications() {
    try {
      let pageElement = document.querySelector("article[data-page-sections]");
      let pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;

      console.log("fetchModifications called", pageElement, pageId);

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

  function observeDOMChanges() {
    const observer = new MutationObserver(() => {
      console.log("🔄 DOM Updated - Checking for changes...");
      fetchModifications();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchModifications();
    observeDOMChanges();
  });

})();
