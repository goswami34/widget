export function parentHtml() {
    return `
      <div id="squarecraft-widget-container" style="width: 300px; background: #2c2c2c; padding: 20px; border-radius: 18px; border: 1.5px solid #3D3D3D; color: white;">
        <h3>🎨 SquareCraft Widget</h3>

        <label>Font Size:</label>
        <input type="number" id="squareCraftFontSize" value="16" min="10" max="50" style="width: 100%;">

        <label>Background Color:</label>
        <input type="color" id="squareCraftBgColor" value="#ffffff" style="width: 100%;">

        <label>Border Radius:</label>
        <input type="range" id="squareCraftBorderRadius" min="0" max="50" value="0">
        <p>Border Radius: <span id="borderRadiusValue">0px</span></p>

        <button id="squareCraftPublish" style="width: 100%; padding: 10px; background: #EF7C2F; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Publish Changes
        </button>
      </div>
    `;
  }
  
