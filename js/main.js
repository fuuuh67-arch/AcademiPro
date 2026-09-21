// Single source of truth for the WhatsApp number.
// Change it here only — every wa.me link on the page is rewritten from this value on load.
const WHATSAPP_NUMBER = "97366626099";

function syncWhatsappLinks() {
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        const url = new URL(link.href);
        url.pathname = '/' + WHATSAPP_NUMBER;
        link.href = url.toString();
    });
}

// Language System
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    applyTranslations();
    updateLangButton();
    renderServices();
}

function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });
}

function updateLangButton() {
    const label = currentLang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية';
    ['lang-toggle', 'lang-toggle-mobile'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.textContent = currentLang === 'en' ? 'AR' : 'EN';
            btn.setAttribute('aria-label', label);
        }
    });
}

// Services Data
const servicesData = [
    { id: 1, titleKey: "svc_cv_title", descKey: "svc_cv_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4h10M7 8h10M7 12h4"/></svg>`, color: "text-purple-600", bg: "bg-purple-50", category: "academic" },
    { id: 2, titleKey: "svc_web_title", descKey: "svc_web_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`, color: "text-cyan-600", bg: "bg-cyan-50", category: "technical" },
    { id: 3, titleKey: "svc_win_title", descKey: "svc_win_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7v4l2 2"/></svg>`, color: "text-orange-600", bg: "bg-orange-50", category: "technical" },
    { id: 4, titleKey: "svc_vm_title", descKey: "svc_vm_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`, color: "text-indigo-600", bg: "bg-indigo-50", category: "technical" },
    { id: 5, titleKey: "svc_revision_title", descKey: "svc_revision_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`, color: "text-teal-600", bg: "bg-teal-50", category: "tutoring" },
    { id: 6, titleKey: "svc_tutoring_title", descKey: "svc_tutoring_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`, color: "text-green-600", bg: "bg-green-50", category: "tutoring" },
    { id: 7, titleKey: "svc_cheat_title", descKey: "svc_cheat_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l2 2 4-4"/></svg>`, color: "text-amber-600", bg: "bg-amber-50", category: "academic" },
    { id: 8, titleKey: "svc_past_title", descKey: "svc_past_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`, color: "text-violet-600", bg: "bg-violet-50", category: "academic" },
    { id: 9, titleKey: "svc_coding_title", descKey: "svc_coding_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`, color: "text-emerald-600", bg: "bg-emerald-50", category: "technical" },
    { id: 10, titleKey: "svc_db_title", descKey: "svc_db_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" stroke-width="1.5"/><path stroke-width="1.5" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path stroke-width="1.5" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`, color: "text-sky-600", bg: "bg-sky-50", category: "technical" },
    { id: 11, titleKey: "svc_network_title", descKey: "svc_network_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="6" height="6" rx="1" stroke-width="1.5"/><rect x="16" y="2" width="6" height="6" rx="1" stroke-width="1.5"/><rect x="9" y="16" width="6" height="6" rx="1" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="1.5" d="M5 8v3a2 2 0 002 2h10a2 2 0 002-2V8"/><path stroke-linecap="round" stroke-width="1.5" d="M12 13v3"/></svg>`, color: "text-slate-600", bg: "bg-slate-50", category: "technical" },
    { id: 12, titleKey: "svc_mobile_title", descKey: "svc_mobile_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="3" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="1.5" d="M12 18h.01"/><path stroke-linecap="round" stroke-width="1.5" d="M9 6l3 3 3-3"/></svg>`, color: "text-pink-600", bg: "bg-pink-50", category: "technical" },
    { id: 13, titleKey: "svc_ppt_title", descKey: "svc_ppt_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke-width="1.5"/><path stroke-width="1.5" d="M8 21h8"/><path stroke-width="1.5" d="M12 17v4"/><path stroke-linecap="round" stroke-width="1.5" d="M6 10l4-4 4 4"/><path stroke-linecap="round" stroke-width="1.5" d="M18 10l-4-4"/></svg>`, color: "text-red-600", bg: "bg-red-50", category: "academic" },
    { id: 14, titleKey: "svc_plagiarism_title", descKey: "svc_plagiarism_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l2 2 4-4"/></svg>`, color: "text-lime-600", bg: "bg-lime-50", category: "academic" },
    { id: 15, titleKey: "svc_group_title", descKey: "svc_group_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="7" r="3" stroke-width="1.5"/><circle cx="17" cy="7" r="3" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="1.5" d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path stroke-linecap="round" stroke-width="1.5" d="M17 14a4 4 0 014 4v3"/></svg>`, color: "text-fuchsia-600", bg: "bg-fuchsia-50", category: "academic" },
    { id: 16, titleKey: "svc_pc_title", descKey: "svc_pc_desc", icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke-width="1.5"/><path stroke-width="1.5" d="M8 21h8"/><path stroke-width="1.5" d="M12 17v4"/><path stroke-linecap="round" stroke-width="1.5" d="M7 8l3 3-3 3"/><path stroke-linecap="round" stroke-width="1.5" d="M12 14h5"/></svg>`, color: "text-teal-600", bg: "bg-teal-50", category: "technical" },
];

// Render services
function renderServices(filter = 'all') {
    const grid = document.getElementById('services-grid');
    if (!grid) return; // page has no services grid (e.g. policies.html)
    const filtered = filter === 'all' ? servicesData : servicesData.filter(s => s.category === filter);
    const isRTL = currentLang === 'ar';

    grid.innerHTML = filtered.map((service, index) => `
        <div class="service-card bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in-up stagger-${Math.min(index % 4 + 1, 4)}" data-category="${service.category}">
            <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center ${service.color}">
                    ${service.icon}
                </div>
                <span class="text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full text-center">${t('contact_for_price')}</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 text-sm leading-tight">${t(service.titleKey)}</h3>
            <p class="text-xs text-gray-500 leading-relaxed mb-4">${t(service.descKey)}</p>
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('order_now') + ' - ' + t(service.titleKey))}" target="_blank" class="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                ${t('order_now')}
                <svg class="w-4 h-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
        </div>
    `).join('');
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderServices(btn.dataset.filter);
    });
});

// FAQ toggles
document.querySelectorAll('.faq-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const item = toggle.closest('.faq-item');
        const content = item.querySelector('.faq-content');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-content').classList.add('hidden');
        });
        if (!isOpen) {
            item.classList.add('open');
            content.classList.remove('hidden');
        }
    });
});

// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
function setMobileMenuOpen(isOpen) {
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}
mobileMenuBtn.addEventListener('click', () => setMobileMenuOpen(mobileMenu.classList.contains('hidden')));
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
});

// Language toggle
document.getElementById('lang-toggle').addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
});

// Mobile language toggle
const langToggleMobile = document.getElementById('lang-toggle-mobile');
if (langToggleMobile) {
    langToggleMobile.addEventListener('click', () => {
        setLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
}

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.pageYOffset > 50);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - header.offsetHeight - 20, behavior: 'smooth' });
        }
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    syncWhatsappLinks();
    setLanguage(currentLang);
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach(card => observer.observe(card));
    }, 100);
});
