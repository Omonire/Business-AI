/**
 * Business AI Dashboard - Interactive Logic & Animations
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Mobile Menu ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
      sidebar && sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }

  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
      if (mobileMenuToggle) mobileMenuToggle.focus();
    }
  });

  // --- Sidebar Navigation ---
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      sidebarLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // --- AI Assistant ---
  const aiInput = document.querySelector('.ai-input');
  const aiSendButton = document.querySelector('.ai-send-button');
  const aiSuggestions = document.querySelectorAll('.ai-suggestion');
  const aiBody = document.querySelector('.ai-command-body');

  function setAssistantBusy(busy) {
    if (!aiSendButton) return;
    aiSendButton.disabled = busy;
    aiSendButton.setAttribute('aria-busy', String(busy));
  }

  function appendAssistantMessage(text, type) {
    if (!aiBody) return;

    const message = document.createElement('div');
    message.className = 'ai-response ' + (type || 'assistant');
    message.textContent = text;
    aiBody.appendChild(message);
    message.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  async function sendAIMessage() {
    if (!aiInput) return;
    const value = aiInput.value.trim();
    if (!value || aiSendButton?.disabled) return;

    setAssistantBusy(true);
    appendAssistantMessage(value, 'user');
    aiInput.value = '';

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'AI request failed.');
      appendAssistantMessage(data.response, 'assistant');
    } catch (error) {
      appendAssistantMessage(error.message || 'Something went wrong. Try again.', 'error');
    } finally {
      setAssistantBusy(false);
      aiInput.focus();
    }
  }

  aiSuggestions.forEach(function (suggestion) {
    suggestion.addEventListener('click', function () {
      if (!aiInput) return;
      aiInput.value = suggestion.textContent.trim();
      aiInput.focus();
    });
  });

  if (aiSendButton) aiSendButton.addEventListener('click', sendAIMessage);
  if (aiInput) {
    aiInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAIMessage();
      }
    });
  }

  // --- Anime.js Entrance Animations ---
  if (typeof anime !== 'undefined' && !prefersReducedMotion) {
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length) {
      anime({ targets: statCards, opacity: [0, 1], translateY: [24, 0], duration: 600,
        delay: anime.stagger(100, { start: 200 }), easing: 'easeOutCubic' });
    }

    const gridSections = document.querySelectorAll('[data-animate="fade-up"]');
    if (gridSections.length) {
      anime({ targets: gridSections, opacity: [0, 1], translateY: [20, 0], duration: 500,
        delay: function (el) { return parseInt(el.getAttribute('data-delay') || '0', 10) + 400; },
        easing: 'easeOutCubic' });
    }

    const sidebarBrand = document.querySelector('.sidebar-brand');
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    if (sidebarBrand) anime({ targets: sidebarBrand, opacity: [0, 1], translateX: [-12, 0], duration: 400, delay: 100, easing: 'easeOutCubic' });
    if (sidebarMenuItems.length) anime({ targets: sidebarMenuItems, opacity: [0, 1], translateX: [-16, 0], duration: 350, delay: anime.stagger(60, { start: 250 }), easing: 'easeOutCubic' });

    const headerGreeting = document.querySelector('.header-greeting');
    const headerActions = document.querySelector('.header-actions');
    if (headerGreeting) anime({ targets: headerGreeting, opacity: [0, 1], translateY: [-10, 0], duration: 400, delay: 150, easing: 'easeOutCubic' });
    if (headerActions) anime({ targets: headerActions, opacity: [0, 1], translateY: [-10, 0], duration: 400, delay: 250, easing: 'easeOutCubic' });
  } else if (prefersReducedMotion) {
    document.querySelectorAll('[data-animate], .stat-card, .sidebar-brand, .sidebar-menu li, .header-greeting, .header-actions').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
})();
