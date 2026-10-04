/**
 * Logique du portfolio — JavaScript natif, sans module ni build.
 * Le contenu se modifie dans js/data.js (chargé avant ce fichier).
 */
'use strict';

/* ════════════════════ utils ════════════════════ */
const Utils = (() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /** Échappe une chaîne avant insertion dans du HTML. */
  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;opacity:0';
      document.body.append(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    }
  }

  /** Garde le focus clavier dans `container` ; renvoie une fonction de nettoyage. */
  function trapFocus(container) {
    const previous = document.activeElement;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const items = $$(selector, container).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    container.addEventListener('keydown', onKey);
    return () => {
      container.removeEventListener('keydown', onKey);
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }

  /** Icônes d'interface (tracés style Lucide, 24×24, trait). */
  const paths = {
    server:
      '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 2h2l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 7H5.1"/>',
    rocket:
      '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    cloud: '<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78A7 7 0 1 0 4 15.9"/><path d="M4 16a3 3 0 0 0 3 3h10.5"/>',
    arrowRight: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone:
      '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>',
    command: '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  };

  function icon(name, size = 20, extra = '') {
    return `<svg class="icon ${extra}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] ?? ''}</svg>`;
  }

  return { $, $$, esc, reducedMotion, finePointer, copyText, trapFocus, icon };
})();

/* ════════════════════ i18n ════════════════════ */
const I18n = (() => {
  const strings = UI_STRINGS;

  const STORAGE_KEY = 'lang';
  const listeners = new Set();

  function readStored() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'en' || v === 'fr' ? v : null;
    } catch {
      return null;
    }
  }

  /** Langue du fichier chargé : index.html (fr) ou en.html (en), d'après son attribut lang. */
  const PAGE_LANG = document.documentElement.lang === 'en' ? 'en' : 'fr';
  // La page anglaise s'affiche toujours en anglais ; l'accueil reprend la langue choisie lors d'une visite précédente.
  let current = PAGE_LANG === 'en' ? 'en' : (readStored() ?? 'fr');

  const getLang = () => current;

  /** Traduit une clé d'interface. */
  function t(key) {
    return strings[current][key] ?? strings.fr[key] ?? key;
  }

  /** Résout un texte de données { fr, en } (les chaînes simples passent telles quelles). */
  function l(value) {
    if (value == null) return '';
    if (typeof value === 'string' || Array.isArray(value)) return value;
    return value[current] ?? value.fr;
  }

  function onLangChange(fn) {
    listeners.add(fn);
  }

  function applyStaticTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
    document.documentElement.lang = current;
    document.title = t('meta.title');
    const setMeta = (selector, value) => document.querySelector(selector)?.setAttribute('content', value);
    setMeta('meta[name="description"]', t('meta.description'));
    setMeta('meta[property="og:title"]', t('meta.title'));
    setMeta('meta[name="twitter:title"]', t('meta.title'));
    setMeta('meta[property="og:locale"]', current === 'fr' ? 'fr_FR' : 'en_US');
    setMeta('meta[property="og:locale:alternate"]', current === 'fr' ? 'en_US' : 'fr_FR');
    setMeta('meta[property="og:url"]', pageURL(current));
  }

  /** URL publique de l'accueil d'une langue : la racine en français, en.html en anglais. */
  const pageURL = (lang) => profile.website + seo.home[lang];

  /** Garde l'URL de la barre d'adresse alignée sur la langue affichée (pour les liens partagés). */
  function syncURL() {
    try {
      const url = new URL(location.href);
      // ?lang= seulement quand la langue affichée n'est pas celle du fichier (index.html?lang=en, en.html?lang=fr).
      if (current === PAGE_LANG) url.searchParams.delete('lang');
      else url.searchParams.set('lang', current);
      history.replaceState(history.state, '', url);
    } catch {
      /* history indisponible */
    }
  }

  function setLang(lang) {
    if (lang === current || !strings[lang]) return;
    current = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* stockage indisponible */
    }
    applyStaticTranslations();
    syncURL();
    listeners.forEach((fn) => fn(lang));
  }

  const toggleLang = () => setLang(current === 'fr' ? 'en' : 'fr');

  return { getLang, t, l, onLangChange, applyStaticTranslations, setLang, toggleLang };
})();

/* ════════════════════ scroll ════════════════════ */
const Scroll = (() => {
  const { finePointer, reducedMotion } = Utils;
  const LENIS_SRC = 'https://unpkg.com/lenis@1.3.26/dist/lenis.min.js';

  let lenis = null;

  /** Défilement fluide avec Lenis (chargé depuis le CDN), sauf si l'utilisateur réduit les animations. */
  /** Défilement fluide (souris uniquement) : Lenis est chargé après coup pour ne pas retarder l'affichage. */
  function initSmoothScroll() {
    if (reducedMotion() || !finePointer()) return;
    const script = document.createElement('script');
    script.src = LENIS_SRC;
    script.async = true;
    script.onload = startLenis;
    document.head.append(script);
  }

  function startLenis() {
    if (typeof window.Lenis !== 'function') return;
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    if (locks > 0) lenis.stop();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = id === 'home' ? 0 : -64;
    if (lenis) {
      lenis.scrollTo(target, { offset });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
    // Déplace le focus pour les utilisateurs clavier / lecteurs d'écran, sans sauter.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', id === 'home' ? location.pathname + location.search : `#${id}`);
  }

  let locks = 0;
  /** Bloque le défilement de la page (modale, menu mobile, palette). */
  function lockScroll(lock) {
    locks = Math.max(0, locks + (lock ? 1 : -1));
    const locked = locks > 0;
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    if (lenis) locked ? lenis.stop() : lenis.start();
  }

  return { initSmoothScroll, scrollToId, lockScroll };
})();

/* ════════════════════ effects ════════════════════ */
const Effects = (() => {
  const { $, $$, finePointer, reducedMotion } = Utils;

  /* ---------- Révélations au scroll ---------- */
  let revealObserver;
  function initReveal() {
    $$('[data-delay]').forEach((el) => el.style.setProperty('--d', el.dataset.delay));
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      $$('.reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-visible');
          revealObserver.unobserve(e.target);
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    $$('.reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el));
    observeOnce($('#process-steps'), (el) => el.classList.add('is-visible'));
    observeOnce($('#pipeline'), (el) => el.classList.add('is-visible'));
  }

  /** Exécute `fn` une seule fois quand l'élément devient visible. */
  function observeOnce(el, fn, threshold = 0.3) {
    if (!el) return;
    if (reducedMotion() || !('IntersectionObserver' in window)) return fn(el);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          fn(el);
        }
      },
      { threshold },
    );
    io.observe(el);
  }

  /* ---------- Texte découpé lettre par lettre ---------- */
  function splitText() {
    $$('[data-split]').forEach((el) => {
      el.innerHTML = [...el.dataset.split]
        .map((c, i) => `<span class="char" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`)
        .join('');
    });
  }

  /* ---------- Machine à écrire (rôles) ---------- */
  function typewriter(el, words) {
    if (!el || !words.length) return;
    if (reducedMotion()) {
      el.textContent = words.join(' · ');
      return;
    }
    let w = 0;
    let c = 0;
    let deleting = false;
    const tick = () => {
      const word = words[w % words.length];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      let delay = deleting ? 40 : 75;
      if (!deleting && c === word.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && c === 0) {
        deleting = false;
        w += 1;
        delay = 350;
      }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- Compteurs ---------- */
  let countersDone = false;
  function initCounters() {
    const els = $$('[data-count]');
    if (countersDone || reducedMotion()) {
      els.forEach((el) => (el.textContent = el.dataset.count));
      countersDone = true;
      return;
    }
    observeOnce($('#stats'), () => {
      countersDone = true;
      $$('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / 1600);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, 0.5);
  }

  /* ---------- Barres de niveau ---------- */
  function initLevels() {
    observeOnce($('.levels'), (el) => el.classList.add('is-visible'));
  }

  function initMagnetic() {
    if (!finePointer() || reducedMotion()) return;
    let active = null;
    document.addEventListener('pointermove', (e) => {
      const el = e.target.closest?.('.magnetic');
      if (active && active !== el) {
        active.style.transform = '';
        active = null;
      }
      if (!el) return;
      active = el;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
      el.style.transition = 'transform 0.15s ease-out';
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    document.addEventListener('pointerleave', () => active && (active.style.transform = ''), true);
  }

  /* ---------- Inclinaison 3D des cartes projet ---------- */
  function initTilt(container) {
    if (!container || !finePointer() || reducedMotion()) return;
    container.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.project');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 7}deg)`;
      card.style.setProperty('--gx', `${px * 100}%`);
      card.style.setProperty('--gy', `${py * 100}%`);
    });
    container.addEventListener(
      'pointerout',
      (e) => {
        const card = e.target.closest('.project');
        if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
      },
      true,
    );
  }

  /* ---------- Barre de progression, nav « glass », parallaxe du Hero ---------- */
  function initScrollEffects() {
    const nav = $('#nav');
    const bar = $('#scroll-progress');
    const scene = $('#hero-scene');
    const reduce = reducedMotion();
    let ticking = false;
    let lastY = window.scrollY;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        nav.classList.toggle('is-hidden', delta > 0 && y > innerHeight * 0.8);
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
      nav.classList.toggle('is-scrolled', y > 24);
      if (!reduce && y < innerHeight * 1.2) scene.style.setProperty('--sy', (y * 0.35).toFixed(1));
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
    update();

    if (!reduce && finePointer()) {
      window.addEventListener(
        'pointermove',
        (e) => {
          scene.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3));
          scene.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3));
        },
        { passive: true },
      );
    }
  }

  return { initReveal, observeOnce, splitText, typewriter, initCounters, initLevels, initMagnetic, initTilt, initScrollEffects };
})();

