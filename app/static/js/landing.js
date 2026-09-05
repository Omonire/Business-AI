/**
 * Business AI - Landing Page
 * Navbar state, mobile menu, scroll reveals, Anime.js entrance choreography.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mark that JS is active so CSS can gate reveal initial states
  // (prevents hidden content when JS is disabled).
  document.documentElement.classList.add('js-reveal');

  /* ---------- Navbar scroll state ---------- */

  var navbar = document.getElementById('navbar');

  function updateNavbarState() {
    if (window.scrollY > 8) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbarState, { passive: true });
  updateNavbarState();

  /* ---------- Mobile navigation ---------- */

  var navToggle = document.getElementById('navbarToggle');
  var navMenu = document.getElementById('navMenu');
  var navOverlay = document.getElementById('navOverlay');

  function openMobileNav() {
    navMenu.classList.add('open');
    navOverlay.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    navMenu.classList.remove('open');
    navOverlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  navOverlay.addEventListener('click', closeMobileNav);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMobileNav();
      navToggle.focus();
    }
  });

  // Close mobile nav after clicking a link inside it
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('open')) {
        closeMobileNav();
      }
    });
  });

  /* ---------- AI command demo (no fake responses) ---------- */

  var commandInput = document.getElementById('commandInput');
  var commandSubmit = document.getElementById('commandSubmit');
  var commandChips = document.querySelectorAll('.command-chip');

  commandChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (commandInput) {
        commandInput.value = chip.textContent.trim();
        commandInput.focus();
      }
    });
  });

  if (commandSubmit && commandInput) {
    commandSubmit.addEventListener('click', function () {
      var value = commandInput.value.trim();
      if (value) {
        // UI only for now; AI responses will be wired later.
        commandInput.value = '';
      }
    });

    commandInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        commandSubmit.click();
      }
    });
  }

  /* ---------- Scroll reveal ---------- */

  var revealElements = document.querySelectorAll('.reveal');
  var revealDelayAttr = 'data-reveal-delay';

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseInt(el.getAttribute(revealDelayAttr) || '0', 10);

            if (!prefersReducedMotion && typeof anime !== 'undefined') {
              anime({
                targets: el,
                opacity: [0, 1],
                translateY: [26, 0],
                duration: 650,
                delay: delay,
                easing: 'easeOutCubic',
                complete: function () {
                  el.classList.add('is-visible');
                  observer.unobserve(el);
                }
              });
            } else {
              el.classList.add('is-visible');
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Graceful fallback: show everything immediately.
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Anime.js entrance choreography ---------- */

  if (typeof anime !== 'undefined' && !prefersReducedMotion) {
    var heroElements = document.querySelectorAll('[data-hero]');

    heroElements.forEach(function (el) {
      var key = el.getAttribute('data-hero');
      var baseDelay = 150;
      var mapping = {
        eyebrow: 0,
        title: 100,
        subtitle: 220,
        actions: 340,
        note: 440,
        visual: 260
      };
      var delay = baseDelay + (mapping[key] || 0);

      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 700,
        delay: delay,
        easing: 'easeOutCubic'
      });
    });

    var floatChips = document.querySelectorAll('.float-chip');
    if (floatChips.length) {
      anime({
        targets: floatChips,
        opacity: [0, 1],
        scale: [0.7, 1],
        duration: 500,
        delay: anime.stagger(80, { start: 500 }),
        easing: 'easeOutBack'
      });
    }

    var preview = document.querySelector('.preview');
    if (preview) {
      anime({
        targets: preview,
        opacity: [0, 1],
        scale: [0.96, 1],
        translateY: [24, 0],
        duration: 800,
        delay: 350,
        easing: 'easeOutCubic'
      });
    }
  }

  /* ---------- Navbar entrance ---------- */

  if (typeof anime !== 'undefined' && !prefersReducedMotion) {
    anime({
      targets: navbar,
      translateY: [-72, 0],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutCubic'
    });
  }
})();