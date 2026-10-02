# Portfolio — Safidy Herimampianina

Portfolio personnel de **Safidy Herimampianina**, Développeur Full Stack Senior.
Site statique en **HTML, CSS et JavaScript natif** : aucun framework, aucune dépendance.
Conçu pour être publié sur **GitHub Pages** tel quel. Un script de pré-rendu (`node tools/prerender.mjs`)
écrit le contenu en dur dans le HTML pour le référencement : à relancer après chaque modification (voir plus bas).

Direction artistique : thème sombre, titre massif sur une scène de cubes 3D en CSS, navigation `// mono`
numérotée, cartes d'expertise encadrées, grille de réalisations filtrable, accordéons violets pour
l'expérience, contact en panneaux colorés.

## Arborescence

```
index.html              La page française (structure, balises SEO ; contenu pré-rendu entre <!--pre--> et <!--/pre-->)
en.html                 La page anglaise — générée, ne pas modifier
projets/<id>/           Une page par étude de cas, en français — générées
projects/<id>/          Les mêmes pages, en anglais — générées
tools/prerender.mjs     Pré-rendu : contenu en dur, en.html, pages projets, données structurées, sitemap.xml
404.html                Page « introuvable » servie automatiquement par GitHub Pages
css/style.css           Tout le style : couleurs, composants, responsive, réduction des animations
js/data.js              ← TOUT le contenu modifiable : CV (FR/EN), clés EmailJS, textes d'interface
js/script.js            Toute la logique (aucune modification nécessaire)
assets/
  img/                  Logo, portrait, icône iPhone, image de partage, captures de projets
  CV_Safidy_Herimampianina.pdf   ← à ajouter
favicon.svg, robots.txt, sitemap.xml, site.webmanifest
.nojekyll               Indique à GitHub Pages de publier les fichiers tels quels
```

## Voir le site en local

Double-cliquez sur **`index.html`** : le site s'ouvre directement dans le navigateur, aucun serveur n'est nécessaire.

## Modifier le contenu

Tout est dans **`js/data.js`**. Chaque texte traduit s'écrit `{ fr: '…', en: '…' }`.
Après une modification, rechargez simplement la page, puis lancez `node tools/prerender.mjs` avant de publier.

| Pour…                          | Modifier                                   |
| ------------------------------ | ------------------------------------------ |
| Coordonnées, accroche, photo   | `profile`                                  |
| LinkedIn / GitHub              | `profile.socials` (un `href` vide = masqué) |
| Chiffres clés                  | `stats`                                    |
| Compétences / niveaux / logos  | `skillCategories`, `skillLevels`, `marquee` |
| Projets (études de cas)        | `projects`                                 |
| Expériences et missions        | `experiences`                              |
| Formation                      | `education`                                |
| Étapes « Ma façon de travailler » | `processSteps`                          |
| Questions fréquentes           | `faq`                                      |
| Référencement (liens sociaux, employeur, adresses des pages) | `seo`        |
| Boutons, titres de section…    | `UI_STRINGS` (en bas du fichier)           |

- **Photo** : portrait retouché sur fond studio de la couleur exacte du site (`#1c1f24`), pour qu'il se fonde
  dans la page : `assets/img/portrait-dark.webp` (960×1200) + `portrait-dark-560.webp` (mobile).
  Variante sur le fond gris clair d'origine : `portrait.webp` / `portrait-560.webp` (à indiquer dans `photo` /
  `photoSmall` de `js/data.js` et dans `index.html`). Si vous changez la couleur de fond du site, la photo doit suivre.
- **Logo** : `assets/img/logo-s.svg` (le « S » seul, couleur héritée) ; `favicon.svg` (icône carrée) ;
  `assets/img/apple-touch-icon.png` (icône iPhone). Le même tracé est intégré dans `index.html` (barre de navigation et preloader).
