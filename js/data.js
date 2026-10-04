/**
 * ─────────────────────────────────────────────────────────────
 *  Toutes les données du portfolio (script classique, sans module).
 *  Modifiez ce fichier pour mettre le site à jour : aucun texte
 *  métier n'est écrit en dur dans le HTML ou dans les scripts.
 *  Chaque texte traduit est un objet { fr: '…', en: '…' }.
 * ─────────────────────────────────────────────────────────────
 */

/** Logo CDN (Simple Icons). Le slug correspond au nom sur https://simpleicons.org */
const ICON_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';

const profile = {
  firstName: 'Safidy',
  lastName: 'Herimampianina',
  fullName: 'Herimampianina Safidinomenjanahary',
  initials: 'SH',
  title: { fr: 'Développeur Full Stack Senior', en: 'Senior Full Stack Developer' },
  heroLine: {
    fr: 'Développeur Full Stack Senior · Java & React · Full remote depuis Madagascar',
    en: 'Senior Full Stack Developer · Java & React · Fully remote from Madagascar',
  },
  roles: ['Full Stack Developer', 'Java / Spring Boot', 'React', 'DevOps & CI/CD'],
  // Phrase d'accroche affichée en grand dans « À propos ».
  tagline: {
    fr: 'Je crée des applications web qui font gagner du temps à vos équipes, et je m’occupe de tout, de l’idée à la mise en ligne.',
    en: 'I build web applications that save your teams time, and I handle everything from the idea to the launch.',
  },
  location: { fr: 'Antananarivo, Madagascar', en: 'Antananarivo, Madagascar' },
  availability: {
    fr: 'Disponible en full remote, pour des équipes à Madagascar et à l’international',
    en: 'Available for full remote work, with teams in Madagascar and worldwide',
  },
  phone: '+261 34 47 973 32',
  timezone: 'GMT+3 · Antananarivo',
  email: 'safidyherimampianina@gmail.com',
  website: 'https://safidyherimampianina.github.io/',
  // CV de chaque langue, générés par `node tools/cv.mjs` (voir le bloc `cv` plus bas).
  cv: { fr: 'assets/CV_Safidy_Herimampianina.pdf', en: 'assets/CV_Safidy_Herimampianina_EN.pdf' },
  // Portrait retouché sur fond studio calé sur la couleur du site (#1c1f24), pour qu'il se fonde dans la page.
  // Variante sur fond gris clair d'origine : 'assets/img/portrait.webp' / 'assets/img/portrait-560.webp'.
  photo: 'assets/img/portrait-dark.webp',
  photoSmall: 'assets/img/portrait-dark-560.webp',
  yearsOfExperience: 6,
  about: {
    fr: 'Depuis plus de six ans, j’accompagne entreprises et organisations, à Madagascar comme en France, dans la création de leurs applications métier, plateformes e-commerce et outils internes. Je prends en charge tout le projet : comprendre votre besoin, concevoir la solution, la développer, la mettre en ligne et la faire évoluer. Vous avez un seul interlocuteur, en français ou en anglais, qui vous tient informé à chaque étape. Basé à Antananarivo (GMT+3), je travaille en full remote sur des horaires communs avec l’Europe, et je m’intègre rapidement à une stack Java / Spring Boot, React et CI/CD existante.',
    en: 'For more than six years, I have helped companies and organisations, in Madagascar and in France, build their business applications, e-commerce platforms and internal tools. I take care of the whole project: understanding your needs, designing the solution, building it, launching it and improving it over time. You get a single point of contact, in English or French, who keeps you informed at every step. Based in Antananarivo (GMT+3), I work fully remote on hours that overlap with Europe, and I quickly fit into an existing Java / Spring Boot, React and CI/CD stack.',
  },
  // Laissez href vide pour masquer un lien.
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/safidy-herimampianina-0170321a4/' },
    { label: 'GitHub', href: '' },
  ],
  languages: [
    { name: { fr: 'Malagasy', en: 'Malagasy' }, level: { fr: 'Langue maternelle', en: 'Native' } },
    { name: { fr: 'Français', en: 'French' }, level: { fr: 'Courant', en: 'Fluent' } },
    { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'Professionnel', en: 'Professional' } },
  ],
  interests: [
    { fr: 'Guitare', en: 'Guitar' },
    { fr: 'Natation', en: 'Swimming' },
    { fr: 'Chant', en: 'Singing' },
  ],
};

/** Clients / organisations affichés sous le titre du Hero. */
const clients = ['BICI', 'OMAPI', 'SAFRAM', 'Supermarche.mg', 'Express.mg', 'Inother'];

const stats = [
  { value: 6, suffix: { fr: '+', en: '+' }, label: { fr: 'années d’expérience', en: 'years of experience' } },
  { value: 5, suffix: { fr: '+', en: '+' }, label: { fr: 'projets & clients majeurs', en: 'major projects & clients' } },
  { value: 15, suffix: { fr: '+', en: '+' }, label: { fr: 'technologies maîtrisées', en: 'technologies mastered' } },
  { value: 3, suffix: { fr: '', en: '' }, label: { fr: 'langues parlées : malgache, français, anglais', en: 'languages: Malagasy, French, English' } },
];

/** Les 3 services proposés aux clients (section « Ce que je fais pour vous »). */
const expertise = [
  {
    icon: 'briefcase',
    title: { fr: 'Applications métier', en: 'Business applications' },
    subtitle: { fr: 'sur mesure et sécurisées', en: 'custom-built and secure' },
    underline: 'amber', // couleur du soulignement : amber, cream ou copper
    text: {
      fr: 'Je transforme vos processus (ventes, stocks, facturation, RH) en une application web fiable, sécurisée et pensée pour vos équipes.',
      en: 'I turn your processes (sales, inventory, invoicing, HR) into a reliable, secure web application built around your teams.',
    },
    tech: ['Java', 'Spring Boot', 'JEE', '.NET', 'API REST', 'PostgreSQL', 'Oracle'],
  },
  {
    icon: 'cart',
    title: { fr: 'Sites & e-commerce', en: 'Websites & e-commerce' },
    subtitle: { fr: 'rapides, même sur mobile', en: 'fast, even on mobile' },
    underline: 'cream',
    text: {
      fr: 'Des interfaces claires et rapides, sur ordinateur comme sur mobile, qui rassurent vos visiteurs et les transforment en clients.',
      en: 'Clear, fast interfaces on desktop and mobile that reassure your visitors and turn them into customers.',
    },
    tech: ['React', 'TypeScript', 'JavaScript', 'Symfony', 'Responsive'],
  },
  {
    icon: 'rocket',
    title: { fr: 'Mise en ligne & suivi', en: 'Launch & support' },
    subtitle: { fr: 'automatisés, sans coupure', en: 'automated, no downtime' },
    underline: 'copper',
    text: {
      fr: 'Chaque amélioration est vérifiée puis mise en ligne automatiquement, sans interrompre votre activité. Votre application reste rapide et disponible.',
      en: 'Every improvement is checked, then released automatically without disrupting your business. Your application stays fast and available.',
    },
    tech: ['Docker', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'Azure DevOps'],
  },
];

/** Livraison continue (CI/CD) expliquée aux clients : le chemin d'une demande jusqu'à la mise en ligne. */
const delivery = {
  eyebrow: { fr: 'Livraison continue · CI/CD', en: 'Continuous delivery · CI/CD' },
  title: {
    fr: 'De votre demande à la mise en ligne, sans mauvaise surprise',
    en: 'From your request to launch, with no bad surprises',
  },
  text: {
    fr: 'J’automatise tout le chemin entre une idée et sa mise en ligne. Vous voyez le résultat avant vos utilisateurs, et chaque nouveauté arrive vite, testée, sans interruption de service.',
    en: 'I automate the whole path from an idea to its release. You see the result before your users do, and every new feature arrives quickly, tested, with no service interruption.',
  },
  steps: [
    {
      icon: 'message',
      title: { fr: 'Votre demande', en: 'Your request' },
      text: { fr: 'Vous décrivez le besoin, je le traduis en tâches claires.', en: 'You describe the need; I turn it into clear tasks.' },
      tech: 'Agile / Scrum · backlog · user stories',
    },
    {
      icon: 'code',
      title: { fr: 'Développement', en: 'Development' },
      text: { fr: 'Je construis la fonctionnalité, étape par étape.', en: 'I build the feature, step by step.' },
      tech: 'Java / Spring Boot · React · Git flow',
    },
    {
      icon: 'shield',
      title: { fr: 'Tests automatiques', en: 'Automated tests' },
      text: { fr: 'Chaque modification est vérifiée avant d’aller plus loin.', en: 'Every change is checked before it moves on.' },
      tech: 'Tests unitaires · GitHub Actions · GitLab CI',
    },
    {
      icon: 'eye',
      title: { fr: 'Votre validation', en: 'Your approval' },
      text: { fr: 'Vous essayez la nouveauté sur une version de démonstration.', en: 'You try it out on a private preview version.' },
      tech: 'Environnement de staging · revue',
    },
    {
      icon: 'rocket',
      title: { fr: 'En ligne', en: 'Live' },
      text: { fr: 'Mise en production en quelques minutes, sans coupure.', en: 'Released in minutes, with no downtime.' },
      tech: 'Docker · déploiement continu · rollback',
    },
  ],
  benefits: [
    { fr: 'Des nouveautés livrées en continu, pas tous les trois mois', en: 'New features delivered continuously, not once a quarter' },
    { fr: 'Pas d’interruption de service pendant les mises à jour', en: 'No service interruption during updates' },
    { fr: 'Retour à la version précédente en quelques minutes si besoin', en: 'Roll back to the previous version in minutes if needed' },
  ],
};

