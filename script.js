// ============ РОУТИНГ ПО ХЭШУ ============
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.main-nav a[data-link]');
const allLinks = document.querySelectorAll('a[data-link]');

function showPage(hash) {
    let id = hash.replace('#', '') || 'home';

    let found = false;
    pages.forEach(page => {
        if (page.id === id) {
            page.classList.add('active');
            found = true;
        } else {
            page.classList.remove('active');
        }
    });

    if (!found) {
        document.getElementById('home')?.classList.add('active');
        id = 'home';
    }

    // Подсветка активной ссылки
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titles = {
        home: 'Главная',
        about: 'О сервере',
        factions: 'Фракции',
        rules: 'Правила',
        legislation: 'Законодательство',
        team: 'Руководство',
        play: 'Играть'
    };
    document.title = 'NobarskRP — ' + (titles[id] || 'Игровой RP-проект');

    document.querySelector('.main-nav')?.classList.remove('open');
}

allLinks.forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            history.pushState(null, '', href);
            showPage(href);
        }
    });
});

window.addEventListener('popstate', () => showPage(location.hash));

document.addEventListener('DOMContentLoaded', () => {
    showPage(location.hash || '#home');
});

// Мобильное меню
document.getElementById('burger')?.addEventListener('click', () => {
    document.querySelector('.main-nav')?.classList.toggle('open');
});
