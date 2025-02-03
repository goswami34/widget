( async function SquareCraft() {
    const pathname = window.location.pathname;
    const url = window.location.href;
    console.log("�� Checking URL:", url, "pathname:", pathname);
    const script = document.createElement("script");
    script.src = "https://fatin-webefo.github.io/squareCraft-Plugin/src/components/parent.js"; 
    script.type = "module"; 
    script.onload = () => {
      console.log("🚀 Parent Script Loaded");
    };
    script.onerror = (err) => {
      console.error("❌ Failed to load Parent Script:", err);
    };
  
    document.head.appendChild(script); 
  
  })();
  