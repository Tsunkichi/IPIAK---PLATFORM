/**
 * Ipiak — shared.js
 * Lógica compartida: i18n, catálogo de lenguas, menú, modal, tracking, share.
 */

/* ───────────────── LANGUAGE CATALOG DATA ───────────────── */

var LANGUAGES_CATALOG = [
  {
    id: "shuar",
    name: "Shuar",
    nativeName: "Shuar chicham",
    region: { es: "Amazonía · Ecuador", en: "Amazon · Ecuador" },
    speakers: "~35,000",
    status: "active",
    statusLabel: { es: "Activo", en: "Active" },
    description: {
      es: "Primera lengua disponible en Ipiak con minilecciones interactivas de saludos, presentaciones y expresiones cotidianas.",
      en: "First language available on Ipiak with interactive mini-lessons on greetings, introductions and everyday expressions."
    },
    actionLabel: { es: "Ver lecciones", en: "View lessons" },
    actionTarget: "#lecciones"
  },
  {
    id: "kichwa",
    name: "Kichwa",
    nativeName: "Kichwa shimi",
    region: { es: "Sierra y Amazonía · Ecuador", en: "Highlands & Amazon · Ecuador" },
    speakers: "~1,000,000",
    status: "coming_soon",
    statusLabel: { es: "Próximamente", en: "Coming soon" },
    description: {
      es: "En desarrollo con hablantes nativos. Será el segundo idioma disponible en la plataforma.",
      en: "In development with native speakers. Will be the second language on the platform."
    },
    actionLabel: { es: "Próximamente", en: "Coming soon" },
    actionTarget: null
  },
  {
    id: "waorani",
    name: "Waorani",
    nativeName: "Wao terero",
    region: { es: "Amazonía · Ecuador", en: "Amazon · Ecuador" },
    speakers: "~4,000",
    status: "planned",
    statusLabel: { es: "Planificado", en: "Planned" },
    description: {
      es: "Próxima expansión de la plataforma para preservar esta lengua única de la Amazonía.",
      en: "Upcoming platform expansion to preserve this unique Amazonian language."
    },
    actionLabel: { es: "Planificado", en: "Planned" },
    actionTarget: null
  }
];

/* ───────────────── I18N DICTIONARY ───────────────── */

