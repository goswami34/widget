export async function headerLogo() {
       
    const targetList = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]')?.closest('ul');

    if (!targetList) {
        console.warn("⚠️ Target Admin Toolbar NOT found. Retrying...");
        setTimeout(headerLogo, 1000);
        return;
    }

    console.log("✅ Target Admin Toolbar FOUND:", targetList);

    if (document.getElementById("squareCraft-icon-button")) {
        console.warn("⚠️ Plugin Icon already exists.");
        return;
    }

    const listItem = document.createElement("li");
    listItem.className = "css-custom-plugin";

    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "css-1j096s0";

    const pluginButton = document.createElement("button");
    pluginButton.id = "squareCraft-icon-button";
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
    iconImage.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg";
    iconImage.alt = "Plugin Icon";
    iconImage.style.cssText = "width: 22px; height: 22px;";

    pluginButton.onmouseenter = () => {
        pluginButton.style.transform = "scale(1.1)";
    };
    pluginButton.onmouseleave = () => {
        pluginButton.style.transform = "scale(1)";
    };

    pluginButton.onclick = () => {
        window.open("https://your-plugin-dashboard.com", "_blank");
    };

    pluginButton.appendChild(iconImage);
    buttonWrapper.appendChild(pluginButton);
    listItem.appendChild(buttonWrapper);

    targetList.insertBefore(listItem, targetList.firstChild);

    requestAnimationFrame(() => {
        pluginButton.style.opacity = "1";
    });

    console.log("✅ Plugin Icon Injected Successfully!", targetList.firstChild);
}