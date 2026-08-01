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
})();
