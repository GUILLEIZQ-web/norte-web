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
  document.querySelectorAll('[data-owner]').forEach((el) => { el.textContent = config.ownerName || 'Guillermo Izquierdo'; });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    if (hasWhatsApp) { el.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hola, vi Norte Web y me interesa una página para mi negocio.')}`; el.target = '_blank'; el.rel = 'noreferrer'; }
  });
  document.querySelectorAll('[data-email]').forEach((el) => { if (hasEmail) { el.textContent = config.email; el.href = `mailto:${config.email}`; } });

  menuButton?.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.classList.toggle('is-open', open); menuButton.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => { menu?.classList.remove('open'); menuButton?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); }));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .14 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
})();