var I18N = {
  es: {
    /* Nav */
    nav_lessons: "Lecciones",
    nav_about: "Acerca de",
    nav_community: "Únete a la comunidad",

    /* Hero — index */
    hero_title_1: "Aprende lenguas indígenas amazónicas con",
    hero_title_2: "minilecciones interactivas",
    hero_subtitle: "Explora lecciones breves y visuales pensadas para acompañarte en tu aprendizaje de lenguas y culturas indígenas amazónicas desde cualquier lugar.",

    /* Language catalog */
    catalog_title: "Lenguas Indígenas",
    catalog_subtitle: "Explora el catálogo de lenguas disponibles y próximas en Ipiak.",
    catalog_speakers: "hablantes",

    /* Lessons section */
    lessons_title: "Lecciones Disponibles",
    lessons_subtitle_shuar: "Shuar",
    lesson_start: "Empezar lección",
    lesson_level: "Nivel : Básico",
    lesson_time: "10-15 min",
    lesson_empty: "No hay lecciones disponibles por el momento.",
    lesson_no_data: "No se encontró el archivo de datos (lecciones.js). Ejecuta update_lessons.js.",
    lesson_fallback_desc: "Haz clic para abrir esta minilección interactiva.",

    /* Exercises section */
    nav_exercises: "Ejercicios",
    exercises_title: "Ejercicios Interactivos",
    exercises_subtitle: "Practica kichwa y shuar con ejercicios generados a partir de material lingüístico auténtico.",
    ex_filter_all: "Todos",
    ex_filter_flashcard: "Flashcards",
    ex_filter_exercise: "Ejercicios",
    ex_filter_culture: "Cultura",
    ex_filter_basic: "Básico",
    ex_filter_inter: "Intermedio",
    ex_filter_adv: "Avanzado",
    ex_btn_flip: "Ver respuesta",
    ex_btn_check: "Comprobar",
    ex_btn_random: "Ejercicio aleatorio",
    ex_btn_load_more: "Cargar más",
    ex_correct: "¡Correcto!",
    ex_incorrect: "Incorrecto",
    ex_empty: "No hay ejercicios disponibles aún.",

    /* Share */
    share_title: "Comparte Ipiak",
    share_subtitle: "Comparte las minilecciones para que más personas lo conozcan.",
    share_twitter: "Twitter",
    share_whatsapp: "WhatsApp",
    share_facebook: "Facebook",
    share_copy: "Copiar enlace",
    share_copied: "Enlace copiado",
    share_text: "Ipiak: minilecciones de lenguas indígenas amazónicas",

    /* FAQ */
    faq_title: "FAQ",
    faq_q1: "¿Cuánto tiempo toma cada lección?",
    faq_a1: "Entre 10 y 15 minutos en promedio.",
    faq_q2: "¿Necesito experiencia previa?",
    faq_a2: "No. Están pensadas para nivel básico y puedes comenzar desde cero.",
    faq_q3: "¿Habrá más lecciones?",
    faq_a3: "Sí. Seguiremos publicando nuevas minilecciones y ampliando a otras lenguas amazónicas.",
    faq_q4: "¿Es realmente gratis?",
    faq_a4: "Sí. El acceso a las minilecciones es gratuito.",

    /* Footer */
    footer_lessons: "Lecciones",
    footer_about: "Acerca de",
    footer_contact: "Contacto: nu@ipiak.com",
    footer_whatsapp: "Únete a nuestra comunidad de WhatsApp",
    footer_instagram: "Síguenos: Instagram",
    footer_copy: "Ipiak · 2026",

    /* Modal */
    modal_title: "Únete a la comunidad",
    modal_subtitle: "Súmate al grupo y recibe novedades de nuevas minilecciones y recursos.",
    modal_whatsapp: "Únete al grupo de WhatsApp",
    modal_instagram: "Síguenos en Instagram",

    /* Waitlist */
    waitlist_badge: "Próximamente",
    waitlist_title: "¿Quieres saber cuándo lanzamos Kichwa?",
    waitlist_subtitle: "Únete a la lista de espera y sé de los primeros en acceder a las nuevas minilecciones.",
    waitlist_email_label: "Email",
    waitlist_language_label: "¿Qué lengua te interesa?",
    waitlist_referral_label: "¿Cómo nos encontraste?",
    waitlist_option_other: "Otra",
    waitlist_ref_social: "Redes sociales",
    waitlist_ref_search: "Buscador (Google, etc.)",
    waitlist_ref_friend: "Un amigo / conocido",
    waitlist_ref_university: "Universidad / academia",
    waitlist_ref_other: "Otro",
    waitlist_cta: "Unirme a la lista de espera",
    waitlist_sending: "Enviando…",
    waitlist_success_title: "¡Estás en la lista!",
    waitlist_success_msg: "Te avisaremos cuando lancemos las lecciones de Kichwa.",
    waitlist_error: "Hubo un error. Inténtalo de nuevo.",

    /* About page */
    about_title: "Acerca de Ipiak",
    about_intro: "Ipiak es la primera plataforma digital dedicada a lenguas indígenas amazónicas, con el mismo nivel de diseño y tecnología que cualquier herramienta educativa profesional.",
    about_what_title: "¿Qué es Ipiak?",
    about_what_p1: "Durante años, aprender idiomas como el shuar significaba buscar PDFs escaneados, libros físicos difíciles de conseguir, o documentos académicos inaccesibles para el público general. Los recursos existían, pero con diseño anticuado, interfaces poco funcionales, y poca atención a la experiencia del usuario.",
    about_what_p2: "Esa falta de calidad no es casual. Refleja una percepción histórica de que las lenguas indígenas no merecen el mismo nivel de inversión, diseño, o profesionalismo que otros idiomas.",
    about_what_p3: "Ipiak desafía esa idea.",
    about_what_p4: "Trabajamos directamente con hablantes nativos para crear contenido auténtico, práctico y culturalmente respetuoso. Usamos tecnología moderna, diseño cuidado, y metodologías pedagógicas efectivas. Porque las lenguas indígenas merecen herramientas digitales de primer nivel.",
    about_what_p5: "Empezamos con shuar. Próximamente: kichwa, waorani, achuar, sapara, y otras lenguas amazónicas que históricamente han sido ignoradas por plataformas educativas comerciales.",
    about_what_p6: "Ipiak demuestra que los pueblos indígenas no solo preservan su cultura—también pueden liderar la innovación digital para sus propias lenguas.",
    about_why_title: "¿Por qué minilecciones?",
    about_why_p1: "Las minilecciones están diseñadas para acercarte a lenguas indígenas amazónicas de forma respetuosa, práctica y cercana. Cada lección está pensada para que puedas aprender en pocos minutos, desde cualquier lugar.",
    about_why_p2: "El foco está en situaciones reales: saludos, presentaciones, preguntas cotidianas y expresiones útiles para viajeros, educadores y personas curiosas por la diversidad lingüística.",
    about_why_p3: "La intención de Ipiak es que cada sesión te deje al menos una expresión nueva que puedas recordar, pronunciar y usar.",
    about_feat1_title: "Pequeñas dosis de contenido",
    about_feat1_desc: "Contenido breve, fácil de repetir y volver a visitar cuando lo necesites.",
    about_feat2_title: "Audio y contexto",
    about_feat2_desc: "Audio y ejemplos que apoyan la pronunciación y el uso real de cada expresión.",
    about_feat3_title: "Diseño sencillo",
    about_feat3_desc: "Una interfaz limpia para que nada distraiga de lo importante: la lengua.",

    /* Roadmap */
    roadmap_title: "Nuestro Camino",
    roadmap_subtitle: "El plan de Ipiak para llevar más lenguas indígenas al mundo digital.",
    roadmap_phase: "Fase",
    roadmap_1_title: "Shuar",
    roadmap_1_status: "Completada",
    roadmap_1_desc: "Primeras minilecciones en shuar: saludos, presentaciones y expresiones cotidianas.",
    roadmap_2_title: "Kichwa",
    roadmap_2_status: "En desarrollo",
    roadmap_2_desc: "Nuevo idioma en desarrollo con hablantes nativos de kichwa amazónico.",
    roadmap_3_title: "Más lenguas amazónicas",
    roadmap_3_status: "Planificada",
    roadmap_3_desc: "Expansión a waorani, achuar, sapara y otras lenguas de la Amazonía.",
    roadmap_4_title: "Plataforma completa",
    roadmap_4_status: "Futuro",
    roadmap_4_desc: "Juegos interactivos, comunidades por idioma, certificados de aprendizaje y app móvil."
  },
  en: {
    nav_lessons: "Lessons",
    nav_about: "About",
    nav_community: "Join the community",
    hero_title_1: "Learn indigenous Amazonian languages with",
    hero_title_2: "interactive mini-lessons",
    hero_subtitle: "Explore brief, visual lessons designed to accompany you in learning indigenous Amazonian languages and cultures from anywhere.",
    catalog_title: "Indigenous Languages",
    catalog_subtitle: "Browse the catalog of available and upcoming languages on Ipiak.",
    catalog_speakers: "speakers",
    lessons_title: "Available Lessons",
    lessons_subtitle_shuar: "Shuar",
    lesson_start: "Start lesson",
    lesson_level: "Level: Basic",
    lesson_time: "10-15 min",
    lesson_empty: "No lessons available at this time.",
    lesson_no_data: "Data file not found (lecciones.js). Run update_lessons.js.",
    lesson_fallback_desc: "Click to open this interactive mini-lesson.",
    nav_exercises: "Exercises",
    exercises_title: "Interactive Exercises",
    exercises_subtitle: "Practice Kichwa and Shuar with exercises generated from authentic linguistic material.",
    ex_filter_all: "All",
    ex_filter_flashcard: "Flashcards",
    ex_filter_exercise: "Exercises",
    ex_filter_culture: "Culture",
    ex_filter_basic: "Basic",
    ex_filter_inter: "Intermediate",
    ex_filter_adv: "Advanced",
    ex_btn_flip: "View answer",
    ex_btn_check: "Check",
    ex_btn_random: "Random exercise",
    ex_btn_load_more: "Load more",
    ex_correct: "Correct!",
    ex_incorrect: "Incorrect",
    ex_empty: "No exercises available yet.",
    share_title: "Share Ipiak",
    share_subtitle: "Share the mini-lessons so more people can discover them.",
    share_twitter: "Twitter",
    share_whatsapp: "WhatsApp",
    share_facebook: "Facebook",
    share_copy: "Copy link",
    share_copied: "Link copied",
    share_text: "Ipiak: indigenous Amazonian language mini-lessons",
    faq_title: "FAQ",
    faq_q1: "How long does each lesson take?",
    faq_a1: "10 to 15 minutes on average.",
    faq_q2: "Do I need prior experience?",
    faq_a2: "No. They are designed for beginners; you can start from scratch.",
    faq_q3: "Will there be more lessons?",
    faq_a3: "Yes. We will keep publishing new mini-lessons and expanding to more Amazonian languages.",
    faq_q4: "Is it really free?",
    faq_a4: "Yes. Access to all mini-lessons is free.",
    footer_lessons: "Lessons",
    footer_about: "About",
    footer_contact: "Contact: nu@ipiak.com",
    footer_whatsapp: "Join our WhatsApp community",
    footer_instagram: "Follow us: Instagram",
    footer_copy: "Ipiak · 2026",
    modal_title: "Join the community",
    modal_subtitle: "Join the group and receive updates on new mini-lessons and resources.",
    modal_whatsapp: "Join the WhatsApp group",
    modal_instagram: "Follow us on Instagram",
    waitlist_badge: "Coming soon",
    waitlist_title: "Want to be notified when Kichwa launches?",
    waitlist_subtitle: "Join the waitlist and be among the first to access the new mini-lessons.",
    waitlist_email_label: "Email",
    waitlist_language_label: "Which language interests you?",
    waitlist_referral_label: "How did you hear about us?",
    waitlist_option_other: "Other",
    waitlist_ref_social: "Social media",
    waitlist_ref_search: "Search engine (Google, etc.)",
    waitlist_ref_friend: "A friend / acquaintance",
    waitlist_ref_university: "University / academia",
    waitlist_ref_other: "Other",
    waitlist_cta: "Join the waitlist",
    waitlist_sending: "Sending…",
    waitlist_success_title: "You're on the list!",
    waitlist_success_msg: "We'll notify you when Kichwa lessons launch.",
    waitlist_error: "Something went wrong. Please try again.",

    about_title: "About Ipiak",
    about_intro: "Ipiak is the first digital platform dedicated to indigenous Amazonian languages, with the same level of design and technology as any professional educational tool.",
    about_what_title: "What is Ipiak?",
    about_what_p1: "For years, learning languages like Shuar meant searching for scanned PDFs, hard-to-find physical books, or academic documents inaccessible to the general public. The resources existed, but with outdated design, poor interfaces, and little attention to user experience.",
    about_what_p2: "That lack of quality is not accidental. It reflects a historic perception that indigenous languages do not deserve the same level of investment, design, or professionalism as other languages.",
    about_what_p3: "Ipiak challenges that idea.",
    about_what_p4: "We work directly with native speakers to create authentic, practical, and culturally respectful content. We use modern technology, thoughtful design, and effective pedagogical methodologies. Because indigenous languages deserve world-class digital tools.",
    about_what_p5: "We started with Shuar. Coming soon: Kichwa, Waorani, Achuar, Sapara, and other Amazonian languages that have historically been ignored by commercial educational platforms.",
    about_what_p6: "Ipiak demonstrates that indigenous peoples not only preserve their culture—they can also lead digital innovation for their own languages.",
    about_why_title: "Why mini-lessons?",
    about_why_p1: "Mini-lessons are designed to bring you closer to indigenous Amazonian languages in a respectful, practical, and approachable way. Each lesson is crafted so you can learn in just a few minutes, from anywhere.",
    about_why_p2: "The focus is on real situations: greetings, introductions, everyday questions, and useful expressions for travelers, educators, and people curious about linguistic diversity.",
    about_why_p3: "Ipiak's goal is that each session leaves you with at least one new expression you can remember, pronounce, and use.",
    about_feat1_title: "Small doses of content",
    about_feat1_desc: "Brief content, easy to repeat and revisit whenever you need it.",
    about_feat2_title: "Audio & context",
    about_feat2_desc: "Audio and examples supporting pronunciation and real-world usage of each expression.",
    about_feat3_title: "Simple design",
    about_feat3_desc: "A clean interface so nothing distracts from what matters: the language.",
    roadmap_title: "Our Roadmap",
    roadmap_subtitle: "Ipiak's plan to bring more indigenous languages to the digital world.",
    roadmap_phase: "Phase",
    roadmap_1_title: "Shuar",
    roadmap_1_status: "Completed",
    roadmap_1_desc: "First mini-lessons in Shuar: greetings, introductions, and everyday expressions.",
    roadmap_2_title: "Kichwa",
    roadmap_2_status: "In development",
    roadmap_2_desc: "New language in development with native Amazonian Kichwa speakers.",
    roadmap_3_title: "More Amazonian languages",
    roadmap_3_status: "Planned",
    roadmap_3_desc: "Expansion to Waorani, Achuar, Sapara, and other Amazonian languages.",
    roadmap_4_title: "Full platform",
    roadmap_4_status: "Future",
    roadmap_4_desc: "Interactive games, per-language communities, learning certificates, and mobile app."
  }
};