/** Compétences par catégorie (grille filtrable). `icon` = slug Simple Icons (optionnel). */
const skillCategories = [
  {
    id: 'backend',
    label: { fr: 'Back-end', en: 'Back-end' },
    skills: [
      { name: 'Java', icon: 'openjdk' },
      { name: 'Spring Boot', icon: 'springboot' },
      { name: 'Spring MVC', icon: 'spring' },
      { name: 'JEE', icon: 'openjdk' },
      { name: 'PHP', icon: 'php' },
      { name: 'Symfony', icon: 'symfony' },
      { name: 'CodeIgniter', icon: 'codeigniter' },
      { name: 'C#' },
      { name: '.NET Core API', icon: 'dotnet' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'API REST' },
      { name: 'WebSockets' },
    ],
  },
  {
    id: 'frontend',
    label: { fr: 'Front-end', en: 'Front-end' },
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'AngularJS', icon: 'angular' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'jQuery', icon: 'jquery' },
      { name: 'JSP', icon: 'openjdk' },
    ],
  },
  {
    id: 'mobile',
    label: { fr: 'Mobile', en: 'Mobile' },
    skills: [{ name: 'Ionic', icon: 'ionic' }, { name: 'Xamarin' }],
  },
  {
    id: 'database',
    label: { fr: 'Bases de données', en: 'Databases' },
    skills: [
      { name: 'Oracle' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Elasticsearch', icon: 'elasticsearch' },
    ],
  },
  {
    id: 'devops',
    label: { fr: 'DevOps & Cloud', en: 'DevOps & Cloud' },
    skills: [
      { name: 'Docker', icon: 'docker' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'GitLab CI', icon: 'gitlab' },
      { name: 'Jenkins', icon: 'jenkins' },
      { name: 'Azure DevOps' },
      { name: 'Azure Functions' },
      { name: 'Maven', icon: 'apachemaven' },
      { name: 'Tomcat', icon: 'apachetomcat' },
      { name: 'JBoss', icon: 'redhat' },
    ],
  },
  {
    id: 'tools',
    label: { fr: 'Outils', en: 'Tools' },
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'Postman', icon: 'postman' },
      { name: 'DBeaver', icon: 'dbeaver' },
      { name: 'VS Code' },
      { name: 'NetBeans' },
      { name: 'Android Studio', icon: 'androidstudio' },
    ],
  },
  {
    id: 'methods',
    label: { fr: 'Méthodes', en: 'Methods' },
    skills: [
      { name: 'Agile / Scrum' },
      { name: { fr: 'Recueil des besoins', en: 'Requirements gathering' } },
      { name: { fr: 'Conception orientée objet', en: 'Object-oriented design' } },
      { name: { fr: 'Architecture multi-tiers', en: 'Multi-tier architecture' } },
    ],
  },
  {
    id: 'multimedia',
    label: { fr: 'Multimédia', en: 'Multimedia' },
    skills: [{ name: 'Photoshop' }, { name: 'Blender 3D', icon: 'blender' }],
  },
];

/**
 * Points forts affichés à côté de la stack technique.
 * Les années d'usage et les références sont calculées à partir des expériences
 * et des projets dont la stack contient l'une des technologies de `match`.
 */
const strengths = [
  {
    name: 'Java & Spring Boot',
    icon: 'openjdk',
    match: ['Java', 'Spring Boot', 'Spring', 'JEE'],
    text: { fr: 'API REST sécurisées, back-offices et applications métier', en: 'Secure REST APIs, back-offices and business applications' },
  },
  {
    name: { fr: 'Bases de données SQL', en: 'SQL databases' },
    icon: 'postgresql',
    match: ['SQL', 'MySQL', 'PostgreSQL', 'Oracle'],
    text: { fr: 'Modélisation et requêtes optimisées : MySQL, PostgreSQL, Oracle', en: 'Data modelling and optimised queries: MySQL, PostgreSQL, Oracle' },
  },
  {
    name: 'React & JavaScript',
    icon: 'react',
    match: ['React', 'JavaScript', 'jQuery', 'TypeScript'],
    text: { fr: 'Interfaces web rapides et responsives', en: 'Fast, responsive web interfaces' },
  },
  {
    name: 'DevOps & CI/CD',
    icon: 'docker',
    match: ['Docker', 'CI/CD', 'Jenkins', 'Azure DevOps', 'GitHub Actions', 'GitLab CI'],
    text: { fr: 'Pipelines automatisés, conteneurs et Azure DevOps', en: 'Automated pipelines, containers and Azure DevOps' },
  },
  {
    name: 'PHP & Symfony',
    icon: 'php',
    match: ['PHP', 'Symfony'],
    text: { fr: 'Sites e-commerce et outils de gestion', en: 'E-commerce sites and management tools' },
  },
];

