(async function SquareCraft() {
  const PLUGIN_ICON_ID = "squareCraft-icon-button";
  const PLUGIN_DASHBOARD_URL = "https://your-plugin-dashboard.com"; 
  const TARGET_SELECTOR = '[data-guidance-engine="guidance-engine-device-view-button-container"]';
  const LOCAL_STORAGE_KEY = "plugin_icon_url";

  async function fetchIconUrl() {
      let iconUrl = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!iconUrl) {
          iconUrl = "https://i.ibb.co/LXKK6swV/Group-29.jpg";
          localStorage.setItem(LOCAL_STORAGE_KEY, iconUrl);
          console.log("🌍 Icon URL saved to localStorage:", iconUrl);
      } else {
          console.log("🔄 Loaded Icon URL from localStorage:", iconUrl);
      }

      return iconUrl;
  }

  async function addPluginIcon() {
      const targetList = document.querySelector(TARGET_SELECTOR)?.closest("ul");

      if (!targetList) {
          console.warn("⚠️ Target Admin Toolbar NOT found. Retrying...");
          setTimeout(addPluginIcon, 1000); 
          return;
      }

      console.log("✅ Target Admin Toolbar FOUND:", targetList);

      if (document.getElementById(PLUGIN_ICON_ID)) {
          console.warn("⚠️ Plugin Icon already exists.");
          return;
      }

      const PLUGIN_ICON_URL = await fetchIconUrl();

      const listItem = document.createElement("li");
      listItem.className = "css-custom-plugin"; 

      const buttonWrapper = document.createElement("div");
      buttonWrapper.className = "css-1j096s0"; 

      const pluginButton = document.createElement("button");
      pluginButton.id = PLUGIN_ICON_ID;
      pluginButton.className = "css-110yp2v"; 
      pluginButton.setAttribute("aria-label", "My Plugin");
      pluginButton.setAttribute("data-test", "my-plugin-button");

      pluginButton.style.cssText = `
          width: 37px;
          height: 37px;
          border-radius: 4px;
          background-color: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
          opacity: 0;
      `;

      const iconImage = document.createElement("img");
      iconImage.src = PLUGIN_ICON_URL;
      iconImage.alt = "Plugin Icon";
      iconImage.style.cssText = "width: 22px; height: 22px;";

      pluginButton.onmouseenter = () => {
          pluginButton.style.transform = "scale(1.1)";
      };
      pluginButton.onmouseleave = () => {
          pluginButton.style.transform = "scale(1)";
      };

      pluginButton.onclick = () => {
          window.open(PLUGIN_DASHBOARD_URL, "_blank");
      };

      pluginButton.appendChild(iconImage);
      buttonWrapper.appendChild(pluginButton);
      listItem.appendChild(buttonWrapper);
      targetList.insertBefore(listItem, targetList.firstChild);

      requestAnimationFrame(() => {
          pluginButton.style.opacity = "1";
      });

      console.log("✅ Plugin Icon Injected Successfully!");
  }

  const observer = new MutationObserver(() => {
      if (!document.getElementById(PLUGIN_ICON_ID)) {
          console.log("🔄 Admin Navbar changed, reinjecting icon...");
          addPluginIcon();
      }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("load", () => {
      console.log("🚀 Page fully loaded. Initializing Plugin...");
      setTimeout(addPluginIcon, 2000); 
  });
})();