/* ───────────────── I18N ENGINE ───────────────── */

function getCurrentLang() {
  return localStorage.getItem("ipiak_lang") || "es";
}

function setLang(lang) {
  localStorage.setItem("ipiak_lang", lang);
  applyI18n(lang);
  applyI18nOptions(lang);
  updateLangToggle(lang);
  // Re-render dynamic sections if they exist
  if (document.getElementById("language-catalog")) renderLanguageCatalog(lang);
  if (typeof window.renderLessons === "function") window.renderLessons();
}

function applyI18n(lang) {
  var dict = I18N[lang] || I18N.es;
  var els = document.querySelectorAll("[data-i18n]");
  els.forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      // Handle elements with inner HTML (like hero title with span)
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
  // Update html lang attribute
  document.documentElement.lang = lang === "en" ? "en" : "es";
}

function updateLangToggle(lang) {
  var btns = document.querySelectorAll("[data-lang-btn]");
  btns.forEach(function (btn) {
    var btnLang = btn.getAttribute("data-lang-btn");
    if (btnLang === lang) {
      btn.classList.add("bg-primary", "text-white");
      btn.classList.remove("text-text-main", "dark:text-gray-300");
    } else {
      btn.classList.remove("bg-primary", "text-white");
      btn.classList.add("text-text-main", "dark:text-gray-300");
    }
  });
}

