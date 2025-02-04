(async function SquareCraft() {
  const PLUGIN_ICON_ID = "squareCraft-icon-button";
  const PLUGIN_ICON_URL = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; // Replace with your CDN link
  const PLUGIN_DASHBOARD_URL = "https://your-plugin-dashboard.com"; // Replace with actual dashboard URL
  const TARGET_SELECTOR = '[data-guidance-engine="guidance-engine-device-view-button-container"]';

  function addPluginIcon() {
      const targetList = document.querySelector(TARGET_SELECTOR)?.closest("ul");

      if (!targetList) {
          console.warn("⚠️ Target Admin Toolbar NOT found. Retrying...");
          setTimeout(addPluginIcon, 1000); // Retry after 1 second
          return;
      }

      console.log("✅ Target Admin Toolbar FOUND:", targetList);

      // Prevent duplicates
      if (document.getElementById(PLUGIN_ICON_ID)) {
          console.warn("⚠️ Plugin Icon already exists.");
          return;
      }

      // ✅ Create the list item wrapper
      const listItem = document.createElement("li");
      listItem.className = "css-custom-plugin"; // Custom class for reference

      // ✅ Create the button container
      const buttonWrapper = document.createElement("div");
      buttonWrapper.className = "css-1j096s0"; // Mimics Squarespace button wrapper

      const pluginButton = document.createElement("button");
      pluginButton.id = PLUGIN_ICON_ID;
      pluginButton.className = "css-110yp2v"; // Mimics Squarespace button style
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

      // ✅ Create Image Icon
      const iconImage = document.createElement("img");
      iconImage.src = PLUGIN_ICON_URL;
      iconImage.alt = "Plugin Icon";
      iconImage.style.cssText = "width: 22px; height: 22px;";

      // 🖱️ Hover Effect
      pluginButton.onmouseenter = () => {
          pluginButton.style.transform = "scale(1.1)";
      };
      pluginButton.onmouseleave = () => {
          pluginButton.style.transform = "scale(1)";
      };

      // 🔗 Click to Open Plugin Dashboard
      pluginButton.onclick = () => {
          window.open(PLUGIN_DASHBOARD_URL, "_blank");
      };

      // ✅ Assemble Components
      pluginButton.appendChild(iconImage);
      buttonWrapper.appendChild(pluginButton);
      listItem.appendChild(buttonWrapper);

      // ✅ Insert at the start of the toolbar
      targetList.insertBefore(listItem, targetList.firstChild);

      // ✅ Smooth Fade-in
      requestAnimationFrame(() => {
          pluginButton.style.opacity = "1";
      });

      console.log("✅ Plugin Icon Injected Successfully!");
  }

  // 🕵️ Detect Admin Navbar Changes
  const observer = new MutationObserver(() => {
      if (!document.getElementById(PLUGIN_ICON_ID)) {
          console.log("🔄 Admin Navbar changed, reinjecting icon...");
          addPluginIcon();
      }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // ✅ Initial Call
  setTimeout(addPluginIcon, 2000);
})();
