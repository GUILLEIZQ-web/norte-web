(function () {
  const config = window.SITE_CONFIG || {};
  const hasWhatsApp = /^\d{8,15}$/.test(config.whatsapp || '');
  const hasEmail = /.+@.+\..+/.test(config.email || '') && !String(config.email).includes('EJEMPLO');
  const message = encodeURIComponent('Hola, vi tu portafolio y quiero una página web para mi negocio.');

  document.querySelectorAll('[data-brand]').forEach((el) => { el.textContent = config.brandName || 'Norte Web'; });
  document.querySelectorAll('[data-owner]').forEach((el) => { el.textContent = config.ownerName || 'TU NOMBRE'; });
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    if (hasWhatsApp) {
      el.href = `https://wa.me/${config.whatsapp}?text=${message}`;
      el.target = '_blank';
      el.rel = 'noreferrer';
    } else {
      el.href = '#contacto';
      el.addEventListener('click', () => document.querySelector('.setup-note')?.classList.add('is-visible'));
    }
  });
  document.querySelectorAll('[data-email]').forEach((el) => {
    el.textContent = hasEmail ? config.email : 'Agrega tu correo en site-config.js';
    if (hasEmail) el.href = `mailto:${config.email}`;
  });

  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
})();