/* ───────────────── LANGUAGE CATALOG RENDERER ───────────────── */

function renderLanguageCatalog(lang) {
  var container = document.getElementById("language-catalog");
  if (!container) return;
  container.innerHTML = "";

  LANGUAGES_CATALOG.forEach(function (language) {
    var card = document.createElement("div");
    card.className = "flex flex-col gap-3 p-5 md:p-6 bg-white/70 dark:bg-white/5 border border-shuar-sand dark:border-white/10 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group";

    // Status badge
    var statusColors = {
      active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
      coming_soon: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
      planned: "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-700"
    };
    var statusIcons = { active: "check_circle", coming_soon: "schedule", planned: "event_note" };

    var badge = document.createElement("div");
    badge.className = "inline-flex items-center gap-1.5 self-start text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border " + statusColors[language.status];
    badge.innerHTML = '<span class="material-symbols-outlined text-[13px]">' + statusIcons[language.status] + "</span>" + (language.statusLabel[lang] || language.statusLabel.es);
    card.appendChild(badge);

    // Language name
    var nameEl = document.createElement("h3");
    nameEl.className = "text-text-main dark:text-white text-xl md:text-2xl font-serif font-bold leading-tight";
    nameEl.textContent = language.name;
    card.appendChild(nameEl);

    // Native name
    var nativeEl = document.createElement("p");
    nativeEl.className = "text-primary font-medium text-sm -mt-1 italic";
    nativeEl.textContent = language.nativeName;
    card.appendChild(nativeEl);

    // Region + speakers
    var metaEl = document.createElement("div");
    metaEl.className = "flex flex-col gap-1 text-earth-brown dark:text-gray-400 text-sm";
    var speakersLabel = (I18N[lang] || I18N.es).catalog_speakers;
    metaEl.innerHTML =
      '<span class="inline-flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px]">location_on</span>' + (language.region[lang] || language.region.es) + "</span>" +
      '<span class="inline-flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px]">group</span>' + language.speakers + " " + speakersLabel + "</span>";
    card.appendChild(metaEl);

    // Description
    var descEl = document.createElement("p");
    descEl.className = "text-earth-brown dark:text-gray-400 text-sm leading-relaxed flex-1";
    descEl.textContent = language.description[lang] || language.description.es;
    card.appendChild(descEl);

    // Action
    if (language.status === "active" && language.actionTarget) {
      var btn = document.createElement("a");
      btn.href = language.actionTarget;
      btn.className = "mt-auto w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 px-4 transition-colors";
      btn.innerHTML = (language.actionLabel[lang] || language.actionLabel.es) + ' <span class="material-symbols-outlined text-sm">arrow_forward</span>';
      card.appendChild(btn);
    } else {
      var placeholder = document.createElement("div");
      placeholder.className = "mt-auto w-full inline-flex items-center justify-center gap-2 rounded-lg border border-dashed text-sm font-medium py-2.5 px-4 " +
        (language.status === "coming_soon"
          ? "border-amber-300 text-amber-600 dark:border-amber-700 dark:text-amber-400"
          : "border-gray-300 text-gray-400 dark:border-gray-600 dark:text-gray-500");
      placeholder.innerHTML = '<span class="material-symbols-outlined text-sm">' + statusIcons[language.status] + "</span>" + (language.actionLabel[lang] || language.actionLabel.es);
      card.appendChild(placeholder);
    }

    container.appendChild(card);
  });
}

