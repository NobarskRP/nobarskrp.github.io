// ============ РОУТИНГ ПО ХЭШУ ============
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.main-nav a');

const parentMap = {
    // Правила
    opp: 'rules', pgo: 'rules', pko: 'rules',
    pp: 'rules', piol: 'rules', ps: 'rules', pa: 'rules',
    opgs: 'rules', pd: 'rules', pr: 'rules',
    opks: 'rules', pv: 'rules',
    // Законодательство
    kod: 'legislation', fz: 'legislation', konst: 'legislation',
    uk: 'legislation', koap: 'legislation', tk: 'legislation',
    upk: 'legislation', gk: 'legislation',
    fkzopr: 'legislation', fkzoss: 'legislation', fzoo: 'legislation',
    fzofsb: 'legislation', fzop: 'legislation', fzofso: 'legislation',
    fzod: 'legislation', fzogt: 'legislation', fzsmi: 'legislation',
    fzokd: 'legislation', fzooz: 'legislation', fzoob: 'legislation',
    fzoad: 'legislation', fzogs: 'legislation'
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
    opp: 'Общие правила проекта',
    pgo: 'Правила государственных структур',
    pko: 'Правила криминальных структур',
    pp: 'Правила Проекта',
    piol: 'Правила и Обязанности Лидеров',
    ps: 'Правила Семей',
    pa: 'Правила Администрации',
    opgs: 'Основные Правила Гос. Структур',
    pd: 'Правила Допросов',
    pr: 'Правила Рейдов',
    opks: 'Основные Правила Крим. Структур',
    pv: 'Правила Войны',
    kod: 'Кодексы',
    fz: 'Федеральные законы',
    konst: 'Конституция РФ',
    uk: 'Уголовный Кодекс',
    koap: 'КоАП',
    tk: 'Трудовой Кодекс',
    upk: 'УПК',
    gk: 'Гражданский Кодекс',
    fkzopr: 'ФКЗ «О Правительстве»',
    fkzoss: 'ФКЗ «О Судебной системе»',
    fzoo: 'ФЗ «Об Оружии»',
    fzofsb: 'ФЗ «О ФСБ»',
    fzop: 'ФЗ «О Полиции»',
    fzofso: 'ФЗ «О ФСО»',
    fzod: 'ФЗ «О Документообороте»',
    fzogt: 'ФЗ «О Государственной тайне»',
    fzsmi: 'ФЗ «О СМИ»',
    fzokd: 'ФЗ «О Коммерческой деятельности»',
    fzooz: 'ФЗ «Об Охране здоровья»',
    fzoob: 'ФЗ «Об Обороне»',
    fzoad: 'ФЗ «Об Адвокатской деятельности»',
    fzogs: 'ФЗ «О Государственной службе»'
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
        document.getElementById('home')?.classList.add('active');
    }

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

// ============ КОПИРОВАНИЕ IP + МОДАЛЬНОЕ ОКНО ============
const SERVER_IP = 'nobarskrp.online';
const connectBtn = document.getElementById('connectBtn');
const ipModal = document.getElementById('ipModal');
const modalClose = document.getElementById('modalClose');

function showIpModal() {
    if (ipModal) ipModal.classList.add('show');
}

function hideIpModal() {
    if (ipModal) ipModal.classList.remove('show');
}

function copyToClipboard(text) {
    // Современный API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }
    // Fallback для старых браузеров
    return new Promise((resolve, reject) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            resolve();
        } catch (err) {
            reject(err);
        }
        document.body.removeChild(ta);
    });
}

connectBtn?.addEventListener('click', () => {
    copyToClipboard(SERVER_IP)
        .then(showIpModal)
        .catch(() => showIpModal()); // Всё равно показываем окно, даже если копирование не удалось
});

modalClose?.addEventListener('click', hideIpModal);

ipModal?.addEventListener('click', (e) => {
    if (e.target === ipModal) hideIpModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideIpModal();
});
