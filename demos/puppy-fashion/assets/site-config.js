/*
 * CONFIGURACIÓN DE CONTACTO DE PUPPY FASHION
 *
 * IMPORTANTE: deja whatsappBusiness vacío hasta que Puppy Fashion confirme
 * su número de WhatsApp Business. Luego escribe únicamente el código de país
 * y el número, sin +, espacios ni guiones. Ejemplo de formato: 506XXXXXXXX.
 */
const puppyFashionConfig = Object.freeze({
  whatsappBusiness: "",
  instagram: "https://www.instagram.com/puppyfashioncr/",
  messages: Object.freeze({
    appointment:
      "Hola Puppy Fashion, quisiera consultar disponibilidad para una cita. Mi nombre es ____ y mi perrito es de raza ____.",
    grooming: "Hola Puppy Fashion, quisiera información sobre grooming básico.",
    spa: "Hola Puppy Fashion, quisiera información sobre grooming spa.",
    ozone:
      "Hola Puppy Fashion, quisiera conocer la disponibilidad, indicaciones y condiciones del baño de ozono.",
    dental:
      "Hola Puppy Fashion, quisiera conocer los detalles y condiciones de la limpieza dental sin anestesia.",
    frequency:
      "Hola Puppy Fashion, quisiera conocer la disponibilidad, indicaciones y condiciones del servicio de alta frecuencia.",
    academy:
      "Hola Puppy Fashion, quisiera información sobre cursos, talleres o productos disponibles.",
    general: "Hola Puppy Fashion, vi su página y quisiera hacer una consulta."
  })
});

(() => {
  const number = puppyFashionConfig.whatsappBusiness.trim();
  const hasConfirmedWhatsApp = /^\d{10,15}$/.test(number);

  document.querySelectorAll("[data-contact]").forEach((link) => {
    const messageKey = link.dataset.contact;
    const message = puppyFashionConfig.messages[messageKey] || puppyFashionConfig.messages.general;

    const updateLabel = (label) => {
      link.setAttribute("aria-label", label);
      if (!link.classList.contains("contact-float")) {
        link.textContent = label;
      }
    };

    if (hasConfirmedWhatsApp) {
      link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      updateLabel(link.dataset.readyLabel || "Abrir WhatsApp Business");
      link.dataset.channel = "whatsapp";
      return;
    }

    link.href = puppyFashionConfig.instagram;
    updateLabel(link.dataset.fallbackLabel || "Consultar en Instagram");
    link.dataset.channel = "instagram";
  });

  document.querySelectorAll("[data-contact-status]").forEach((status) => {
    status.textContent = hasConfirmedWhatsApp
      ? "WhatsApp Business disponible"
      : "WhatsApp Business: por confirmar · contacto temporal por Instagram";
  });

  const floatingContact = document.querySelector(".contact-float");
  if (floatingContact) {
    floatingContact.dataset.confirmed = String(hasConfirmedWhatsApp);
    const icon = floatingContact.querySelector("[aria-hidden='true']");
    if (icon) {
      icon.textContent = hasConfirmedWhatsApp ? "✆" : "◎";
    }
  }
})();
