// ============ РОУТИНГ ПО ХЭШУ ============
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.main-nav a');

// Маппинг подстраниц на их "родительские" вкладки в меню
const parentMap = {
    opp: 'rules',
    leaders: 'rules',
    gos: 'rules',
    krim: 'rules',
    uk: 'legislation',
    ak: 'legislation',
    gk: 'legislation',
    dk: 'legislation',
    tk: 'legislation'
};

const titles = {
    home: 'Главная',
    about: 'О сервере',
    factions: 'Фракции',
    rules: 'Правила',
    legislation: 'Законодательство',
    players: 'Игрокам',
    team: 'Руководство',
    play: 'Играть',
    opp: 'Основные правила',
    leaders: 'Правила лидеров',
    gos: 'Правила государственных организаций',
    krim: 'Правила криминальных организаций',
    uk: 'Уголовный кодекс',
    ak: 'Административный кодекс',
    gk: 'Гражданский кодекс',
    dk: 'Дорожный кодекс',
    tk: 'Трудовой кодекс'
};

function showPage(hash) {
    const id = hash.replace('#', '') || 'home';

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
        const home = document.getElementById('home');
        if (home) home.classList.add('active');
    }

    // Подсветка активной ссылки в меню (учитываем подстраницы через parentMap)
    const activeId = parentMap[id] || id;

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.title = 'NobarskRP — ' + (titles[id] || 'Игровой RP-проект');

    document.querySelector('.main-nav')?.classList.remove('open');
}

window.addEventListener('hashchange', () => showPage(location.hash));

document.addEventListener('DOMContentLoaded', () => {
    showPage(location.hash || '#home');
});

// ============ МОБИЛЬНОЕ МЕНЮ ============
document.getElementById('burger')?.addEventListener('click', () => {
    document.querySelector('.main-nav')?.classList.toggle('open');
});

// ============ FAQ АККОРДЕОН ============
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});
