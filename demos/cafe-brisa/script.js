document.documentElement.classList.add("js");

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* Tema */
const botonTema = $("#boton-tema");
const aplicarTema = (oscuro) => {
  document.body.classList.toggle("modo-oscuro", oscuro);
  if (botonTema) {
    botonTema.textContent = oscuro ? "☀️" : "🌙";
    botonTema.setAttribute("aria-label", oscuro ? "Activar modo claro" : "Activar modo oscuro");
    botonTema.setAttribute("aria-pressed", String(oscuro));
  }
};
aplicarTema(localStorage.getItem("tema") === "oscuro");
botonTema?.addEventListener("click", () => {
  const oscuro = !document.body.classList.contains("modo-oscuro");
  aplicarTema(oscuro);
  localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
});

/* Menú móvil */
const botonMenu = $("#boton-menu-movil");
const navEnlaces = $("#nav-enlaces");
const enlacesMenu = $$(".nav-enlaces a");
const cerrarMenu = () => {
  navEnlaces?.classList.remove("activo");
  botonMenu?.setAttribute("aria-expanded", "false");
  botonMenu?.setAttribute("aria-label", "Abrir menú de navegación");
  if (botonMenu) botonMenu.textContent = "☰";
};
botonMenu?.addEventListener("click", () => {
  const abierto = navEnlaces.classList.toggle("activo");
  botonMenu.setAttribute("aria-expanded", String(abierto));
  botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  botonMenu.textContent = abierto ? "✕" : "☰";
});
enlacesMenu.forEach((enlace) => enlace.addEventListener("click", cerrarMenu));
document.addEventListener("click", (evento) => {
  if (navEnlaces?.classList.contains("activo") && !navEnlaces.contains(evento.target) && !botonMenu?.contains(evento.target)) cerrarMenu();
});

/* Animaciones de secciones */
const secciones = $$("main section");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas, instancia) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) { entrada.target.classList.add("visible"); instancia.unobserve(entrada.target); }
    });
  }, { threshold: 0.12 });
  secciones.forEach((seccion) => observador.observe(seccion));
} else secciones.forEach((seccion) => seccion.classList.add("visible"));

/* Contadores */
const contadores = $$(".contador");
const animarContador = (elemento) => {
  const objetivo = Number(elemento.dataset.objetivo || 0);
  const sufijo = elemento.dataset.sufijo || "";
  const inicio = performance.now();
  const duracion = 1600;
  const actualizar = (ahora) => {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const suavizado = 1 - Math.pow(1 - progreso, 3);
    elemento.textContent = `${Math.floor(objetivo * suavizado)}${sufijo}`;
    if (progreso < 1) requestAnimationFrame(actualizar); else elemento.textContent = `${objetivo}${sufijo}`;
  };
  requestAnimationFrame(actualizar);
};
if ("IntersectionObserver" in window) {
  const observadorContadores = new IntersectionObserver((entradas, instancia) => {
    entradas.forEach((entrada) => { if (entrada.isIntersecting) { animarContador(entrada.target); instancia.unobserve(entrada.target); } });
  }, { threshold: 0.5 });
  contadores.forEach((contador) => observadorContadores.observe(contador));
} else contadores.forEach(animarContador);

/* Formulario: validación de frontend. No envía correos por sí mismo. */
const formulario = $("#formulario-contacto");
const resultado = $("#mensaje-resultado");
formulario?.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = $("#nombre")?.value.trim();
  const email = $("#email")?.value.trim();
  const mensaje = $("#mensaje")?.value.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  if (!nombre || !email || !mensaje) { resultado.textContent = "Por favor, completa todos los campos."; resultado.style.color = "#c0392b"; return; }
  if (!emailValido) { resultado.textContent = "Escribe un correo electrónico válido."; resultado.style.color = "#c0392b"; return; }
  resultado.textContent = "¡Gracias por contactar con Café Montaña! ☕";
  resultado.style.color = "#278d52";
  formulario.reset();
});

/* Galería / lightbox */
const lightbox = $("#lightbox");
const imagenLightbox = $("#imagen-lightbox");
const cerrarLightbox = $("#cerrar-lightbox");
const abrirImagen = (imagen) => {
  if (!lightbox || !imagenLightbox) return;
  imagenLightbox.src = imagen.currentSrc || imagen.src;
  imagenLightbox.alt = imagen.alt;
  lightbox.classList.add("abierto");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("sin-scroll");
  cerrarLightbox?.focus();
};
const cerrarImagen = () => {
  if (!lightbox) return;
  lightbox.classList.remove("abierto");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("sin-scroll");
};
$$(".imagen-galeria").forEach((boton) => boton.addEventListener("click", () => { const imagen = $("img", boton); if (imagen) abrirImagen(imagen); }));
cerrarLightbox?.addEventListener("click", cerrarImagen);
lightbox?.addEventListener("click", (evento) => { if (evento.target === lightbox) cerrarImagen(); });
document.addEventListener("keydown", (evento) => { if (evento.key === "Escape" && lightbox?.classList.contains("abierto")) cerrarImagen(); });

/* Botón volver arriba y scroll spy */
const botonArriba = $("#boton-arriba");
const destinos = [$("#inicio"), ...secciones].filter(Boolean);
let pendiente = false;
const actualizarScroll = () => {
  botonArriba?.classList.toggle("visible", window.scrollY > 420);
  let actual = "inicio";
  destinos.forEach((destino) => { if (window.scrollY >= destino.offsetTop - 130) actual = destino.id; });
  enlacesMenu.forEach((enlace) => enlace.classList.toggle("activo", enlace.getAttribute("href") === `#${actual}`));
  pendiente = false;
};
window.addEventListener("scroll", () => { if (!pendiente) { window.requestAnimationFrame(actualizarScroll); pendiente = true; } }, { passive:true });
actualizarScroll();
botonArriba?.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

console.log("Café Montaña listo ☕");
