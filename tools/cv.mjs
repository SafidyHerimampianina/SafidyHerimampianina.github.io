#!/usr/bin/env node
/**
 * CV en PDF, généré à partir de js/data.js. À relancer quand le contenu du CV change :
 *
 *   node tools/cv.mjs
 *
 * Écrit les fichiers de profile.cv (français et anglais) : une page HTML construite ici est imprimée
 * en A4 par Chrome sans fenêtre. Une seule colonne, du vrai texte et des titres de section classiques :
 * le CV reste lisible par les logiciels de tri de candidatures (ATS). Liens cliquables, signets par section.
 * Prérequis : Node 18+ et Google Chrome (ou Chromium). Autre emplacement : CHROME=/chemin/vers/chrome node tools/cv.mjs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { LANGS, ROOT, data, escAttr, escText, findChrome, l, t } from './shared.mjs';

const { profile, projects, experiences, education, cv, seo } = data;
const NAME = `${profile.firstName} ${profile.lastName}`;
const SITE = profile.website;

const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
// Typographie : espace insécable avant les deux-points en français.
const colon = (lang) => (lang === 'fr' ? ' :' : ':');
/** Minuscule initiale après un intitulé (« Résultat : des boutiques… »), sauf sigle. */
const lowerFirst = (s) => (/^\p{Lu}\p{Ll}/u.test(s) ? s[0].toLocaleLowerCase() + s.slice(1) : s);
/** Études de cas d'un même client : dans le titre d'une mission ou le nom d'une entreprise. */
const casesFor = (text) => projects.filter((p) => text.includes(p.client));
const caseURL = (p, lang) => `${SITE}${seo.projects[lang]}/${p.id}/`;

/* ════════════════════ blocs ════════════════════ */
const label = (key, lang) => `<strong>${escText(t(key, lang))}${colon(lang)}</strong>`;

function head(tag, title, date, link) {
  const text = link ? `<a href="${escAttr(link)}">${escText(title)}</a>` : escText(title);
  return `<div class="head"><${tag}>${text}</${tag}><span class="date">${escText(date)}</span></div>`;
}

function list(items, cases, lang) {
  // Après les deux-points : minuscule en français, majuscule en anglais.
  const result = (p) => (lang === 'fr' ? lowerFirst(l(p.result, lang)) : l(p.result, lang));
  const results = cases.map((p) => `<li class="impact">${label('work.result', lang)} ${escText(result(p))}</li>`);
  return `<ul>${items.map((x) => `<li>${escText(x)}</li>`).join('')}${results.join('')}</ul>`;
}

const stack = (items, lang) => `<p class="stack">${label('cv.stack', lang)} ${escText(items.join(', '))}</p>`;

function when(e, lang) {
  const detail = l(e.periodDetail, lang);
  return detail && /\d{4}/.test(detail) ? detail : [l(e.period, lang), detail].filter(Boolean).join(' · ');
}

function experience(e, lang) {
  const missions = (e.missions ?? [])
    .map((m) => {
      const cases = casesFor(l(m.title, lang));
      return `<div class="mission">
          ${head('h4', l(m.title, lang), l(m.period, lang), cases.length === 1 ? caseURL(cases[0], lang) : '')}
          ${list(l(m.highlights, lang), cases, lang)}
          ${stack(m.stack, lang)}
        </div>`;
    })
    .join('');
  return `<article class="entry">
        ${head('h3', l(e.role, lang), when(e, lang))}
        <p class="org">${escText(e.company)} · ${escText(l(e.location, lang))}</p>
        ${e.summary ? `<p class="summary">${escText(l(e.summary, lang))}</p>` : ''}
        ${list(l(e.highlights, lang), casesFor(e.company), lang)}
        ${stack(e.stack, lang)}
        ${missions ? `<p class="label">${escText(t('experience.missions', lang))}</p>${missions}` : ''}
      </article>`;
}

