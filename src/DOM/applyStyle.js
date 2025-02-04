export function applyStyle() {
    if (!selectedElement) return;
  
    const fontSize = document.getElementById("squareCraftFontSize").value + "px";
    selectedElement.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, div, li, strong, em").forEach(el => {
      el.style.fontSize = fontSize;
    });
  
    const bgColor = document.getElementById("squareCraftBgColor").value;
    selectedElement.style.backgroundColor = bgColor;
  
    const borderRadius = document.getElementById("squareCraftBorderRadius").value + "px";
    selectedElement.style.borderRadius = borderRadius;
    selectedElement.querySelectorAll("img").forEach(img => {
      img.style.borderRadius = borderRadius;
    });
  }