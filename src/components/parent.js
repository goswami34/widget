(async function parent() {
    console.log("🚀 Parent function initialized...");

    function initializeSquareCraft() {
        console.log("⚡ Initializing SquareCraft...");
        createWidget();
        attachEventListeners();
        fetchModifications();
        observeDOMChanges();
        if (headerLogo) headerLogo(); // ✅ Call only if it's defined
    }

    let parentHtml, attachEventListeners, observeDOMChanges, fetchModifications, headerLogo;

    async function loadModule(url) {
        try {
            console.log(`🚀 Loading module: ${url}`);
            const module = await import(url);
            console.log(`✅ Successfully loaded: ${url}`);
            return module;
        } catch (err) {
            console.error(`❌ Failed to load module: ${url}`, err);
            return null;
        }
    }

    // ✅ Load modules
    parentHtml = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/html/parentHtml.js"))?.parentHtml;
    attachEventListeners = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/attachEventListeners.js"))?.attachEventListeners;
    observeDOMChanges = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/DOM/observeDOMChanges.js"))?.observeDOMChanges;
    fetchModifications = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/utils/getStyles.js"))?.fetchModifications;
    headerLogo = (await loadModule("https://fatin-webefo.github.io/squareCraft-Plugin/src/logo/headerLogo.js"))?.headerLogo;

    console.log("✅ Successfully imported all modules. , headerLogo:", headerLogo);

    if (!headerLogo) {
        console.error("❌ `headerLogo` is still undefined. Check the export in `headerLogo.js`.");
    } else {
        headerLogo(); // ✅ Call only if successfully imported
    }

    console.log("📌 HTML Structure:\n", parentHtml());

    setTimeout(() => {
        console.log("⚡ Ensuring SquareCraft initializes...");
        initializeSquareCraft();
    }, 1000);
})();
