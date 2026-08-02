(function () {
  const config = window.SITE_CONFIG || {};
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('norte-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeButton = document.querySelector('.theme-toggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.nav-links');
  const hasWhatsApp = /^\d{8,15}$/.test(config.whatsapp || '');
  const hasEmail = /.+@.+\..+/.test(config.email || '');

  function setTheme(theme) {
    root.dataset.theme = theme;
    themeColorMeta?.setAttribute('content', theme === 'dark' ? '#0d1723' : '#f6f7f2');
    themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
    themeButton?.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    if (themeButton) themeButton.querySelector('.theme-icon').textContent = theme === 'dark' ? '☼' : '◐';
  }
  setTheme(storedTheme || (prefersDark ? 'dark' : 'light'));
  themeButton?.addEventListener('click', () => { const next = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('norte-theme', next); setTheme(next); });

  document.querySelectorAll('[data-brand]').forEach((el) => { el.textContent = config.brandName || 'Norte Web'; });
  document.querySelectorAll('[data-owner]').forEach((el) => { el.textContent = config.ownerName || 'Norte Web'; });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    if (hasWhatsApp) { el.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hola, vi Norte Web y me interesa una página para mi negocio.')}`; el.target = '_blank'; el.rel = 'noreferrer'; }
  });
  document.querySelectorAll('[data-email]').forEach((el) => { if (hasEmail) { el.textContent = config.email; el.href = `mailto:${config.email}`; } });
  document.querySelectorAll('[data-instagram]').forEach((el) => { if (config.instagram) { el.href = config.instagram; el.target = '_blank'; el.rel = 'noreferrer'; } });
  document.querySelectorAll('[data-facebook]').forEach((el) => { if (config.facebook) { el.href = config.facebook; el.target = '_blank'; el.rel = 'noreferrer'; } });
  document.querySelectorAll('[data-whatsapp-message]').forEach((el) => {
    if (hasWhatsApp) { el.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(el.dataset.whatsappMessage)}`; el.target = '_blank'; el.rel = 'noreferrer'; }
  });
  const servicesNav = document.querySelector('.nav-links a[href="#servicios"]');
  if (servicesNav) { servicesNav.href = '#soluciones'; servicesNav.textContent = 'Servicios'; }
  const serviceImagePositions = ['left center', 'center center', 'right center'];
  document.querySelectorAll('.solution-card').forEach((card, index) => {
    const image = document.createElement('div');
    image.className = 'solution-photo';
    image.setAttribute('aria-hidden', 'true');
    image.style.backgroundPosition = serviceImagePositions[index] || 'center';
    card.querySelector('.solution-icon')?.replaceWith(image);
  });

  menuButton?.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.classList.toggle('is-open', open); menuButton.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => { menu?.classList.remove('open'); menuButton?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); }));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .14 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
})();
