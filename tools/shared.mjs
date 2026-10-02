/**
 * Outils communs aux scripts de tools/ : données de js/data.js, traductions, échappement HTML, Chrome.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const LANGS = ['fr', 'en'];

export const readFile = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');

// js/data.js est un script classique : on l'exécute dans un bac à sable pour lire ses constantes.
export const data = vm.runInNewContext(`${readFile('js/data.js')}
;({ profile, expertise, skillCategories, strengths, projectFilters, projects, experiences, education, faq, seo, cv, UI_STRINGS })`);

/** Texte dans la langue demandée : { fr, en } ou valeur simple. */
export const l = (value, lang) => (value && typeof value === 'object' && !Array.isArray(value) ? (value[lang] ?? value.fr) : (value ?? ''));
/** Texte d'interface (UI_STRINGS de js/data.js). */
export const t = (key, lang) => data.UI_STRINGS[lang][key] ?? data.UI_STRINGS.fr[key] ?? key;

export const escText = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const escAttr = (s) => escText(s).replace(/"/g, '&quot;');

export function findChrome() {
  const candidates = [
    process.env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const chrome = candidates.find((file) => file && fs.existsSync(file));
  if (!chrome) throw new Error('Chrome introuvable : indiquez son chemin avec CHROME=/chemin/vers/chrome');
  return chrome;
}
