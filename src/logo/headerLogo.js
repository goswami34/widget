document.body.addEventListener("click", function (event) {
    let clickedElement = event.target;
    console.log("🔥 Click Detected!");
    console.log("📌 Clicked Element:", clickedElement);
    console.log("🔍 Element Tag:", clickedElement.tagName);
    console.log("🆔 Element ID:", clickedElement.id ? `#${clickedElement.id}` : "None");
    console.log("🎭 Element Classes:", clickedElement.className ? `.${clickedElement.classList.value.replace(/\s+/g, ".")}` : "None");
    console.log("🔗 Element Selector:", getElementSelector(clickedElement));

    // 🕵️ Detect if Click is Inside an iframe
    detectIframeClick(event);

    // 🕵️ Detect if Click is Inside a Shadow DOM
    detectShadowDOMClick(clickedElement);
});

// 🛠️ Function to Generate a Unique CSS Selector for Any Clicked Element
function getElementSelector(element) {
    if (!element) return "null";
    if (element.id) return `#${element.id}`;
    if (element.classList.length > 0) return `.${element.classList.value.replace(/\s+/g, ".")}`;
    return element.tagName.toLowerCase();
}

// 🕵️ Function to Detect Clicks Inside an iframe
function detectIframeClick(event) {
    let iframes = document.querySelectorAll("iframe");
    if (iframes.length === 0) return;

    iframes.forEach((iframe) => {
        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) return;

        iframeDoc.addEventListener("click", (iframeEvent) => {
            console.log("🔥 Clicked Inside iframe:", iframeEvent.target);
        });
    });
}

// 🕵️ Function to Detect Clicks Inside a Shadow DOM
function detectShadowDOMClick(element) {
    let shadowHost = element.closest("[shadow-root]");
    if (!shadowHost) return;
    
    console.log("🎭 Clicked inside a Shadow DOM:", shadowHost);
}