/* ════════════════════ render ════════════════════ */
const Render = (() => {
  const { l, t } = I18n;
  const { $, esc, icon } = Utils;

  /** Sections de la navigation, dans l'ordre de la page. */
  const NAV = ['home', 'expertise', 'about', 'work', 'experience', 'education', 'contact'];

  const state = { skillFilter: 'all', projectFilter: 'all', openAccordion: 'bici' };

  // Logos embarqués (js/icons.js) : une seule feuille de style, aucune requête réseau par logo.
  if (typeof ICON_PATHS === 'object') {
    const style = document.createElement('style');
    style.textContent = Object.entries(ICON_PATHS)
      .map(([slug, d]) => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${d}"/></svg>`;
        return `.logo[data-i="${slug}"]{--logo:url("data:image/svg+xml,${encodeURIComponent(svg)}")}`;
      })
      .join('');
    document.head.append(style);
  }
  const logo = (slug) => {
    if (!slug) return '<span class="logo logo--none" aria-hidden="true"></span>';
    if (typeof ICON_PATHS === 'object' && ICON_PATHS[slug]) return `<span class="logo" data-i="${esc(slug)}" aria-hidden="true"></span>`;
    return `<span class="logo" style="--logo:url('${ICON_CDN}${esc(slug)}.svg')" aria-hidden="true"></span>`;
  };

  const tags = (items) => items.map((s) => `<li class="tag">${esc(l(s))}</li>`).join('');
  const bullets = (items) => items.map((s) => `<li>${esc(s)}</li>`).join('');
  /** Page statique d'une étude de cas (générée par tools/prerender.mjs), relative à la racine du site. */
  const projectHref = (p) => `${seo.projects[I18n.getLang()]}/${p.id}/`;

  /* ---------- Navigation ---------- */
  /** Sections affichées dans les menus (l'accueil passe par le logo). */
  const MENU = NAV.filter((id) => id !== 'home');

  const fill = (key, vars) => t(key).replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');

  /** Résumé du contenu de chaque section, calculé à partir de data.js. */
  function sectionSummary(id) {
    const skillCount = skillCategories.reduce((n, c) => n + c.skills.length, 0);
    const uniq = (list) => [...new Set(list)];
    switch (id) {
      case 'expertise':
        return fill('nav.d.expertise', { n: skillCount, areas: expertise.map((e) => l(e.title)).join(', ') });
      case 'about':
        return fill('nav.d.about', { location: l(profile.location), languages: profile.languages.map((x) => l(x.name)).join(', ') });
      case 'work':
        return fill('nav.d.work', { n: projects.length, clients: uniq(projects.map((p) => p.client)).slice(0, 3).join(', ') });
      case 'experience':
        return fill('nav.d.experience', { years: profile.yearsOfExperience, companies: experiences.map((e) => e.company).join(', ') });
      case 'education':
        return fill('nav.d.education', { degree: education[0] ? education[0].school : '' });
      case 'contact':
        return fill('nav.d.contact', { availability: l(profile.availability) });
      default:
        return '';
    }
  }

  function renderNav() {
    const label = (id) => t(`nav.${id}`);
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    $('#brand-role').textContent = l(profile.title);
    $('.brand').setAttribute('aria-label', `Safidy H. ${l(profile.title)} — ${t('nav.brandLabel')}`);
    $('#nav-cv').setAttribute('href', l(profile.cv));

    $('#nav-links').innerHTML = MENU.map(
      (id) => `
      <li>
        <a class="nav__link" href="#${id}" data-scroll="${id}" data-nav="${id}" aria-describedby="nav-d-${id}">${esc(label(id))}</a>
        <div class="nav__preview" id="nav-d-${id}" role="tooltip"><strong>${esc(cap(label(id)))}</strong><span>${esc(sectionSummary(id))}</span></div>
      </li>`,
    ).join('');

    $('#mobile-links').innerHTML = MENU.map(
      (id, i) => `
      <li style="--i:${i}">
        <a class="m-link" href="#${id}" data-scroll="${id}" data-nav="${id}">
          <span class="m-link__body">
            <span class="m-link__label">${esc(label(id))}</span>
            <span class="m-link__desc">${esc(sectionSummary(id))}</span>
          </span>
          ${icon('arrowRight', 20)}
        </a>
      </li>`,
    ).join('');

    const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`;
    const socials = profile.socials.filter((s) => s.href);
    $('#mobile-footer').innerHTML = `
      <p class="m-available" style="--i:${MENU.length}"><span class="pulse" aria-hidden="true"></span>${esc(t('hero.available'))}</p>
      <div style="--i:${MENU.length + 1}">
        <p class="mobile-menu__label">${esc(t('nav.quick'))}</p>
        <div class="m-quick">
          <a href="mailto:${esc(profile.email)}">${icon('mail', 20)}<span>${esc(t('nav.write'))}</span></a>
          <a href="${phoneHref}">${icon('phone', 20)}<span>${esc(t('nav.call'))}</span></a>
          <a class="is-primary" href="${esc(l(profile.cv))}" download>${icon('download', 20)}<span>${esc(t('nav.cvShort'))}</span></a>
        </div>
      </div>
      <div class="m-bottom" style="--i:${MENU.length + 2}">
        <div class="lang-switch" role="group" aria-label="${esc(t('a11y.lang'))}">
          <button type="button" data-lang="fr" lang="fr">FR</button>
          <button type="button" data-lang="en" lang="en">EN</button>
        </div>
        <span>${socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="me noopener noreferrer">${esc(s.label)}</a>`).join(' · ') || esc(l(profile.location))}</span>
      </div>`;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    $('#hero-line').textContent = l(profile.heroLine);
    $('#roles-sr').textContent = profile.roles.join(', ');
    $('#clients').innerHTML = clients.map((c) => `<li>${esc(c)}</li>`).join('');
  }

  /** Années d'usage et références d'un point fort, déduites des expériences et des projets. */
  function strengthEvidence(strength) {
    const uses = (stack = []) => stack.some((x) => strength.match.includes(x));
    const firstYear = (text) => Number(String(text).match(/\d{4}/)?.[0]);
    const sources = [
      ...experiences.filter((e) => uses(e.stack)).map((e) => ({ name: e.company, year: firstYear(l(e.period)) })),
      ...projects.filter((p) => uses(p.stack)).map((p) => ({ name: p.client, year: firstYear(l(p.year)) })),
    ];
    const since = Math.min(...sources.map((x) => x.year).filter(Boolean));
    return { since, years: new Date().getFullYear() - since, refs: [...new Set(sources.map((x) => x.name))] };
  }

  /* ---------- Expertise, à propos, compétences ---------- */
  const underlineColors = { amber: 'var(--accent)', cream: 'var(--accent-soft)', copper: 'var(--accent-deep)' };

  function renderExpertise() {
    $('#expertise-cards').innerHTML = expertise
      .map(
        (e) => `
        <article class="exp-card">
          <div class="exp-card__head">
            <span class="exp-card__icon">${icon(e.icon, 28)}</span>
            <h3 class="exp-card__title" style="--u:${underlineColors[e.underline]}">
              <u>${esc(l(e.title))}</u>
              <small>${esc(l(e.subtitle))}</small>
            </h3>
          </div>
          <p class="exp-card__text">${esc(l(e.text))}</p>
          <ul class="exp-card__tech">${tags(e.tech)}</ul>
        </article>`,
      )
      .join('');

    renderDelivery();

    $('#about-text').textContent = l(profile.about);
    $('#about-meta').innerHTML = `
      <dl><dt>${esc(t('contact.location'))}</dt><dd>${esc(l(profile.location))}<br /><span>${esc(l(profile.availability))}</span></dd></dl>
      <dl><dt>${esc(t('about.languages'))}</dt>${profile.languages
        .map((x) => `<dd>${esc(l(x.name))} <span>— ${esc(l(x.level))}</span></dd>`)
        .join('')}</dl>
      <dl><dt>${esc(t('about.interests'))}</dt>${profile.interests.map((x) => `<dd>${esc(l(x))}</dd>`).join('')}</dl>`;
    const photo = $('#profile-photo');
    photo.src = profile.photo;
    photo.srcset = profile.photoSmall ? `${profile.photoSmall} 560w, ${profile.photo.replace('.webp', '-720.webp')} 720w, ${profile.photo} 960w` : '';
    $('#portrait-role').textContent = `${l(profile.title)} · ${l(profile.location).split(',')[0]}`;
    $('#about-heading').textContent = l(profile.tagline);
    $('#about-cv').setAttribute('href', l(profile.cv));

    $('#stats').innerHTML = stats
      .map(
        (s) => `
        <li>
          <p class="stats__value"><span class="sr-only">${s.value}${esc(l(s.suffix))}</span><span aria-hidden="true"><span data-count="${s.value}">0</span><em>${esc(l(s.suffix))}</em></span></p>
          <p class="stats__label">${esc(l(s.label))}</p>
        </li>`,
      )
      .join('');

    renderSkillFilters();
    renderSkills();

    $('#levels').innerHTML = strengths
      .map((s, i) => {
        const { since, years, refs } = strengthEvidence(s);
        const shown = refs.slice(0, 3).join(', ') + (refs.length > 3 ? ` +${refs.length - 3}` : '');
        return `
        <li class="strength" style="--i:${i}">
          <span class="strength__logo">${logo(s.icon)}</span>
          <div class="strength__body">
            <div class="strength__head">
              <h4 class="strength__name">${esc(l(s.name))}</h4>
              <span class="strength__years"><strong>${years}</strong> ${esc(t('expertise.years'))}</span>
            </div>
            <p class="strength__text">${esc(l(s.text))}</p>
            <p class="strength__refs">${esc(t('expertise.since'))} ${since} · ${esc(shown)}</p>
          </div>
        </li>`;
      })
      .join('');

    const items = marquee.map((m) => `<li>${logo(m.icon)}${esc(m.name)}</li>`).join('');
    $('#marquee').innerHTML = items + items;
  }

  function renderSkillFilters() {
    const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
    const btn = (id, label, count) =>
      `<button type="button" data-skill-filter="${id}" aria-pressed="${state.skillFilter === id}">${esc(label)}<sup>${count}</sup></button>`;
    $('#skill-filters').innerHTML =
      btn('all', t('expertise.all'), total) + skillCategories.map((c) => btn(c.id, l(c.label), c.skills.length)).join('');
  }

  function renderSkills() {
    const list = skillCategories
      .filter((c) => state.skillFilter === 'all' || c.id === state.skillFilter)
      .flatMap((c) => c.skills);
    $('#skills-grid').innerHTML = list
      .map((s, i) => {
        const name = l(s.name);
        return `<li class="chip" style="--i:${i}" title="${esc(name)}">${logo(s.icon)}<span>${esc(name)}</span></li>`;
      })
      .join('');
  }

  function setSkillFilter(id) {
    state.skillFilter = id;
    renderSkillFilters();
    renderSkills();
  }

  /* ---------- Réalisations ---------- */
  function mockHTML(p) {
    const { from, to, mock } = p.cover;
    const vars = `--from:${from};--to:${to}`;
    if (p.image) {
      return `<div class="mock-cover" style="${vars}"><img src="${esc(p.image)}" alt="${esc(l(p.title))}" loading="lazy" decoding="async" width="1600" height="1000"${p.imagePosition ? ` style="object-position:${esc(p.imagePosition)}"` : ''} /></div>`;
    }
    // Visuel « logo » : grande icône de boutique en ligne et noms de domaine, sans fenêtre de navigateur
    if (mock === 'store') {
      const domains = (p.cover.labels ?? []).map((d) => `<span>${esc(d)}</span>`).join('');
      return `<div class="mock-cover mock-store" style="${vars}"><span class="mock-store__icon">${icon('cart', 56)}</span><span class="mock-store__label">${esc(t('work.onlineStore'))}</span><div class="mock-store__domains">${domains}</div></div>`;
    }
    const bar = '<div class="mock__bar"><i></i><i></i><i></i><b></b></div>';
    const lines = (n, widths = []) =>
      Array.from({ length: n }, (_, i) => `<div class="mock__line" style="width:${widths[i] ?? 100}%"></div>`).join('');
    let body = '';
    switch (mock) {
      case 'dashboard':
        body = `<div class="mock__side">${'<i></i>'.repeat(6)}</div>
          <div class="mock__main"><div class="mock__line mock__line--title"></div>
          ${'<div class="mock__row"><i></i><i></i><i></i></div>'.repeat(6)}</div>`;
        break;
      case 'seats':
        // Plan de salle : scène, places libres, occupées et sélectionnées
        body = `<div class="mock__main"><div class="mock__line mock__line--title"></div><div class="mock__stage"></div>
          <div class="mock__seats">${Array.from({ length: 40 }, (_, i) => `<i class="${[3, 4, 11, 17, 18, 25, 33].includes(i) ? 'is-taken' : [21, 22].includes(i) ? 'is-picked' : ''}"></i>`).join('')}</div></div>`;
        break;
      case 'shop':
        body = `<div class="mock__main"><div class="mock__line mock__line--title"></div>
          <div class="mock__tiles">${'<i></i>'.repeat(6)}</div></div>`;
        break;
      case 'stock':
        body = `<div class="mock__main"><div class="mock__line mock__line--title"></div>${lines(2, [80, 60])}
          <div class="mock__bars">${[90, 65, 30, 80, 20, 55, 70].map((h) => `<i style="height:${h}%"></i>`).join('')}</div>
          ${'<div class="mock__row"><i></i><i></i><i></i></div>'.repeat(3)}</div>`;
        break;
      case 'chart':
        body = `<div class="mock__main"><div class="mock__line mock__line--title"></div>
          <div class="mock__bars">${[40, 70, 55, 90, 65, 100, 80, 60].map((h) => `<i style="height:${h}%"></i>`).join('')}</div>
          ${lines(2, [70, 45])}</div>`;
        break;
      case 'pipeline':
        body = `<div class="mock__main"><div class="mock__line mock__line--title"></div>
          <div class="mock__pipe"><i class="done"></i><b></b><i class="done"></i><b></b><i class="done"></i><b></b><i></i></div>
          ${lines(4, [90, 75, 85, 50])}</div>`;
        break;
      default:
        body = `<div class="mock__main"><div class="mock__hero"></div><div class="mock__line mock__line--title"></div>${lines(3, [95, 80, 60])}
          <div class="mock__tiles">${'<i></i>'.repeat(3)}</div></div>`;
    }
    return `<div class="mock-cover" style="${vars}"><div class="mock">${bar}<div class="mock__body">${body}</div></div></div>`;
  }

  function renderFeatured() {
    const p = projects.find((x) => x.featured) ?? projects[0];
    $('#featured').innerHTML = `
      <div class="featured__device" aria-hidden="true">${mockHTML(p)}</div>
      <svg class="featured__arrow" viewBox="0 0 120 70" fill="none" aria-hidden="true">
        <path d="M8 62 C 30 60, 70 50, 104 12" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
        <path d="M84 12 L106 8 L102 30" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="featured__label">${esc(t('work.featured'))}</p>
      <p class="featured__title">${esc(l(p.title))}</p>
      <button type="button" class="btn btn--primary magnetic" data-project="${p.id}">${esc(t('work.view'))}</button>`;
  }

  function renderProjectFilters() {
    const count = (id) => projects.filter((p) => id === 'all' || p.category === id).length;
    const btn = (id, label) =>
      `<button type="button" data-project-filter="${id}" aria-pressed="${state.projectFilter === id}">${esc(label)}<sup>${String(count(id)).padStart(2, '0')}</sup></button>`;
    $('#project-filters').setAttribute('aria-label', t('work.filterBy'));
    $('#project-filters').innerHTML =
      `<span class="label">${esc(t('work.filterBy'))}</span>` +
      [btn('all', t('work.all')), ...projectFilters.map((f) => btn(f.id, l(f.label)))].join('<span class="sep" aria-hidden="true">/</span>');
  }

  function renderProjects() {
    const categoryLabel = (id) => l(projectFilters.find((f) => f.id === id)?.label ?? '');
    $('#projects').innerHTML = projects
      .filter((p) => state.projectFilter === 'all' || p.category === state.projectFilter)
      .map(
        (p, i, list) => `
        <li class="project project--${p.size}${i === list.length - 1 && list.filter((x) => x.size !== 'wide' && x.size !== 'full').length % 2 ? ' project--fill' : ''}" style="--i:${i}">
          <div class="project__cover">${mockHTML(p)}</div>
          <div class="project__caption">
            <h3 class="project__title"><a href="${projectHref(p)}" data-project="${p.id}" aria-haspopup="dialog">${esc(l(p.title))}</a></h3>
            <p class="project__meta">${esc([categoryLabel(p.category), p.client, l(p.year)].filter(Boolean).join(' · '))}</p>
          </div>
          <span class="project__glare" aria-hidden="true"></span>
        </li>`,
      )
      .join('');
  }

  function setProjectFilter(id) {
    state.projectFilter = id;
    renderProjectFilters();
    renderProjects();
  }

  /** Contenu de la modale « étude de cas ». */
  function caseStudyHTML(p) {
    const blocks = [
      ['work.context', `<p>${esc(l(p.context))}</p>`],
      ['work.problem', `<p>${esc(l(p.problem))}</p>`],
      ['work.solution', `<ul class="bullets">${bullets(l(p.solution))}</ul>`],
      ['work.stack', `<ul class="tags" style="margin:0">${tags(p.stack)}</ul>`],
      ['work.role', `<p>${esc(l(p.role))}</p>`],
      ['work.result', `<p class="case__result">${esc(l(p.result))}</p>`],
    ];
    const links = [
      p.demoUrl && `<a class="btn btn--primary" href="${esc(p.demoUrl)}" target="_blank" rel="noopener noreferrer">${esc(t('work.demo'))} ${icon('arrowUpRight', 16)}</a>`,
      p.codeUrl && `<a class="btn btn--ghost" href="${esc(p.codeUrl)}" target="_blank" rel="noopener noreferrer">${icon('github', 16)} ${esc(t('work.code'))}</a>`,
    ].filter(Boolean);
    return `
      <button type="button" class="modal__close" data-close aria-label="${esc(t('a11y.close'))}">${icon('x', 18)}</button>
      <div class="modal__cover${p.image ? ' modal__cover--photo' : ''}">${mockHTML(p)}</div>
      <div class="modal__body">
        <p class="modal__meta">${esc([p.client, l(p.year)].filter(Boolean).join(' · '))}</p>
        <h2 class="modal__title" id="modal-title">${esc(l(p.title))}</h2>
        <p class="modal__summary">${esc(l(p.summary))}</p>
        <div class="case">
          ${blocks.map(([k, html], i) => `<section class="case__block" style="--i:${i}"><h3>${esc(t(k))}</h3><div>${html}</div></section>`).join('')}
        </div>
        ${links.length ? `<div class="modal__links">${links.join('')}</div>` : ''}
      </div>`;
  }

  /* ---------- Livraison continue (CI/CD) expliquée aux clients ---------- */
  function renderDelivery() {
    $('#delivery-intro').innerHTML = `
      <p class="eyebrow">${esc(l(delivery.eyebrow))}</p>
      <h3 class="delivery__title">${esc(l(delivery.title))}</h3>
      <p class="delivery__text">${esc(l(delivery.text))}</p>`;
    $('#pipeline').innerHTML =
      delivery.steps
        .map(
          (s, i) => `
        <li class="pipeline__step${i === delivery.steps.length - 1 ? ' pipeline__step--live' : ''}" style="--i:${i}">
          <span class="pipeline__node">${icon(s.icon, 22)}</span>
          <span class="pipeline__num">${String(i + 1).padStart(2, '0')}</span>
          <h4 class="pipeline__title">${esc(l(s.title))}</h4>
          <p class="pipeline__text">${esc(l(s.text))}</p>
          ${s.tech ? `<p class="pipeline__tech">${esc(l(s.tech))}</p>` : ''}
        </li>`,
        )
        .join('') + '<li class="pipeline__pulse" aria-hidden="true"></li>';
    $('#delivery-benefits').innerHTML = delivery.benefits.map((b) => `<li>${icon('check', 16)}<span>${esc(l(b))}</span></li>`).join('');
  }

  /* ---------- Méthode ---------- */
  function renderProcess() {
    $('#process-steps').innerHTML = processSteps
      .map(
        (s, i) => `
        <li class="step">
          <span class="step__line" style="--i:${i}" aria-hidden="true"></span>
          <span class="step__num">${String(i + 1).padStart(2, '0')}</span>
          <h3 class="step__title">${esc(l(s.title))}</h3>
          <p class="step__text">${esc(l(s.text))}</p>
          <ul class="step__tech">${tags(s.tech)}</ul>
        </li>`,
      )
      .join('');
  }

  /* ---------- Expérience ---------- */
  function renderExperience() {
    $('#experience-list').innerHTML = experiences
      .map((e) => {
        const open = state.openAccordion === e.id;
        const missions = e.missions?.length
          ? `<div class="missions"><p class="missions__title">${esc(t('experience.missions'))}</p>${e.missions
              .map(
                (m) => `
                <article class="mission">
                  <div class="mission__head"><h4>${esc(l(m.title))}</h4><span>${esc(l(m.period))}</span></div>
                  <ul class="bullets">${bullets(l(m.highlights))}</ul>
                  <ul class="tags">${tags(m.stack)}</ul>
                </article>`,
              )
              .join('')}</div>`
          : '';
        return `
        <li>
          <h3>
            <button type="button" class="acc__trigger" id="acc-${e.id}" aria-expanded="${open}" aria-controls="acc-panel-${e.id}" data-accordion="${e.id}">
              <span class="acc__role">${esc(l(e.role))} @ ${esc(e.company)}</span>
              <span class="acc__period">${esc(l(e.period))}</span>
              <span class="acc__plus">${icon('plus', 16)}</span>
            </button>
          </h3>
          <div class="acc__panel${open ? ' is-open' : ''}" id="acc-panel-${e.id}" role="region" aria-labelledby="acc-${e.id}">
            <div>
              <div class="acc__content">
                <p class="acc__loc">${esc(l(e.location))}${e.periodDetail ? ` · ${esc(l(e.periodDetail))}` : ''}</p>
                ${e.summary ? `<p class="acc__summary">${esc(l(e.summary))}</p>` : ''}
                <ul class="bullets">${bullets(l(e.highlights))}</ul>
                <ul class="tags">${tags(e.stack)}</ul>
                ${missions}
              </div>
            </div>
          </div>
        </li>`;
      })
      .join('');
    // Les panneaux fermés ne doivent pas être atteignables au clavier.
    document.querySelectorAll('.acc__panel:not(.is-open)').forEach((p) => (p.inert = true));
  }

  function toggleAccordion(id) {
    const btn = document.getElementById(`acc-${id}`);
    const panel = document.getElementById(`acc-panel-${id}`);
    if (!btn || !panel) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
    panel.inert = !open;
    state.openAccordion = open ? id : null;
    // Un seul panneau ouvert à la fois.
    if (open) {
      experiences
        .filter((e) => e.id !== id)
        .forEach((e) => {
          document.getElementById(`acc-${e.id}`)?.setAttribute('aria-expanded', 'false');
          const other = document.getElementById(`acc-panel-${e.id}`);
          if (other) {
            other.classList.remove('is-open');
            other.inert = true;
          }
        });
    }
  }

  /* ---------- Formation ---------- */
  function renderEducation() {
    $('#education-list').innerHTML = education
      .map(
        (e) => `
        <li class="edu">
          <span class="edu__icon">${icon('cap', 20)}</span>
          <div>
            <p class="edu__period">${esc(l(e.period))}${e.current ? `<span class="edu__current">${esc(t('education.current'))}</span>` : ''}</p>
            <h3 class="edu__degree">${esc(l(e.degree))}</h3>
            <p class="edu__school">${esc(e.school)}${e.country ? ` · ${esc(l(e.country))}` : ''}</p>
            ${e.details ? `<p class="edu__details">${esc(l(e.details))}</p>` : ''}
          </div>
        </li>`,
      )
      .join('');
    $('#awards').innerHTML = education
      .filter((e) => e.highlight)
      .map(
        (e) => `
        <article class="award">
          <p class="award__label">${esc(t('education.awards'))}</p>
          <span class="award__icon">${icon('cap', 24)}</span>
          <p class="award__date">${esc(l(e.period))}${e.current ? ` · ${esc(t('education.current'))}` : ''}</p>
          <h3 class="award__title">${esc(l(e.degree))}</h3>
          <p class="award__school">${esc(e.school)}${e.country ? ` · ${esc(l(e.country))}` : ''}</p>
          <p class="award__text">${esc(l(e.highlight.text))}</p>
          <ul class="award__topics">${e.highlight.topics.map((x) => `<li class="tag">${esc(l(x))}</li>`).join('')}</ul>
        </article>`,
      )
      .join('');
  }

  /* ---------- Questions fréquentes ---------- */
  function renderFaq() {
    $('#faq-list').innerHTML = faq
      .map(
        (f) => `
        <details class="faq__item">
          <summary><h3 class="faq__question">${esc(l(f.q))}</h3>${icon('plus', 16)}</summary>
          <div class="faq__answer"><p>${esc(l(f.a))}</p></div>
        </details>`,
      )
      .join('');
  }

  /* ---------- Contact & pied de page ---------- */
  function renderContact() {
    const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`;
    const linkedin = profile.socials.find((s) => s.label === 'LinkedIn' && s.href);
    const others = profile.socials.filter((s) => s.href && s !== linkedin);

    // Une ligne par moyen de contact : icône, libellé, valeur cliquable, bouton copier (ou lien externe).
    const method = ({ iconName, label, value, href, copy, external }) => `
      <li class="method">
        <span class="method__icon">${icon(iconName, 18)}</span>
        <div class="method__text">
          <span class="method__label">${esc(label)}</span>
          <a class="method__value" href="${esc(href)}"${external ? ' target="_blank" rel="me noopener noreferrer"' : ''}>${esc(value)}</a>
        </div>
        ${
          copy
            ? `<button type="button" class="copy-btn" data-copy="${esc(value)}" aria-label="${esc(t('a11y.copy'))} ${esc(label)}">${icon('copy', 15)}</button>`
            : `<a class="copy-btn" href="${esc(href)}" target="_blank" rel="me noopener noreferrer" aria-label="${esc(label)}">${icon('arrowUpRight', 15)}</a>`
        }
      </li>`;

    $('#contact-info').innerHTML = `
      <div class="contact__status">
        <span class="pulse" aria-hidden="true"></span>
        <div>
          <strong>${esc(t('hero.available'))}</strong>
          <span>${esc(t('contact.replyText'))}</span>
        </div>
      </div>
      <ul class="methods">
        ${method({ iconName: 'mail', label: t('contact.email'), value: profile.email, href: `mailto:${profile.email}`, copy: true })}
        ${method({ iconName: 'phone', label: t('contact.phone'), value: profile.phone, href: phoneHref, copy: true })}
        ${linkedin ? method({ iconName: 'linkedin', label: 'LinkedIn', value: t('contact.profile'), href: linkedin.href, external: true }) : ''}
        ${others.map((s) => method({ iconName: s.label.toLowerCase(), label: s.label, value: s.href.replace(/^https?:\/\//, ''), href: s.href, external: true })).join('')}
      </ul>
      <dl class="contact__facts">
        <div>
          <dt>${icon('globe', 15)} ${esc(t('contact.timezone'))}</dt>
          <dd>${esc(profile.timezone)}<span>${esc(t('contact.timezoneHint'))}</span></dd>
        </div>
        <div>
          <dt>${icon('message', 15)} ${esc(t('contact.languages'))}</dt>
          <dd>${esc(profile.languages.map((x) => l(x.name)).join(' · '))}</dd>
        </div>
      </dl>
      <a class="btn btn--ghost contact__cv magnetic" href="${esc(l(profile.cv))}" download>${icon('download', 16)} ${esc(t('nav.cv'))}</a>`;

    $('#footer-copy').textContent = `© 2026 ${profile.firstName} ${profile.lastName}. ${t('footer.rights')}`;
  }

  /** (Re)construit tout le contenu dynamique — appelé au démarrage et à chaque changement de langue. */
  function renderAll() {
    renderNav();
    renderHero();
    renderExpertise();
    renderFeatured();
    renderProjectFilters();
    renderProjects();
    renderProcess();
    renderExperience();
    renderEducation();
    renderFaq();
    renderContact();
  }

  return { NAV, setSkillFilter, mockHTML, setProjectFilter, caseStudyHTML, toggleAccordion, renderAll };
})();

/* ════════════════════ modal ════════════════════ */
const Modal = (() => {
  const { caseStudyHTML } = Render;
  const { lockScroll } = Scroll;
  const { $, reducedMotion, trapFocus } = Utils;

  const modal = $('#modal');
  const dialog = $('#modal-dialog');
  let release = null;
  let closeTimer = null;
  let currentId = null;

  function openProject(id, origin) {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    clearTimeout(closeTimer);
    currentId = id;
    dialog.innerHTML = caseStudyHTML(project);

    // L'animation d'ouverture part de la carte cliquée.
    if (origin) {
      const r = origin.getBoundingClientRect();
      dialog.style.setProperty('--ox', `${((r.left + r.width / 2) / innerWidth) * 100}%`);
      dialog.style.setProperty('--oy', `${((r.top + r.height / 2) / innerHeight) * 100}%`);
    }
    const wasOpen = !modal.hidden;
    modal.hidden = false;
    modal.classList.remove('is-closing');
    dialog.scrollTop = 0;
    if (!wasOpen) {
      lockScroll(true);
      release = trapFocus(dialog);
    }
    $('.modal__close', dialog)?.focus();
  }

  function closeProject() {
    if (modal.hidden || modal.classList.contains('is-closing')) return;
    modal.classList.add('is-closing');
    currentId = null;
    closeTimer = setTimeout(
      () => {
        modal.hidden = true;
        modal.classList.remove('is-closing');
        lockScroll(false);
        release?.();
        release = null;
      },
      reducedMotion() ? 0 : 240,
    );
  }

  /** Re-rend la modale ouverte après un changement de langue. */
  function refreshProject() {
    if (currentId && !modal.hidden) {
      const p = projects.find((x) => x.id === currentId);
      if (p) dialog.innerHTML = caseStudyHTML(p);
    }
  }

  function initModal() {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) closeProject();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeProject();
    });
  }

  return { openProject, closeProject, refreshProject, initModal };
})();

/* ════════════════════ palette ════════════════════ */
const Palette = (() => {
  const { l, t, toggleLang } = I18n;
  const { NAV } = Render;
  const { lockScroll, scrollToId } = Scroll;
  const { $, copyText, esc, icon, reducedMotion, trapFocus } = Utils;

  const palette = $('#palette');
  const input = $('#palette-input');
  const list = $('#palette-list');
  const toast = $('#palette-toast');
  let selected = 0;
  let filtered = [];
  let release = null;
  let closeTimer = null;

  function commands() {
    return [
      ...NAV.map((id) => ({
        id: `go-${id}`,
        group: 'nav',
        label: `${t('palette.goto')} : ${t(`nav.${id}`)}`,
        keywords: id,
        icon: 'arrowRight',
        run: () => scrollToId(id),
      })),
      {
        id: 'lang',
        group: 'actions',
        label: t('palette.lang'),
        keywords: 'langue language english français fr en',
        icon: 'globe',
        run: toggleLang,
      },
      {
        id: 'cv',
        group: 'actions',
        label: t('palette.cv'),
        keywords: 'cv resume pdf télécharger download',
        icon: 'download',
        run: () => {
          const a = document.createElement('a');
          a.href = l(profile.cv);
          a.download = a.href.split('/').pop();
          a.click();
        },
      },
      {
        id: 'email',
        group: 'actions',
        label: t('palette.email'),
        keywords: `email mail copier copy ${profile.email}`,
        icon: 'copy',
        keepOpen: true,
        run: async () => {
          if (await copyText(profile.email)) {
            toast.textContent = t('palette.copied');
            setTimeout(close, 900);
          }
        },
      },
    ];
  }

  function render() {
    const q = input.value.trim().toLowerCase();
    filtered = commands().filter((c) => !q || `${c.label} ${c.keywords}`.toLowerCase().includes(q));
    selected = Math.min(selected, Math.max(0, filtered.length - 1));
    if (!filtered.length) {
      list.innerHTML = `<li class="palette__empty">${esc(t('palette.empty'))}</li>`;
      input.removeAttribute('aria-activedescendant');
      return;
    }
    let html = '';
    ['nav', 'actions'].forEach((group) => {
      const items = filtered.filter((c) => c.group === group);
      if (!items.length) return;
      html += `<li class="palette__group" role="presentation">${esc(t(group === 'nav' ? 'palette.nav' : 'palette.actions'))}</li>`;
      items.forEach((c) => {
        const i = filtered.indexOf(c);
        html += `<li class="palette__item" role="option" id="cmd-${c.id}" data-index="${i}" aria-selected="${i === selected}">${icon(c.icon, 16)}<span>${esc(c.label)}</span></li>`;
      });
    });
    list.innerHTML = html;
    input.setAttribute('aria-activedescendant', `cmd-${filtered[selected].id}`);
    list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }

  async function execute(cmd) {
    if (!cmd) return;
    if (!cmd.keepOpen) close();
    await cmd.run();
  }

  function open() {
    clearTimeout(closeTimer);
    const wasOpen = !palette.hidden && !palette.classList.contains('is-closing');
    if (wasOpen) return;
    // État neuf à chaque ouverture (y compris pendant l'animation de fermeture).
    if (palette.hidden) {
      lockScroll(true);
      release = trapFocus(palette);
    }
    palette.hidden = false;
    palette.classList.remove('is-closing');
    input.value = '';
    toast.textContent = '';
    selected = 0;
    render();
    input.focus();
  }

  function close() {
    if (palette.hidden || palette.classList.contains('is-closing')) return;
    palette.classList.add('is-closing');
    closeTimer = setTimeout(
      () => {
        palette.hidden = true;
        palette.classList.remove('is-closing');
        lockScroll(false);
        release?.();
        release = null;
      },
      reducedMotion() ? 0 : 200,
    );
  }

  const isOpen = () => !palette.hidden && !palette.classList.contains('is-closing');

  function initPalette() {
    input.addEventListener('input', () => {
      selected = 0;
      render();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!filtered.length) return;
        selected = (selected + (e.key === 'ArrowDown' ? 1 : -1) + filtered.length) % filtered.length;
        render();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        execute(filtered[selected]);
      }
    });
    list.addEventListener('mousemove', (e) => {
      const item = e.target.closest('[data-index]');
      if (item && Number(item.dataset.index) !== selected) {
        selected = Number(item.dataset.index);
        render();
      }
    });
    list.addEventListener('click', (e) => {
      const item = e.target.closest('[data-index]');
      if (item) execute(filtered[Number(item.dataset.index)]);
    });
    palette.addEventListener('click', (e) => e.target.closest('[data-close]') && close());
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen() ? close() : open();
      } else if (e.key === 'Escape' && isOpen()) {
        close();
      }
    });
    // Rafraîchit les libellés si la langue change pendant que la palette est ouverte.
    document.addEventListener('langchange', () => isOpen() && render());
  }

  return { open, close, isOpen, initPalette };
})();

/* ════════════════════ contact ════════════════════ */
const Contact = (() => {
  const { t } = I18n;
  const { $, esc, icon } = Utils;

  const { l } = I18n;

  /* Sujets rapides : un clic remplit le champ « Sujet », sans écraser un sujet saisi à la main. */
  let topic = -1;
  const topicLabels = () => contactTopics.flatMap((x) => [x.fr, x.en]);

  function renderTopics() {
    $('#contact-topics').innerHTML = contactTopics
      .map((x, i) => `<button type="button" class="topic" data-topic="${i}" aria-pressed="${i === topic}">${esc(l(x))}</button>`)
      .join('');
  }

  function selectTopic(i) {
    const form = $('#contact-form');
    const subject = form.elements.subject;
    if (!subject.value.trim() || topicLabels().includes(subject.value.trim())) {
      subject.value = l(contactTopics[i]);
      if (touched.has('subject')) validateField(form, 'subject');
    }
    topic = i;
    renderTopics();
  }

  const EMAILJS_SRC = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js';

  const rules = {
    name: (v) => v.length >= 2 || 'contact.v.name',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'contact.v.email',
    subject: (v) => v.length >= 3 || 'contact.v.subject',
    message: (v) => v.length >= 10 || 'contact.v.message',
    human: (checked) => checked || 'contact.v.human',
  };

  /** Un envoi moins de 3 s après l'affichage du formulaire vient d'un robot. */
  const MIN_FILL_MS = 3000;
  let startedAt = 0;

  const touched = new Set();
  let lastStatus = null;

  /* ---------- Google reCAPTCHA v2, vérifié par EmailJS (sinon, case simple) ---------- */
  const RECAPTCHA_SRC = 'https://www.google.com/recaptcha/api.js';
  const useRecaptcha = () => Boolean(EMAILJS.recaptchaSiteKey);
  let recaptchaId = null;

  function renderRecaptcha() {
    if (recaptchaId !== null || !window.grecaptcha?.render) return;
    const form = $('#contact-form');
    const revalidate = () => touched.has('human') && validateField(form, 'human');
    recaptchaId = window.grecaptcha.render('recaptcha', {
      sitekey: EMAILJS.recaptchaSiteKey,
      theme: 'dark',
      callback: revalidate,
      'expired-callback': revalidate,
    });
  }

  /** Charge le script de Google seulement à l'approche du formulaire (il pèse plusieurs centaines de Ko). */
  function loadRecaptcha() {
    if (window.grecaptcha?.render) return renderRecaptcha();
    if (document.querySelector(`script[src^="${RECAPTCHA_SRC}"]`)) return;
    window.onRecaptchaLoad = renderRecaptcha;
    const s = document.createElement('script');
    s.src = `${RECAPTCHA_SRC}?onload=onRecaptchaLoad&render=explicit&hl=${I18n.getLang()}`;
    s.async = true;
    document.head.append(s);
  }

  const recaptchaToken = () => (recaptchaId === null ? '' : window.grecaptcha.getResponse(recaptchaId));

  function validateField(form, name) {
    const input = form.elements[name];
    let value = input.type === 'checkbox' ? input.checked : input.value.trim();
    if (name === 'human' && useRecaptcha()) value = Boolean(recaptchaToken());
    const result = rules[name](value);
    const error = result === true ? '' : t(result);
    $(`#f-${name}-err`).textContent = error;
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
    return !error;
  }

  function loadEmailJS() {
    if (window.emailjs) return Promise.resolve(window.emailjs);
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = EMAILJS_SRC;
      s.onload = () => resolve(window.emailjs);
      s.onerror = reject;
      document.head.append(s);
    });
  }

  function setStatus(type) {
    lastStatus = type;
    const box = $('#form-status');
    if (!type) {
      box.innerHTML = '';
      return;
    }
    const mail = `<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>.`;
    box.innerHTML =
      type === 'success'
        ? esc(t('contact.success'))
        : `${esc(t(type === 'error' ? 'contact.error' : 'contact.notConfigured'))} ${mail}`;
  }

  function setLoading(loading) {
    const btn = $('#submit-btn');
    btn.disabled = loading;
    btn.innerHTML = loading
      ? `<span class="spinner" aria-hidden="true"></span><span>${esc(t('contact.sending'))}</span>`
      : `<span data-i18n="contact.send">${esc(t('contact.send'))}</span>${icon('send', 16)}`;
  }

  function initContact() {
    const form = $('#contact-form');
    startedAt = Date.now();
    setLoading(false);
    renderTopics();
    if (useRecaptcha()) {
      $('.human').hidden = true;
      $('#recaptcha').hidden = false;
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            loadRecaptcha();
          }
        }, { rootMargin: '400px' });
        io.observe(form);
      }
      form.addEventListener('focusin', loadRecaptcha, { once: true });
    }
    $('#contact-topics').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-topic]');
      if (btn) selectTopic(Number(btn.dataset.topic));
    });

    Object.keys(rules).forEach((name) => {
      const input = form.elements[name];
      // La case « Je ne suis pas un robot » n'est vérifiée qu'à l'envoi, ou dès qu'on la coche.
      if (input.type !== 'checkbox') {
        input.addEventListener('blur', () => {
          touched.add(name);
          validateField(form, name);
        });
      }
      input.addEventListener('input', () => touched.has(name) && validateField(form, name));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      Object.keys(rules).forEach((n) => touched.add(n));
      const results = Object.keys(rules).map((n) => validateField(form, n));
      if (results.includes(false)) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      if (form.elements.website.value || Date.now() - startedAt < MIN_FILL_MS) return; // robot (champ piège, envoi instantané)

      const { serviceId, templateId, publicKey } = EMAILJS;
      if (!serviceId || !templateId || !publicKey) {
        setStatus('unconfigured');
        return;
      }

      setLoading(true);
      setStatus(null);
      try {
        const emailjs = await loadEmailJS();
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.elements.name.value.trim(),
            reply_to: form.elements.email.value.trim(),
            subject: form.elements.subject.value.trim(),
            message: form.elements.message.value.trim(),
            to_email: profile.email,
            ...(useRecaptcha() && { 'g-recaptcha-response': recaptchaToken() }),
          },
          // Anti-spam : pas d'envoi depuis un navigateur automatisé, au plus un message toutes les 10 s.
          { publicKey, blockHeadless: true, limitRate: { id: 'contact', throttle: 10000 } },
        );
        form.reset();
        touched.clear();
        topic = -1;
        renderTopics();
        setStatus('success');
      } catch {
        setStatus('error');
      } finally {
        setLoading(false);
        // Une réponse reCAPTCHA ne sert qu'une fois : nouvelle case à cocher pour le message suivant.
        if (recaptchaId !== null) window.grecaptcha.reset(recaptchaId);
      }
    });
  }

  /** Retraduit les messages affichés après un changement de langue. */
  function refreshContact() {
    const form = $('#contact-form');
    if (topic >= 0 && topicLabels().includes(form.elements.subject.value.trim())) form.elements.subject.value = l(contactTopics[topic]);
    renderTopics();
    touched.forEach((name) => validateField(form, name));
    if (lastStatus) setStatus(lastStatus);
    setLoading($('#submit-btn').disabled);
  }

  return { initContact, refreshContact };
})();

