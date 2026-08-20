(() => {
  const page = document.documentElement;
  const button = document.querySelector('[data-demo-theme]');
  const menuButton = document.querySelector('[data-demo-menu]');
  const nav = document.querySelector('.demo-nav');
  const saved = localStorage.getItem('norte-demo-theme');
  const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function applyTheme(theme) {
    page.dataset.theme = theme;
    if (button) {
      const isDark = theme === 'dark';
      button.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
      button.setAttribute('aria-pressed', String(isDark));
      button.textContent = isDark ? '☀' : '☾';
    }
  }

  applyTheme(saved || defaultTheme);

  const progress = document.createElement('div');
  progress.className = 'demo-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const value = total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0;
    progress.style.setProperty('--demo-scroll', `${value}%`);
  };
  updateProgress();
  let scrollPending = false;
  window.addEventListener('scroll', () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
      updateProgress();
      scrollPending = false;
    });
  }, { passive: true });

  const revealItems = [...document.querySelectorAll('.demo-section, .demo-faq, .demo-proof-section, .demo-stat-strip')];
  revealItems.forEach((item) => item.classList.add('demo-reveal'));
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  button?.addEventListener('click', () => {
    const next = page.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('norte-demo-theme', next);
    applyTheme(next);
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('.service-photo img').forEach((image) => {
    image.src = image.src.replace(/-services-triptych\.png$/i, '-services-triptych.webp');
  });

  const footer = document.querySelector('.demo-footer .footer-inner');
  if (footer) {
    const social = document.createElement('div');
    social.className = 'norte-demo-social';
    social.innerHTML = '<span>Creada por Norte Web</span><a href="https://www.instagram.com/nortewebcr/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.facebook.com/nortewebcr" target="_blank" rel="noreferrer">Facebook ↗</a>';
    footer.append(social);
  }
})();
