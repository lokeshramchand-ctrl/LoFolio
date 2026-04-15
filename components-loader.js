/**
 * components-loader.js
 * ─────────────────────
 * Drop this ONE script tag into any page and it will:
 *   1. Inject the navbar at the very top of <body>
 *   2. Inject the footer at the very bottom of <body>
 *
 * Usage — add this to the <head> or end of <body> on any page:
 *   <script src="./components-loader.js"></script>
 *
 * Requirements:
 *   - navbar.html and footer.html must be in the same directory as this file.
 *   - GSAP should be loaded before this script (or it falls back gracefully).
 *
 * How it works:
 *   It fetches navbar.html and footer.html, extracts the inner div
 *   (#navbar-component / #footer-component) and injects it into the page.
 *   The <style> and <script> tags inside those divs are re-evaluated so
 *   everything works exactly as if the markup was written inline.
 */

(async function loadComponents() {
  /**
   * Fetch an HTML file, extract a specific element by ID,
   * and inject it into the DOM at the given position.
   */
  async function injectComponent(file, id, position) {
    try {
      const res  = await fetch(file);
      const text = await res.text();

      // Parse the fetched HTML string
      const parser  = new DOMParser();
      const doc     = parser.parseFromString(text, 'text/html');
      const component = doc.getElementById(id);

      if (!component) {
        console.warn(`[components-loader] Could not find #${id} in ${file}`);
        return;
      }

      // Re-create <script> tags so the browser actually executes them
      // (innerHTML-cloned scripts are NOT executed by default)
      component.querySelectorAll('script').forEach(old => {
        const fresh = document.createElement('script');
        fresh.textContent = old.textContent;
        old.replaceWith(fresh);
      });

      // Inject at the right spot
      if (position === 'prepend') {
        document.body.insertBefore(component, document.body.firstChild);
      } else {
        document.body.appendChild(component);
      }
    } catch (err) {
      console.error(`[components-loader] Failed to load ${file}:`, err);
    }
  }

  // Run both injections — navbar first, then footer
  // await injectComponent('./navbar.html',  'navbar-component',  'prepend');
  await injectComponent('./footer.html',  'footer-component',  'append');

})();