(async function squareCraft() {
    console.log("🚀 Injecting SquareCraft Script...");

    function injectScript() {
        if (document.getElementById("squareCraft-script")) {
            console.warn("⚠️ SquareCraft script already exists.");
            return;
        }

        const script = document.createElement("script");
        script.id = "squareCraft-script";
        script.src = "./src/components/parent.js";
        script.defer = true;
        script.onload = () => console.log("✅ SquareCraft script loaded successfully!");
        script.onerror = () => console.error("❌ Failed to load SquareCraft script.");

        document.body.appendChild(script);
    }



    injectScript();

})();
