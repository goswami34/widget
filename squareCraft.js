( async function SquareCraft() {
    const pathname = window.location.pathname;
    const url = window.location.href;
    console.log("�� Checking URL:", url, "pathname:", pathname);
    setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://fatin-webefo.github.io/squareCraft-Plugin/src/components/parent.js?v=" + Date.now();

      script.onload = () => console.log("🚀 Script Loaded");
      script.onerror = (err) => console.error("❌ Failed:", err);
      document.head.appendChild(script);

      script.onload = () => {
        console.log("🚀 Parent Script Loaded");
      };
      script.onerror = (err) => {
        console.error("❌ Failed to load Parent Script:", err);
      };
    
      document.head.appendChild(script); 
  }, 3000);
  
 
  
  })();
  