// nav.js

document.addEventListener("DOMContentLoaded", () => {
    const navHTML = `
    <nav>
        <a href="./index.html" class="logo magnet">Lo.</a>

        <div class="nav-right">
            <div class="menu-items">
                <a href="./index.html#work" class="menu-link magnet">Projects</a>
                <a href="./index.html#about" class="menu-link magnet">About</a>
                <a href="./re.html" class="menu-link magnet">Resume</a>
            </div>

            <button class="theme-btn magnet" onclick="toggleTheme()" aria-label="Toggle Theme">
                <i class="ri-moon-line" id="theme-icon"></i>
            </button>

            <button class="menu-icon" onclick="toggleMenu()" aria-label="Menu">
                <i class="ri-menu-4-line"></i>
            </button>
        </div>
    </nav>
    
    <div class="mobile-menu">
        <a href="./index.html#work" class="mobile-link" onclick="toggleMenu()">Projects</a>
        <a href="./index.html#about" class="mobile-link" onclick="toggleMenu()">About</a>
        <a href="./re.html" class="mobile-link" onclick="toggleMenu()">Resume</a>
    </div>
    `;

    // 1. Insert the Nav HTML at the very top of the body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Initialize Theme Logic
    initTheme();
});

// --- LOGIC FUNCTIONS (Moved from your HTML to here) ---

function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
}

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        icon.className = 'ri-sun-line';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'ri-moon-line';
        localStorage.setItem('theme', 'dark');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    // Default to dark if nothing saved, or apply saved preference
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if(icon) icon.className = savedTheme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
    } else {
        // Ensure icon is set correctly on first load
        if(icon) icon.className = 'ri-moon-line';
    }
}