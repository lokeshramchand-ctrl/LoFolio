document.addEventListener("DOMContentLoaded", () => {
    const navHTML = `
    <nav>
        <a href="./index.html" class="logo magnet">Lokesh Ram Chand B</a>

        <div class="nav-right">
            <div class="menu-items">
                <a href="./first.html#work" class="menu-link magnet">Projects</a>
                <a href="./first.html#about" class="menu-link magnet">About</a>
                <a href="./re.html" class="menu-link magnet">Resume</a>
            </div>

            <button class="theme-btn magnet" onclick="toggleTheme()" aria-label="Toggle Theme">
                <i class="ri-moon-line" id="theme-icon"></i>
            </button>

            <button class="menu-icon" onclick="toggleMenu()" aria-label="Menu">
                <i class="ri-menu-4-line" id="menu-btn-icon"></i>
            </button>
        </div>
    </nav>
    
    <div class="mobile-menu">
        <a href="./first.html#work" class="mobile-link">Projects</a>
        <a href="./first.html#about" class="mobile-link">About</a>
        <a href="./re.html" class="mobile-link">Resume</a>
    </div>
    `;

    // 1. Insert Nav
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Initialize Theme
    initTheme();

    // 3. Highlight Active Link
    highlightActiveLink();

    // 4. Mobile Menu Auto-Close Logic
    // This ensures the menu closes when a user clicks a link inside it
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(); // Close menu on click
        });
    });

    // 5. Handle Resize (Close menu if switching to desktop view)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const menu = document.querySelector('.mobile-menu');
            const icon = document.getElementById('menu-btn-icon');
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
                if(icon) icon.className = 'ri-menu-4-line';
            }
        }
    });
});

// --- LOGIC FUNCTIONS ---

function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    const icon = document.getElementById('menu-btn-icon');
    const isActive = menu.classList.contains('active');

    if (isActive) {
        // CLOSE MENU
        menu.classList.remove('active');
        document.body.style.overflow = ''; // Restore page scrolling
        if(icon) icon.className = 'ri-menu-4-line'; // Switch back to Hamburger
    } else {
        // OPEN MENU
        menu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock page scrolling
        if(icon) icon.className = 'ri-close-line'; // Switch to X icon
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        if(icon) icon.className = 'ri-sun-line';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        if(icon) icon.className = 'ri-moon-line';
        localStorage.setItem('theme', 'dark');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if(icon) icon.className = savedTheme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
    } else {
        // Default to dark
        if(icon) icon.className = 'ri-moon-line';
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
        // Get the href attribute (e.g., "./re.html")
        const linkPath = link.getAttribute('href').replace('./', '/'); 
        
        // Simple check: if the current URL contains the link href
        if (currentPath.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath.includes('index.html')) {
            // Special handling for home page to avoid highlighting everything
            if (link.getAttribute('href').includes('index.html')) {
                // Optional: You might not want to highlight 'Projects' if you are just on Home
                // But generally safe to leave as is or customize logic here
            }
        }
    });
}