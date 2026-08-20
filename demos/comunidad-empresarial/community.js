(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-button');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  const toast = document.querySelector('#toast');
  let toastTimer;

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeButton?.setAttribute('aria-pressed', String(dark));
    themeButton?.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
    if (themeButton) themeButton.querySelector('span').textContent = dark ? '☼' : '◐';
  };

  const savedTheme = localStorage.getItem('community-theme');
  if (savedTheme) setTheme(savedTheme);

  themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('community-theme', nextTheme);
  });

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const cells = [];
  const size = 13;
  const marker = (row, column, startRow, startColumn) => row >= startRow && row < startRow + 3 && column >= startColumn && column < startColumn + 3;
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const inMarker = marker(row, column, 0, 0) || marker(row, column, 0, 10) || marker(row, column, 10, 0);
      const markerEdge = (row === 0 || row === 2 || column === 0 || column === 2) && row < 3 && column < 3;
      const topRightEdge = row < 3 && column > 9 && (row === 0 || row === 2 || column === 10 || column === 12);
      const bottomLeftEdge = row > 9 && column < 3 && (row === 10 || row === 12 || column === 0 || column === 2);
      const markerCenter = (row === 1 && column === 1) || (row === 1 && column === 11) || (row === 11 && column === 1);
      const dark = markerEdge || topRightEdge || bottomLeftEdge || markerCenter || (!inMarker && ((row * 7 + column * 11 + row * column) % 5 < 2));
      cells.push(`<i class="${dark ? 'dark' : ''}"></i>`);
    }
  }
  const qrGrid = document.querySelector('#qr-grid');
  if (qrGrid) qrGrid.innerHTML = cells.join('');

  const planData = {
    plata: {
      level: 'PLATA', kicker: 'ASOCIADO INICIAL', role: 'Asesora de negocios', tag: 'TU TARJETA VIRTUAL', features: [
        ['QR', 'Código QR único', 'Comparte tu perfil al instante'],
        ['✦', 'Datos de contacto', 'Teléfono, correo y presentación']
      ]
    },
    gold: {
      level: 'GOLD', kicker: 'ASOCIADO CON MÁS VISIBILIDAD', role: 'Asesora de negocios · Gold', tag: 'PRESENCIA DESTACADA', features: [
        ['QR', 'Todo lo de Plata', 'Tu tarjeta sigue siendo el punto de inicio'],
        ['◎', 'Redes sociales', 'Enlaces directos para seguir tu negocio'],
        ['↗', 'Perfil destacado', 'Más oportunidades dentro de la comunidad']
      ]
    },
    platinum: {
      level: 'PLATINUM', kicker: 'ASOCIADO CON PRESENCIA COMPLETA', role: 'Asesora de negocios · Platinum', tag: 'MINI SITIO WEB', features: [
        ['QR', 'Todo lo de Gold', 'Una presencia más completa y conectada'],
        ['▣', 'Mini sitio web', 'Servicios, propuesta y enlaces del negocio'],
        ['☏', 'Botón de WhatsApp', 'Facilita consultas y nuevos contactos']
      ]
    }
  };

  const previewLevel = document.querySelector('#preview-level');
  const previewKicker = document.querySelector('#preview-kicker');
  const previewRole = document.querySelector('#preview-role');
  const previewContent = document.querySelector('#preview-content');
  const previewTag = document.querySelector('#preview-tag');
  const planCards = document.querySelectorAll('.plan-card');
  const planButtons = document.querySelectorAll('.plan-select[data-plan]');

  const renderPlan = (plan) => {
    const data = planData[plan];
    previewLevel.textContent = data.level;
    previewKicker.textContent = data.kicker;
    previewRole.textContent = data.role;
    previewTag.textContent = data.tag;
    previewContent.innerHTML = data.features.map(([icon, title, text]) => `<article class="preview-feature"><i>${icon}</i><div><b>${title}</b><small>${text}</small></div></article>`).join('');
    planCards.forEach((card) => {
      const selected = card.dataset.plan === plan;
      card.classList.toggle('is-active', selected);
    });
    planButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.plan === plan));
    });
  };
  renderPlan('plata');
  planButtons.forEach((button) => button.addEventListener('click', () => renderPlan(button.dataset.plan)));

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };
  document.querySelectorAll('[data-toast]').forEach((button) => button.addEventListener('click', () => showToast(button.dataset.toast)));

  document.querySelector('#vcard-request')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const business = form.get('business') || 'tu negocio';
    showToast(`Solicitud de ejemplo lista para ${business}. En la versión real, estos datos se guardarían para crear la VCard.`);
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .11 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
