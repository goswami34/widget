export async function getStyles() {
  const token = localStorage.getItem("squareCraft_auth_token");
  const userId = localStorage.getItem("squareCraft_u_id");
  let loadedFonts = new Set();
  let selectedElement = null;
  if (!token || !userId) return;

  let pageElement = document.querySelector("article[data-page-sections]");
  let pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;

  function applyFont(fontFamily, fontWeights = "400") {
    console.log(`Applying font: ${fontFamily} with weights: ${fontWeights}`);

    const formattedFontName = fontFamily.replace(/\s+/g, "+");
    const fontCDN = `https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@${fontWeights}&display=swap`;

    if (!loadedFonts.has(fontFamily)) {
        let fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = fontCDN;
        document.head.appendChild(fontLink);
        loadedFonts.add(fontFamily);
        console.log(`Font added to head: ${fontCDN}`);
    }

    if (selectedElement) {
        selectedElement.style.fontFamily = `'${fontFamily}', sans-serif`;
        console.log(`Font applied to element: ${selectedElement.id}`);
    }
}

  try {
      const response = await fetch(
          `https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`,
          {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
               credentials: "include"
          },
      );

      const data = await response.json();
      console.log("response from get styles" , response)

      data?.modifications?.forEach(({ pageId: fetchedPageId, elements }) => {
          if (fetchedPageId === pageId) {
              elements.forEach(({ elementId, css }) => {
                  const element = document.getElementById(elementId);
                  if (!element) return;

                  if (css["font-family"]) applyFont(css["font-family"], css["font-weights"]);
                  if (css["font-size"]) element.style.fontSize = css["font-size"];
                  if (css["font-variant"]) element.style.fontVariant = css["font-variant"];
              });
          }
      });

  } catch (error) {
      console.error("❌ Error fetching modifications:", error);
  }
}
