export async function applyStylesToElement(elementId, css) {
    const element = document.getElementById(elementId);
    if (!element) return;
  
    Object.keys(css).forEach((prop) => {
      if (prop === "font-size") {
        element.querySelectorAll("h1, h2, h3, p, span, a").forEach(el => {
          el.style.fontSize = css[prop];
        });
      } else if (prop === "border-radius") {
        element.style.borderRadius = css[prop];
        element.querySelectorAll("img").forEach(img => {
          img.style.borderRadius = css[prop];
        });
      } else {
        element.style[prop] = css[prop];
      }
    });
  
    console.log(`🎨 Styles applied to ${elementId}:`, css);
  }