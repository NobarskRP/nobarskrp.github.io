// ============ РОУТИНГ ПО ХЭШУ ============
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.main-nav a');

function showPage(hash) {
    const id = hash.replace('#', '') || 'home';

    // Скрыть все страницы, показать нужную
    let found = false;
    pages.forEach(page => {
        if (page.id === id) {
            page.classList.add('active');
            found = true;
        } else {
            page.classList.remove('active');
        }
    });

    // Если не нашли — показать home
    if (!found) {
        const home = document.getElementById('home');
        if (home) home.classList.add('active');
    }

    // Подсветка активной ссылки в меню
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
        }
    });

    // Прокрутка наверх
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Обновить title
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

    // Закрыть мобильное меню
    document.querySelector('.main-nav')?.classList.remove('open');
}

// Слушаем изменение хэша
window.addEventListener('hashchange', () => showPage(location.hash));

// Первая загрузка
document.addEventListener('DOMContentLoaded', () => {
    showPage(location.hash || '#home');
});

// Мобильное меню
document.getElementById('burger')?.addEventListener('click', () => {
    document.querySelector('.main-nav')?.classList.toggle('open');
});
