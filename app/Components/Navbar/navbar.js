// navbar.js
const navbarHTML = `
    <div class="mobile-menu">
        <a href="index.html#work" class="mobile-link" onclick="toggleMenu()">Projects</a>
        <a href="index.html#about" class="mobile-link" onclick="toggleMenu()">About</a>
        <a href="re.html" class="mobile-link" onclick="toggleMenu()">Resume</a>
    </div>

    <nav>
        <a href="index.html" class="logo magnet">Lokesh Ram Chand</a>

        <div class="nav-right">
            <div class="menu-items">
                <a href="index.html#work" class="menu-link magnet">Projects</a>
                <a href="index.html#about" class="menu-link magnet">About</a>
                <a href="https://drive.google.com/file/d/1HicrndILNyc9dkNFDz_BzozauWinXTyj/view?usp=drive_link" target="_blank" class="menu-link magnet">Resume</a>
            </div>

            <button class="theme-btn magnet" onclick="toggleTheme()" aria-label="Toggle Theme">
                <i class="ri-moon-line" id="theme-icon"></i>
            </button>

            <button class="menu-icon" onclick="toggleMenu()" aria-label="Menu">
                <i class="ri-menu-4-line"></i>
            </button>
        </div>
    </nav>
`;

// 1. Inject the HTML into the container
document.getElementById('navbar-placeholder').innerHTML = navbarHTML;

// 2. Theme Switcher Logic
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

// 3. Initialize Theme on Load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTimeout(() => {
        const icon = document.getElementById('theme-icon');
        if(icon) icon.className = savedTheme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
    }, 0);
}

// 4. Mobile Menu Logic
function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
}