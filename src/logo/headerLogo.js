setTimeout(() => {
    if (!window.location.href.includes("squarespace.com/config")) return;

    console.log("🔹 Injecting Custom Admin Logo...");
    const toolbar = document.querySelector('[data-test="header-nav"]'); 
    console.log("toolbar found...", toolbar);
    if (!toolbar) {
      console.warn("⚠️ Squarespace navbar not found.");
      return;
    }
 
    if (document.getElementById("customAdminLogo")) return;

    const logoWrapper = document.createElement("div");
    logoWrapper.id = "customAdminLogo";
    logoWrapper.style.display = "flex";
    logoWrapper.style.alignItems = "center";
    logoWrapper.style.marginLeft = "10px";
    const logo = document.createElement("img");
    logo.src = "https://i.ibb.co.com/LXKK6swV/Group-29.jpg"; 
    logo.alt = "Your Plugin";
    logo.style.width = "28px";
    logo.style.height = "28px";
    logo.style.borderRadius = "50%";
    logo.style.cursor = "pointer";

    logoWrapper.appendChild(logo);
    toolbar.appendChild(logoWrapper);

    console.log("✅ Custom Admin Logo Added to Squarespace Navbar");

  }, 1000);