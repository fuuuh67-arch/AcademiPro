// Highlights the matching link in the side table of contents as the reader scrolls.
(function () {
    const sections = Array.from(document.querySelectorAll('[data-pol-section]'));
    const links = Array.from(document.querySelectorAll('.pol-toc a[data-spy]'));
    if (!sections.length || !links.length) return;

    function update() {
        const offset = 160;
        let current = sections[0].id;
        sections.forEach(s => { if (s.getBoundingClientRect().top <= offset) current = s.id; });
        links.forEach(a => a.classList.toggle('active', a.dataset.spy === current));
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();
