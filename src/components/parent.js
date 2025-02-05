(async function parent() {
    console.log("🚀 Searching for Squarespace Admin Navbar...");

    try {
        const { setToken } = await import("https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js");
        setToken();
        console.log("✅ setToken function executed successfully.");
    } catch (error) {
        console.error("❌ Failed to import setToken:", error);
    }

    let headerLogoFunction; 
    try {
        const module = await import("https://fatin-webefo.github.io/squareCraft-Plugin/src/logo/headerLogo.js");
        headerLogoFunction = module.headerLogo;
        await headerLogoFunction();
        console.log("✅ headerLogo function executed successfully.");
    } catch (error) {
        console.error("❌ Failed to import headerLogo:", error);
    }

    const observer = new MutationObserver(() => {
        if (!document.getElementById("squareCraft-icon-button")) {
            console.log("🔄 Admin Navbar changed, reinjecting icon...");
            if (headerLogoFunction) headerLogoFunction();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
