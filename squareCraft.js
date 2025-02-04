( async function SquareCraft() {
    const pathname = window.location.pathname;
    const url = window.location.href;
    console.log("�� Checking URL:", url, "pathname:", pathname);
    setTimeout(() => {
      console.log("Injecting script...");
      const script = document.createElement("script");
      script.src = "https://fatin-webefo.github.io/squareCraft-Plugin/src/components/parent.js?v=" + Date.now();
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
  }, 3000); 
  
  
 
  
  })();
  