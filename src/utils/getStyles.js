export async function getStyles() {
  const token = localStorage.getItem("squareCraft_auth_token");
  const userId = localStorage.getItem("squareCraft_u_id");

  if (!token || !userId) return;

  let pageElement = document.querySelector("article[data-page-sections]");
  let pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;

  try {
      const response = await fetch(
          `https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`,
          {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              },
          }
      );

      const data = await response.json();

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