/* ════════════════════ main ════════════════════ */
const Main = (() => {
  const { initContact, refreshContact } = Contact;
  const { initCounters, initLevels, initMagnetic, initReveal, initScrollEffects, initTilt, splitText, typewriter } = Effects;
  const { applyStaticTranslations, getLang, onLangChange, setLang } = I18n;
  const { closeProject, initModal, openProject, refreshProject } = Modal;
  const { initPalette, open: openPalette } = Palette;
  const { NAV, renderAll, setProjectFilter, setSkillFilter, toggleAccordion } = Render;
  const { initSmoothScroll, lockScroll, scrollToId } = Scroll;
  const { $, $$, copyText, icon, reducedMotion, trapFocus } = Utils;

  /* ---------- Langue ---------- */
  const params = new URLSearchParams(location.search);
  if (params.get('lang') === 'en' || params.get('lang') === 'fr') setLang(params.get('lang'));

  function syncLangButtons() {
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === getLang())));
  }

  /* ---------- Menu mobile ---------- */
  const nav = $('#nav');
  const burger = $('#burger');
  const mobileMenu = $('#mobile-menu');
  let releaseMenu = null;

  function setMenu(open) {
    if (open === nav.classList.contains('is-open')) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('data-i18n-attr', `aria-label:${open ? 'a11y.menuClose' : 'a11y.menu'}`);
    applyStaticTranslations(nav);
    lockScroll(open);
    $('#main').inert = open;
    document.querySelector('.footer').inert = open;
    if (open) {
      mobileMenu.hidden = false;
      releaseMenu = trapFocus(nav);
      requestAnimationFrame(() => nav.classList.add('is-open'));
    } else {
      nav.classList.remove('is-open');
      releaseMenu?.();
      releaseMenu = null;
      setTimeout(() => !nav.classList.contains('is-open') && (mobileMenu.hidden = true), 600);
    }
  }

  /* ---------- Indicateur glissant de l'îlot de navigation ---------- */
  let activeSection = null;
  const indicator = $('#nav-indicator');

  function moveIndicator(link) {
    if (!link || !link.offsetParent) {
      indicator.classList.remove('is-on');
      return;
    }
    const box = indicator.parentElement.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    indicator.style.width = `${r.width}px`;
    indicator.style.transform = `translateX(${r.left - box.left}px)`;
    indicator.classList.add('is-on');
  }
  const activeLink = () => (activeSection ? $(`#nav-links [data-nav="${activeSection}"]`) : null);

  function initIndicator() {
    const island = $('#nav-island');
    island.addEventListener('pointerover', (e) => {
      const link = e.target.closest('.nav__link');
      if (link) moveIndicator(link);
    });
    island.addEventListener('pointerleave', () => moveIndicator(activeLink()));
    island.addEventListener('focusin', (e) => e.target.matches('.nav__link') && moveIndicator(e.target));
    island.addEventListener('focusout', () => moveIndicator(activeLink()));
    window.addEventListener('resize', () => moveIndicator(activeLink()));
    document.fonts?.ready.then(() => moveIndicator(activeLink()));
  }

  /* ---------- Scroll spy ---------- */
  function setActive(id) {
    activeSection = id === 'home' ? null : id;
    $$('[data-nav]').forEach((a) => {
      if (a.dataset.nav === activeSection) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    moveIndicator(activeLink());
  }

  function initScrollSpy() {
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        // « À propos » est imbriqué dans « Services » : la section la plus intérieure l'emporte.
        const shown = NAV.filter((id) => visible.get(id));
        const el = (id) => document.getElementById(id);
        const current = shown.find((id) => !shown.some((o) => o !== id && el(id).contains(el(o))));
        if (current) setActive(current);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---------- Délégation des clics ---------- */
  function initClicks() {
    document.addEventListener('click', async (e) => {
      const scrollLink = e.target.closest('[data-scroll]');
      if (scrollLink) {
        e.preventDefault();
        const id = scrollLink.dataset.scroll;
        if (nav.classList.contains('is-open')) {
          setMenu(false);
          setTimeout(() => scrollToId(id), 320);
        } else {
          scrollToId(id);
        }
        return;
      }
      const langBtn = e.target.closest('[data-lang]');
      if (langBtn) return setLang(langBtn.dataset.lang);

      const skill = e.target.closest('[data-skill-filter]');
      if (skill) return setSkillFilter(skill.dataset.skillFilter);

      const projectFilter = e.target.closest('[data-project-filter]');
      if (projectFilter) return setProjectFilter(projectFilter.dataset.projectFilter);

      const project = e.target.closest('[data-project]');
      if (project) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        return openProject(project.dataset.project, project.closest('.project') ?? project);
      }

      const acc = e.target.closest('[data-accordion]');
      if (acc) return toggleAccordion(acc.dataset.accordion);

      const copy = e.target.closest('[data-copy]');
      if (copy && (await copyText(copy.dataset.copy))) {
        copy.classList.add('is-copied');
        copy.innerHTML = icon('check', 15);
        setTimeout(() => {
          copy.classList.remove('is-copied');
          copy.innerHTML = icon('copy', 15);
        }, 1600);
      }
    });

    burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $('#palette-trigger').addEventListener('click', openPalette);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
    window.matchMedia('(min-width: 1101px)').addEventListener('change', (m) => m.matches && setMenu(false));
  }

  /* ---------- Preloader ---------- */
  function hidePreloader() {
    return new Promise((resolve) => {
      const pre = $('#preloader');
      const skip = reducedMotion() || document.documentElement.classList.contains('no-preloader');
      const done = () => {
        pre.classList.add('is-done');
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');
        // Le contenu s'anime pendant que l'écran de chargement glisse, sans attendre la fin.
        resolve();
        setTimeout(() => pre.remove(), skip ? 0 : 700);
      };
      if (skip) return done();
      // Au plus 0,9 s : on attend les polices si elles arrivent avant.
      const minDelay = new Promise((r) => setTimeout(r, 700));
      const fonts = document.fonts?.ready ?? Promise.resolve();
      Promise.race([Promise.all([minDelay, fonts]), new Promise((r) => setTimeout(r, 900))]).then(done);
    });
  }

  /* ---------- Démarrage ---------- */
  applyStaticTranslations();
  renderAll();
  syncLangButtons();
  splitText();
  initSmoothScroll();
  initClicks();
  initScrollEffects();
  initIndicator();
  initScrollSpy();
  $('#kbd-hint').textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
  initModal();
  initCounters();
  initLevels();
  // Le reste n'est pas nécessaire au premier affichage : on le prépare quand le navigateur est libre.
  const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200));
  idle(() => {
    initPalette();
    initContact();
    initMagnetic();
    initTilt($('#projects'));
  });

  onLangChange(() => {
    renderAll();
    syncLangButtons();
    setActive(activeSection ?? 'home');
    initCounters();
    refreshProject();
    refreshContact();
    document.dispatchEvent(new CustomEvent('langchange'));
  });

  hidePreloader().then(() => {
    initReveal();
    typewriter($('#typed-role'), profile.roles);
    const hash = location.hash.slice(1);
    if (hash && document.getElementById(hash)) scrollToId(hash);
  });

  // Exposés pour le débogage dans la console.
  window.portfolio = { openProject, closeProject, setLang };

})();
