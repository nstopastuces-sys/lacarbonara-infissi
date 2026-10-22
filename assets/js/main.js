/* TeKnoProfil */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Dati aziendali (modificare qui)
     ------------------------------------------------------------------ */
  var INFO = {
    whatsapp: '393278473088',
    // 0 = domenica … 6 = sabato — fasce in minuti dalla mezzanotte
    hours: {
      0: [],
      1: [[420, 900], [1020, 1230]],
      2: [[420, 900], [1020, 1230]],
      3: [[420, 900], [1020, 1230]],
      4: [[420, 900], [1020, 1230]],
      5: [[420, 900], [1020, 1230]],
      6: [[420, 900], [1020, 1200]]
    }
  };
  var DAYS = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Icone (sprite SVG iniettato, funziona anche in locale)
     ------------------------------------------------------------------ */
  var ICONS = {
    phone: '<path d="M21.5 16.6v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 3.9 2 2 0 0 1 3.6 1.7h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L7.5 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2.1z"/>',
    whatsapp: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.28l5.69-1.49a11.3 11.3 0 0 0 5.76 1.47h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.02z"/>',
    pin: '<path d="M12 22s-7.5-6.4-7.5-12.2a7.5 7.5 0 0 1 15 0C19.5 15.6 12 22 12 22z"/><circle cx="12" cy="9.8" r="2.7"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.6 2.2"/>',
    arrow: '<path d="M4 12h15.5M13.5 6l6 6-6 6"/>',
    'arrow-l': '<path d="M20 12H4.5M10.5 6l-6 6 6 6"/>',
    'arrow-up': '<path d="M7 17 17 7M8 7h9v9"/>',
    menu: '<path d="M3 7h18M3 12h18M9 17h12"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    window: '<rect x="4" y="2.5" width="16" height="19" rx=".8"/><path d="M12 2.5v19M4 12h16M9.5 7.5v2M14.5 7.5v2"/>',
    woodwin: '<rect x="4" y="2.5" width="16" height="19" rx=".8"/><rect x="6.5" y="5" width="11" height="14"/><path d="M12 5v14M15 10.5v3"/>',
    slide: '<rect x="2.5" y="3.5" width="19" height="17" rx=".8"/><path d="M12 3.5v17M5.5 10.5l-2 1.5 2 1.5M18.5 10.5l2 1.5-2 1.5"/>',
    door: '<path d="M5.5 21.5V2.5h13v19M2.5 21.5h19"/><path d="M8.5 6h7v6h-7zM8.5 15h7"/><circle cx="15.8" cy="13.6" r=".6" fill="currentColor"/>',
    shield: '<path d="M12 2.5 4 5.6v6c0 5 3.4 8.8 8 9.9 4.6-1.1 8-4.9 8-9.9v-6z"/><path d="M8.5 12l2.5 2.5 4.6-5"/>',
    shutter: '<rect x="2.5" y="2.5" width="8.5" height="19" rx=".5"/><rect x="13" y="2.5" width="8.5" height="19" rx=".5"/><path d="M4.5 6.5h4.5M4.5 9.5h4.5M4.5 12.5h4.5M4.5 15.5h4.5M4.5 18.5h4.5M15 6.5h4.5M15 9.5h4.5M15 12.5h4.5M15 15.5h4.5M15 18.5h4.5"/>',
    grate: '<path d="M2.5 21.5h19M3.5 3.5h17M6 3.5v18M10 3.5v18M14 3.5v18M18 3.5v18M3.5 8.5h17"/><circle cx="8" cy="6" r=".6"/><circle cx="12" cy="6" r=".6"/><circle cx="16" cy="6" r=".6"/>',
    pergola: '<path d="M2.5 8h19M2.5 4.5h19M5 4.5v17M19 4.5v17M8.5 4.5V8M12 4.5V8M15.5 4.5V8M2.5 21.5h19"/>',
    stairs: '<path d="M3 21h4.5v-4.5H12V12h4.5V7.5H21M3 21V3"/>',
    sofa: '<path d="M4.5 11V8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><path d="M2.5 13a2 2 0 0 1 4 0v2h11v-2a2 2 0 0 1 4 0v5h-19z"/><path d="M5 18v2.5M19 18v2.5"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5.3 5.3L3 18l3 3 6.4-6.4a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.8-.7-.7-2.8z"/>',
    ruler: '<path d="M3 16.5 16.5 3 21 7.5 7.5 21z"/><path d="M7 12.5l2 2M10 9.5l2 2M13 6.5l2 2"/>',
    thermo: '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/><path d="M12 9v7.5"/><path d="M17.5 5.5h3M17.5 9h3"/>',
    diamond: '<path d="M6.5 3.5h11l3.5 5.5-9 12-9-12z"/><path d="M3 9h18M9.5 3.5 12 21M14.5 3.5 12 21"/>',
    medal: '<circle cx="12" cy="9" r="6.2"/><path d="m8.6 14.3-2 7.7 5.4-2.9 5.4 2.9-2-7.7"/><path d="m9.4 9 1.8 1.8 3.5-3.4"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 13 11"/>',
    italy: '<path d="M4 4h16v16H4z"/><path d="M9.3 4v16M14.7 4v16"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".7" fill="currentColor"/>',
    facebook: '<path d="M14 8.2h2.8V4.4H14a4.3 4.3 0 0 0-4.3 4.3v2.5H7.2V15h2.5v6.6h3.9V15h2.9l.6-3.8h-3.5V9a.9.9 0 0 1 .9-.8z"/>',
    star: '<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    nav: '<path d="M3 11 21 3l-8 18-2-8z"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.5-4.5M11 8v6M8 11h6"/>',
    send: '<path d="M21.5 2.5 11 13M21.5 2.5 15 21.5l-4-8.5-8.5-4z"/>',
    showroom: '<path d="M3 21.5V9l9-6 9 6v12.5"/><path d="M9 21.5v-7h6v7M2 21.5h20"/>',
    factory: '<path d="M2.5 21.5V11l5 3V11l5 3V11l5 3V4h4v17.5z"/><path d="M2 21.5h20"/>'
  };
  var FILLED = { whatsapp: 1, star: 1 };
  (function injectSprite() {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">';
    for (var k in ICONS) s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>';
    s += '</svg>';
    var d = document.createElement('div');
    d.innerHTML = s;
    document.body.insertBefore(d.firstChild, document.body.firstChild);
    document.querySelectorAll('svg.i[data-i]').forEach(function (el) {
      var n = el.getAttribute('data-i');
      if (FILLED[n]) el.classList.add('i--fill');
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<use href="#i-' + n + '"></use>';
    });
  })();

  /* ------------------------------------------------------------------
     Transizione "finestra" tra le pagine
     ------------------------------------------------------------------ */
  function openWindow() { root.classList.remove('wt-closed', 'wt-leave'); }
  if (root.classList.contains('wt-closed')) {
    var first = document.querySelector('[data-bg-first]');
    var opened = false;
    var go = function () { if (opened) return; opened = true; requestAnimationFrame(function () { setTimeout(openWindow, 120); }); };
    if (first) {
      var im = new Image();
      im.onload = im.onerror = go;
      im.src = first.getAttribute('data-bg-first');
      setTimeout(go, 900);
    } else {
      setTimeout(go, 150);
    }
  }
  window.addEventListener('pageshow', function (e) { if (e.persisted) openWindow(); });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (a.target === '_blank' || a.hasAttribute('download') || a.hasAttribute('data-lightbox')) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(tel:|mailto:|https?:|javascript:)/i.test(href)) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return; // ancora nella stessa pagina
    e.preventDefault();
    closeMenu();
    root.classList.add('wt-leave');
    setTimeout(function () { location.href = url.href; }, 880);
  });

  /* ------------------------------------------------------------------
     Header
     ------------------------------------------------------------------ */
  var top = document.querySelector('.site-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (!top) return;
    top.classList.toggle('is-solid', y > 40);
    top.classList.toggle('is-scrolled', y > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  var mmenu = document.querySelector('.mmenu');
  function closeMenu() {
    if (!mmenu) return;
    mmenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-menu-open]').forEach(function (b) {
    b.addEventListener('click', function () { mmenu.classList.add('is-open'); document.body.style.overflow = 'hidden'; });
  });
  document.querySelectorAll('[data-menu-close]').forEach(function (b) { b.addEventListener('click', closeMenu); });
  if (mmenu) mmenu.querySelectorAll('a[href*="#"]').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeLb(); } });

  /* ------------------------------------------------------------------
     Hero slider
     ------------------------------------------------------------------ */
  var hero = document.querySelector('[data-slider]');
  if (hero) {
    var slides = [].slice.call(hero.querySelectorAll('.hero-slide'));
    var bars = hero.querySelector('.hero-bars');
    var cap = hero.querySelector('.hero-caption span');
    var cnt = hero.querySelector('.hero-count b');
    var DUR = 6500, idx = 0, timer;
    hero.style.setProperty('--dur', DUR + 'ms');
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Immagine ' + (i + 1));
      b.addEventListener('click', function () { show(i); });
      bars.appendChild(b);
    });
    var load = function (s) {
      if (s && !s.style.backgroundImage) s.style.backgroundImage = 'url("' + s.getAttribute('data-bg') + '")';
    };
    var show = function (n) {
      n = (n + slides.length) % slides.length;
      var prev = slides[idx];
      if (n !== idx) {
        prev.classList.remove('is-active');
        prev.classList.add('is-leaving');
        setTimeout(function () { prev.classList.remove('is-leaving'); }, 1700);
      }
      idx = n;
      var cur = slides[idx];
      load(cur); load(slides[(idx + 1) % slides.length]);
      cur.classList.remove('is-leaving');
      cur.classList.add('is-active');
      [].forEach.call(bars.children, function (b, i) {
        b.classList.remove('is-active');
        void b.offsetWidth;
        b.classList.toggle('is-done', i < idx);
        if (i === idx) b.classList.add('is-active');
      });
      if (cnt) cnt.textContent = ('0' + (idx + 1)).slice(-2);
      if (cap) {
        cap.classList.add('is-out');
        setTimeout(function () { cap.textContent = cur.getAttribute('data-caption') || ''; cap.classList.remove('is-out'); }, 350);
      }
      clearTimeout(timer);
      timer = setTimeout(function () { show(idx + 1); }, DUR);
    };
    hero.querySelector('[data-prev]').addEventListener('click', function () { show(idx - 1); });
    hero.querySelector('[data-next]').addEventListener('click', function () { show(idx + 1); });
    var tx = null;
    hero.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      tx = null;
    });
    show(0);
  }

  /* ------------------------------------------------------------------
     Orari : stato "aperto / chiuso" in tempo reale (ora di Roma)
     ------------------------------------------------------------------ */
  function romeNow() {
    try {
      var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      var o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), min: (+o.hour % 24) * 60 + (+o.minute) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function hhmm(m) { return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); }
  function status() {
    var n = romeNow(), today = INFO.hours[n.day] || [];
    for (var i = 0; i < today.length; i++) {
      if (n.min >= today[i][0] && n.min < today[i][1]) return { open: true, text: 'Aperto ora · fino alle ' + hhmm(today[i][1]) };
    }
    for (i = 0; i < today.length; i++) {
      if (n.min < today[i][0]) return { open: false, text: 'Chiuso · riapre alle ' + hhmm(today[i][0]) };
    }
    for (var k = 1; k <= 7; k++) {
      var d = (n.day + k) % 7, h = INFO.hours[d];
      if (h && h.length) return { open: false, text: 'Chiuso · riapre ' + (k === 1 ? 'domani' : DAYS[d]) + ' alle ' + hhmm(h[0][0]) };
    }
    return { open: false, text: 'Chiuso' };
  }
  var st = status();
  document.querySelectorAll('[data-status]').forEach(function (el) {
    el.textContent = st.text;
    el.classList.toggle('is-open', st.open);
  });
  var today = romeNow().day;
  document.querySelectorAll('.hours tr[data-day]').forEach(function (tr) {
    if (tr.getAttribute('data-day').split(',').indexOf(String(today)) > -1) tr.classList.add('is-today');
  });

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  var rev = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    rev.forEach(function (el) { io.observe(el); });
  } else {
    rev.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------------------------------
     Sottomenu soluzioni : voce attiva
     ------------------------------------------------------------------ */
  var subLinks = document.querySelectorAll('.subnav a');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        subLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          a.classList.toggle('is-active', on);
          if (on && a.scrollIntoView && window.innerWidth < 900) a.parentNode.scrollTo({ left: a.offsetLeft - 20, behavior: 'smooth' });
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.feature[id]').forEach(function (s) { so.observe(s); });
  }

  /* ------------------------------------------------------------------
     Galleria : filtri + lightbox
     ------------------------------------------------------------------ */
  var filters = document.querySelectorAll('.filters button');
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      filters.forEach(function (x) { x.classList.toggle('is-active', x === b); });
      document.querySelectorAll('.gallery a').forEach(function (a) {
        a.classList.toggle('is-hidden', f !== 'all' && a.getAttribute('data-cat') !== f);
      });
    });
  });

  var lb = document.querySelector('.lightbox'), lbItems = [], lbIdx = 0;
  function lbShow(i) {
    lbIdx = (i + lbItems.length) % lbItems.length;
    var a = lbItems[lbIdx], img = lb.querySelector('img');
    img.classList.remove('is-in');
    setTimeout(function () {
      img.src = a.getAttribute('href');
      img.alt = a.getAttribute('data-title') || '';
      lb.querySelector('figcaption').textContent = a.getAttribute('data-title') || '';
      var done = function () { requestAnimationFrame(function () { img.classList.add('is-in'); }); };
      if (img.complete) done(); else img.onload = done;
    }, lb.classList.contains('is-open') ? 350 : 0);
  }
  function closeLb() { if (lb) { lb.classList.remove('is-open'); document.body.style.overflow = ''; } }
  if (lb) {
    document.querySelectorAll('[data-lightbox]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        lbItems = [].filter.call(document.querySelectorAll('[data-lightbox]'), function (x) { return !x.classList.contains('is-hidden'); });
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        lbShow(lbItems.indexOf(a));
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', function () { lbShow(lbIdx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { lbShow(lbIdx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
      if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
    });
  }

  /* ------------------------------------------------------------------
     Modulo preventivo -> WhatsApp
     ------------------------------------------------------------------ */
  var form = document.querySelector('[data-wa-form]');
  if (form) {
    var q = new URLSearchParams(location.search).get('tipo');
    if (q && form.tipo) form.tipo.value = q;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var msg = 'Buongiorno TeKnoProfil, sono ' + f.nome.value.trim() +
        (f.comune.value.trim() ? ' da ' + f.comune.value.trim() : '') + '.\n' +
        'Vorrei un preventivo gratuito per: ' + f.tipo.value + '.\n' +
        (f.messaggio.value.trim() ? '\n' + f.messaggio.value.trim() + '\n' : '') +
        '\nRecapito: ' + f.telefono.value.trim();
      window.open('https://wa.me/' + INFO.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }

  /* Anno nel footer */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