/* ───────────────── MOBILE MENU ───────────────── */

function initMobileMenu() {
  var menuToggle = document.getElementById("menu-toggle");
  var menuIcon = document.getElementById("menu-toggle-icon");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuToggle && menuIcon && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        menuIcon.textContent = "close";
      } else {
        mobileMenu.classList.add("hidden");
        menuIcon.textContent = "menu";
      }
    });
  }
}

/* ───────────────── COMMUNITY MODAL ───────────────── */

function initCommunityModal() {
  var communityModal = document.getElementById("community-modal");
  var communityClose = document.getElementById("community-modal-close");
  var communityTriggers = document.querySelectorAll("[data-open-community-modal]");
  if (communityModal && communityClose && communityTriggers.length > 0) {
    communityTriggers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        communityModal.classList.remove("hidden");
        if (window.gtag) {
          window.gtag("event", "community_cta_open", {});
        }
      });
    });
    communityClose.addEventListener("click", function () {
      communityModal.classList.add("hidden");
    });
    communityModal.addEventListener("click", function (e) {
      if (e.target === communityModal) {
        communityModal.classList.add("hidden");
      }
    });
  }
}

/* ───────────────── LINK TRACKING ───────────────── */

function initLinkTracking() {
  var whatsappLinks = document.querySelectorAll('a[href*="chat.whatsapp.com"]');
  whatsappLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.gtag) {
        window.gtag("event", "community_whatsapp_click", {});
      }
    });
  });
  var instagramLinks = document.querySelectorAll('a[href*="instagram.com/_ipiak"]');
  instagramLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.gtag) {
        window.gtag("event", "community_instagram_click", {});
      }
    });
  });
}

