
  (function headerLogo() {
      console.log("🚀 Searching for Squarespace Admin Header...");

      function addPluginIcon() {
          const navbar = document.querySelector(".sqs-admin-navbar");

          if (!navbar) {
              console.warn("⚠️ Admin Navbar NOT found. Retrying in 1s...");
              setTimeout(addPluginIcon, 1000);
              return;
          } else {
              console.log("✅ Admin Navbar FOUND:", navbar);
          }

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
              gap: 8px;
              padding: 5px;
          `;

          const iconImage = document.createElement("img");
          iconImage.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; // Your Image URL
          iconImage.alt = "Plugin Icon";
          iconImage.style.cssText = `
              width: 24px;
              height: 24px;
          `;

          const buttonText = document.createElement("span");
          buttonText.innerText = "My Plugin";
          buttonText.style.cssText = `
              color: white;
              font-size: 14px;
          `;

          pluginButton.appendChild(iconImage);
          pluginButton.appendChild(buttonText);
          pluginButton.onclick = () => window.open("https://your-plugin-dashboard.com", "_blank");

          navbar.appendChild(pluginButton);

          console.log("✅ Plugin Icon with Image Added to Admin Navbar!");
      }

      document.addEventListener("DOMContentLoaded", addPluginIcon);
  })();
