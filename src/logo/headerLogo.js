(function headerLogo() {
  console.log("🚀 Searching for Squarespace Admin Navbar...");

  function addPluginIcon() {
      const navbar = document.querySelector(".sqs-admin-navbar");

      if (!navbar) {
          console.warn("⚠️ Admin Navbar NOT found. Retrying...");
          setTimeout(addPluginIcon, 1000);
          return;
      }

      console.log("✅ Admin Navbar FOUND:", navbar);

      if (document.getElementById("squareCraft-icon-button")) {
          console.warn("⚠️ Plugin Icon already exists.");
          return;
      }

      const pluginButton = document.createElement("button");
      pluginButton.id = "squareCraft-icon-button";
      pluginButton.className = "bar-open-plugin open-plugin";
      pluginButton.style.cssText = `
          width: 37px;
          height: 37px;
          margin: 0 3.5px;
          border-radius: 4px;
          background-color: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
          opacity: 0;
      `;

      const iconImage = document.createElement("img");
      iconImage.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; 
      iconImage.alt = "Plugin Icon";
      iconImage.style.cssText = "width: 22px; height: 22px;";

      pluginButton.onclick = () => {
          window.open("https://your-plugin-dashboard.com", "_blank");
      };

      pluginButton.appendChild(iconImage);
      navbar.appendChild(pluginButton);

      setTimeout(() => {
          pluginButton.style.opacity = "1";
      }, 300);

      console.log("✅ Plugin Icon Added to Admin Navbar!");
  }

  document.addEventListener("DOMContentLoaded", addPluginIcon);
})();
