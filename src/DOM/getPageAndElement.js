export   function getPageAndElement(targetElement) {
  let page = targetElement.closest("article[data-page-sections]");
  let block = targetElement.closest('[id^="block-"]');

  if (!page || !block) {
    console.warn("⚠️ No valid page or block found.");
    return {};
  }

  return {
    pageId: page.getAttribute("data-page-sections"),
    elementId: block.id,
  };
}

  