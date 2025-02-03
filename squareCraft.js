(async function SquareCraft() {
  
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
  