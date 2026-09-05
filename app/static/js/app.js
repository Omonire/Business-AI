/**
 * Business AI Dashboard - Interactive Logic & Animations
 */

(function () {
  'use strict';

  // --- Check for reduced motion preference ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Mobile Menu ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
      mobileMenuToggle.focus();
    }
  });

  // --- Sidebar Navigation ---
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      sidebarLinks.forEach(function (l) {
        l.classList.remove('active');
      });
      link.classList.add('active');

      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });

  // --- AI Suggestions ---
  const aiInput = document.querySelector('.ai-input');
  const aiSuggestions = document.querySelectorAll('.ai-suggestion');

  aiSuggestions.forEach(function (suggestion) {
    suggestion.addEventListener('click', function () {
      if (aiInput) {
        aiInput.value = suggestion.textContent;
        aiInput.focus();
      }
    });
  });

  // --- AI Send Button ---
  const aiSendButton = document.querySelector('.ai-send-button');

  if (aiSendButton && aiInput) {
    aiSendButton.addEventListener('click', function () {
      var value = aiInput.value.trim();
      if (value) {
        // Placeholder: will be connected to AI backend later
        aiInput.value = '';
      }
    });

    aiInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        aiSendButton.click();
      }
    });
  }

  // --- Anime.js Entrance Animations ---
  if (typeof anime !== 'undefined' && !prefersReducedMotion) {

    // Stat cards staggered entrance
    var statCards = document.querySelectorAll('.stat-card');
    if (statCards.length) {
      anime({
        targets: statCards,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 600,
        delay: anime.stagger(100, { start: 200 }),
        easing: 'easeOutCubic'
      });
    }

    // Dashboard grid sections
    var gridSections = document.querySelectorAll('[data-animate="fade-up"]');
    if (gridSections.length) {
      anime({
        targets: gridSections,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        delay: function (el) {
          return parseInt(el.getAttribute('data-delay') || '0', 10) + 400;
        },
        easing: 'easeOutCubic'
      });
    }

    // Sidebar entrance
    var sidebarBrand = document.querySelector('.sidebar-brand');
    var sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');

    if (sidebarBrand) {
      anime({
        targets: sidebarBrand,
        opacity: [0, 1],
        translateX: [-12, 0],
        duration: 400,
        delay: 100,
        easing: 'easeOutCubic'
      });
    }

    if (sidebarMenuItems.length) {
      anime({
        targets: sidebarMenuItems,
        opacity: [0, 1],
        translateX: [-16, 0],
        duration: 350,
        delay: anime.stagger(60, { start: 250 }),
        easing: 'easeOutCubic'
      });
    }

    // Header entrance
    var headerGreeting = document.querySelector('.header-greeting');
    var headerActions = document.querySelector('.header-actions');

    if (headerGreeting) {
      anime({
        targets: headerGreeting,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 400,
        delay: 150,
        easing: 'easeOutCubic'
      });
    }

    if (headerActions) {
      anime({
        targets: headerActions,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 400,
        delay: 250,
        easing: 'easeOutCubic'
      });
    }

  } else if (prefersReducedMotion) {
    // Ensure all animated elements are visible without animation
    var animatedElements = document.querySelectorAll('[data-animate], .stat-card, .sidebar-brand, .sidebar-menu li, .header-greeting, .header-actions');
    animatedElements.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

})();
