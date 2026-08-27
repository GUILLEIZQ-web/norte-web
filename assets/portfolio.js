(function () {
  'use strict';

  const config = window.SITE_CONFIG || {};
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.nav-links');
  const hasWhatsApp = /^\d{8,15}$/.test(config.whatsapp || '');
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '');
  const defaultMessage = 'Hola, vi Norte Web y me interesa una solución digital para mi negocio.';

  root.classList.replace('no-js', 'js');

  function readTheme() {
    try { return localStorage.getItem('norte-theme'); } catch (error) { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem('norte-theme', theme); } catch (error) { /* La preferencia simplemente no se guarda. */ }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeColorMeta?.setAttribute('content', theme === 'dark' ? '#0c1722' : '#f4f7f1');
    themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
    themeButton?.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    const icon = themeButton?.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☼' : '◐';
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(readTheme() || (prefersDark ? 'dark' : 'light'));

  themeButton?.addEventListener('click', function () {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  });

  document.querySelectorAll('[data-brand]').forEach(function (element) {
    element.textContent = config.brandName || 'Norte Web';
  });

  document.querySelectorAll('[data-owner]').forEach(function (element) {
    element.textContent = config.ownerName || config.brandName || 'Norte Web';
  });

  document.querySelectorAll('[data-year]').forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('[data-whatsapp]').forEach(function (element) {
    if (!hasWhatsApp) return;
    const message = element.dataset.whatsappMessage || defaultMessage;
    element.href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(message);
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-email]').forEach(function (element) {
    if (!hasEmail) return;
    element.textContent = config.email;
    element.href = 'mailto:' + config.email;
  });

  [['instagram', '[data-instagram]'], ['facebook', '[data-facebook]']].forEach(function (entry) {
    const url = config[entry[0]];
    if (!url) return;
    document.querySelectorAll(entry[1]).forEach(function (element) {
      element.href = url;
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    });
  });

  function closeMenu() {
    menu?.classList.remove('open');
    menuButton?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }

  menuButton?.addEventListener('click', function () {
    const isOpen = menu?.classList.toggle('open') || false;
    menuButton.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  menu?.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton?.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (!menu?.classList.contains('open')) return;
    if (!menu.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });

  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion && revealItems.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });

    revealItems.forEach(function (item) { observer.observe(item); });
    root.classList.add('reveal-ready');
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  document.querySelectorAll('[data-cta]').forEach(function (element) {
    element.addEventListener('click', function () {
      const detail = { cta: element.dataset.cta, destination: 'whatsapp' };
      window.dispatchEvent(new CustomEvent('norte:cta', { detail: detail }));
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: 'contact_click', cta_location: detail.cta, contact_method: detail.destination });
      }
    });
  });
})();
