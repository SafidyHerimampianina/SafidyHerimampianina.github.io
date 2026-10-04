#!/usr/bin/env node
/**
 * Pré-rendu pour le référencement. À relancer après chaque modification de js/data.js ou de index.html :
 *
 *   node tools/prerender.mjs
 *
 * Le site reste statique : ce script écrit simplement en dur, dans le HTML, ce que js/script.js affiche
 * au chargement. Les moteurs de recherche (et les robots qui n'exécutent pas JavaScript) lisent ainsi
 * tout le contenu ; dans le navigateur, script.js le remplace au chargement par un rendu identique.
 *
 *   index.html       page française, mise à jour sur place (blocs <!--pre-->…<!--/pre-->)
 *   en.html          page anglaise, générée à partir de index.html
 *   projets/<id>/    une page par étude de cas, en français
 *   projects/<id>/   la même page, en anglais
 *   sitemap.xml      toutes les pages, avec leurs versions linguistiques
 *
 * Ne modifiez pas à la main en.html, projets/, projects/ ni sitemap.xml : ils sont réécrits à chaque exécution.
 * Prérequis : Node 18+ et Google Chrome (ou Chromium). Autre emplacement : CHROME=/chemin/vers/chrome node tools/prerender.mjs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { LANGS, ROOT, data, escAttr, escText, findChrome, l, readFile, t } from './shared.mjs';

const TODAY = new Date().toLocaleDateString('sv'); // AAAA-MM-JJ (date locale)

const { profile, projects, seo } = data;
const SITE = profile.website;
const NAME = `${profile.firstName} ${profile.lastName}`;
const PERSON = { '@id': `${SITE}#person` };
const WEBSITE = { '@id': `${SITE}#website` };
const unique = (list) => [...new Set(list)];

const homeURL = (lang) => SITE + seo.home[lang];
const projectPath = (p, lang) => `${seo.projects[lang]}/${p.id}/`;
const projectURL = (p, lang) => SITE + projectPath(p, lang);

/** Remplace la première occurrence de `re`, ou s'arrête si le modèle a disparu du HTML. */
function replaceOnce(html, re, replacement, label) {
  if (!re.test(html)) throw new Error(`${label} introuvable dans index.html`);
  return html.replace(re, replacement);
}

/* ════════════════════ rendu par Chrome ════════════════════ */
/** Conteneurs remplis par js/script.js (innerHTML) et textes simples (textContent). */
const CAPTURE_HTML = [
  'nav-links',
  'clients',
  'expertise-cards',
  'delivery-intro',
  'pipeline',
  'delivery-benefits',
  'about-meta',
  'stats',
  'skill-filters',
  'skills-grid',
  'levels',
  'featured',
  'project-filters',
  'projects',
  'process-steps',
  'experience-list',
  'education-list',
  'awards',
  'faq-list',
  'contact-info',
];
const CAPTURE_TEXT = ['brand-role', 'hero-line', 'roles-sr', 'portrait-role', 'about-heading', 'about-text', 'footer-copy'];

/**
 * Ouvre la page dans Chrome sans fenêtre (profil temporaire neuf à chaque fois) et récupère le contenu
 * produit par script.js. Un petit module, exécuté juste après script.js, sérialise ce rendu dans un
 * attribut lu ensuite ici. Les animations sont réduites pour que les compteurs affichent leur valeur finale.
 */
function render(source, lang, chrome) {
  const probe = `<script type="module">
      const pick = (ids, prop) => Object.fromEntries(ids.map((id) => [id, document.getElementById(id)?.[prop] ?? null]));
      const json = JSON.stringify({
        html: pick(${JSON.stringify(CAPTURE_HTML)}, 'innerHTML'),
        text: pick(${JSON.stringify(CAPTURE_TEXT)}, 'textContent'),
        covers: Object.fromEntries(projects.map((p) => [p.id, Render.mockHTML(p)])),
      });
      let binary = '';
      for (const byte of new TextEncoder().encode(json)) binary += String.fromCharCode(byte);
      document.documentElement.dataset.prerender = btoa(binary);
    </script>
  </body>`;
  const page = path.join(ROOT, '.prerender.html');
  fs.writeFileSync(page, source.replace('</body>', () => probe));
  try {
    const dom = execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--force-prefers-reduced-motion',
        '--window-size=1440,900',
        '--virtual-time-budget=5000',
        '--dump-dom',
        `${pathToFileURL(page)}?lang=${lang}`,
      ],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'], timeout: 60_000 },
    );
    const encoded = dom.match(/data-prerender="([^"]+)"/)?.[1];
    if (!encoded) throw new Error(`Rendu « ${lang} » introuvable : la page a-t-elle une erreur JavaScript ?`);
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  } finally {
    fs.rmSync(page, { force: true });
  }
}