/* ───────────────── SHARE BUTTONS ───────────────── */

function initShareButtons() {
  var shareButtons = document.querySelectorAll("[data-share]");
  if (!shareButtons.length) return;

  function buildShare(network) {
    var url = location.href;
    var lang = getCurrentLang();
    var text = (I18N[lang] || I18N.es).share_text;
    if (network === "twitter") {
      return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    }
    if (network === "whatsapp") {
      return "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
    }
    if (network === "facebook") {
      return "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    }
    return url;
  }

  shareButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var net = btn.getAttribute("data-share");
      var lang = getCurrentLang();
      var dict = I18N[lang] || I18N.es;
      if (net === "copy_link") {
        var originalText = btn.innerHTML;
        navigator.clipboard.writeText(location.href).then(function () {
          if (window.gtag) {
            window.gtag("event", "share_click", { network: "copy_link", url: location.href });
          }
          btn.innerHTML = '<span class="material-symbols-outlined text-base">check</span> ' + dict.share_copied;
          btn.classList.add("border-primary", "text-primary");
          setTimeout(function () {
            btn.innerHTML = originalText;
            btn.classList.remove("border-primary", "text-primary");
          }, 2000);
        }).catch(function () { });
        return;
      }
      var href = buildShare(net);
      if (window.gtag) {
        window.gtag("event", "share_click", { network: net });
      }
      window.open(href, "_blank");
    });
  });
}

