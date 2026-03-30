const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const progressFill = document.getElementById('progressFill');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');
const fadeEls = document.querySelectorAll('.fade-up');
const skillRows = document.querySelectorAll('.skill-row');
const langToggle = document.getElementById('lang-toggle');

function openMenu() {
  mobileOverlay.classList.add('open');
  mobileOverlay.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('is-active');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  mobileOverlay.classList.remove('open');
  mobileOverlay.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('is-active');
  document.body.classList.remove('menu-open');
}

if (hamburger && mobileOverlay) {
  hamburger.addEventListener('click', () => {
    if (mobileOverlay.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

window.closeMenu = closeMenu;

function updateScrollProgress() {
  if (!progressFill) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, {
  threshold: 0.45
});

sections.forEach((section) => sectionObserver.observe(section));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -8% 0px'
});

fadeEls.forEach((el) => fadeObserver.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const fill = entry.target.querySelector('.skill-row__fill');
    const pct = entry.target.dataset.pct;

    if (!fill) return;

    clearTimeout(entry.target._skillTimeout);

    if (entry.isIntersecting) {
      entry.target._skillTimeout = setTimeout(() => {
        fill.style.width = `${pct}%`;
      }, 180);
    } else {
      fill.style.width = '0%';
    }
  });
}, {
  threshold: 0.3
});

skillRows.forEach((row) => {
  const fill = row.querySelector('.skill-row__fill');
  if (fill) fill.style.width = '0%';
  skillObserver.observe(row);
});

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    alert('Message sent successfully.');
    form.reset();
  } catch (error) {
    alert('Something went wrong. Please try again.');
  }
}

window.handleSubmit = handleSubmit;

