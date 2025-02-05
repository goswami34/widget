(async function parent() {
    console.log("🚀 Searching for Squarespace Admin Navbar...");

    function injectIcon () {

        const script = document.createElement("script");
        script.id = "squareCraft-icon-button";
        script.src = "https://fatin-webefo.github.io/squareCraft-Plugin/src/logo/headerLogo.js"; 
        script.defer = true;
        script.onload = () => console.log("✅ SquareCraft icon loaded successfully!");
        script.onerror = () => console.error("❌ Failed to load SquareCraft script.");
        
        document.body.appendChild(script);
    }
    
    injectIcon();

    try {
        const { setToken } = await import("https://fatin-webefo.github.io/squareCraft-Plugin/src/credentials/setToken.js");
        setToken(); 
        console.log("✅ setToken function executed successfully.");
    } catch (error) {
        console.error("❌ Failed to import setToken:", error);
    }


    const observer = new MutationObserver(() => {
        if (!document.getElementById("squareCraft-icon-button")) {
            console.log("🔄 Admin Navbar changed, reinjecting icon...");

        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
