export function getElementId(targetElement) {
    let block = targetElement.closest('[id^="block-"]');

    if ( !block) {
      console.warn("⚠️ No valid  block found.");
      return {};
    }

    return {
      elementId: block.id,
    };
  }

  