function school(e, lang) {
  const date = [l(e.period, lang), e.current && t('education.current', lang)].filter(Boolean).join(' · ');
  const topics = e.highlight?.topics?.length
    ? `<p class="stack">${label('cv.topics', lang)} ${escText(e.highlight.topics.map((x) => l(x, lang)).join(', '))}</p>`
    : '';
  return `<article class="entry">
        ${head('h3', l(e.degree, lang), date)}
        <p class="org">${escText(e.school)}${e.country ? ` · ${escText(l(e.country, lang))}` : ''}</p>
        ${topics}
      </article>`;
}

/* ════════════════════ document ════════════════════ */
function page(lang) {
  const home = SITE + seo.home[lang];
  const linkedin = profile.socials.find((s) => s.label === 'LinkedIn' && s.href);
  const timezone = profile.timezone.split('·')[0].trim();
  const contact = [
    `${escText(l(profile.location, lang))} · ${escText(t('cv.remote', lang))} (${escText(timezone)})`,
    `<a href="mailto:${profile.email}">${profile.email}</a>`,
    `<a href="tel:${profile.phone.replace(/\s/g, '')}">${escText(profile.phone)}</a>`,
    linkedin && `<a href="${escAttr(linkedin.href)}">${escText(bare(linkedin.href))}</a>`,
    `<a href="${escAttr(home)}">${escText(bare(home))}</a>`,
  ].filter(Boolean);
  const skills = cv.skills
    .map((id) => data.skillCategories.find((c) => c.id === id))
    .filter(Boolean)
    .map((c) => `<p>${`<strong>${escText(l(c.label, lang))}${colon(lang)}</strong>`} ${escText(c.skills.map((s) => l(s.name, lang)).join(', '))}</p>`)
    .join('\n        ');
  const languages = profile.languages.map((x) => `${l(x.name, lang)} — ${lowerFirst(l(x.level, lang))}`).join(' · ');
  const keywords = [...new Set(data.strengths.flatMap((s) => s.match))].join(', ');
  const footer = `${NAME} — ${t('cv.title', lang)}`;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <title>${escText(`${NAME} — ${t('cv.title', lang)} · ${l(profile.title, lang)}`)}</title>
    <meta name="author" content="${NAME}" />
    <meta name="description" content="${escAttr(l(cv.headline, lang))}" />
    <meta name="keywords" content="${escAttr(keywords)}" />
    <!-- Polices statiques : une police variable (Inter…) serait exportée en glyphes Type 3, mal lus par les ATS. -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&amp;family=Poppins:wght@600;700&amp;display=swap" />
    <style>
      @page {
        size: A4;
        margin: 14mm 16mm 15mm;
        @bottom-left {
          content: '${footer}';
          font: 400 7.5pt Lato, sans-serif;
          color: #8b939d;
        }
        @bottom-right {
          content: counter(page) ' / ' counter(pages);
          font: 400 7.5pt Lato, sans-serif;
          color: #8b939d;
        }
      }
      /* Page 1 sans pied de page : le nom reste le premier texte lu par les logiciels de tri. */
      @page :first {
        @bottom-left {
          content: none;
        }
        @bottom-right {
          content: none;
        }
      }
      :root {
        --ink: #1c2026;
        --muted: #59626d;
        --accent: #b4541a;
        --rule: #e6ded3;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body {
        font: 400 9.3pt/1.4 Lato, 'Helvetica Neue', Arial, sans-serif;
        color: var(--ink);
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      strong {
        font-weight: 700;
      }
      header {
        padding-bottom: 9pt;
        border-bottom: 1.5pt solid var(--accent);
      }
      h1 {
        font: 700 21pt/1.15 Poppins, sans-serif;
        letter-spacing: -0.01em;
      }
      .headline {
        margin-top: 2pt;
        font: 600 10.5pt/1.35 Poppins, sans-serif;
        color: var(--accent);
      }
      .contact {
        margin-top: 6pt;
        font-size: 8.8pt;
        color: var(--muted);
      }
      .contact .item {
        white-space: nowrap;
      }
      .contact .sep {
        color: #c4b8a8;
      }
      section {
        margin-top: 12pt;
      }
      h2 {
        margin-bottom: 6pt;
        padding-bottom: 3pt;
        border-bottom: 0.6pt solid var(--rule);
        font: 600 9.2pt/1.2 Poppins, sans-serif;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--accent);
        break-after: avoid;
      }
      .skills p + p {
        margin-top: 2pt;
      }
      .entry + .entry {
        margin-top: 10pt;
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12pt;
        break-after: avoid;
      }
      h3 {
        font: 700 10.2pt/1.3 Lato, sans-serif;
      }
      h4 {
        font: 700 9.3pt/1.3 Lato, sans-serif;
      }
      .date {
        flex-shrink: 0;
        font-size: 8.6pt;
        color: var(--muted);
        font-variant-numeric: tabular-nums;
      }
      .org {
        font-weight: 700;
        color: var(--accent);
        break-after: avoid;
      }
      .summary {
        margin-top: 2pt;
        color: var(--muted);
      }
      ul {
        margin-top: 3pt;
        padding-left: 11pt;
      }
      li {
        margin-top: 1pt;
        break-inside: avoid;
      }
      li::marker {
        color: var(--accent);
      }
      .stack {
        margin-top: 2pt;
        font-size: 8.6pt;
        color: var(--muted);
      }
      .stack strong {
        color: var(--ink);
      }
      .label {
        margin-top: 8pt;
        font: 700 8pt/1.2 Lato, sans-serif;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--muted);
        break-after: avoid;
      }
      .mission {
        margin-top: 7pt;
        padding-left: 9pt;
        border-left: 1.2pt solid var(--rule);
        break-inside: avoid;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>${NAME}</h1>
      <p class="headline">${escText(l(cv.headline, lang))}</p>
      <p class="contact">${contact.map((x) => `<span class="item">${x}</span>`).join('<span class="sep"> · </span>')}</p>
    </header>
    <main>
      <section>
        <h2>${escText(t('cv.profile', lang))}</h2>
        <p>${escText(l(cv.summary, lang))}</p>
      </section>
      <section class="skills">
        <h2>${escText(t('cv.skills', lang))}</h2>
        ${skills}
      </section>
      <section>
        <h2>${escText(t('experience.title', lang))}</h2>
        ${experiences.map((e) => experience(e, lang)).join('\n')}
      </section>
      <section>
        <h2>${escText(t('cv.education', lang))}</h2>
        ${education.map((e) => school(e, lang)).join('\n')}
      </section>
      <section>
        <h2>${escText(t('cv.extras', lang))}</h2>
        <p>${label('about.languages', lang)} ${escText(languages)}</p>
        <p>${label('about.interests', lang)} ${escText(profile.interests.map((x) => l(x, lang)).join(' · '))}</p>
      </section>
    </main>
  </body>
</html>
`;
}

/* ════════════════════ impression ════════════════════ */
const chrome = findChrome();
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-'));
try {
  for (const lang of LANGS) {
    const html = path.join(tmp, `cv-${lang}.html`);
    const pdf = path.join(ROOT, l(profile.cv, lang));
    fs.writeFileSync(html, page(lang));
    fs.mkdirSync(path.dirname(pdf), { recursive: true });
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-pdf-header-footer',
        '--export-tagged-pdf',
        '--generate-pdf-document-outline',
        '--virtual-time-budget=8000',
        `--print-to-pdf=${pdf}`,
        pathToFileURL(html).href,
      ],
      { stdio: 'ignore', timeout: 60_000 },
    );
    console.log(`${l(profile.cv, lang)} (${Math.round(fs.statSync(pdf).size / 1024)} Ko)`);
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
