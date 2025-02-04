(function injectPluginIcon() {
  console.log("🚀 Searching for Squarespace Admin Navbar...");

  function addPluginIcon() {
      const navbar = document.querySelector(".sqs-admin-navbar"); // Squarespace Admin Navbar

      if (!navbar) {
          console.warn("⚠️ Admin Navbar NOT found. Retrying in 1s...");
          setTimeout(addPluginIcon, 1000);
          return;
      }

      console.log("✅ Admin Navbar FOUND:", navbar);

      if (document.getElementById("my-plugin-icon")) {
          console.warn("⚠️ Plugin Icon already exists.");
          return;
      }

      const pluginButton = document.createElement("button");
      pluginButton.id = "my-plugin-icon";
      pluginButton.style.cssText = `
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 37px;
          height: 37px;
          margin: 0 3.5px;
          border-radius: 4px;
          transition: transform 0.2s ease-in-out;
      `;

      const iconImage = document.createElement("img");
      iconImage.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; 
      iconImage.alt = "Plugin Icon";
      iconImage.style.cssText = `
          width: 22px;
          height: 22px;
      `;

      pluginButton.appendChild(iconImage);

      pluginButton.onclick = () => {
          window.open("https://your-plugin-dashboard.com", "_blank");
      };

      navbar.appendChild(pluginButton);

      console.log("✅ Plugin Icon Added to Admin Navbar!");
  }

  document.addEventListener("DOMContentLoaded", addPluginIcon);
})();