/** Logos du bandeau défilant. */
const marquee = [
  { name: 'Java', icon: 'openjdk' },
  { name: 'Spring Boot', icon: 'springboot' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Docker', icon: 'docker' },
  { name: 'GitHub Actions', icon: 'githubactions' },
  { name: 'GitLab CI', icon: 'gitlab' },
  { name: 'Jenkins', icon: 'jenkins' },
  { name: '.NET', icon: 'dotnet' },
  { name: 'PHP', icon: 'php' },
  { name: 'Symfony', icon: 'symfony' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Elasticsearch', icon: 'elasticsearch' },
  { name: 'Git', icon: 'git' },
];

/** Filtres de la section Réalisations. */
const projectFilters = [
  { id: 'web', label: { fr: 'Applications web', en: 'Web applications' } },
  { id: 'data', label: { fr: 'Data & automatisation', en: 'Data & automation' } },
  { id: 'devops', label: { fr: 'DevOps & Cloud', en: 'DevOps & Cloud' } },
];

/**
 * Études de cas. `size` pilote la grille : 'full' (toute la largeur), 'wide' (2 colonnes), 'tall' (2 lignes) ou 'normal'.
 * `image` (optionnel) : chemin d'une capture dans assets/img/projects/ ; sinon une maquette CSS est générée.
 * `demoUrl` / `codeUrl` vides = boutons masqués.
 */
const projects = [
  {
    id: 'async',
    featured: true,
    category: 'web',
    size: 'full',
    title: { fr: 'ASYNC — ERP de gestion d’entreprise', en: 'ASYNC — business management ERP' },
    client: 'BICI',
    year: { fr: '2024 – aujourd’hui', en: '2024 – present' },
    cover: { from: '#262d36', to: '#c2652a', mock: 'dashboard' },
    image: 'assets/img/projects/async.webp',
    summary: {
      fr: 'ERP complet développé chez BICI : ventes, achats, stock, caisse, comptabilité et pilotage réunis dans une seule application.',
      en: 'A full ERP built at BICI: sales, purchasing, inventory, cash desk, accounting and reporting in a single application.',
    },
    context: {
      fr: 'Projet interne de BICI : ASYNC est un ERP qui rassemble toute la gestion d’une entreprise dans un seul outil, des ventes à la comptabilité.',
      en: 'An internal BICI project: ASYNC is an ERP that brings all of a company’s management into one tool, from sales to accounting.',
    },
    problem: {
      fr: 'Couvrir tous les métiers de l’entreprise (ventes, achats, stock, caisse, comptabilité) dans une même application, avec des données partagées entre les modules.',
      en: 'Covering every business function (sales, purchasing, inventory, cash desk, accounting) in one application, with data shared across modules.',
    },
    solution: {
      fr: [
        'ERP modulaire : ventes, achats, stock, caisse, comptabilité, tiers, gestion électronique des documents et archives',
        'Tableau de bord : chiffre d’affaires, ventes du jour, de la semaine et du mois, courbe d’évolution',
        'Modules d’analyse, de prévision, de rapports et d’historique pour piloter l’activité',
        'Recherche globale, filtres par période et colonnes configurables sur les listes',
        'Assistant IA intégré à l’application',
        'Back-end Java / JEE et interfaces JSP',
      ],
      en: [
        'Modular ERP: sales, purchasing, inventory, cash desk, accounting, third parties, document management and archives',
        'Dashboard: revenue, sales for the day, week and month, and a trend chart',
        'Analysis, forecasting, reporting and history modules to steer the business',
        'Global search, date-range filters and configurable columns on lists',
        'Built-in AI assistant',
        'Java / JEE back-end and JSP interfaces',
      ],
    },
    role: {
      fr: 'Développeur full stack depuis le lancement du projet en 2024 : participation au développement de tous les modules, du back-end aux écrans.',
      en: 'Full stack developer since the project started in 2024: contributed to every module, from the back-end to the screens.',
    },
    result: {
      fr: 'Un seul outil pour gérer et suivre toute l’activité de l’entreprise, avec les indicateurs clés dès la page d’accueil.',
      en: 'One tool to run and track the whole business, with key indicators right on the home page.',
    },
    stack: ['Java', 'JEE', 'JSP', 'JavaScript', 'HTML/CSS'],
    demoUrl: '',
    codeUrl: '',
  },
  {
    id: 'omapi',
    category: 'web',
    size: 'wide',
    title: { fr: 'Back-office OMAPI', en: 'OMAPI back-office' },
    client: 'OMAPI',
    year: '2023 – 2024',
    cover: { from: '#2c333d', to: '#c2652a', mock: 'dashboard' },
    image: 'assets/img/projects/omapi.webp', // maquette illustrative (pas de capture disponible)
    summary: {
      fr: 'Plateforme de gestion de la propriété industrielle avec moteur de formulaires et CRUD génériques.',
      en: 'Industrial property management platform with a form engine and generic CRUD.',
    },
    context: {
      fr: 'L’Office Malgache de la Propriété Industrielle gère les dépôts de marques, brevets et dessins industriels et avait besoin d’un back-office unifié pour ses agents.',
      en: 'The Malagasy Industrial Property Office handles trademark, patent and design filings and needed a unified back-office for its staff.',
    },
    problem: {
      fr: 'De nombreux types de dossiers aux structures proches mais différentes : développer chaque écran à la main aurait produit une interface incohérente et un code difficile à maintenir.',
      en: 'Many filing types with similar yet different structures: hand-building every screen would have produced an inconsistent UI and hard-to-maintain code.',
    },
    solution: {
      fr: [
        'Architecture en couches : client React, API Spring',
        'Fonctions génériques côté serveur pour mutualiser la logique métier',
        'Écrans génériques de saisie, liste, fiche et modification pilotés par la configuration',
        'Tests unitaires et d’intégration sur les modules critiques',
      ],
      en: [
        'Layered architecture: React client, Spring API',
        'Generic server-side functions to share business logic',
        'Configuration-driven generic entry, list, detail and edit screens',
        'Unit and integration tests on critical modules',
      ],
    },
    role: {
      fr: 'Conception, architecture et développement full stack, de la base de données à l’interface.',
      en: 'Design, architecture and full stack development, from database to interface.',
    },
    result: {
      fr: 'Une interface cohérente sur tous les modules, et de nouvelles fonctionnalités livrées rapidement grâce au code générique réutilisable.',
      en: 'A consistent interface across every module, and new features shipped quickly thanks to reusable generic code.',
    },
    stack: ['React', 'Java', 'Spring', 'HTML', 'CSS', 'MySQL'],
    demoUrl: '',
    codeUrl: '',
  },
  {
    id: 'supermarche',
    category: 'web',
    size: 'tall',
    title: { fr: 'E-commerce Supermarche.mg & Express.mg', en: 'Supermarche.mg & Express.mg e-commerce' },
    client: 'Supermarche.mg',
    year: '2021 – 2022',
    cover: { from: '#1f3a2c', to: '#16a34a', mock: 'store', labels: ['supermarche.mg', 'express.mg'] },
    summary: {
      fr: 'Optimisation et évolution de deux sites e-commerce malgaches : un supermarché en ligne et une plateforme de recharge mobile.',
      en: 'Optimisation and evolution of two Malagasy e-commerce sites: an online supermarket and a mobile top-up platform.',
    },
    context: {
      fr: 'Supermarche.mg exploite deux sites à Madagascar : supermarche.mg, un supermarché en ligne, et express.mg, une plateforme d’achat de crédit, de mobile money et d’abonnements.',
      en: 'Supermarche.mg runs two sites in Madagascar: supermarche.mg, an online supermarket, and express.mg, a platform for buying phone credit, mobile money and subscriptions.',
    },
    problem: {
      fr: 'Des sites à faire évoluer en continu sans interrompre la vente, avec des performances à améliorer.',
      en: 'Sites that had to keep evolving without interrupting sales, with performance to improve.',
    },
    solution: {
      fr: ['Optimisation des pages et des requêtes MySQL', 'Nouvelles fonctionnalités sur WordPress et PHP', 'Déploiements maîtrisés via Jenkins'],
      en: ['Page and MySQL query optimisation', 'New features built on WordPress and PHP', 'Controlled deployments through Jenkins'],
    },
    role: {
      fr: 'Développeur web freelance, responsable des développements et des déploiements.',
      en: 'Freelance web developer, in charge of development and deployments.',
    },
    result: {
      fr: 'Des boutiques plus rapides et des mises en production régulières et sereines.',
      en: 'Faster stores and regular, stress-free releases.',
    },
    stack: ['PHP', 'MySQL', 'WordPress', 'JavaScript', 'Bootstrap', 'Jenkins'],
    demoUrl: '',
    codeUrl: '',
  },
  {
    id: 'ketrika',
    category: 'web',
    size: 'wide',
    title: { fr: 'E-commerce & billetterie Ketrika.com', en: 'Ketrika.com e-commerce & ticketing' },
    client: 'Ketrika.com',
    year: { fr: '2024 – aujourd’hui', en: '2024 – present' },
    cover: { from: '#2c333d', to: '#d9823f', mock: 'seats' },
    image: 'assets/img/projects/ketrika.webp',
    summary: {
      fr: 'Refonte d’un site e-commerce et billetterie en ligne avec plan de salle interactif.',
      en: 'E-commerce site redesign and online ticketing with an interactive seating plan.',
    },
    context: {
      fr: 'Projet mené chez BICI : Ketrika.com, site e-commerce, avait besoin d’une interface plus simple à utiliser et d’un système de réservation de billets en ligne.',
      en: 'A BICI project: Ketrika.com, an e-commerce site, needed an easier-to-use interface and an online ticket booking system.',
    },
    problem: {
      fr: 'Une navigation peu ergonomique, et une billetterie qui devait gérer la disponibilité des places en temps réel.',
      en: 'Navigation that was hard to use, and a ticketing system that had to handle seat availability in real time.',
    },
    solution: {
      fr: [
        'Refonte du design : ergonomie et navigation repensées, interface optimisée',
        'Développement front-end et back-end en Java, JEE et JSP',
        'API REST pour le contenu dynamique, entre les interfaces et le back-end',
        'Billetterie intégrée avec plan de salle interactif : chaque utilisateur choisit sa place',
        'Logique back-end optimisée pour la disponibilité des places en temps réel',
      ],
      en: [
        'Design overhaul: reworked ergonomics and navigation, optimised interface',
        'Front-end and back-end development with Java, JEE and JSP',
        'REST APIs delivering dynamic content between the interfaces and the back-end',
        'Integrated ticketing with an interactive seating plan so users pick their own seats',
        'Back-end logic optimised for real-time seat availability',
      ],
    },
    role: {
      fr: 'Mainteneur du projet depuis 2024 : développement front-end et back-end, de la refonte de l’interface aux API REST, puis maintenance et évolutions.',
      en: 'Project maintainer since 2024: front-end and back-end development, from the interface redesign to the REST APIs, plus ongoing maintenance and improvements.',
    },
    result: {
      fr: 'Un parcours de réservation fluide et engageant, de meilleures performances et une meilleure satisfaction des utilisateurs.',
      en: 'A smooth, engaging booking journey, better system performance and higher user satisfaction.',
    },
    stack: ['Java', 'JEE', 'JSP', 'API REST', 'JavaScript', 'PostgreSQL', 'HTML/CSS', 'Bootstrap'],
    demoUrl: '',
    codeUrl: '',
  },
  {
    id: 'stock',
    category: 'data',
    size: 'tall',
    title: { fr: 'PO-BOT — commandes fournisseurs automatiques', en: 'PO-BOT — automatic supplier purchase orders' },
    client: 'Supermarche.mg',
    year: '2021 – 2022',
    cover: { from: '#262d36', to: '#9a4316', mock: 'stock' },
    image: 'assets/img/projects/po-bot.webp', // maquette illustrative (pas de capture disponible)
    imagePosition: '10% 50%', // cadrage dans les cartes recadrées : garde la marque PO-BOT et le tableau
    summary: {
      fr: 'Robot qui envoie automatiquement un email de commande au fournisseur dès qu’un produit atteint son stock minimum.',
      en: 'A bot that automatically emails a purchase order to the supplier as soon as a product reaches its minimum stock.',
    },
    context: {
      fr: 'Le réapprovisionnement reposait sur un suivi manuel des stocks par les équipes.',
      en: 'Restocking relied on teams tracking inventory by hand.',
    },
    problem: {
      fr: 'Le suivi manuel entraînait des oublis de commande et des ruptures de stock.',
      en: 'Manual tracking led to missed orders and stock-outs.',
    },
    solution: {
      fr: [
        'Stock minimum défini pour chaque produit',
        'Envoi automatique d’un email de commande au fournisseur dès que le minimum est atteint',
        'Petit back-office pour paramétrer les emails envoyés',
        'Historique des emails envoyés, consultable par fournisseur',
      ],
      en: [
        'A minimum stock level set for each product',
        'A purchase order email sent automatically to the supplier as soon as the minimum is reached',
        'A small back-office to configure the emails that are sent',
        'A history of sent emails, searchable by supplier',
      ],
    },
    role: { fr: 'Conception et développement de bout en bout.', en: 'End-to-end design and development.' },
    result: {
      fr: 'Un réapprovisionnement automatisé qui libère les équipes des tâches de suivi répétitives.',
      en: 'Automated restocking that frees teams from repetitive tracking work.',
    },
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    demoUrl: '',
    codeUrl: '',
  },
  {
    id: 'safram',
    category: 'devops',
    size: 'normal',
    title: { fr: 'Pipelines CI/CD & Azure Functions — SAFRAM', en: 'CI/CD pipelines & Azure Functions — SAFRAM' },
    client: 'SAFRAM',
    year: '2022 – 2023',
    cover: { from: '#36404c', to: '#d9823f', mock: 'pipeline' },
    image: 'assets/img/projects/safram.webp', // maquette illustrative (pas de capture disponible)
    summary: {
      fr: 'Automatisation DevOps et processus métier sur Azure, en télétravail pour la France.',
      en: 'DevOps and business process automation on Azure, remote for a French client.',
    },
    context: {
      fr: 'SAFRAM, entreprise française, s’appuie sur Azure pour ses applications et ses processus internes.',
      en: 'SAFRAM, a French company, relies on Azure for its applications and internal processes.',
    },
    problem: {
      fr: 'Des livraisons et des processus métier encore en partie manuels, et des services cloud à surveiller.',
      en: 'Partly manual releases and business processes, and cloud services that needed monitoring.',
    },
    solution: {
      fr: ['Pipelines CI/CD avec Azure DevOps', 'Azure Functions en .NET / C# pour automatiser les processus métier', 'Surveillance de la disponibilité et des performances des services Azure'],
      en: ['CI/CD pipelines with Azure DevOps', '.NET / C# Azure Functions automating business processes', 'Monitoring of Azure service availability and performance'],
    },
    role: { fr: 'Consultant DevOps IT, en télétravail.', en: 'IT DevOps consultant, remote.' },
    result: {
      fr: 'Des déploiements automatisés et des processus métier qui tournent sans intervention manuelle.',
      en: 'Automated deployments and business processes that run without manual intervention.',
    },
    stack: ['Azure', 'Azure DevOps', '.NET', 'C#'],
    demoUrl: '',
    codeUrl: '',
  },
  {
    id: 'reporting',
    category: 'data',
    size: 'normal',
    title: { fr: 'Reporting décisionnel Google Data Studio', en: 'Google Data Studio business reporting' },
    client: 'Supermarche.mg',
    year: '2021 – 2022',
    cover: { from: '#2c333d', to: '#e8843f', mock: 'chart' },
    image: 'assets/img/projects/reporting.webp', // maquette illustrative (pas de capture disponible)
    summary: {
      fr: 'Requêtes SQL complexes et tableaux de bord pour les équipes de décision.',
      en: 'Complex SQL queries and dashboards for decision-makers.',
    },
    context: {
      fr: 'La direction avait besoin d’indicateurs fiables sur les ventes et les stocks.',
      en: 'Management needed reliable sales and inventory indicators.',
    },
    problem: {
      fr: 'Des données dispersées et des extractions manuelles lentes à produire.',
      en: 'Scattered data and slow manual exports.',
    },
    solution: {
      fr: ['Requêtes SQL d’agrégation sur la base de production', 'Tableaux de bord Google Data Studio connectés aux données'],
      en: ['SQL aggregation queries on the production database', 'Google Data Studio dashboards wired to the data'],
    },
    role: {
      fr: 'Conception des requêtes et des rapports, avec les équipes métier.',
      en: 'Designed queries and reports together with business teams.',
    },
    result: {
      fr: 'Des rapports à jour, consultables en libre-service par les décideurs.',
      en: 'Up-to-date, self-service reports for decision-makers.',
    },
    stack: ['SQL', 'MySQL', 'Google Data Studio'],
    demoUrl: '',
    codeUrl: '',
  },
  {
    id: 'inother',
    category: 'web',
    size: 'normal',
    title: { fr: 'Plateforme e-commerce Inother', en: 'Inother e-commerce platform' },
    client: 'Inother SARLU',
    year: '2019',
    cover: { from: '#262d36', to: '#c96a2e', mock: 'shop' },
    image: 'assets/img/projects/inother.webp', // maquette illustrative (pas de capture disponible)
    summary: {
      fr: 'Boutique en ligne de produits alimentaires, conçue et déployée en stage.',
      en: 'Online food store, designed and deployed during an internship.',
    },
    context: {
      fr: 'Inother SARLU souhaitait vendre ses produits alimentaires en ligne.',
      en: 'Inother SARLU wanted to sell its food products online.',
    },
    problem: {
      fr: 'Aucune plateforme existante : tout était à construire en trois mois.',
      en: 'No existing platform: everything had to be built in three months.',
    },
    solution: {
      fr: ['Conception de la base de données MySQL', 'Back-end Symfony et front-end jQuery', 'Configuration des environnements et déploiement'],
      en: ['MySQL database design', 'Symfony back-end and jQuery front-end', 'Environment setup and deployment'],
    },
    role: { fr: 'Conception, développement et déploiement de la plateforme.', en: 'Designed, built and deployed the platform.' },
    result: {
      fr: 'Une plateforme e-commerce livrée et déployée à la fin du stage.',
      en: 'An e-commerce platform delivered and deployed by the end of the internship.',
    },
    stack: ['Symfony', 'PHP', 'jQuery', 'MySQL'],
    demoUrl: '',
    codeUrl: '',
  },
];

const experiences = [
  {
    id: 'bici',
    role: { fr: 'Développeur Full Stack', en: 'Full Stack Developer' },
    company: 'BICI',
    location: { fr: 'Madagascar', en: 'Madagascar' },
    period: { fr: '2020 – 2026', en: '2020 – 2026' },
    summary: {
      fr: 'Projets internes, projets pour des clients locaux et interventions à distance sur des projets internationaux en tant que consultant.',
      en: 'Internal projects, projects for local clients and remote work on international projects as a consultant.',
    },
    highlights: {
      fr: [
        'Analyse des besoins, modélisation de bases de données relationnelles (MySQL, PostgreSQL, Oracle), architectures modulaires et scalables',
        'API REST sécurisées avec Java / Spring Boot, gestion des transactions, optimisation des performances',
        'Interfaces utilisateur dynamiques et responsives (React, JSP)',
        'Tests unitaires et fonctionnels, optimisation des requêtes SQL',
        'Environnements de test et de production avec Docker et CI/CD (GitHub Actions, GitLab CI), monitoring et mises à jour',
        'Maintenance corrective et évolutive des applications internes',
      ],
      en: [
        'Requirements analysis, relational database modelling (MySQL, PostgreSQL, Oracle), modular and scalable architectures',
        'Secure REST APIs with Java / Spring Boot, transaction management, performance tuning',
        'Dynamic, responsive user interfaces (React, JSP)',
        'Unit and functional testing, SQL query optimisation',
        'Test and production environments with Docker and CI/CD (GitHub Actions, GitLab CI), monitoring and updates',
        'Corrective and evolutionary maintenance of internal applications',
      ],
    },
    stack: ['Java', 'Spring Boot', 'React', 'JSP', 'MySQL', 'PostgreSQL', 'Oracle', 'Docker', 'Git', 'CI/CD', 'WebSockets'],
    missions: [
      {
        title: { fr: 'ASYNC — ERP de gestion d’entreprise', en: 'ASYNC — business management ERP' },
        project: 'async', // étude de cas liée dans le CV
        period: { fr: '2024 – aujourd’hui', en: '2024 – present' },
        highlights: {
          fr: [
            'ERP interne développé chez BICI, depuis le lancement du projet en 2024',
            'Participation au développement de tous les modules : ventes, achats, stock, caisse, comptabilité, tiers, gestion électronique des documents',
            'Tableau de bord de pilotage : chiffre d’affaires, ventes du jour, de la semaine et du mois, courbe d’évolution',
            'Modules d’analyse, de prévision, de rapports et d’historique ; recherche globale et listes configurables',
          ],
          en: [
            'Internal ERP built at BICI, since the project started in 2024',
            'Contributed to every module: sales, purchasing, inventory, cash desk, accounting, third parties, document management',
            'Management dashboard: revenue, sales for the day, week and month, trend chart',
            'Analysis, forecasting, reporting and history modules; global search and configurable lists',
          ],
        },
        stack: ['Java', 'JEE', 'JSP', 'JavaScript', 'HTML/CSS'],
      },
      {
        title: { fr: 'Ketrika.com — e-commerce & billetterie en ligne', en: 'Ketrika.com — e-commerce & online ticketing' },
        period: { fr: '2024 – aujourd’hui', en: '2024 – present' },
        highlights: {
          fr: [
            'Mainteneur du projet depuis 2024',
            'Refonte du design : ergonomie et navigation améliorées',
            'Développement front-end et back-end (Java, JEE, JSP) et API REST pour le contenu dynamique',
            'Billetterie en ligne avec plan de salle interactif et disponibilité des places en temps réel',
          ],
          en: [
            'Project maintainer since 2024',
            'Design overhaul: improved ergonomics and navigation',
            'Front-end and back-end development (Java, JEE, JSP) and REST APIs for dynamic content',
            'Online ticketing with an interactive seating plan and real-time seat availability',
          ],
        },
        stack: ['Java', 'JEE', 'JSP', 'API REST', 'JavaScript', 'PostgreSQL', 'Bootstrap'],
      },
      {
        title: { fr: 'Mission OMAPI — Office Malgache de la Propriété Industrielle', en: 'OMAPI — Malagasy Industrial Property Office' },
        period: { fr: 'mai 2023 – mai 2024', en: 'May 2023 – May 2024' },
        highlights: {
          fr: [
            'Conception et architecture de l’application back-office',
            'Fonctions génériques pour la réutilisabilité du code',
            'Écrans génériques (saisie, liste, fiche, modification) pour une UI cohérente',
            'Nouvelles fonctionnalités selon les besoins, intégration base de données, tests unitaires et d’intégration',
          ],
          en: [
            'Design and architecture of the back-office application',
            'Generic functions for code reuse',
            'Generic screens (entry, list, detail, edit) for a consistent UI',
            'New features driven by user needs, database integration, unit and integration tests',
          ],
        },
        stack: ['React', 'Java', 'Spring', 'HTML', 'CSS', 'MySQL'],
      },
      {
        title: { fr: 'Consultant DevOps IT — SAFRAM (France), en télétravail', en: 'IT DevOps Consultant — SAFRAM (France), remote' },
        period: { fr: 'mai 2022 – avril 2023', en: 'May 2022 – April 2023' },
        highlights: {
          fr: [
            'Mise en place et gestion des pipelines CI/CD avec Azure DevOps',
            'Azure Functions en .NET pour automatiser les processus métier',
            'Surveillance et maintenance des services Azure (disponibilité, performance)',
          ],
          en: [
            'Set up and managed CI/CD pipelines with Azure DevOps',
            '.NET Azure Functions automating business processes',
            'Monitoring and maintenance of Azure services (availability, performance)',
          ],
        },
        stack: ['Azure', 'Azure DevOps', '.NET', 'C#'],
      },
    ],
  },
  {
    id: 'supermarche',
    role: { fr: 'Développeur Web Freelance', en: 'Freelance Web Developer' },
    company: 'Supermarche.mg',
    location: { fr: 'Madagascar', en: 'Madagascar' },
    period: { fr: '2021 – 2022', en: '2021 – 2022' },
    periodDetail: { fr: 'août 2021 – avril 2022', en: 'Aug 2021 – Apr 2022' },
    highlights: {
      fr: [
        'Optimisation et développement des sites e-commerce supermarche.mg et express.mg',
        'Applications internes sur mesure pour l’entreprise',
        'Plateforme d’automatisation des commandes selon les niveaux de stock',
        'Responsable des déploiements sous Jenkins',
        'Requêtes SQL complexes et rapports Google Data Studio pour les équipes de décision',
      ],
      en: [
        'Optimised and developed the supermarche.mg and express.mg e-commerce sites',
        'Custom internal applications for the company',
        'Platform automating purchase orders based on stock levels',
        'Owned deployments with Jenkins',
        'Complex SQL queries and Google Data Studio reports for decision-makers',
      ],
    },
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'Bootstrap', 'WordPress', 'SQL', 'Jenkins'],
  },
  {
    id: 'inother',
    role: { fr: 'Stagiaire en développement web', en: 'Web Development Intern' },
    company: 'Inother SARLU',
    location: { fr: 'Antananarivo', en: 'Antananarivo' },
    period: { fr: '2019', en: '2019' },
    periodDetail: { fr: '3 mois', en: '3 months' },
    summary: {
      fr: 'Conception, développement et déploiement d’une plateforme e-commerce de vente de produits alimentaires.',
      en: 'Designed, built and deployed an e-commerce platform selling food products.',
    },
    highlights: {
      fr: ['Front-end et back-end de la plateforme', 'Conception de la base de données', 'Configuration des environnements'],
      en: ['Front-end and back-end of the platform', 'Database design', 'Environment configuration'],
    },
    stack: ['Symfony', 'PHP', 'jQuery', 'MySQL'],
  },
];

const processSteps = [
  {
    title: { fr: 'Comprendre votre besoin', en: 'Understanding your needs' },
    text: {
      fr: 'Un premier appel pour cerner vos objectifs, vos utilisateurs et vos contraintes.',
      en: 'A first call to understand your goals, your users and your constraints.',
    },
    tech: [{ fr: 'Appel découverte', en: 'Discovery call' }, { fr: 'Cahier des charges', en: 'Specifications' }, 'Agile / Scrum'],
  },
  {
    title: { fr: 'Une proposition claire', en: 'A clear proposal' },
    text: {
      fr: 'Je vous propose une solution, un planning et un budget détaillés, sans jargon.',
      en: 'I propose a solution, a timeline and a detailed budget, without jargon.',
    },
    tech: [{ fr: 'Maquettes', en: 'Mockups' }, { fr: 'Devis', en: 'Quote' }, 'UML', { fr: 'Architecture', en: 'Architecture' }],
  },
  {
    title: { fr: 'Construire avec vous', en: 'Building it with you' },
    text: {
      fr: 'Développement par étapes, avec des démos régulières pour valider chaque avancée.',
      en: 'Step-by-step development, with regular demos so you approve every milestone.',
    },
    tech: [{ fr: 'Démos régulières', en: 'Regular demos' }, { fr: 'Tests', en: 'Testing' }, 'Code review'],
  },
  {
    title: { fr: 'Mise en ligne & suivi', en: 'Launch & support' },
    text: {
      fr: 'Mise en ligne automatisée, prise en main par vos équipes, puis maintenance et évolutions.',
      en: 'Automated launch, onboarding for your teams, then maintenance and new features.',
    },
    tech: ['CI/CD', 'Monitoring', { fr: 'Formation', en: 'Training' }, { fr: 'Maintenance', en: 'Maintenance' }],
  },
];

const education = [
  {
    degree: {
      fr: 'Master 2 BIHAR — Big Data Intelligence for Human Augmented Reality',
      en: 'Master’s (Year 2) BIHAR — Big Data Intelligence for Human Augmented Reality',
    },
    school: 'ESTIA — École Supérieure des Technologies Industrielles Avancées',
    country: { fr: 'France', en: 'France' },
    period: { fr: '2026 – 2027', en: '2026 – 2027' },
    current: true,
    // Mis en avant dans la carte « Distinctions » à côté de la liste.
    highlight: {
      text: {
        fr: 'Master of Science labellisé CGE (Conférence des Grandes Écoles) en Big Data et intelligence artificielle : infrastructures de données massives, préparation des données, Machine & Deep Learning, puis déploiement de solutions IA (API, MLOps, CI/CD, cloud).',
        en: 'CGE-accredited (Conférence des Grandes Écoles) Master of Science in Big Data and artificial intelligence: large-scale data infrastructures, data preparation, Machine & Deep Learning, and deployment of AI solutions (APIs, MLOps, CI/CD, cloud).',
      },
      topics: ['Big Data', 'Machine Learning', 'Deep Learning', 'MLOps', 'Hadoop / Spark', 'SQL / NoSQL', 'Cloud'],
    },
  },
  {
    degree: { fr: 'Master I en développement d’application', en: 'Master’s (Year 1) in Application Development' },
    school: 'IT University',
    country: { fr: 'Madagascar', en: 'Madagascar' },
    period: { fr: '2025 – 2026', en: '2025 – 2026' },
  },
  {
    degree: {
      fr: 'Licence III en informatique, option Développeur d’application',
      en: 'Bachelor’s in Computer Science, Application Developer track',
    },
    school: 'IT University',
    country: { fr: 'Madagascar', en: 'Madagascar' },
    period: { fr: '2016 – 2019', en: '2016 – 2019' },
    details: {
      fr: 'Architecture multi-tiers, programmation avancée & frameworks, programmation système, développement mobile, développement web avancé, conception orientée objet.',
      en: 'Multi-tier architecture, advanced programming & frameworks, systems programming, mobile development, advanced web development, object-oriented design.',
    },
  },
  {
    degree: { fr: 'Baccalauréat scientifique (série D)', en: 'Scientific Baccalaureate (Series D)' },
    school: 'Lycée privé « La Flèche »',
    country: { fr: 'Madagascar', en: 'Madagascar' },
    period: { fr: '2016', en: '2016' },
  },
];

/**
 * Questions fréquentes (section « Questions fréquentes », juste avant le contact).
 * Elles ciblent les recherches « développeur full stack / full remote / Madagascar » :
 * gardez des réponses factuelles, elles apparaissent telles quelles dans Google.
 */
const faq = [
  {
    q: { fr: 'Travaillez-vous en full remote depuis Madagascar ?', en: 'Do you work fully remote from Madagascar?' },
    a: {
      fr: 'Oui. Je suis basé à Antananarivo et je travaille en full remote pour des entreprises à Madagascar, en France et à l’international. J’ai par exemple automatisé à distance les pipelines CI/CD et les processus Azure de SAFRAM, une entreprise française.',
      en: 'Yes. I am based in Antananarivo and work fully remote for companies in Madagascar, France and worldwide. For example, I remotely automated the CI/CD pipelines and Azure processes of SAFRAM, a French company.',
    },
  },
  {
    q: { fr: 'Pourquoi travailler avec un développeur basé à Madagascar ?', en: 'Why work with a developer based in Madagascar?' },
    a: {
      fr: 'Vous travaillez avec un développeur Full Stack senior francophone et anglophone, sur un fuseau horaire proche de l’Europe, qui a plus de six ans d’expérience sur des applications en production (Java, React, CI/CD) pour des clients à Madagascar et en France.',
      en: 'You work with a senior Full Stack developer who speaks French and English, in a time zone close to Europe, with more than six years of experience on production applications (Java, React, CI/CD) for clients in Madagascar and France.',
    },
  },
  {
    q: { fr: 'Quel est le décalage horaire avec la France ?', en: 'What is the time difference with Europe?' },
    a: {
      fr: 'Madagascar est à GMT+3, sans changement d’heure : une heure de plus qu’à Paris en été, deux heures en hiver. Nos journées de travail se recouvrent presque entièrement, ce qui facilite les réunions et les échanges en direct.',
      en: 'Madagascar is on GMT+3 with no daylight saving time: one to two hours ahead of Paris or Berlin, two to three hours ahead of London. Our working days overlap almost entirely, which makes meetings and live discussions easy.',
    },
  },
  {
    q: { fr: 'Quelles technologies utilisez-vous ?', en: 'Which technologies do you use?' },
    a: {
      fr: 'Côté serveur : Java / Spring Boot, mais aussi PHP / Symfony et .NET. Côté interface : React, TypeScript et JavaScript. Pour les données : MySQL, PostgreSQL et Oracle. Pour la mise en ligne : Docker et la CI/CD (GitHub Actions, GitLab CI, Jenkins, Azure DevOps).',
      en: 'Back end: Java / Spring Boot, as well as PHP / Symfony and .NET. Front end: React, TypeScript and JavaScript. Data: MySQL, PostgreSQL and Oracle. Delivery: Docker and CI/CD (GitHub Actions, GitLab CI, Jenkins, Azure DevOps).',
    },
  },
  {
    q: { fr: 'Comment se passe une collaboration à distance ?', en: 'How does a remote collaboration work?' },
    a: {
      fr: 'Un premier appel pour comprendre votre besoin, puis une proposition claire : solution, planning et budget. Je développe par étapes, avec des démos régulières sur une version de test, et chaque nouveauté est mise en ligne automatiquement, sans coupure. Vous avez un seul interlocuteur du début à la fin.',
      en: 'A first call to understand your needs, then a clear proposal: solution, timeline and budget. I build step by step, with regular demos on a preview version, and every new feature is released automatically, with no downtime. You have a single point of contact from start to finish.',
    },
  },
  {
    q: { fr: 'Êtes-vous disponible en freelance ou pour un poste ?', en: 'Are you available for freelance work or a remote position?' },
    a: {
      fr: 'Les deux : je réalise des projets complets et des missions freelance, et je peux aussi rejoindre votre équipe tech sur un poste en full remote. Décrivez-moi votre besoin, je vous réponds rapidement.',
      en: 'Both: I take on complete projects and freelance contracts, and I can also join your tech team in a fully remote position. Tell me what you need and I will get back to you quickly.',
    },
  },
  {
    q: { fr: 'En quelles langues pouvons-nous travailler ?', en: 'Which languages can we work in?' },
    a: {
      fr: 'En français ou en anglais, à l’écrit comme à l’oral. Le malgache est ma langue maternelle.',
      en: 'French or English, written and spoken. Malagasy is my native language.',
    },
  },
];

/* ───────────────── Référencement ───────────────── */
/**
 * Adresses des pages et informations des données structurées (schema.org).
 * Lu par js/script.js et par tools/prerender.mjs : relancez `node tools/prerender.mjs` après une modification.
 */
const seo = {
  // Page d'accueil de chaque langue, relative à profile.website.
  home: { fr: '', en: 'en.html' },
  // Dossier des pages « étude de cas » : projets/<id>/ en français, projects/<id>/ en anglais.
  projects: { fr: 'projets', en: 'projects' },
  // Nom du site dans les résultats Google (à la place de « GitHub ») : name = prénom + nom, puis variantes.
  siteAlternateNames: ['Safidy H.', 'Safidy Herimampianina — Portfolio'],
  sameAs: ['https://www.linkedin.com/in/safidy-herimampianina-0170321a4/', 'https://github.com/SafidyHerimampianina'],
  knowsLanguage: ['mg', 'fr', 'en'],
  nationality: 'Madagascar',
  address: { locality: 'Antananarivo', country: 'MG' },
  worksFor: 'BICI', // employeur actuel ; '' pour ne pas l'indiquer
  published: '2026-10-01',
};

/* ───────────────── CV (PDF) ───────────────── */
/**
 * `node tools/cv.mjs` écrit les PDF de profile.cv à partir de ce fichier : en-tête et coordonnées (profile),
 * compétences (skillCategories), expériences et missions (experiences), avec le résultat de l'étude de cas
 * du même client (projects), formation (education), langues et centres d'intérêt.
 */
const cv = {
  headline: {
    fr: 'Développeur Full Stack Senior · Java / Spring Boot · React',
    en: 'Senior Full Stack Developer · Java / Spring Boot · React',
  },
  summary: {
    fr: 'Développeur Full Stack senior avec plus de six ans d’expérience dans la conception, le développement et la mise en production d’applications web métier : ERP, back-offices institutionnels, plateformes e-commerce et automatisation. Spécialiste Java / Spring Boot et React, je prends en charge un projet de bout en bout, de l’analyse du besoin à la mise en ligne et à la maintenance (Docker, CI/CD). Habitué au full remote avec la France, je travaille en français comme en anglais, sur des horaires communs avec l’Europe.',
    en: 'Senior Full Stack developer with more than six years of experience designing, building and shipping business web applications: ERP, institutional back-offices, e-commerce platforms and automation. Specialised in Java / Spring Boot and React, I own projects end to end, from requirements analysis to release and maintenance (Docker, CI/CD). Experienced in fully remote work with France, I work in English and French, on hours that overlap with Europe.',
  },
  // Catégories de skillCategories reprises dans le CV, dans cet ordre.
  skills: ['backend', 'frontend', 'database', 'devops', 'mobile', 'tools', 'methods'],
};

/* ───────────────── Formulaire de contact ───────────────── */
/** Sujets proposés au-dessus du formulaire de contact (remplissent le champ « Sujet »). */
const contactTopics = [
  { fr: 'Nouveau projet', en: 'New project' },
  { fr: 'Mission freelance', en: 'Freelance contract' },
  { fr: 'Offre d’emploi', en: 'Job opportunity' },
  { fr: 'Autre', en: 'Other' },
];

/**
 * Configuration EmailJS — https://dashboard.emailjs.com
 * La clé publique EmailJS est conçue pour être exposée côté navigateur
 * (limitez les domaines autorisés dans le tableau de bord EmailJS).
 * Laissez les valeurs vides : le formulaire proposera alors d'écrire directement par email.
 */
const EMAILJS = {
  serviceId: 'service_x2b0w3r',
  templateId: 'template_f00klsk',
  publicKey: 'DQWijvtXNDSlhjGvd',
  // Clé du site Google reCAPTCHA v2 (case « Je ne suis pas un robot »), vérifiée par EmailJS avec la clé secrète
  // renseignée dans le modèle (Settings → Enable reCAPTCHA V2 verification). Vide : case simple, sans Google.
  recaptchaSiteKey: '6LdFVhgqAAAAAJ7aTritt_Vg8RxZHkYQa4PgH1pz',
};

/* ───────────────── Textes d'interface (FR / EN) ─────────────────
 * Dans le HTML : data-i18n="clé" remplace le texte,
 * data-i18n-attr="placeholder:clé;aria-label:clé" remplace des attributs.
 */
const UI_STRINGS = {
  fr: {
    'meta.title': 'Développeur Full Stack en full remote à Madagascar · Java & React | Safidy Herimampianina',
    'meta.description':
      'Développeur Full Stack senior en full remote depuis Madagascar : Java / Spring Boot, React, CI/CD. 6+ ans d’expérience. Freelance ou poste à distance.',
    'meta.imageAlt': 'Safidy Herimampianina, développeur Full Stack senior en full remote depuis Madagascar',
    'a11y.skip': 'Aller au contenu',
    'a11y.menu': 'Ouvrir le menu',
    'a11y.menuClose': 'Fermer le menu',
    'a11y.nav': 'Navigation principale',
    'a11y.lang': 'Changer de langue',
    'a11y.palette': 'Rechercher — ouvrir la palette de commandes (Ctrl + K)',
    'a11y.close': 'Fermer',
    'a11y.copy': 'Copier',
    'a11y.top': 'Retour en haut',
    'a11y.scroll': 'Faire défiler vers la section suivante',
    'a11y.photo': 'Portrait de Safidy Herimampianina',
    'a11y.loading': 'Chargement',
    'nav.home': 'accueil',
    'nav.expertise': 'Services',
    'nav.about': 'À propos',
    'nav.work': 'Réalisations',
    'nav.experience': 'Expérience',
    'nav.education': 'Formation',
    'nav.contact': 'Contact',
    'nav.cv': 'Télécharger le CV',
    'nav.brandLabel': 'retour à l’accueil',
    'nav.search': 'Rechercher',
    'nav.cvShort': 'CV',
    'nav.sections': 'Sections',
    'nav.quick': 'Accès rapide',
    'nav.call': 'Appeler',
    'nav.write': 'Écrire',
    'nav.d.expertise': '{{n}} technologies · {{areas}}',
    'nav.d.about': '{{location}} · {{languages}}',
    'nav.d.work': '{{n}} études de cas · {{clients}}',
    'nav.d.experience': '{{years}}+ ans · {{companies}}',
    'nav.d.education': '{{degree}}',
    'nav.d.contact': '{{availability}}',
    'hero.available': 'Disponible pour de nouvelles opportunités',
    'hero.iam': 'je suis',
    'hero.trusted': 'Ils m’ont fait confiance',
    'hero.ctaWork': 'Voir mes projets',
    'hero.ctaContact': 'Me contacter',
    'expertise.title': 'Services de développement Full Stack',
    'expertise.intro':
      'Entreprises : je livre des applications qui font gagner du temps à vos équipes. Équipes tech : je rejoins votre stack Java / Spring Boot, React et CI/CD, en full remote.',
    'expertise.levels': 'Points forts',
    'expertise.levelsHint': 'Prouvés sur des projets réels',
    'expertise.years': 'ans',
    'expertise.since': 'Depuis',
    'expertise.all': 'Tout',
    'expertise.filter': 'Filtrer les compétences',
    'expertise.stack': 'Stack technique',
    'about.title': 'À propos',
    'about.languages': 'Langues',
    'about.interests': 'Centres d’intérêt',
    'work.title': 'Mes réalisations',
    'work.intro':
      'Back-offices institutionnels, e-commerce, automatisation et pipelines DevOps : des applications métier conçues, livrées et maintenues en production pour des clients locaux et internationaux.',
    'work.featured': 'Projet phare',
    'work.onlineStore': 'Boutique en ligne',
    'work.view': 'Voir le projet',
    'work.filterBy': 'Filtrer par',
    'work.all': 'Tout',
    'work.context': 'Contexte',
    'work.problem': 'Problème',
    'work.solution': 'Solution & architecture',
    'work.stack': 'Stack',
    'work.role': 'Mon rôle',
    'work.result': 'Résultat',
    'work.demo': 'Voir la démo',
    'work.code': 'Voir le code',
    'faq.title': 'Questions fréquentes',
    'faq.intro': 'Travailler en full remote avec un développeur Full Stack basé à Madagascar : l’essentiel en quelques réponses.',
    'case.title': 'étude de cas',
    'case.home': 'Accueil',
    'case.breadcrumb': 'Fil d’Ariane',
    'case.ctaTitle': 'Un projet similaire ?',
    'case.ctaText': 'Je conçois, développe et mets en ligne des applications web Full Stack, en full remote depuis Madagascar. Parlons de votre besoin.',
    'case.all': 'Toutes les réalisations',
    'case.more': 'Autres réalisations',
    'cv.title': 'CV',
    'cv.profile': 'Profil',
    'cv.skills': 'Compétences techniques',
    'cv.education': 'Formation',
    'cv.stack': 'Environnement technique',
    'cv.topics': 'Spécialités',
    'cv.extras': 'Langues & centres d’intérêt',
    'cv.remote': 'Full remote',
    'cv.portfolio': 'Portfolio et études de cas',
    'process.title': 'Comment nous travaillerons ensemble',
    'experience.title': 'Expérience professionnelle',
    'experience.missions': 'Missions notables',
    'education.title': 'Formation & distinctions',
    'education.awards': 'Distinction',
    'education.current': 'en cours',
    'contact.eyebrow': 'Contact',
    'contact.title': 'Travaillons ensemble',
    'contact.text': 'Un projet à lancer, une application à faire évoluer ou un poste à pourvoir ? Écrivez-moi, je vous réponds rapidement.',
    'contact.topic': 'Votre demande concerne',
    'contact.privacy': 'Vos informations servent uniquement à vous répondre.',
    'contact.replyText': 'Réponse rapide, en français ou en anglais.',
    'contact.timezone': 'Fuseau horaire',
    'contact.timezoneHint': 'Horaires communs avec l’Europe',
    'contact.languages': 'Langues',
    'contact.profile': 'Voir mon profil',
    'contact.formTitle': 'Écrivez-moi',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.namePh': 'Votre nom',
    'contact.emailPh': 'vous@exemple.com',
    'contact.subjectPh': 'Objet de votre message',
    'contact.messagePh': 'Parlez-moi de votre projet…',
    'contact.send': 'Envoyer',
    'contact.sending': 'Envoi…',
    'contact.success': 'Merci ! Votre message a bien été envoyé. Je vous réponds très vite.',
    'contact.error': 'L’envoi a échoué. Réessayez ou écrivez-moi directement à',
    'contact.notConfigured': 'Le formulaire n’est pas encore configuré. Écrivez-moi directement à',
    'contact.v.name': 'Le nom doit contenir au moins 2 caractères.',
    'contact.v.email': 'Adresse email invalide.',
    'contact.v.subject': 'Le sujet doit contenir au moins 3 caractères.',
    'contact.v.message': 'Le message doit contenir au moins 10 caractères.',
    'contact.human': 'Je ne suis pas un robot',
    'contact.v.human': 'Cochez la case pour confirmer que vous n’êtes pas un robot.',
    'contact.phone': 'Téléphone',
    'contact.location': 'Localisation',
    'contact.copied': 'Copié !',
    'footer.rights': 'Tous droits réservés.',
    'footer.built': 'Conçu et développé en HTML, CSS & JavaScript.',
    'palette.placeholder': 'Tapez une commande ou recherchez…',
    'palette.empty': 'Aucun résultat.',
    'palette.nav': 'Navigation',
    'palette.actions': 'Actions',
    'palette.goto': 'Aller à',
    'palette.lang': 'Switch to English',
    'palette.cv': 'Télécharger le CV',
    'palette.email': 'Copier l’adresse email',
    'palette.copied': 'Email copié',
    'palette.hint': '↑↓ naviguer · ↵ valider · esc fermer',
  },
  en: {
    'meta.title': 'Remote Full Stack Developer in Madagascar · Java & React | Safidy Herimampianina',
    'meta.description':
      'Senior Full Stack developer working fully remote from Madagascar: Java / Spring Boot, React, CI/CD. 6+ years of experience. Freelance or remote position.',
    'meta.imageAlt': 'Safidy Herimampianina, senior Full Stack developer working fully remote from Madagascar',
    'a11y.skip': 'Skip to content',
    'a11y.menu': 'Open menu',
    'a11y.menuClose': 'Close menu',
    'a11y.nav': 'Main navigation',
    'a11y.lang': 'Switch language',
    'a11y.palette': 'Search — open the command palette (Ctrl + K)',
    'a11y.close': 'Close',
    'a11y.copy': 'Copy',
    'a11y.top': 'Back to top',
    'a11y.scroll': 'Scroll to next section',
    'a11y.photo': 'Portrait of Safidy Herimampianina',
    'a11y.loading': 'Loading',
    'nav.home': 'home',
    'nav.expertise': 'Services',
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.cv': 'Download CV',
    'nav.brandLabel': 'back to top',
    'nav.search': 'Search',
    'nav.cvShort': 'CV',
    'nav.sections': 'Sections',
    'nav.quick': 'Quick access',
    'nav.call': 'Call',
    'nav.write': 'Email',
    'nav.d.expertise': '{{n}} technologies · {{areas}}',
    'nav.d.about': '{{location}} · {{languages}}',
    'nav.d.work': '{{n}} case studies · {{clients}}',
    'nav.d.experience': '{{years}}+ years · {{companies}}',
    'nav.d.education': '{{degree}}',
    'nav.d.contact': '{{availability}}',
    'hero.available': 'Open to new opportunities',
    'hero.iam': 'i am a',
    'hero.trusted': 'Trusted by',
    'hero.ctaWork': 'See my work',
    'hero.ctaContact': 'Get in touch',
    'expertise.title': 'Full Stack development services',
    'expertise.intro':
      'Businesses: I deliver applications that save your teams time. Tech teams: I join your Java / Spring Boot, React and CI/CD stack, fully remote.',
    'expertise.levels': 'Core strengths',
    'expertise.levelsHint': 'Proven on real projects',
    'expertise.years': 'yrs',
    'expertise.since': 'Since',
    'expertise.all': 'All',
    'expertise.filter': 'Filter skills',
    'expertise.stack': 'Tech stack',
    'about.title': 'About',
    'about.languages': 'Languages',
    'about.interests': 'Interests',
    'work.title': 'My work',
    'work.intro':
      'Institutional back-offices, e-commerce, automation and DevOps pipelines: business applications designed, shipped and maintained in production for local and international clients.',
    'work.featured': 'Featured project',
    'work.onlineStore': 'Online store',
    'work.view': 'View project',
    'work.filterBy': 'Filter by',
    'work.all': 'All',
    'work.context': 'Context',
    'work.problem': 'Problem',
    'work.solution': 'Solution & architecture',
    'work.stack': 'Stack',
    'work.role': 'My role',
    'work.result': 'Outcome',
    'work.demo': 'Live demo',
    'work.code': 'Source code',
    'faq.title': 'Frequently asked questions',
    'faq.intro': 'Working fully remote with a Full Stack developer based in Madagascar: the essentials in a few answers.',
    'case.title': 'case study',
    'case.home': 'Home',
    'case.breadcrumb': 'Breadcrumb',
    'case.ctaTitle': 'A similar project?',
    'case.ctaText': 'I design, build and launch Full Stack web applications, working fully remote from Madagascar. Let’s talk about what you need.',
    'case.all': 'All projects',
    'case.more': 'More projects',
    'cv.title': 'Resume',
    'cv.profile': 'Profile',
    'cv.skills': 'Technical skills',
    'cv.education': 'Education',
    'cv.stack': 'Tech environment',
    'cv.topics': 'Focus areas',
    'cv.extras': 'Languages & interests',
    'cv.remote': 'Fully remote',
    'cv.portfolio': 'Portfolio and case studies',
    'process.title': 'How we’ll work together',
    'experience.title': 'Professional experience',
    'experience.missions': 'Notable engagements',
    'education.title': 'Education & awards',
    'education.awards': 'Distinction',
    'education.current': 'in progress',
    'contact.eyebrow': 'Contact',
    'contact.title': 'Let’s work together',
    'contact.text': 'A project to launch, an application to improve or a role to fill? Write to me and I’ll get back to you quickly.',
    'contact.topic': 'What is it about?',
    'contact.privacy': 'Your details are only used to reply to you.',
    'contact.replyText': 'Quick reply, in English or French.',
    'contact.timezone': 'Time zone',
    'contact.timezoneHint': 'Overlaps with European hours',
    'contact.languages': 'Languages',
    'contact.profile': 'View my profile',
    'contact.formTitle': 'Write to me',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.namePh': 'Your name',
    'contact.emailPh': 'you@example.com',
    'contact.subjectPh': 'What is it about?',
    'contact.messagePh': 'Tell me about your project…',
    'contact.send': 'Send',
    'contact.sending': 'Sending…',
    'contact.success': 'Thank you! Your message has been sent. I’ll get back to you very soon.',
    'contact.error': 'Sending failed. Please try again or email me directly at',
    'contact.notConfigured': 'The form isn’t configured yet. Please email me directly at',
    'contact.v.name': 'Name must be at least 2 characters.',
    'contact.v.email': 'Invalid email address.',
    'contact.v.subject': 'Subject must be at least 3 characters.',
    'contact.v.message': 'Message must be at least 10 characters.',
    'contact.human': 'I’m not a robot',
    'contact.v.human': 'Please tick the box to confirm you are not a robot.',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.copied': 'Copied!',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Designed and built with HTML, CSS & JavaScript.',
    'palette.placeholder': 'Type a command or search…',
    'palette.empty': 'No results.',
    'palette.nav': 'Navigation',
    'palette.actions': 'Actions',
    'palette.goto': 'Go to',
    'palette.lang': 'Passer en français',
    'palette.cv': 'Download CV',
    'palette.email': 'Copy email address',
    'palette.copied': 'Email copied',
    'palette.hint': '↑↓ navigate · ↵ select · esc close',
  },
};
