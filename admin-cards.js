/* Loads catalogue cards saved by admin.html (localStorage 'rtCatalogCards') into #cardGrid. Defaults to the original Gold 200 card. */
(function () {
    'use strict';
    var KEY = 'rtCatalogCards';
    var DEFAULTS = [{
        code: 'ROLL — 01', category: 'series', title: 'Gold 200',
        image: 'images/kodak-gold-200.jpg', alt: 'Kodak Gold 200 film retail package', frameNum: '14A',
        location: 'Beirut, LB', year: '2026', format: '35mm Film',
        description: 'Quiet Shelves Hiding a lot of treasures.',
        link: 'gallery.html?i=0', linkText: 'View gallery →',
        photos: [
            { image: 'images/Untitled-1.jpg', alt: 'Just the exhausts poluting the air', caption: 'Pollution In An Artistic Way' },
            { image: 'images/Untitled-2.jpg', alt: 'Hidden inside these books are secrets', caption: 'Knowledge hidden within the shelves' },
            { image: 'images/Untitled-3.jpg', alt: 'Music Speaks Louder than Words', caption: 'Music Speaks Louder Than Words' }
        ]
    }];


    function load() {
        var raw;
        try { raw = localStorage.getItem(KEY); } catch (e) { raw = null; }
        if (!raw) return JSON.parse(JSON.stringify(DEFAULTS));
        try {
            var a = JSON.parse(raw);
            return Array.isArray(a) && a.length ? a : JSON.parse(JSON.stringify(DEFAULTS));
        } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS)); }
    }

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '"').replace(/'/g, '&#39;');
    }

    function tpl(c) {
        var cat = (c.category || 'series') === 'session' ? 'Session' : 'Series';
        var img = c.image ? '<img src="' + esc(c.image) + '" alt="' + esc(c.alt || '') + '" class="frame">' : '';
        var fn = c.frameNum ? '<span class="frame-num">' + esc(c.frameNum) + '</span>' : '';
        var lnk = c.link ? '<a href="' + esc(c.link) + '" class="card-link">' + esc(c.linkText || 'View gallery →') + '</a>' : '';
        return '<article class="card hidden" data-category="' + esc(c.category || 'series') + '">' +
            '<div class="card-top"><span class="code">' + esc(c.code || '') + '</span><span class="stamp-badge">' + cat + '</span></div>' +
            '<div class="thumb">' + img + fn + '</div><div class="perf"></div>' +
            '<h3>' + esc(c.title || '') + '</h3>' +
            '<div class="meta">' +
            '<span>Location — <span>' + esc(c.location || '') + '</span></span>' +
            '<span>Year — <span>' + esc(c.year || '') + '</span></span>' +
            '<span>Format — <span>' + esc(c.format || '') + '</span></span>' +
            '</div>' +
            '<p class="desc">' + esc(c.description || '') + '</p>' + lnk +
            '</article>';
    }

    function render() {
        var grid = document.getElementById('cardGrid');
        if (!grid) return;
        var cards = load();
        grid.innerHTML = cards.map(tpl).join('');
        if (cards.length > 1) grid.style.maxWidth = '1180px';

        var els = Array.prototype.slice.call(grid.querySelectorAll('.card'));

        // Rebind tabs (clone strips listeners attached by the inline script)
        var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab')).map(function (tab) {
            var c = tab.cloneNode(true);
            tab.parentNode.replaceChild(c, tab);
            return c;
        });

        function counts() {
            var k = function (v) { return els.filter(function (c) { return c.dataset.category === v; }).length; };
            var el = document.getElementById('count-all'); if (el) el.textContent = els.length;
            el = document.getElementById('count-series'); if (el) el.textContent = k('series');
            el = document.getElementById('count-session'); if (el) el.textContent = k('session');
        }
        counts();

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');
                var f = tab.dataset.filter;
                els.forEach(function (card) { card.style.display = (f === 'all' || card.dataset.category === f) ? '' : 'none'; });
            });
        });

        var reveal = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('show'); reveal.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        els.forEach(function (c) { reveal.observe(c); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
    else render();
})();