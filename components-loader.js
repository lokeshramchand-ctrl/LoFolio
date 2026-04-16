document.addEventListener("DOMContentLoaded", () => {
  console.log("components-loader.js loaded"); // Debugging log
  loadComponent("/navbar.html", "navbar-placeholder");
});

async function loadComponent(url, placeholderId) {
  console.log(`Attempting to load component from: ${url}`); // Debugging log
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) {
    console.error(`Placeholder with ID '${placeholderId}' not found.`);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

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

    console.log("Component loaded successfully."); // Debugging log
    document.dispatchEvent(new Event("NavbarLoaded"));

  } catch (error) {
    console.error("Component Loader Error:", error);
  }
}