/* ════════════════════ morceaux communs ════════════════════ */
function alternates(urls) {
  return [
    `<link rel="alternate" hreflang="fr" href="${urls.fr}" />`,
    `<link rel="alternate" hreflang="en" href="${urls.en}" />`,
    `<link rel="alternate" hreflang="x-default" href="${urls.fr}" />`,
  ].join('\n    ');
}

function jsonLd(graph) {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json.replace(/^/gm, '      ')}\n    </script>`;
}

function personNode(lang) {
  const country = l(profile.location, 'fr').split(',').pop().trim();
  return {
    '@type': 'Person',
    ...PERSON,
    name: NAME,
    givenName: profile.firstName,
    familyName: profile.lastName,
    alternateName: profile.fullName,
    jobTitle: unique(LANGS.map((x) => l(profile.title, x))),
    description: t('meta.description', lang),
    url: SITE,
    image: SITE + profile.photo,
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/\s/g, ''),
    address: { '@type': 'PostalAddress', addressLocality: seo.address.locality, addressCountry: seo.address.country },
    nationality: { '@type': 'Country', name: seo.nationality },
    knowsLanguage: seo.knowsLanguage,
    knowsAbout: unique([...data.strengths.flatMap((s) => s.match), ...data.expertise.flatMap((e) => e.tech)]),
    alumniOf: unique(data.education.map((e) => e.school)).map((name) => ({ '@type': 'EducationalOrganization', name })),
    ...(seo.worksFor && { worksFor: { '@type': 'Organization', name: seo.worksFor } }),
    sameAs: seo.sameAs,
    hasOccupation: {
      '@type': 'Occupation',
      name: l(profile.title, lang),
      occupationLocation: { '@type': 'Country', name: country },
      skills: data.strengths.map((s) => l(s.name, lang)).join(', '),
    },
  };
}

/* ════════════════════ accueil : index.html, en.html ════════════════════ */
function homeGraph(lang, date) {
  const url = homeURL(lang);
  return [
    { '@type': 'WebSite', ...WEBSITE, url: SITE, name: NAME, alternateName: seo.siteAlternateNames, inLanguage: LANGS, publisher: PERSON },
    {
      '@type': 'ProfilePage',
      '@id': `${url}#profile`,
      url,
      name: t('meta.title', lang),
      description: t('meta.description', lang),
      inLanguage: lang,
      isPartOf: WEBSITE,
      mainEntity: PERSON,
      dateCreated: seo.published,
      dateModified: date,
    },
    personNode(lang),
    {
      '@type': 'ItemList',
      '@id': `${url}#projects`,
      name: `${t('work.title', lang)} — ${NAME}`,
      itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: projectURL(p, lang), name: l(p.title, lang) })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: lang,
      mainEntity: data.faq.map((f) => ({
        '@type': 'Question',
        name: l(f.q, lang),
        acceptedAnswer: { '@type': 'Answer', text: l(f.a, lang) },
      })),
    },
  ];
}