- **Image de partage** (réseaux sociaux) : `assets/img/og-image.jpg` (1200×630).
- **CV** : déposez le PDF sous `assets/CV_Safidy_Herimampianina.pdf` (le lien de téléchargement pointe déjà dessus).
- **Captures de projets** : voir `assets/img/projects/README.md`. Sans image, une maquette CSS est générée.
- **Logos** : champ `icon` = slug [Simple Icons](https://simpleicons.org) (ex. `springboot`). Sans slug, une puce ambrée s’affiche.

## Formulaire de contact (EmailJS)

1. Créez un compte sur [emailjs.com](https://www.emailjs.com), ajoutez un service email et un template.
2. Dans le template, utilisez les variables `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`.
3. Renseignez le bloc `EMAILJS` dans `js/data.js` :

   ```js
   const EMAILJS = {
     serviceId: 'service_xxx',
     templateId: 'template_xxx',
     publicKey: 'xxxxxxxx',
   };
   ```

4. Dans le tableau de bord EmailJS, limitez les domaines autorisés à `safidyherimampianina.github.io`.

La clé publique EmailJS est prévue pour être visible côté navigateur. Tant que la configuration est vide,
le formulaire valide les champs puis propose d'écrire directement par email. Un champ piège (honeypot) filtre les robots.

## Fonctionnalités

- Preloader « SH » (< 1,5 s), titre révélé lettre par lettre, rôles en machine à écrire
- Scène 3D en CSS pur (cubes + orbe lumineuse) avec parallaxe souris et scroll
- Code Java qui se tape dans la section Expertise, compteurs animés, barres de niveau
- Grille de compétences et de réalisations filtrables, bandeau de logos infini
- Cartes projet en tilt 3D, modale d'étude de cas (Contexte → Problème → Solution → Stack → Rôle → Résultat)
- Accordéon d'expérience avec missions imbriquées
- Palette de commandes **Ctrl/⌘ + K** : navigation, langue, CV, copie de l'email
- Navigation « glass » au scroll, scroll spy, menu mobile animé, barre de progression
- Curseur personnalisé et boutons magnétiques (souris uniquement)
- Bilingue : `index.html` en français, `en.html` en anglais ; le bouton FR / EN change la langue sans recharger
  (l'accueil retient le choix, `?lang=en` ou `?lang=fr` force une langue)
- Une page par étude de cas (`projets/<id>/`, `projects/<id>/`) ; sur l'accueil, un clic ouvre l'étude dans une fenêtre
- Accessibilité : HTML sémantique, lien d'évitement, focus visibles, piège à focus dans les dialogues,
  `aria-*` sur les contrôles, `prefers-reduced-motion` respecté (toutes les animations se coupent)
- Contenu lisible sans JavaScript pour les éléments statiques ; un message de contact s'affiche en `<noscript>`

## Déploiement sur GitHub Pages

1. Créez un dépôt sur GitHub et poussez-y le contenu de ce dossier (à la racine du dépôt) :

   ```bash
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<utilisateur>/<depot>.git
   git push -u origin main
   ```

2. Sur GitHub : **Settings → Pages → Build and deployment**
   - Source : **Deploy from a branch**
   - Branch : **main**, dossier **/ (root)** → **Save**
3. Après une minute, le site est en ligne sur `https://<utilisateur>.github.io/<depot>/`
   (ou `https://<utilisateur>.github.io/` si le dépôt s'appelle `<utilisateur>.github.io`).
   Tous les chemins sont relatifs : le site fonctionne dans les deux cas.

## Référencement (SEO)

Après chaque modification de `js/data.js` ou de `index.html`, avant de publier :

```bash
node tools/prerender.mjs
```

Le script (Node 18+ et Google Chrome, sans aucune dépendance à installer) ouvre la page dans Chrome sans fenêtre et :

- écrit en dur dans `index.html` tout le contenu affiché par `js/script.js` (projets, expériences, compétences, FAQ…),
  pour que Google, Bing et les robots qui n'exécutent pas JavaScript lisent toute la page ;
- génère `en.html`, la page anglaise complète ;
- génère une page par étude de cas, en français et en anglais ;
- met à jour les balises `<head>`, les données structurées (Person, ProfilePage, FAQPage, BreadcrumbList) et `sitemap.xml`.

Il n'écrit que les fichiers dont le contenu change et ne touche pas aux dates des autres. Le titre et la description
de chaque langue sont `meta.title` / `meta.description` dans `UI_STRINGS` (`js/data.js`).
Chrome ailleurs que dans `/Applications` : `CHROME=/chemin/vers/chrome node tools/prerender.mjs`.

Après publication : dans Google Search Console, soumettez `sitemap.xml` et demandez l'indexation des nouvelles pages.

## Dépendances externes (CDN)

- Polices Google Fonts : Poppins, Inter, Roboto Mono
- [Lenis](https://github.com/darkroomengineering/lenis) 1.3 (défilement fluide, chargé en différé et seulement à la souris : le site fonctionne sans)
- Logos [Simple Icons](https://simpleicons.org) (CC0) embarqués dans `js/icons.js` ; un logo absent de ce fichier est chargé depuis jsDelivr
- [EmailJS](https://www.emailjs.com) 4, chargé uniquement à l'envoi du formulaire
