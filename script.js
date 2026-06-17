// JOHAMAR BYGG AB — script.js
// Mobil meny, mjuk scroll, header-status, reveal, räknare,
// parallax, tjänstemodaler och formulärbekräftelse.

const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Dynamiskt årtal ---------- */
if (year) {
  year.textContent = new Date().getFullYear();
}

/* ---------- Mobil meny ---------- */
if (navToggle && navMenu) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Öppna meny");
    navMenu.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Öppna meny" : "Stäng meny");
    navMenu.classList.toggle("is-open", !isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

/* ---------- Header-skugga vid scroll ---------- */
if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mjuk scroll till ankarlänkar ---------- */
document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  });
});

/* ---------- Reveal vid scroll ---------- */
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }
}

/* ---------- Animerade räknare ---------- */
const counters = document.querySelectorAll(".stat-num[data-count]");
const runCounter = (el) => {
  const target = Number(el.dataset.count) || 0;
  const suffix = el.dataset.suffix || "";
  if (prefersReduced) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1500;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (counters.length) {
  if (!("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }
}

/* ---------- Parallax på hero ---------- */
const parallax = document.querySelector("[data-parallax]");
if (parallax && !prefersReduced) {
  window.addEventListener(
    "scroll",
    () => {
      const offset = window.scrollY * 0.4;
      parallax.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    },
    { passive: true }
  );
}

/* ---------- Tjänstemodaler ---------- */
const svcData = {
  maleri: {
    title: "Måleri & tapetsering",
    body: "Invändig och utvändig målning samt tapetsering med noggrann förbehandling, jämna ytor och hållbara material. Vi hjälper dig med färgval som lyfter helheten och skyddar ytorna över tid.",
  },
  kok: {
    title: "Köksrenovering",
    body: "Kompletta och delvisa köksrenoveringar där snickeri, ytskikt, montering och detaljer samspelar. Vi planerar funktion och förvaring för ett kök som håller både i stil och i vardagen.",
  },
  golv: {
    title: "Golvslipning & läggning",
    body: "Slipning, oljning, lackning, läggning och byte av golv för bostäder och lokaler. Vi återställer slitna trägolv och lägger nya golv med precision och fokus på slitstyrka.",
  },
  altan: {
    title: "Altaner & terrasser",
    body: "Måttanpassade altaner och terrasser byggda för svenskt klimat. Vi tar hand om grund, stomme, trall och detaljer för en hållbar och inbjudande utemiljö.",
  },
  tak: {
    title: "Takrengöring",
    body: "Skonsam rengöring och behandling av tak som tar bort mossa och påväxt, förlänger livslängden och håller fastigheten representativ och välskött.",
  },
  fasad: {
    title: "Fasadrenovering & målning",
    body: "Renovering och målning av fasader som skyddar mot väder och vind, förnyar utseendet och höjer värdet på din bostad eller fastighet.",
  },
};

const svcOverlay = document.querySelector("[data-svc-overlay]");
if (svcOverlay) {
  const svcTitle = svcOverlay.querySelector("[data-svc-title]");
  const svcBody = svcOverlay.querySelector("[data-svc-body]");
  const svcClose = svcOverlay.querySelector("[data-svc-close]");
  let lastFocused = null;

  const openSvc = (key) => {
    const data = svcData[key];
    if (!data) return;
    lastFocused = document.activeElement;
    svcTitle.textContent = data.title;
    svcBody.textContent = data.body;
    svcOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    svcClose.focus();
  };

  const closeSvc = () => {
    svcOverlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  // Både kort-knapparna ("Läs mer") och pill-länkarna öppnar samma modal
  document.querySelectorAll("[data-svc]").forEach((btn) => {
    btn.addEventListener("click", () => openSvc(btn.dataset.svc));
  });

  svcClose.addEventListener("click", closeSvc);
  svcOverlay.addEventListener("click", (event) => {
    if (event.target === svcOverlay) closeSvc();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !svcOverlay.hidden) closeSvc();
  });

  // Stäng modalen om CTA-länken (#kontakt) klickas
  svcOverlay.querySelectorAll("a[href^='#']").forEach((a) =>
    a.addEventListener("click", closeSvc)
  );
}

/* ---------- Tillbaka till toppen ---------- */
const toTopBtn = document.querySelector("[data-to-top]");
if (toTopBtn) {
  const toggleToTop = () => {
    toTopBtn.classList.toggle("is-visible", window.scrollY > 400);
  };
  toggleToTop();
  window.addEventListener("scroll", toggleToTop, { passive: true });
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  });
}

/* ---------- Instagram-flöde med fallback ----------
   Visar Instagram-widgeten (LightWidget/Elfsight/SociableKit) om en embed
   är inklistrad och laddar. Annars visas de lokala projektbilderna. */
const igWidget = document.querySelector("[data-ig-widget]");
const igFallback = document.querySelector("[data-ig-fallback]");

if (igWidget) {
  // childElementCount = 0 betyder att bara HTML-kommentaren finns (ingen embed)
  const embedPresent = igWidget.childElementCount > 0;
  const hideFallback = () => { if (igFallback) igFallback.hidden = true; };

  if (!embedPresent) {
    // Ingen embed inklistrad – dölj den tomma behållaren, behåll lokala bilder
    igWidget.hidden = true;
  } else {
    igWidget.hidden = false;

    // LightWidget m.fl. lägger in en <iframe> direkt – då antar vi att flödet laddar
    if (igWidget.querySelector("iframe")) {
      hideFallback();
    }

    // Script-baserade widgets (t.ex. Elfsight) injicerar innehåll senare
    const observer = new MutationObserver(() => {
      if (igWidget.querySelector("iframe, img, .eapps-instagram-feed")) {
        hideFallback();
        observer.disconnect();
      }
    });
    observer.observe(igWidget, { childList: true, subtree: true });
    // Sluta lyssna efter en stund; laddar widgeten inte behålls de lokala bilderna
    setTimeout(() => observer.disconnect(), 8000);
  }
}

/* ---------- Lightbox för projektgalleriet ---------- */
const lbOverlay = document.querySelector("[data-lightbox-overlay]");
const lbTriggers = Array.from(document.querySelectorAll("[data-lightbox]"));

if (lbOverlay && lbTriggers.length) {
  const lbImg = lbOverlay.querySelector("[data-lb-img]");
  const lbCap = lbOverlay.querySelector("[data-lb-cap]");
  const lbClose = lbOverlay.querySelector("[data-lb-close]");
  const lbPrev = lbOverlay.querySelector("[data-lb-prev]");
  const lbNext = lbOverlay.querySelector("[data-lb-next]");
  let current = 0;
  let lastFocused = null;

  const render = (index) => {
    current = (index + lbTriggers.length) % lbTriggers.length;
    const trigger = lbTriggers[current];
    lbImg.src = trigger.dataset.src;
    lbImg.alt = trigger.dataset.caption || "";
    lbCap.textContent = trigger.dataset.caption || "";
  };

  const openLb = (index) => {
    lastFocused = document.activeElement;
    render(index);
    lbOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };

  const closeLb = () => {
    lbOverlay.hidden = true;
    document.body.style.overflow = "";
    lbImg.src = "";
    if (lastFocused) lastFocused.focus();
  };

  lbTriggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => openLb(index));
  });

  lbClose.addEventListener("click", closeLb);
  lbPrev.addEventListener("click", () => render(current - 1));
  lbNext.addEventListener("click", () => render(current + 1));

  // Stäng vid klick på bakgrunden (men inte på bild/knappar)
  lbOverlay.addEventListener("click", (event) => {
    if (event.target === lbOverlay) closeLb();
  });

  // Tangentbord: Esc stänger, piltangenter bläddrar
  document.addEventListener("keydown", (event) => {
    if (lbOverlay.hidden) return;
    if (event.key === "Escape") closeLb();
    else if (event.key === "ArrowLeft") render(current - 1);
    else if (event.key === "ArrowRight") render(current + 1);
  });
}

/* ---------- Kontaktformulär (FormSubmit via AJAX) ----------
   Skickar förfrågan direkt till e-post utan att lämna sidan eller
   öppna någon e-postklient. Visar bekräftelse eller felmeddelande. */
const contactForm = document.querySelector("[data-contact-form]");
const formSuccess = document.querySelector("[data-form-success]");
const formError = document.querySelector("[data-form-error]");

if (contactForm && formSuccess) {
  const submitBtn = contactForm.querySelector("[data-submit]");
  const defaultLabel = submitBtn ? submitBtn.textContent : "";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Återställ tidigare meddelanden
    formSuccess.hidden = true;
    if (formError) formError.hidden = true;

    // Laddningsläge på knappen
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Skickar …";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });

      if (!response.ok) throw new Error("Svaret från servern var inte OK");

      formSuccess.hidden = false;
      contactForm.reset();
      formSuccess.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "center",
      });
    } catch (error) {
      if (formError) formError.hidden = false;
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultLabel;
      }
    }
  });
}