function homePage(source, lang, snap, date) {
  let html = source;

  // Textes d'interface (data-i18n) et attributs traduits (data-i18n-attr), comme le fait script.js.
  html = html.replace(/(\sdata-i18n="([^"]+)"[^>]*>)[^<]*(?=<)/g, (_, open, key) => open + escText(t(key, lang)));
  html = html.replace(/<[a-z][^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tag, spec) =>
    spec.split(';').reduce((out, pair) => {
      const [attr, key] = pair.split(':').map((x) => x.trim());
      const value = ` ${attr}="${escAttr(t(key, lang))}"`;
      const current = new RegExp(`\\s${attr}="[^"]*"`);
      return current.test(out) ? out.replace(current, () => value) : out.replace(/\sdata-i18n-attr=/, (m) => value + m);
    }, tag),
  );

  // Textes simples remplis par script.js.
  for (const [id, text] of Object.entries(snap.text)) {
    if (text == null) throw new Error(`#${id} introuvable dans index.html`);
    html = replaceOnce(html, new RegExp(`(\\sid="${id}"[^>]*>)[^<]*(?=<)`), (_, open) => open + escText(text), `#${id}`);
  }

  // <head> : langue, titre, description, réseaux sociaux, URL canonique, versions linguistiques, données structurées.
  const meta = (attr, key, value) => {
    html = replaceOnce(
      html,
      new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/>`),
      () => `<meta ${attr}="${key}" content="${escAttr(value)}" />`,
      `<meta ${attr}="${key}">`,
    );
  };
  const other = lang === 'fr' ? 'en' : 'fr';
  html = replaceOnce(html, /<html lang="[a-z]+"/, `<html lang="${lang}"`, '<html lang>');
  html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${escText(t('meta.title', lang))}</title>`, '<title>');
  meta('name', 'description', t('meta.description', lang));
  meta('property', 'og:url', homeURL(lang));
  meta('property', 'og:title', t('meta.title', lang));
  meta('property', 'og:description', t('meta.description', lang));
  meta('property', 'og:image:alt', t('meta.imageAlt', lang));
  meta('property', 'og:locale', lang === 'fr' ? 'fr_FR' : 'en_US');
  meta('property', 'og:locale:alternate', other === 'fr' ? 'fr_FR' : 'en_US');
  meta('name', 'twitter:title', t('meta.title', lang));
  meta('name', 'twitter:description', t('meta.description', lang));
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, () => `<link rel="canonical" href="${homeURL(lang)}" />`, 'canonical');
  html = replaceOnce(
    html,
    /<link rel="alternate" hreflang="fr"[^>]*>\s*<link rel="alternate" hreflang="en"[^>]*>\s*<link rel="alternate" hreflang="x-default"[^>]*>/,
    () => alternates({ fr: homeURL('fr'), en: homeURL('en') }),
    'hreflang',
  );
  html = replaceOnce(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, () => jsonLd(homeGraph(lang, date)), 'JSON-LD');
  html = replaceOnce(
    html,
    /<p class="noscript">[\s\S]*?<\/p>/,
    () =>
      `<p class="noscript">${escText(NAME)} — ${escText(l(profile.title, lang))} · <a href="mailto:${profile.email}">${profile.email}</a> · ${escText(profile.phone)}</p>`,
    'noscript',
  );

  // Liens « Télécharger le CV » du HTML statique : CV de la langue de la page.
  html = html.split(l(profile.cv, 'fr')).join(l(profile.cv, lang));

  // En dernier : le contenu des conteneurs, encadré de marqueurs pour être remplacé à la prochaine exécution.
  for (const [id, inner] of Object.entries(snap.html)) {
    if (inner == null) throw new Error(`#${id} introuvable dans index.html`);
    const container = new RegExp(`(<([a-z][a-z0-9]*)\\b[^>]*\\sid="${id}"[^>]*>)(?:<!--pre-->[\\s\\S]*?<!--/pre-->)?(?=</\\2>)`);
    html = replaceOnce(html, container, (_, open) => `${open}<!--pre-->${inner}<!--/pre-->`, `#${id} vide (ou entre <!--pre--> et <!--/pre-->)`);
  }
  return html;
}

/* ════════════════════ pages « étude de cas » ════════════════════ */
const FONTS = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&amp;family=Roboto+Mono:wght@400;500&amp;display=swap';
const BRAND_MARK =
  '<svg viewBox="57 40 96.5 109" width="18" height="20"><path fill="currentColor" d="M143 42V67.5H90.5C86.2 67.5 84.6 72.3 86.8 75.8L116.5 108H96C72 108 59 96 59 79V71C59 54 69 42 85 42ZM100.5 79.5H118C138 79.5 151.5 91 151.5 107V121C151.5 136 140 147 124 147H60V121H120C124.6 121 127.5 117.4 127 113.6Z" /></svg>';

