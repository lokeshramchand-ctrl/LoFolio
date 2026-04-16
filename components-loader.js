document.addEventListener("DOMContentLoaded", () => {
  loadComponent("/navbar.html", "navbar-placeholder");
});

async function loadComponent(url, placeholderId) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    
    const htmlText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;

    // Move all elements from temp container to the DOM
    while (tempDiv.firstChild) {
      const node = tempDiv.firstChild;

      // Special handling for scripts: re-create them so the browser executes them
      if (node.tagName === "SCRIPT") {
        const script = document.createElement("script");
        script.text = node.innerHTML;
        Array.from(node.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
        placeholder.appendChild(script);
        node.remove();
      } else {
        placeholder.appendChild(node);
      }
    }

    // Fire a custom event so the main app knows dynamic content is ready
    document.dispatchEvent(new Event("NavbarLoaded"));

  } catch (error) {
    console.error("Component Loader Error:", error);
  }
}