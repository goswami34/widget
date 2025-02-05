(async function squarespaceNavbarFix() {
    console.log("🚀 Squarespace Navbar Fix Script Loaded!");

    // 🛠️ Function to Detect Clicks Everywhere
    function detectClicksEverywhere() {
        // 1️⃣ Detect Clicks on Main Document
        document.addEventListener("click", (event) => {
            console.log("🔥 Clicked in Main Document:", event.target);
        });

        // 2️⃣ Detect Clicks Inside iframes
        let iframe = document.querySelector("iframe");
        if (iframe) {
            let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                iframeDoc.addEventListener("click", (event) => {
                    console.log("🔥 Clicked inside iframe:", event.target);
                });
                console.log("✅ Click listener added inside iframe!");
            } else {
                console.warn("❌ Unable to access iframe document.");
            }
        } else {
            console.warn("⚠️ No iframe detected. Navbar might not be inside an iframe.");
        }

        // 3️⃣ Detect Clicks in Shadow DOM
        let shadowHost = document.querySelector("squarespace-toolbar"); // Example
        if (shadowHost && shadowHost.shadowRoot) {
            shadowHost.shadowRoot.addEventListener("click", (event) => {
                console.log("🔥 Clicked inside Shadow DOM:", event.target);
            });
            console.log("✅ Click listener added inside Shadow DOM!");
        } else {
            console.warn("⚠️ No Shadow DOM detected.");
        }
    }

    // 🛠️ Function to Enable Clicks on Navbar
    function enableNavbarClick() {
        let navbar = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]');
        if (navbar) {
            navbar.style.pointerEvents = "auto";
            console.log("✅ Navbar clicks enabled!");
        } else {
            console.warn("🚨 Navbar not found!");
        }
    }

    // 🛠️ Function to Inject Plugin Icon into Navbar
    function injectPluginIcon() {
        let navbar = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]');
        if (!navbar) {
            console.warn("⚠️ Navbar not found. Retrying in 1s...");
            setTimeout(injectPluginIcon, 1000);
            return;
        }

        // Prevent duplicate icon injections
        if (document.getElementById("squareCraft-icon-button")) return console.warn("⚠️ Plugin Icon already exists.");

        const button = document.createElement("button");
        button.id = "squareCraft-icon-button";
        button.style.cssText = `
            width: 40px; height: 40px; background-color: transparent;
            border: none; cursor: pointer; display: flex; align-items: center;
        `;
        button.innerHTML = `<img src="https://i.ibb.co/LXKK6swV/Group-29.jpg" style="width: 30px; height: 30px;">`;

        button.onclick = () => window.open("https://your-plugin-dashboard.com", "_blank");

        navbar.appendChild(button);
        console.log("✅ Plugin Icon Injected!");
    }

    // 🛠️ Function to Handle iframe Access
    function detectIframeClicks() {
        let iframe = document.querySelector("iframe");
        if (!iframe) return console.warn("⚠️ No iframe detected. Navbar might be in the main DOM.");

        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) return console.warn("❌ Unable to access iframe content.");

        iframeDoc.addEventListener("click", (event) => {
            console.log("🔥 Clicked inside iframe:", event.target);
        });

        console.log("✅ Click listener added inside iframe!");
    }

    // 🛠️ Function to Handle Shadow DOM
    function detectShadowDOMClicks() {
        let shadowHost = document.querySelector("squarespace-toolbar"); // Example
        if (!shadowHost) return console.warn("❌ No Shadow DOM detected.");

        let shadowRoot = shadowHost.shadowRoot;
        if (!shadowRoot) return console.warn("❌ Shadow root is missing.");

        shadowRoot.addEventListener("click", (event) => {
            console.log("🔥 Clicked inside Shadow DOM:", event.target);
        });

        console.log("✅ Click listener added inside Shadow DOM!");
    }

    // 🛠️ Mutation Observer to Watch for Navbar Changes
    const observer = new MutationObserver(() => {
        if (!document.getElementById("squareCraft-icon-button")) {
            console.log("🔄 Admin Navbar changed, reinjecting icon...");
            injectPluginIcon();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // ✅ Run All Functions After Page Loads
    setTimeout(() => {
        detectClicksEverywhere();
        enableNavbarClick();
        detectIframeClicks();
        detectShadowDOMClicks();
        injectPluginIcon();
    }, 3000);
})();