function projectPage(p, lang, snap, date) {
  const root = '../../';
  const home = root + seo.home[lang];
  const other = lang === 'fr' ? 'en' : 'fr';
  const url = projectURL(p, lang);
  const title = l(p.title, lang);
  const summary = l(p.summary, lang);
  const description = `${summary} ${t('work.stack', lang)}${lang === 'fr' ? ' : ' : ': '}${p.stack.join(', ')}.`;
  const image = SITE + (p.image ?? 'assets/img/og-image.jpg');
  const category = l(data.projectFilters.find((f) => f.id === p.category)?.label, lang);
  // Même couverture que sur l'accueil, chemins relatifs à la racine et image chargée en priorité (haut de page).
  const cover = snap.covers[p.id].replace(/src="(?!https?:)/g, `src="${root}`).replace(' loading="lazy"', ' fetchpriority="high"');

  const blocks = [
    ['work.context', `<p>${escText(l(p.context, lang))}</p>`],
    ['work.problem', `<p>${escText(l(p.problem, lang))}</p>`],
    ['work.solution', `<ul class="bullets">${l(p.solution, lang).map((x) => `<li>${escText(x)}</li>`).join('')}</ul>`],
    ['work.stack', `<ul class="tags" style="margin:0">${p.stack.map((x) => `<li class="tag">${escText(x)}</li>`).join('')}</ul>`],
    ['work.role', `<p>${escText(l(p.role, lang))}</p>`],
    ['work.result', `<p class="case__result">${escText(l(p.result, lang))}</p>`],
  ]
    .map(([key, body], i) => `<section class="case__block" style="--i:${i}"><h2>${escText(t(key, lang))}</h2><div>${body}</div></section>`)
    .join('\n          ');
  const links = [
    p.demoUrl && `<a class="btn btn--primary" href="${escAttr(p.demoUrl)}" target="_blank" rel="noopener noreferrer">${escText(t('work.demo', lang))}</a>`,
    p.codeUrl && `<a class="btn btn--ghost" href="${escAttr(p.codeUrl)}" target="_blank" rel="noopener noreferrer">${escText(t('work.code', lang))}</a>`,
  ].filter(Boolean);
  const others = projects
    .filter((x) => x.id !== p.id)
    .map(
      (x) =>
        `<li><a href="${root}${projectPath(x, lang)}">${escText(l(x.title, lang))}<span>${escText([x.client, l(x.year, lang)].filter(Boolean).join(' · '))}</span></a></li>`,
    )
    .join('\n          ');

  const graph = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('case.home', lang), item: homeURL(lang) },
        { '@type': 'ListItem', position: 2, name: t('nav.work', lang), item: `${homeURL(lang)}#work` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
    {
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      url,
      name: title,
      headline: title,
      description: summary,
      inLanguage: lang,
      image,
      keywords: p.stack.join(', '),
      creator: PERSON,
      isPartOf: WEBSITE,
      dateModified: date,
    },
  ];

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${escText(`${title} — ${t('case.title', lang)} | ${NAME}`)}</title>
    <meta name="description" content="${escAttr(description)}" />
    <meta name="author" content="${NAME}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#14161a" />
    <meta name="color-scheme" content="dark" />
    <link rel="canonical" href="${url}" />
    ${alternates({ fr: projectURL(p, 'fr'), en: projectURL(p, 'en') })}
    <link rel="icon" href="${root}favicon.ico" sizes="48x48" />
    <link rel="icon" href="${root}favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png" />
    <link rel="manifest" href="${root}site.webmanifest" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${NAME}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escAttr(`${title} — ${t('case.title', lang)}`)}" />
    <meta property="og:description" content="${escAttr(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="${lang === 'fr' ? 'fr_FR' : 'en_US'}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="${FONTS}" /></noscript>
    <link rel="stylesheet" href="${root}css/style.css" />
    ${jsonLd(graph)}
  </head>
  <body>
    <a class="skip-link" href="#main">${escText(t('a11y.skip', lang))}</a>
    <header class="case-page__head">
      <div class="container case-page__bar">
        <a class="brand" href="${home}">
          <span class="brand__mark" aria-hidden="true">${BRAND_MARK}</span>
          <span class="brand__text"><strong>Safidy H.</strong><small>${escText(l(profile.title, lang))}</small></span>
        </a>
        <div class="case-page__actions">
          <a class="case-page__lang" href="${root}${projectPath(p, other)}" hreflang="${other}" lang="${other}">${other.toUpperCase()}</a>
          <a class="btn btn--primary" href="${home}#contact">${escText(t('hero.ctaContact', lang))}</a>
        </div>
      </div>
    </header>

    <main id="main" class="container case-page__main">
      <nav class="breadcrumb" aria-label="${escAttr(t('case.breadcrumb', lang))}">
        <ol>
          <li><a href="${home}">${escText(t('case.home', lang))}</a></li>
          <li><a href="${home}#work">${escText(t('nav.work', lang))}</a></li>
          <li aria-current="page">${escText(title)}</li>
        </ol>
      </nav>

      <article>
        <p class="modal__meta">${escText([p.client, l(p.year, lang), category].filter(Boolean).join(' · '))}</p>
        <h1 class="modal__title">${escText(title)}</h1>
        <p class="modal__summary">${escText(summary)}</p>
        <div class="modal__cover case-page__cover${p.image ? ' modal__cover--photo' : ''}">${cover}</div>
        <div class="case">
          ${blocks}
        </div>${links.length ? `\n        <div class="modal__links">${links.join('')}</div>` : ''}
      </article>

      <section class="case-page__cta" aria-labelledby="cta-title">
        <h2 id="cta-title">${escText(t('case.ctaTitle', lang))}</h2>
        <p>${escText(t('case.ctaText', lang))}</p>
        <div>
          <a class="btn btn--primary" href="${home}#contact">${escText(t('hero.ctaContact', lang))}</a>
          <a class="btn btn--ghost" href="${home}#work">${escText(t('case.all', lang))}</a>
        </div>
      </section>

      <nav class="case-page__more" aria-labelledby="more-title">
        <h2 class="eyebrow" id="more-title">${escText(t('case.more', lang))}</h2>
        <ul>
          ${others}
        </ul>
      </nav>
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <p>${escText(snap.text['footer-copy'])}</p>
        <a href="${home}">${SITE.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
      </div>
    </footer>
  </body>
</html>
`;
}

/* ════════════════════ sitemap.xml ════════════════════ */
function sitemap(groups) {
  const entries = groups.flatMap((g) =>
    LANGS.map((lang) =>
      [
        '  <url>',
        `    <loc>${g.urls[lang]}</loc>`,
        ...LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${g.urls[x]}" />`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${g.urls.fr}" />`,
        `    <lastmod>${g.lastmod[lang]}</lastmod>`,
        ...g.images.map((src) => `    <image:image>\n      <image:loc>${src}</image:loc>\n    </image:image>`),
        '  </url>',
      ].join('\n'),
    ),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`;
}

/* ════════════════════ écriture ════════════════════ */
const written = [];

/** Écrit le fichier si son contenu change et renvoie sa date de dernière modification (dateModified, lastmod). */
function writePage(file, build) {
  const full = path.join(ROOT, file);
  const previous = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
  const previousDate = previous?.match(/"dateModified": "(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (previousDate && build(previousDate) === previous) return previousDate;
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, build(TODAY));
  written.push(file);
  return TODAY;
}

const chrome = findChrome();
const source = readFile('index.html');
const snaps = Object.fromEntries(LANGS.map((lang) => [lang, render(source, lang, chrome)]));

const groups = [
  {
    urls: { fr: homeURL('fr'), en: homeURL('en') },
    lastmod: {
      fr: writePage('index.html', (date) => homePage(source, 'fr', snaps.fr, date)),
      en: writePage(seo.home.en, (date) => homePage(source, 'en', snaps.en, date)),
    },
    images: unique([profile.photo, ...projects.map((p) => p.image).filter(Boolean)]).map((src) => SITE + src),
  },
  ...projects.map((p) => ({
    urls: { fr: projectURL(p, 'fr'), en: projectURL(p, 'en') },
    lastmod: Object.fromEntries(
      LANGS.map((lang) => [lang, writePage(`${projectPath(p, lang)}index.html`, (date) => projectPage(p, lang, snaps[lang], date))]),
    ),
    images: p.image ? [SITE + p.image] : [],
  })),
];

// Pages d'études de cas retirées de data.js : on supprime leur dossier.
for (const lang of LANGS) {
  const dir = path.join(ROOT, seo.projects[lang]);
  for (const entry of fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : []) {
    if (entry.isDirectory() && !projects.some((p) => p.id === entry.name)) {
      fs.rmSync(path.join(dir, entry.name), { recursive: true });
      written.push(`${seo.projects[lang]}/${entry.name}/ (supprimé)`);
    }
  }
}

const xml = sitemap(groups);
if (!fs.existsSync(path.join(ROOT, 'sitemap.xml')) || readFile('sitemap.xml') !== xml) {
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
  written.push('sitemap.xml');
}

console.log(written.length ? `Mis à jour :\n  ${written.join('\n  ')}` : 'Tout est déjà à jour.');
