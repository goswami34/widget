export     function observeDOMChanges() {
    const observer = new MutationObserver(() => {
      console.log("🔄 DOM Updated - Checking for changes...");
  
      if (isEditingMode()) {
        console.log("🛠 Detected Edit Mode - Rechecking modifications...");
        setTimeout(fetchModifications, 3000); // ✅ Wait 3s before fetching again
      } else {
        fetchModifications();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }