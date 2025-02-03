export function getpageId(targetElement) {
    let page = targetElement.closest("article[data-page-sections]");

    if (!block) {
      console.warn("⚠️ No valid page or block found.");
      return {};
    }

    return {
      pageId: page.getAttribute("data-page-sections"),
    };
  }