/* ───────────────── WAITLIST FORM ───────────────── */

function initWaitlistForm() {
  var form = document.getElementById("waitlist-form");
  var successEl = document.getElementById("waitlist-success");
  if (!form || !successEl) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var submitBtn = document.getElementById("waitlist-submit");
    var lang = getCurrentLang();
    var dict = I18N[lang] || I18N.es;

    // Disable button and show sending state
    submitBtn.disabled = true;
    var originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="material-symbols-outlined text-base animate-spin">progress_activity</span> ' + dict.waitlist_sending;

    var formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(function (response) {
        if (response.ok) {
          form.classList.add("hidden");
          successEl.classList.remove("hidden");
          // Apply i18n to the success message
          applyI18n(lang);
          if (window.gtag) {
            window.gtag("event", "waitlist_signup", {
              language: formData.get("language"),
              referral: formData.get("referral")
            });
          }
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        alert(dict.waitlist_error);
      });
  });
}

/* ───────────────── I18N FOR SELECT OPTIONS ───────────────── */

function applyI18nOptions(lang) {
  var dict = I18N[lang] || I18N.es;
  var options = document.querySelectorAll("[data-i18n-option]");
  options.forEach(function (opt) {
    var key = opt.getAttribute("data-i18n-option");
    if (dict[key] !== undefined) {
      opt.textContent = dict[key];
    }
  });
}

/* ───────────────── LANG TOGGLE ───────────────── */

function initLangToggle() {
  var toggles = document.querySelectorAll("[data-lang-btn]");
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang-btn");
      setLang(lang);
      if (window.gtag) {
        window.gtag("event", "language_toggle", { language: lang });
      }
    });
  });
}

/* ───────────────── INIT ───────────────── */

(function () {
  var lang = getCurrentLang();
  initMobileMenu();
  initCommunityModal();
  initLinkTracking();
  initShareButtons();
  initLangToggle();
  initWaitlistForm();
  applyI18n(lang);
  applyI18nOptions(lang);
  updateLangToggle(lang);
  if (document.getElementById("language-catalog")) renderLanguageCatalog(lang);
})();