const translations = {
  en: {
    nav_home: 'Hero',
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_contact: 'Contact',

    hero_sys: 'SYSTEM_INIT / 2026',
    hero_title_html: 'ANES<br>BOUZIAD.',
    hero_sub: 'Computer Science student from Constantine, Algeria. Passionate about Linux systems, Assembly language, algorithm complexity, and crafting efficient low-level architectures.',
    hero_projects: 'View Projects ↗',
    hero_contact: 'Get In Touch',
    hero_spec: '// SYSTEM_SPEC',

    spec_status_key: 'STATUS',
    spec_status_val: 'CS Student',
    spec_location_key: 'LOCATION',
    spec_location_val: 'Jijel, DZ',
    spec_focus_key: 'FOCUS',
    spec_focus_val: 'Systems & Low-Level',
    spec_stack_key: 'STACK',
    spec_stack_val: 'C · Assembly · Linux',
    spec_year_key: 'YEAR',
    spec_year_val: '2026',
    spec_availability_key: 'AVAILABILITY',
    spec_availability_val: 'Open to Collabs',

    about_label: '01 — ARCHITECT_PROFILE',
    about_headline_html: 'THE ENGINEER<br>BEHIND THE<br>STACK.',
    about_stat_1: 'Years Coding',
    about_stat_2: 'Projects Built',
    about_stat_3: 'Tech Stack',
    about_body_1: 'I am a Computer Science student dedicated to building robust, efficient, and precise software systems. My approach favors structural clarity and technical rigor over fleeting trends — every line of code is a deliberate architectural decision.',
    about_body_2: 'From low-level Assembly routines and Linux kernel internals to algorithm complexity analysis and system optimization, I build software that performs under pressure and scales with intent.',
    fact_uni_key: 'UNIVERSITY',
    fact_uni_val_html: 'Computer Science,<br>Jijel , Algeria',
    fact_interest_key: 'CORE INTERESTS',
    fact_interest_val: 'Linux · Assembly · Algorithms · Hardware · System Optimization',
    fact_lang_key: 'LANGUAGES',
    fact_lang_val: 'C · JavaScript · Python · Assembly · Bash',
    fact_philo_key: 'PHILOSOPHY',
    fact_philo_val_html: 'Correctness first,<br>efficiency always.',

    skills_label: '02 — TECHNICAL_RIGOR',
    skills_headline_html: 'TECHNICAL<br>RIGOR.',
    skills_desc: 'A discipline-first skillset built on computer science fundamentals, low-level systems expertise, and a relentless drive to understand how machines truly work.',
    cluster_1: 'SYSTEMS_CLUSTER',
    cluster_2: 'SOFTWARE_CLUSTER',
    skill_asm: 'Assembly x86',
    skill_c: 'C Language',
    skill_sysprog: 'System Programming',
    skill_algo: 'Algorithm Analysis',
    skill_git: 'Git / Version Control',

    projects_label: '03 — SELECTED_REPOS',
    projects_headline: 'PROJECTS.',
    projects_meta: 'SELECTED_REPOS / 04',
    proj1_title_html: 'PDF LINE<br>DETECTER',
    proj1_desc: 'Custom App that detects lines in a PDF to help the reader to keep up wich line he stops reading and not loosing track.',
    proj2_title_html: 'STORE<br>WEB',
    proj2_desc: 'A full responsive redy to go store for any store with backend and costom interface from the admin page.',
    proj3_title_html: 'WPA APP<br>sotre',
    proj3_desc: 'Interactive APP for small stores using small data bases with a backup backend to store the statistics of the store.',
    proj4_title_html: 'SYSTEM<br>OPTIMIZER',
    proj4_desc: 'CLI utility for Linux system profiling, automated cleaning, performance benchmarking, and reporting.',

    contact_label: '04 — INITIATE_CONTACT',
    contact_headline_html: "LET'S BUILD<br>SOMETHING<br>PRECISE.",
    contact_sub: 'Available for academic collaborations, open-source contributions, and engineering projects that demand technical depth.',
    contact_email: 'EMAIL',
    form_name: 'SUBJECT_NAME',
    form_name_ph: 'YOUR_NAME',
    form_email: 'ELECTRONIC_MAIL',
    form_email_ph: 'YOUR@EMAIL.COM',
    form_message: 'MESSAGE_DETAILS',
    form_message_ph: 'DESCRIBE_THE_WORK...',
    form_submit: 'SEND_MESSAGE →',

    footer_copy: '© 2026 — Jijel, ALGERIA — CS_STUDENT'
  },

  fr: {
    nav_home: 'Accueil',
    nav_about: 'À propos',
    nav_skills: 'Compétences',
    nav_projects: 'Projets',
    nav_contact: 'Contact',

    hero_sys: 'INIT_SYSTEME / 2026',
    hero_title_html: 'ANES<br>BOUZIAD.',
    hero_sub: "Étudiant en informatique à Jijel, Algérie. Passionné par les systèmes Linux, le langage Assembleur, la complexité des algorithmes et la conception d’architectures bas niveau efficaces.",
    hero_projects: 'Voir Projets ↗',
    hero_contact: 'Me Contacter',
    hero_spec: '// SYSTEM_SPEC',

    spec_status_key: 'STATUT',
    spec_status_val: 'Étudiant en informatique',
    spec_location_key: 'LIEU',
    spec_location_val: 'Jijel, DZ',
    spec_focus_key: 'FOCUS',
    spec_focus_val: 'Systèmes & bas niveau',
    spec_stack_key: 'STACK',
    spec_stack_val: 'C · Assembleur · Linux',
    spec_year_key: 'ANNÉE',
    spec_year_val: '2026',
    spec_availability_key: 'DISPONIBILITÉ',
    spec_availability_val: 'Ouvert aux collaborations',

    about_label: '01 — PROFIL_ARCHITECTE',
    about_headline_html: "L'INGÉNIEUR<br>DERRIÈRE LA<br>STACK.",
    about_stat_1: 'Ans de code',
    about_stat_2: 'Projets réalisés',
    about_stat_3: 'Technologies',
    about_body_1: "Je suis un étudiant en informatique dédié à la construction de systèmes logiciels robustes, efficaces et précis. Mon approche privilégie la clarté structurelle et la rigueur technique — chaque ligne de code est une décision architecturale réfléchie.",
    about_body_2: "Des routines Assembleur bas niveau et des internals du noyau Linux jusqu’à l’analyse de complexité algorithmique et l’optimisation système, je construis des logiciels capables de tenir sous pression et d’évoluer avec intention.",
    fact_uni_key: 'UNIVERSITÉ',
    fact_uni_val_html: 'Informatique,<br>Jijel , Algérie',
    fact_interest_key: 'INTÉRÊTS PRINCIPAUX',
    fact_interest_val: 'Linux · Assembleur · Algorithmes · Hardware · Optimisation système',
    fact_lang_key: 'LANGAGES',
    fact_lang_val: 'C · JavaScript · Python · Assembleur · Bash',
    fact_philo_key: 'PHILOSOPHIE',
    fact_philo_val_html: "La justesse d'abord,<br>l’efficacité toujours.",

    skills_label: '02 — RIGUEUR_TECHNIQUE',
    skills_headline_html: 'RIGUEUR<br>TECHNIQUE.',
    skills_desc: "Un ensemble de compétences fondé sur les bases de l’informatique, l’expertise systèmes bas niveau et une volonté constante de comprendre réellement le fonctionnement des machines.",
    cluster_1: 'CLUSTER_SYSTÈMES',
    cluster_2: 'CLUSTER_LOGICIEL',
    skill_asm: 'Assembleur x86',
    skill_c: 'Langage C',
    skill_sysprog: 'Programmation système',
    skill_algo: "Analyse d'algorithmes",
    skill_git: 'Git / Contrôle de version',

    projects_label: '03 — DÉPÔTS_SÉLECTIONNÉS',
    projects_headline: 'PROJETS.',
    projects_meta: 'DÉPÔTS_SÉLECTIONNÉS / 04',
    proj1_title_html: 'PDF LINE<br>DETECTER',
    proj1_desc: "Application personnalisée qui détecte les lignes dans un PDF pour aider le lecteur à reprendre exactement là où il s'est arrêté.",
    proj2_title_html: 'STORE<br>WEB',
    proj2_desc: "Une boutique web entièrement responsive, prête à l’emploi, avec backend et interface d’administration personnalisée.",
    proj3_title_html: 'WPA APP<br>sotre',
    proj3_desc: "Application interactive pour petits commerces avec petites bases de données et backend de sauvegarde pour stocker les statistiques.",
    proj4_title_html: 'SYSTEM<br>OPTIMIZER',
    proj4_desc: "Utilitaire CLI pour le profilage Linux, le nettoyage automatisé, le benchmarking de performance et le reporting.",

    contact_label: '04 — INITIER_CONTACT',
    contact_headline_html: 'CONSTRUISONS<br>QUELQUE CHOSE<br>DE PRÉCIS.',
    contact_sub: "Disponible pour des collaborations académiques, des contributions open-source et des projets d’ingénierie demandant une vraie profondeur technique.",
    contact_email: 'EMAIL',
    form_name: 'NOM_SUJET',
    form_name_ph: 'VOTRE_NOM',
    form_email: 'COURRIER_ÉLECTRONIQUE',
    form_email_ph: 'VOTRE@EMAIL.COM',
    form_message: 'DÉTAILS_MESSAGE',
    form_message_ph: 'DÉCRIVEZ_LE_TRAVAIL...',
    form_submit: 'ENVOYER_MESSAGE →',

    footer_copy: '© 2026 — Jijel, ALGÉRIE — ÉTUDIANT_CS'
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!translations[lang][key]) return;

    if (key.endsWith('_html')) {
      el.innerHTML = translations[lang][key];
    } else {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'FR' : 'EN';
  }

  currentLang = lang;
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'fr' : 'en');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage('en');
  updateScrollProgress();
});


console.log(hamburger, mobileOverlay);