(function () {
  'use strict';

  var PREFIX = 'luxora.store.v3';
  var $ = function (selector, parent) { return (parent || document).querySelector(selector); };
  var $$ = function (selector, parent) { return Array.prototype.slice.call((parent || document).querySelectorAll(selector)); };
  var id = function (value) { return document.getElementById(value); };
  var esc = function (value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character];
    });
  };
  var load = function (key, fallback) {
    try {
      var raw = localStorage.getItem(PREFIX + ':' + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  };
  var save = function (key, value) {
    try {
      localStorage.setItem(PREFIX + ':' + key, JSON.stringify(value));
    } catch (error) {
      toast('No fue posible guardar esa preferencia en el navegador.');
    }
  };

  var image = {
    audio: 'products/aria-pro-buds.png',
    power: 'products/halo-charge-stand.png',
    wearable: 'products/noir-smart-strap.png',
    desk: 'products/flux-desk-pad.png',
    cable: 'products/pulse-cable-kit.png',
    speaker: 'products/edge-audio-bar.png',
    stand: 'products/aero-laptop-stand.png',
    lamp: 'products/lumen-desk-lamp.png'
  };

  var products = [
    { id: 1, slug: 'aria-pro-buds', name: 'Aria Pro Buds', category: 'audio', tag: 'Más vendido', description: 'Auriculares con cancelación activa, estuche luminoso y sonido espacial equilibrado.', price: 149, oldPrice: 199, rating: 4.9, reviews: 128, popularity: 98, isNew: false, images: [image.audio], variants: [{ name: 'Color', values: [{ value: 'Grafito', stock: 12 }, { value: 'Niebla', stock: 6 }] }, { name: 'Capacidad', values: [{ value: '32 h', stock: 18 }, { value: '48 h', stock: 8 }] }] },
    { id: 2, slug: 'halo-charge-stand', name: 'Halo Charge Stand', category: 'power', tag: 'Edición especial', description: 'Base de carga magnética con alineación precisa, enfriamiento inteligente y luz ambiente.', price: 139, oldPrice: 179, rating: 4.8, reviews: 96, popularity: 94, isNew: true, images: [image.power], variants: [{ name: 'Acabado', values: [{ value: 'Grafito', stock: 5 }, { value: 'Plata', stock: 9 }] }, { name: 'Conector', values: [{ value: 'USB-C', stock: 11 }, { value: 'Magnético', stock: 7 }] }] },
    { id: 3, slug: 'noir-smart-strap', name: 'Noir Smart Strap', category: 'wearable', tag: 'Nuevo', description: 'Banda de ajuste cómodo con sensores biométricos y un acabado pensado para usar a diario.', price: 99, oldPrice: 129, rating: 4.7, reviews: 74, popularity: 79, isNew: true, images: [image.wearable], variants: [{ name: 'Color', values: [{ value: 'Negro', stock: 19 }, { value: 'Arena', stock: 12 }] }, { name: 'Tamaño', values: [{ value: 'S/M', stock: 17 }, { value: 'M/L', stock: 14 }] }] },
    { id: 4, slug: 'flux-desk-pad', name: 'Flux Desk Pad', category: 'desk', tag: 'Escritorio', description: 'Superficie minimalista para el espacio de trabajo, compatible con sensores ópticos y carga.', price: 69, oldPrice: 89, rating: 4.8, reviews: 63, popularity: 83, isNew: false, images: [image.desk], variants: [{ name: 'Color', values: [{ value: 'Pizarra', stock: 8 }, { value: 'Niebla', stock: 16 }] }, { name: 'Tamaño', values: [{ value: 'Mediano', stock: 15 }, { value: 'Grande', stock: 9 }] }] },
    { id: 5, slug: 'pulse-cable-kit', name: 'Pulse Cable Kit', category: 'power', tag: 'Esencial', description: 'Juego de cables trenzados de alta resistencia para cargar todos tus dispositivos.', price: 44, oldPrice: 59, rating: 4.6, reviews: 141, popularity: 88, isNew: false, images: [image.cable], variants: [{ name: 'Color', values: [{ value: 'Grafito', stock: 14 }, { value: 'Lino', stock: 10 }] }, { name: 'Longitud', values: [{ value: '1 m', stock: 18 }, { value: '2 m', stock: 6 }] }] },
    { id: 6, slug: 'edge-audio-bar', name: 'Edge Audio Bar', category: 'audio', tag: 'Estudio', description: 'Barra de sonido de escritorio con graves precisos, perfil fino y sintonía ambiental.', price: 189, oldPrice: 249, rating: 4.9, reviews: 52, popularity: 91, isNew: false, images: [image.speaker], variants: [{ name: 'Color', values: [{ value: 'Negro', stock: 3 }, { value: 'Piedra', stock: 4 }] }, { name: 'Potencia', values: [{ value: '40 W', stock: 10 }, { value: '60 W', stock: 4 }] }] },
    { id: 7, slug: 'aero-stand', name: 'Aero Stand', category: 'desk', tag: 'Ergonomía', description: 'Soporte ajustable de aluminio para elevar la pantalla y recuperar espacio en el escritorio.', price: 99, oldPrice: 129, rating: 4.8, reviews: 87, popularity: 85, isNew: false, images: [image.stand], variants: [{ name: 'Acabado', values: [{ value: 'Aluminio', stock: 20 }, { value: 'Gris espacial', stock: 7 }] }, { name: 'Tamaño', values: [{ value: '13-14"', stock: 18 }, { value: '15-16"', stock: 9 }] }] },
    { id: 8, slug: 'lumen-desk-lamp', name: 'Lumen Desk Lamp', category: 'desk', tag: 'Iluminación', description: 'Lámpara LED de escritorio con temperatura adaptativa y escenas para concentración.', price: 109, oldPrice: 149, rating: 4.7, reviews: 59, popularity: 76, isNew: true, images: [image.lamp], variants: [{ name: 'Color', values: [{ value: 'Medianoche', stock: 11 }, { value: 'Perla', stock: 9 }] }, { name: 'Temperatura', values: [{ value: '2700-6500 K', stock: 15 }, { value: 'RGB+', stock: 5 }] }] }
  ];

  var sampleReviews = {
    1: [{ name: 'Mia H.', rating: 5, text: 'El estuche y la cancelación se sienten realmente cuidados.', date: '12 jul 2026' }],
    2: [{ name: 'Noah R.', rating: 5, text: 'Queda impecable sobre el escritorio y carga sin pensar en ello.', date: '3 jul 2026' }],
    6: [{ name: 'Avery K.', rating: 5, text: 'Mucho cuerpo en un tamaño sorprendentemente discreto.', date: '27 jun 2026' }]
  };
  var sampleQuestions = {
    1: [{ name: 'Leo', text: '¿Se puede usar con dos dispositivos?', answer: 'Puedes alternar entre dispositivos desde Bluetooth.' }],
    2: [{ name: 'Sara', text: '¿Funciona con una funda delgada?', answer: 'Sí, con fundas compatibles con MagSafe de hasta 3 mm.' }]
  };
  var coupons = {
    LUXORA10: { kind: 'percent', amount: 10, label: '10% de descuento', minimum: 50, customerLimit: 1 },
    WELCOME15: { kind: 'percent', amount: 15, label: '15% de bienvenida', minimum: 100, customerLimit: 1 },
    PREMIUM20: { kind: 'percent', amount: 20, label: '20% para Premium', minimum: 120, premium: true, customerLimit: 2 },
    GIFT25: { kind: 'fixed', amount: 25, label: 'Gift card de $25', minimum: 25, customerLimit: 1 }
  };

  function initialInventory() {
    var inventory = {};
    products.forEach(function (product) {
      product.variants.forEach(function (group) {
        group.values.forEach(function (option) {
          inventory[product.id + '|' + group.name + '|' + option.value] = option.stock;
        });
      });
    });
    return inventory;
  }

  function browserCountry() {
    var region = (navigator.language || 'en-US').split('-')[1] || 'US';
    return ['CR', 'US', 'ES', 'MX', 'CO'].indexOf(region) !== -1 ? region : 'US';
  }

  var state = {
    cart: load('cart', {}),
    wishlist: load('wishlist', []),
    compare: load('compare', []),
    recentlyViewed: load('recent', []),
    customProducts: load('custom-products', []),
    hiddenProducts: load('hidden-products', []),
    inventory: load('inventory', null) || initialInventory(),
    reviews: load('reviews', {}),
    questions: load('questions', {}),
    restock: load('restock', []),
    orders: load('orders', []),
    user: load('user', null),
    coupon: load('coupon', null),
    couponUse: load('coupon-use', {}),
    cookies: load('cookies', null),
    country: load('country', browserCountry()),
    currency: load('currency', 'CRC'),
    language: 'es',
    theme: load('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    filters: { category: 'all', term: '', maxPrice: 250, rating: 0, inStock: false, lowStock: false, sort: 'featured' },
    productView: { id: null, selection: {}, image: 0, media: 'image' },
    lastFocus: null,
    toastTimer: null
  };

  var english = {
    'Inicio': 'Home', 'Productos': 'Products', 'Destacados': 'Featured', 'Ayuda': 'Help', 'Cuenta': 'Account', 'Carrito': 'Cart',
    'Lista de deseos': 'Wishlist', 'Comparar': 'Compare', 'Filtros avanzados': 'Advanced filters', 'Ordenar': 'Sort',
    'Recomendados': 'Recommended', 'Precio: menor a mayor': 'Price: low to high', 'Precio: mayor a menor': 'Price: high to low',
    'Mejor valorados': 'Top rated', 'Novedades': 'New arrivals', 'Mayor descuento': 'Best discount', 'Todo': 'All',
    'Audio': 'Audio', 'Energía': 'Power', 'Wearables': 'Wearables', 'Escritorio': 'Desk', 'Disponible': 'In stock',
    'Agotado': 'Sold out', 'Añadir al carrito': 'Add to cart', 'Avisarme cuando llegue': 'Notify me', 'Nuevo': 'New',
    'Más vendido': 'Best seller', 'Descubrir colección': 'Discover collection', 'Ver experiencia 360°': 'View 360° experience',
    'Populares ahora.': 'Popular now.', 'También te puede gustar.': 'You may also like.', 'Vistos recientemente.': 'Recently viewed.',
    'Suscribirme': 'Subscribe', 'Personalizar': 'Customize', 'Aceptar selección': 'Accept selection', 'WhatsApp': 'WhatsApp',
    'Rastrear pedido': 'Track order', 'Contacto': 'Contact', 'Sobre nosotros': 'About us', 'Devoluciones y garantía': 'Returns & warranty',
    'Privacidad': 'Privacy', 'Términos': 'Terms', 'Cerrar': 'Close', 'Finalizar compra': 'Checkout', 'Buscar por nombre, estilo o función': 'Search by name, style or feature',
    'Los favoritos de LUXORA': 'LUXORA favorites', 'Los modelos que están definiendo espacios de trabajo más personales.': 'The models defining more personal workspaces.',
    'Para ti': 'For you', 'Recomendaciones basadas únicamente en tu navegación en este dispositivo.': 'Recommendations based only on browsing on this device.',
    'Tu selección': 'Your selection', 'Retoma donde lo dejaste.': 'Pick up where you left off.', 'La colección': 'The collection',
    'Accesorios seleccionados para elevar cada detalle.': 'Selected accessories that elevate every detail.', 'Filtra, compara y encuentra la pieza precisa para tu forma de trabajar.': 'Filter, compare and find the right piece for your way of working.',
    'Categoría': 'Category', 'Precio máximo: $250': 'Maximum price: $250', 'Valoración mínima': 'Minimum rating', 'Disponibilidad': 'Availability',
    'Cualquiera': 'Any rating', 'Solo disponibles': 'In stock only', 'Últimas unidades': 'Low stock', 'Limpiar filtros': 'Clear filters',
    'Colección premium 2026': 'Premium collection 2026', 'Diseñado para el escritorio moderno, hecho para todos los días.': 'Designed for the modern desk, made for every day.',
    'Accesorios tecnológicos que combinan materiales refinados, rendimiento silencioso y una presencia extraordinaria.': 'Tech accessories that combine refined materials, quiet performance and an extraordinary presence.',
    'Guías': 'Guides', 'Diseño': 'Design', 'Novedades': 'New arrivals', 'Leer artículo': 'Read article',
    'Acceso anticipado': 'Early access', 'Recibe lanzamientos y beneficios exclusivos.': 'Receive launches and exclusive benefits.', 'Consentimiento claro, sin listas de correo invasivas.': 'Clear consent, no intrusive email lists.',
    'Tecnología elegante para el escritorio moderno.': 'Elegant technology for the modern desk.', 'Demo creada por Norte Web': 'Demo created by Norte Web',
    'Auriculares con cancelación activa, estuche luminoso y sonido espacial equilibrado.': 'Earbuds with active noise cancellation, a luminous case and balanced spatial sound.',
    'Base de carga magnética con alineación precisa, enfriamiento inteligente y luz ambiente.': 'Magnetic charging stand with precise alignment, intelligent cooling and ambient light.',
    'Banda de ajuste cómodo con sensores biométricos y un acabado pensado para usar a diario.': 'Comfortable band with biometric sensors and a finish designed for daily wear.',
    'Superficie minimalista para el espacio de trabajo, compatible con sensores ópticos y carga.': 'Minimal workspace surface, compatible with optical sensors and charging.',
    'Juego de cables trenzados de alta resistencia para cargar todos tus dispositivos.': 'High-resistance braided cable set for charging all your devices.',
    'Barra de sonido de escritorio con graves precisos, perfil fino y sintonía ambiental.': 'Desktop soundbar with precise bass, a slim profile and ambient tuning.',
    'Soporte ajustable de aluminio para elevar la pantalla y recuperar espacio en el escritorio.': 'Adjustable aluminium stand that raises your screen and frees desk space.',
    'Lámpara OLED de escritorio con temperatura adaptativa y escenas para concentración.': 'OLED desk lamp with adaptive temperature and focus scenes.'
  };
  // Keep every customer-facing Spanish string in one catalogue. New markup is
  // localized as it is rendered, which prevents modals and product cards from
  // falling back to Spanish after the visitor has selected English.
  Object.assign(english, {
    'Saltar al contenido': 'Skip to content',
    'Accesorio tecnológico LUXORA sobre fondo oscuro': 'LUXORA tech accessory on a dark background',
    'Envío sin costo desde $200 · garantía premium de 18 meses': 'Free shipping from $200 · 18-month premium warranty',
    'Activar novedades': 'Enable updates',
    'Idioma': 'Language', 'Moneda': 'Currency', 'Cambiar tema': 'Change theme',
    'Navegación principal': 'Main navigation', 'Menú de navegación': 'Navigation menu',
    'Cerrar menú': 'Close menu', 'Buscar productos': 'Search products', 'Buscar por voz': 'Search by voice',
    'Indicadores de confianza': 'Trust indicators', 'Ventajas de comprar en Luxora': 'Benefits of shopping at Luxora',
    'valoración media': 'average rating', 'clientes satisfechos': 'happy customers', 'soporte premium': 'premium support',
    'Explorar en 360°': 'Explore in 360°', 'Restablecer catálogo': 'Reset catalogue',
    'No encontramos productos con esos filtros.': 'We could not find products matching those filters.',
    'Personalizar Halo': 'Customize Halo', 'La utilidad de los objetos bien hechos': 'The value of well-made objects',
    '© 2026 LUXORA. Todos los derechos reservados.': '© 2026 LUXORA. All rights reserved.', 'Demo creada por Norte Web': 'Demo created by Norte Web',
    'Enlaces informativos': 'Information links', 'Cerrar carrito': 'Close cart', 'Cerrar producto': 'Close product',
    'Cerrar cuenta': 'Close account', 'Cerrar comparador': 'Close comparer', 'Cerrar checkout': 'Close checkout',
    'Cerrar chat': 'Close chat', 'Enviar mensaje': 'Send message', 'Hablar por WhatsApp con LUXORA': 'Chat with LUXORA on WhatsApp',
    'Personalizar': 'Customize', 'Abrir vista del producto destacado': 'Open featured product view',
    'Base de carga Halo Charge Stand': 'Halo Charge Stand charging base',
    'Esta variante está agotada.': 'This variant is sold out.', 'Avisarme': 'Notify me',
    'Capacidad': 'Capacity', 'Acabado': 'Finish', 'Tamaño': 'Size', 'Conector': 'Connector', 'Longitud': 'Length', 'Potencia': 'Power', 'Temperatura': 'Temperature',
    'Guardar en deseos': 'Save to wishlist', 'Preguntas y respuestas': 'Questions & answers',
    'El estuche y la cancelación se sienten realmente cuidados.': 'The case and noise cancellation feel genuinely well considered.',
    'Mucho cuerpo en un tamaño sorprendentemente discreto.': 'Full-bodied sound in a surprisingly discreet size.',
    'Queda impecable sobre el escritorio y carga sin pensar en ello.': 'It looks immaculate on the desk and charges effortlessly.',
    '¿Se puede usar con dos dispositivos?': 'Can it be used with two devices?', 'Puedes alternar entre dispositivos desde Bluetooth.': 'You can switch devices from Bluetooth.',
    '¿Funciona con una funda delgada?': 'Does it work with a slim case?', 'Sí, con fundas compatibles con MagSafe de hasta 3 mm.': 'Yes, with MagSafe-compatible cases up to 3 mm.',
    '12 jul 2026': 'Jul 12, 2026', '3 jul 2026': 'Jul 3, 2026', '27 jun 2026': 'Jun 27, 2026',
    'Compartir o copiar enlace': 'Share or copy link', 'Estimación al finalizar': 'Estimate at checkout',
    'Garantía': 'Warranty', '18 meses de cobertura': '18 months of coverage',
    'Devolución': 'Return', '30 días sin complicaciones': '30 hassle-free days',
    'Las reseñas reales se validan al conectar tus pedidos.': 'Real reviews are verified when your orders are connected.',
    'Publicar reseña': 'Post review', 'Comparte tu experiencia': 'Share your experience',
    '5 estrellas': '5 stars', '4 estrellas': '4 stars', '3 estrellas': '3 stars', '2 estrellas': '2 stars', '1 estrella': '1 star',
    'pregunta:': 'asks:', 'LUXORA responde:': 'LUXORA replies:', 'Ahora': 'Now',
    'Vista interactiva en 360 grados': 'Interactive 360-degree view', 'Arrastra para girar · 360°': 'Drag to rotate · 360°',
    'Vídeo': 'Video', 'Vídeo de producto listo para conectar': 'Product video ready to connect',
    'No se proporcionó un archivo de vídeo. Esta ficha está preparada para recibir una URL de vídeo segura desde tu panel.': 'No video file was provided. This page is ready for a secure video URL from your dashboard.',
    'Ver ficha': 'View details', 'Precio': 'Price', 'Stock': 'Stock', 'Producto': 'Product',
    'Los datos se actualizan con el inventario guardado en este dispositivo.': 'The data updates with the inventory saved on this device.',
    'Tu lista de deseos está vacía. Guarda productos para volver a ellos cuando quieras.': 'Your wishlist is empty. Save products to return to them whenever you like.',
    'Pedido confirmado': 'Order confirmed', 'Recibimos tu solicitud.': 'We received your request.',
    'Preparando tu selección': 'Preparing your selection', 'El equipo está comprobando las variantes.': 'The team is checking the variants.',
    'En tránsito': 'In transit', 'El paquete fue entregado al transportista.': 'The package was handed to the carrier.',
    'Entregado': 'Delivered', 'Tu pedido llegó a destino.': 'Your order arrived at its destination.',
    'Ver seguimiento e invoice': 'View tracking and invoice',
    'Modo demostración': 'Demo mode', 'Panel de administración': 'Administration panel',
    'Los datos de esta vista viven en el navegador. Conecta base de datos, roles y permisos antes de publicar.': 'The data in this view lives in the browser. Connect a database, roles and permissions before publishing.',
    'Ventas locales': 'Local sales', 'Pedidos demo': 'Demo orders', 'Stock bajo': 'Low stock',
    'Exportar pedidos a Excel': 'Export orders to Excel', 'Crear producto demo': 'Create demo product', 'Volver al perfil': 'Back to profile',
    'Inventario y productos': 'Inventory and products', 'Editar stock': 'Edit stock', 'Eliminar': 'Remove',
    'Cliente': 'Customer', 'Estado': 'Status', 'Aún no hay pedidos demo.': 'There are no demo orders yet.',
    'El flujo visual está listo para conectarse a autenticación segura. Esta demostración no guarda contraseñas ni procesa identidad real.': 'The visual flow is ready to connect to secure authentication. This demo does not store passwords or process real identities.',
    'Para producción, conecta tu API con contraseñas hasheadas, JWT HttpOnly, CSRF, rate limiting y verificación de correo.': 'For production, connect your API with hashed passwords, HttpOnly JWTs, CSRF protection, rate limiting and email verification.',
    'Activa': 'Active', 'Estándar': 'Standard', 'Gestionar membresía Premium': 'Manage Premium membership',
    'Activar demostración Premium': 'Activate Premium demo', 'Puntos, membresías y referidos deben validarse en el backend para evitar fraude.': 'Points, memberships and referrals must be validated in the backend to prevent fraud.',
    'Añade al menos un producto antes de finalizar la compra.': 'Add at least one product before checkout.',
    'Calculamos la estimación antes del pago. Ningún proveedor está conectado, por lo que este flujo crea únicamente un pedido de demostración local.': 'We calculate the estimate before payment. No provider is connected, so this flow creates only a local demo order.',
    'Costa Rica': 'Costa Rica', 'Estados Unidos': 'United States', 'España': 'Spain', 'México': 'Mexico', 'Colombia': 'Colombia',
    'Conecta claves y webhooks de cada proveedor desde el servidor. Esta pantalla no procesa tarjetas ni criptomonedas.': 'Connect each provider’s keys and webhooks from the server. This screen does not process cards or cryptocurrency.',
    'Mercado Pago': 'Mercado Pago',
    'Referencia': 'Reference', 'No se realizó ningún cobro, email ni envío real porque los proveedores y el backend aún no están conectados.': 'No payment, email or real shipment was made because providers and the backend are not connected yet.',
    'La factura se abre para imprimir y guardar como PDF. Para factura fiscal, correo y WhatsApp reales necesitas un servidor y sus credenciales.': 'The invoice opens so you can print or save it as a PDF. A real tax invoice, email and WhatsApp require a server and credentials.',
    'Factura PDF': 'PDF invoice', 'Simular próxima actualización': 'Simulate next update',
    'Estado visible en modo demostración. En producción, conéctalo a eventos reales del transportista mediante webhooks o SSE.': 'Status is visible in demo mode. In production, connect it to real carrier events through webhooks or SSE.',
    'Destino:': 'Destination:', 'Introduce tu referencia para consultar un pedido guardado en este dispositivo.': 'Enter your reference to look up an order saved on this device.',
    'Referencia de pedido': 'Order reference', 'Consultar pedido': 'Look up order', 'Escanear código QR': 'Scan QR code',
    'El escaneo usa la cámara o una imagen en navegadores que soportan BarcodeDetector y siempre debe ejecutarse en HTTPS.': 'Scanning uses the camera or an image in browsers that support BarcodeDetector and must always run over HTTPS.',
    'Encuentra respuestas rápidas o conversa con el asistente de LUXORA.': 'Find quick answers or chat with the LUXORA assistant.',
    '¿Cuándo llega mi pedido?': 'When will my order arrive?', 'La estimación aparece al elegir país en checkout; el seguimiento real se conecta con el transportista.': 'The estimate appears when you choose a country at checkout; real tracking connects to the carrier.',
    '¿Cómo devuelvo un producto?': 'How do I return a product?', 'Dispones de 30 días desde la recepción para iniciar una solicitud.': 'You have 30 days from delivery to start a request.',
    '¿Qué pagos aceptan?': 'Which payments do you accept?', 'La interfaz está preparada para Stripe, PayPal, Apple Pay, Google Pay y Mercado Pago; debes habilitarlos con credenciales seguras de servidor.': 'The interface is ready for Stripe, PayPal, Apple Pay, Google Pay and Mercado Pago; enable them with secure server credentials.',
    'Atención de lunes a viernes, 9:00-18:00 (Costa Rica).': 'Support Monday to Friday, 9:00–18:00 (Costa Rica).',
    'Ubicación de demostración preparada para Google Maps u OpenStreetMap.': 'Demo location ready for Google Maps or OpenStreetMap.', 'Abrir mapa': 'Open map',
    'Mensaje': 'Message', '¿Cómo podemos ayudarte?': 'How can we help?', 'Preparar solicitud': 'Prepare request',
    'LUXORA selecciona objetos tecnológicos que trabajan en silencio y se ven extraordinarios.': 'LUXORA selects tech objects that work quietly and look extraordinary.',
    'Esta base incorpora los puntos de contacto de una tienda premium y está lista para conectar el contenido, el equipo y las operaciones reales.': 'This foundation includes the touchpoints of a premium store and is ready to connect content, teams and real operations.',
    'Devoluciones:': 'Returns:', 'puedes solicitar una devolución dentro de los 30 días posteriores a la entrega, con el producto en condiciones adecuadas.': 'you can request a return within 30 days of delivery, with the product in suitable condition.',
    'Garantía:': 'Warranty:', 'LUXORA ofrece 18 meses de cobertura limitada frente a defectos de fabricación.': 'LUXORA offers 18 months of limited coverage against manufacturing defects.',
    'Estas políticas son contenido de muestra y deben ser revisadas legalmente para tu país y operación.': 'These policies are sample content and must be legally reviewed for your country and operation.',
    'Esta demostración guarda en tu dispositivo el carrito, las preferencias, el perfil demo y los pedidos demo. No transmite datos a un servidor.': 'This demo stores the cart, preferences, demo profile and demo orders on your device. It does not send data to a server.',
    'Antes de publicar, añade una política legal completa, base jurídica, consentimiento, retención y derechos aplicables.': 'Before publishing, add a complete legal policy, legal basis, consent, retention and applicable rights.',
    'Los precios, pedidos y funcionalidades de esta muestra no constituyen una oferta comercial real. Los términos definitivos deben establecer pagos, envíos, garantías, jurisdicción y resolución de disputas.': 'The prices, orders and features in this sample do not constitute a real commercial offer. Final terms must establish payments, shipping, warranties, jurisdiction and dispute resolution.',
    'El Journal tiene su diseño listo para publicaciones. Conviene conectarlo a un CMS o generar páginas estáticas con autores, fechas, Open Graph y datos estructurados de Article.': 'The Journal design is ready for posts. Connect it to a CMS or generate static pages with authors, dates, Open Graph and Article structured data.',
    'El almacenamiento esencial mantiene tu carrito. Analytics, píxel y experimentos permanecen desactivados hasta que des consentimiento y configures sus identificadores.': 'Essential storage keeps your cart. Analytics, pixels and experiments remain disabled until you consent and configure their identifiers.',
    'Marketing / Meta Pixel': 'Marketing / Meta Pixel',
    'Escribe un cupón o gift card.': 'Enter a coupon or gift card.', 'No reconocemos ese código.': 'We do not recognize that code.',
    'Ya utilizaste este código en este dispositivo.': 'You have already used this code on this device.', 'Este código requiere un mínimo de ': 'This code requires a minimum of ',
    'Este beneficio es exclusivo de membresía Premium.': 'This benefit is exclusive to Premium membership.', ' aplicado.': ' applied.',
    'Fecha': 'Date', 'País': 'Country', 'Total USD': 'Total USD',
    'Introduce un número válido.': 'Enter a valid number.', 'Inventario demo actualizado.': 'Demo inventory updated.',
    'El precio no es válido.': 'The price is not valid.', 'Producto creado localmente desde el panel de demostración.': 'Product created locally from the demo dashboard.',
    'Producto demo creado.': 'Demo product created.', 'Opción': 'Option',
    'El escáner QR necesita un navegador compatible con BarcodeDetector.': 'The QR scanner needs a browser compatible with BarcodeDetector.',
    'No encontramos un pedido para ese código.': 'We could not find an order for that code.', 'No fue posible leer ese código QR.': 'The QR code could not be read.',
    'La búsqueda por voz no es compatible con este navegador.': 'Voice search is not supported in this browser.', 'No pudimos reconocer la búsqueda por voz.': 'We could not recognize the voice search.', 'Escuchando tu búsqueda…': 'Listening for your search…',
    'Guardamos tus preferencias de cookies.': 'Your cookie preferences were saved.', 'Las notificaciones no están disponibles en este navegador.': 'Notifications are not available in this browser.',
    'Notificaciones habilitadas. Necesitas un servidor push para enviar campañas reales.': 'Notifications enabled. You need a push server to send real campaigns.', 'No activaste las notificaciones.': 'You did not enable notifications.',
    'Producto eliminado del carrito.': 'Product removed from cart.', 'Enlace copiado al portapapeles.': 'Link copied to the clipboard.', 'Copia este enlace: ': 'Copy this link: ',
    'Sesión de demostración cerrada.': 'Demo session signed out.', 'Membresía Premium demo activada.': 'Premium demo membership activated.', 'Membresía Premium demo desactivada.': 'Premium demo membership deactivated.',
    'Estado demo actualizado.': 'Demo status updated.', 'No encontramos esa referencia en este dispositivo.': 'We could not find that reference on this device.',
    'Solicitud preparada. Conecta un backend o CRM para enviarla.': 'Request prepared. Connect a backend or CRM to send it.',
    'Preferencias de privacidad guardadas.': 'Privacy preferences saved.', 'Suscripción preparada localmente. Conecta tu proveedor de email para confirmarla.': 'Subscription prepared locally. Connect your email provider to confirm it.',
    'No fue posible guardar esa preferencia en el navegador.': 'This preference could not be saved in the browser.',
    'Esta variante está agotada. Puedes solicitar aviso de reposición.': 'This variant is sold out. You can request a restock notification.',
    'Has alcanzado el stock disponible para esta variante.': 'You have reached the available stock for this variant.', 'Has alcanzado el stock disponible.': 'You have reached the available stock.',
    'Producto guardado en tu lista de deseos.': 'Product saved to your wishlist.', 'Producto eliminado de tu lista de deseos.': 'Product removed from your wishlist.',
    'Puedes comparar hasta tres productos a la vez.': 'You can compare up to three products at once.', 'Producto añadido al comparador.': 'Product added to comparer.', 'Producto eliminado del comparador.': 'Product removed from comparer.',
    'La foto debe pesar menos de 300 KB para guardarse en esta demo local.': 'The photo must be smaller than 300 KB to be stored in this local demo.',
    'Tu reseña se añadió localmente y quedará pendiente de verificación en producción.': 'Your review was added locally and will be pending verification in production.', 'No se pudo leer la foto seleccionada.': 'The selected photo could not be read.',
    'Tu pregunta fue enviada al equipo de demostración.': 'Your question was sent to the demo team.', 'Guardamos tu aviso de reposición en este dispositivo.': 'Your restock notice was saved on this device.',
    'Perfil demo creado. La contraseña no fue almacenada.': 'Demo profile created. The password was not stored.',
    'El navegador bloqueó la impresión. Habilita ventanas emergentes e inténtalo de nuevo.': 'The browser blocked printing. Enable pop-ups and try again.',
    'Moneda actualizada.': 'Currency updated.', 'Preferencia de idioma guardada.': 'Language preference saved.'
  });
  var englishAttributes = {
    'Abrir carrito': 'Open cart', 'Abrir cuenta': 'Open account', 'Abrir lista de deseos': 'Open wishlist', 'Abrir comparador': 'Open comparer',
    'Cambiar a modo oscuro': 'Switch to dark mode', 'Cambiar a modo claro': 'Switch to light mode', 'Abrir menú': 'Open menu',
    'Buscar por nombre, estilo o función': 'Search by name, style or feature',
    'Seleccionar idioma': 'Select language', 'Seleccionar moneda': 'Select currency', 'Cambiar tema': 'Change theme',
    'LUXORA, ir al inicio': 'LUXORA, go to homepage', 'Buscar productos': 'Search products', 'Buscar por voz': 'Search by voice',
    'Abrir vista del producto destacado': 'Open featured product view', 'Cerrar menú': 'Close menu', 'Cerrar carrito': 'Close cart',
    'Cerrar producto': 'Close product', 'Cerrar cuenta': 'Close account', 'Cerrar comparador': 'Close comparer',
    'Cerrar checkout': 'Close checkout', 'Cerrar': 'Close', 'Cerrar chat': 'Close chat', 'Enviar mensaje': 'Send message',
    'Asistente de LUXORA': 'LUXORA Assistant', 'Carrito de compras': 'Shopping cart', 'Indicadores de confianza': 'Trust indicators',
    'Ventajas de comprar en Luxora': 'Benefits of shopping at Luxora', 'Categorías': 'Categories', 'Enlaces informativos': 'Information links',
    'Hablar por WhatsApp con LUXORA': 'Chat with LUXORA on WhatsApp', 'Correo para aviso de reposición': 'Email for restock notification',
    'Tu nombre': 'Your name', 'Valoración': 'Rating', 'Escribe un mensaje': 'Write a message', 'Migas de pan': 'Breadcrumbs',
    'Reducir cantidad': 'Reduce quantity', 'Aumentar cantidad': 'Increase quantity', 'Eliminar': 'Remove',
    'Guardar en deseos': 'Save to wishlist', '¿Qué deseas saber?': 'What would you like to know?'
  };
  var englishPhrases = {
    'Más vendido': 'Best seller', 'Energía': 'Power', 'Escritorio': 'Desk', 'Nuevo': 'New', 'reseñas': 'reviews', 'unidades': 'units',
    '12 jul 2026': 'Jul 12, 2026', '3 jul 2026': 'Jul 3, 2026', '27 jun 2026': 'Jun 27, 2026',
    'Envío sin costo desde $200 · garantía premium de 18 meses': 'Free shipping from $200 · 18-month premium warranty',
    'Entrega protegida': 'Protected delivery', 'Pagos preparados para proveedores líderes': 'Payments ready for leading providers', 'Devoluciones simples durante 30 días': 'Simple 30-day returns',
    'Pieza insignia': 'Signature piece', 'Alineación magnética, enfriamiento inteligente y una silueta pensada para dispositivos que merecen mostrarse.': 'Magnetic alignment, intelligent cooling and a silhouette made for devices worth displaying.',
    'Compatible con MagSafe': 'MagSafe compatible', 'Carga inalámbrica y USB‑C': 'Wireless and USB-C charging', '18 meses de garantía': '18-month warranty',
    'Envío estimado': 'Shipping estimate', 'Calcula coste, impuestos y fecha antes de finalizar tu pedido.': 'See cost, taxes and delivery date before checkout.',
    'Calidad garantizada': 'Guaranteed quality', 'Materiales cuidados, 30 días de devolución y cobertura premium.': 'Thoughtful materials, 30-day returns and premium coverage.',
    'Compra a tu manera': 'Shop your way', 'Lista de deseos, comparador, moneda e idioma sin perder tu selección.': 'Wishlist, comparison, currency and language without losing your selection.',
    'Atención humana': 'Human support', 'Centro de ayuda, chat y seguimiento visible desde tu perfil.': 'Help center, chat and tracking visible from your profile.',
    'LUXORA Journal': 'LUXORA Journal', 'Ideas para un espacio que se siente tuyo.': 'Ideas for a space that feels like yours.',
    'El blog está preparado para publicaciones y guías de producto.': 'The journal is ready for posts and product guides.',
    'Cómo crear un escritorio más tranquilo': 'How to create a calmer desk', 'La utilidad de los objetos bien hechos': 'The value of well-made objects', 'La luz que acompaña tus horas de enfoque': 'Light for your focused hours',
    'Todos los derechos reservados.': 'All rights reserved.', 'Preferencias de cookies': 'Cookie preferences', 'Tu privacidad, primero': 'Your privacy first',
    'Usamos almacenamiento esencial para carrito y preferencias. Las mediciones y marketing permanecen desactivados sin tu consentimiento.': 'We use essential storage for the cart and preferences. Analytics and marketing remain disabled without your consent.',
    'Asistente LUXORA': 'LUXORA Assistant', 'Hola. Puedo ayudarte con envíos, devoluciones y productos.': 'Hello. I can help with shipping, returns and products.',
    'Devolución': 'Return', 'Pagos': 'Payments', 'Escribe un mensaje': 'Write a message', '¿Necesitas ayuda?': 'Need help?',
    'Carrito de compras': 'Shopping cart', 'Tu carrito está vacío. Guarda tus favoritos o explora la colección.': 'Your cart is empty. Save favorites or explore the collection.',
    'Cupón o gift card': 'Coupon or gift card', 'Aplicar': 'Apply', 'Subtotal': 'Subtotal', 'Descuento': 'Discount', 'Impuestos estimados': 'Estimated taxes', 'Gratis': 'Free',
    'Ya tienes envío sin costo.': 'You have free shipping.', 'para obtener envío sin costo.': 'to get free shipping.', 'Envío a ': 'Shipping to ',
    'Reducir cantidad': 'Reduce quantity', 'Aumentar cantidad': 'Increase quantity', 'Eliminar': 'Remove',
    'Migas de pan': 'Breadcrumbs', 'Leer reseñas': 'Read reviews', 'Volver a galería': 'Back to gallery', 'Reseñas de clientes': 'Customer reviews', 'Envío': 'Shipping',
    'Aún no hay reseñas para esta variante.': 'There are no reviews for this variant yet.', 'Pendiente de respuesta del equipo.': 'Awaiting the team response.',
    'Sé la primera persona en preguntar.': 'Be the first to ask.', 'Enviar pregunta': 'Send question', 'Tu nombre': 'Your name', '¿Qué deseas saber?': 'What would you like to know?',
    'Comparador': 'Comparer', 'Compara hasta tres opciones.': 'Compare up to three options.', 'Característica': 'Feature', 'Valoración': 'Rating', 'Variantes': 'Variants', 'Acción': 'Action', 'Quitar': 'Remove',
    'Tu comparador está vacío.': 'Your comparer is empty.', 'Selecciona hasta tres productos desde el catálogo para ver sus diferencias de un vistazo.': 'Select up to three products from the catalog to see their differences at a glance.',
    'Cuenta LUXORA': 'LUXORA account', 'Crea tu perfil o inicia sesión.': 'Create your profile or sign in.', 'Acceso': 'Sign in', 'Registro': 'Register', 'Nombre': 'Name', 'Correo electrónico': 'Email', 'Contraseña': 'Password', 'Mínimo 8 caracteres': 'Minimum 8 characters',
    'Continuar en modo demostración': 'Continue in demo mode', 'Perfil': 'Profile', 'Pedidos': 'Orders', 'Beneficios': 'Benefits', 'Panel demo': 'Demo panel',
    'Historial de pedidos': 'Order history', 'Aún no hay pedidos registrados en este dispositivo.': 'There are no orders saved on this device yet.',
    'Beneficios y recompensas': 'Benefits and rewards', 'Puntos disponibles': 'Available points', 'Membresía': 'Membership', 'Guardados': 'Saved', 'Puntos': 'Points',
    'Ver pedidos y seguimiento': 'View orders and tracking', 'Cerrar sesión de esta demostración': 'Sign out of this demo',
    'Checkout protegido': 'Secure checkout', 'Finaliza tu selección.': 'Complete your selection.', 'Entrega': 'Delivery', 'Correo': 'Email', 'País': 'Country', 'Ciudad': 'City', 'Dirección': 'Address',
    'Método de pago': 'Payment method', 'Tarjeta / Stripe': 'Card / Stripe', 'Cripto (opcional)': 'Crypto (optional)', 'Resumen': 'Summary', 'Crear pedido de demostración': 'Create demo order',
    'Pedido de demostración': 'Demo order', 'Tu selección fue registrada.': 'Your selection was saved.', 'Total estimado:': 'Estimated total:', 'Descargar factura PDF': 'Download PDF invoice', 'Preparar WhatsApp': 'Prepare WhatsApp', 'Seguimiento': 'Tracking',
    'Centro de ayuda': 'Help center', 'Contacto y ubicación': 'Contact and location', 'Política de privacidad': 'Privacy policy', 'Términos y condiciones': 'Terms and conditions',
    'Guardar preferencias': 'Save preferences', 'Esenciales (siempre activas)': 'Essential (always active)', 'Medición anónima / Plausible o Google Analytics': 'Anonymous measurement / Plausible or Google Analytics'
  };
  function englishDynamicText(value) {
    var match;
    if (english[value]) return english[value];
    if ((match = value.match(/^Solo quedan (\d+)$/))) return 'Only ' + match[1] + ' left';
    if ((match = value.match(/^(\d+) productos encontrados$/))) return match[1] + ' products found';
    if ((match = value.match(/^1 producto encontrado$/))) return '1 product found';
    if ((match = value.match(/^(\d(?:\.\d)?) · (\d+) reseñas$/))) return match[1] + ' · ' + match[2] + ' reviews';
    if ((match = value.match(/^Últimas (\d+) unidades disponibles\.$/))) return 'Only ' + match[1] + ' units left.';
    if ((match = value.match(/^En stock: (\d+) unidades para esta variante\.$/))) return 'In stock: ' + match[1] + ' units for this variant.';
    if ((match = value.match(/^(.+) se añadió al carrito\.$/))) return match[1] + ' was added to the cart.';
    if ((match = value.match(/^(Capacidad|Acabado|Tamaño|Conector|Longitud|Potencia|Temperatura): (.+)$/))) return englishDynamicText(match[1]) + ': ' + match[2];
    if ((match = value.match(/^Añade (.+) para obtener envío sin costo\.$/))) return 'Add ' + match[1] + ' to get free shipping.';
    if ((match = value.match(/^Envío a (.+)$/))) return 'Shipping to ' + englishDynamicText(match[1]);
    if ((match = value.match(/^Ver (.+)$/))) return 'View ' + match[1];
    if ((match = value.match(/^Foto compartida por (.+)$/))) return 'Photo shared by ' + match[1];
    if ((match = value.match(/^(.+) pregunta:$/))) return match[1] + ' asks:';
    if ((match = value.match(/^(\d+(?:\.\d+)?) de 5 estrellas$/))) return match[1] + ' out of 5 stars';
    var translated = value;
    Object.keys(englishPhrases).sort(function (a, b) { return b.length - a.length; }).forEach(function (source) {
      translated = translated.split(source).join(englishPhrases[source]);
    });
    return translated;
  }
  function englishDynamicAttribute(value) {
    var match;
    if (englishAttributes[value] || english[value]) return englishAttributes[value] || english[value];
    if ((match = value.match(/^Vista 360 de (.+)$/))) return '360 view of ' + match[1];
    if ((match = value.match(/^Ver imagen (\d+)$/))) return 'View image ' + match[1];
    if ((match = value.match(/^(.+), imagen (\d+) de (\d+)$/))) return match[1] + ', image ' + match[2] + ' of ' + match[3];
    if ((match = value.match(/^Ver (.+)$/))) return 'View ' + match[1];
    if ((match = value.match(/^(.+) de 5 estrellas$/))) return match[1] + ' out of 5 stars';
    return value;
  }
  function localize(value) {
    return state.language === 'en' ? englishDynamicText(String(value)) : String(value);
  }
  function applyLanguage() {
    var isEnglish = state.language === 'en';
    document.documentElement.lang = isEnglish ? 'en' : 'es';
    document.title = isEnglish ? 'LUXORA · Premium Tech Accessories' : 'LUXORA · Tienda tecnológica premium';
    document.querySelectorAll('[placeholder], [aria-label], [title], [alt]').forEach(function (element) {
      ['placeholder', 'aria-label', 'title', 'alt'].forEach(function (attribute) {
        var value = element.getAttribute(attribute);
        if (!value) return;
        if (!element.dataset['luxora' + attribute.replace(/-([a-z])/g, function (_, letter) { return letter.toUpperCase(); })]) element.dataset['luxora' + attribute.replace(/-([a-z])/g, function (_, letter) { return letter.toUpperCase(); })] = value;
        var original = element.dataset['luxora' + attribute.replace(/-([a-z])/g, function (_, letter) { return letter.toUpperCase(); })];
        element.setAttribute(attribute, isEnglish ? englishDynamicAttribute(original) : original);
      });
    });
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var originalText = node.__luxoraOriginalText || node.nodeValue;
      if (!node.__luxoraOriginalText) node.__luxoraOriginalText = originalText;
      var trimmed = originalText.trim();
      if (!trimmed) { node.nodeValue = originalText; continue; }
      var indentation = originalText.match(/^\s*/)[0];
      var ending = originalText.match(/\s*$/)[0];
      node.nodeValue = indentation + (isEnglish ? englishDynamicText(trimmed) : trimmed) + ending;
    }
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', isEnglish ? 'LUXORA: premium tech accessories with quick shopping, lists, comparer and personal support.' : 'LUXORA: accesorios tecnológicos premium, con compra rápida, listas, comparador y atención personalizada.');
    var socialDescription = document.querySelector('meta[property="og:description"]');
    if (socialDescription) socialDescription.setAttribute('content', isEnglish ? 'Premium tech accessories for your workspace.' : 'Accesorios tecnológicos premium para tu espacio de trabajo.');
    var whatsapp = $('.whatsapp-float');
    if (whatsapp) whatsapp.href = isEnglish ? 'https://wa.me/50670000000?text=Hello%20LUXORA%2C%20I%20need%20help.' : 'https://wa.me/50670000000?text=Hola%20LUXORA%2C%20necesito%20ayuda.';
  }

  function allProducts() {
    return products.concat(state.customProducts).filter(function (product) {
      return state.hiddenProducts.indexOf(product.id) === -1;
    });
  }
  function productById(productId) {
    return allProducts().find(function (product) { return product.id === Number(productId); });
  }
  function stockKey(product, group, value) {
    return product.id + '|' + group.name + '|' + value;
  }
  function rawStock(product, group, value) {
    var saved = state.inventory[stockKey(product, group, value)];
    var fallback = group.values.find(function (option) { return option.value === value; });
    return Math.max(0, Number(saved == null ? (fallback ? fallback.stock : 0) : saved));
  }
  function selectionFor(product, oldSelection) {
    var selection = {};
    product.variants.forEach(function (group) {
      var found = group.values.find(function (option) { return oldSelection && oldSelection[group.name] === option.value; });
      var firstAvailable = group.values.find(function (option) { return rawStock(product, group, option.value) > 0; });
      selection[group.name] = (found || firstAvailable || group.values[0]).value;
    });
    return selection;
  }
  function variantStock(product, selection) {
    if (!product || !product.variants.length) return 0;
    return Math.min.apply(Math, product.variants.map(function (group) {
      return rawStock(product, group, selection[group.name]);
    }));
  }
  function productStock(product) {
    return Math.max.apply(Math, product.variants.reduce(function (values, group) {
      return values.concat(group.values.map(function (option) { return rawStock(product, group, option.value); }));
    }, []));
  }
  function category(product) {
    return { audio: 'Audio', power: 'Energía', wearable: 'Wearables', desk: 'Escritorio' }[product.category] || product.category;
  }
  function discount(product) {
    return Math.round((1 - product.price / product.oldPrice) * 100);
  }
  function money(amount) {
    var rates = { USD: 1, CRC: 528.5, EUR: 0.92 };
    var locale = state.language === 'en' ? { USD: 'en-US', CRC: 'en-US', EUR: 'en-IE' } : { USD: 'en-US', CRC: 'es-CR', EUR: 'es-ES' };
    return new Intl.NumberFormat(locale[state.currency], { style: 'currency', currency: state.currency, maximumFractionDigits: state.currency === 'CRC' ? 0 : 2 }).format(amount * rates[state.currency]);
  }
  function starMarkup(rating) {
    var round = Math.round(rating);
    return '<span class="stars" aria-label="' + rating + ' de 5 estrellas">' + '★'.repeat(round) + '☆'.repeat(5 - round) + '</span>';
  }
  function saveCommerce() {
    save('cart', state.cart);
    save('wishlist', state.wishlist);
    save('compare', state.compare);
    save('recent', state.recentlyViewed);
    save('inventory', state.inventory);
    save('coupon', state.coupon);
    save('coupon-use', state.couponUse);
  }

  function cartItems() {
    return Object.keys(state.cart).map(function (key) {
      var item = state.cart[key];
      return { key: key, product: productById(item.productId), productId: item.productId, selection: item.selection, quantity: item.quantity };
    }).filter(function (item) { return item.product; });
  }
  function cartQuantity() {
    return cartItems().reduce(function (sum, item) { return sum + item.quantity; }, 0);
  }
  function cartSubtotal() {
    return cartItems().reduce(function (sum, item) { return sum + item.quantity * item.product.price; }, 0);
  }
  function delivery(country) {
    return {
      CR: { name: 'Costa Rica', shipping: 12, tax: 0.13 },
      US: { name: 'Estados Unidos', shipping: 9, tax: 0 },
      ES: { name: 'España', shipping: 14, tax: 0.21 },
      MX: { name: 'México', shipping: 11, tax: 0.16 },
      CO: { name: 'Colombia', shipping: 12, tax: 0.19 }
    }[country] || { name: 'Estados Unidos', shipping: 9, tax: 0 };
  }
  function couponValue(subtotal) {
    var coupon = coupons[state.coupon];
    if (!coupon || subtotal < coupon.minimum || (coupon.premium && !(state.user && state.user.premium))) return { value: 0, coupon: null };
    return { value: coupon.kind === 'percent' ? subtotal * coupon.amount / 100 : Math.min(coupon.amount, subtotal), coupon: coupon };
  }
  function totals(country) {
    var subtotal = cartSubtotal();
    var applied = couponValue(subtotal);
    var destination = delivery(country || state.country);
    var shipping = subtotal === 0 ? 0 : (subtotal >= 200 ? 0 : destination.shipping);
    var tax = (subtotal - applied.value + shipping) * destination.tax;
    return { subtotal: subtotal, discount: applied.value, coupon: applied.coupon, shipping: shipping, tax: tax, total: subtotal - applied.value + shipping + tax, destination: destination };
  }

  function productCard(product) {
    var selection = selectionFor(product, {});
    var stock = variantStock(product, selection);
    var stockText = stock <= 0 ? 'Agotado' : (stock <= 5 ? 'Solo quedan ' + stock : 'Disponible');
    var stockClass = stock <= 0 ? 'out' : (stock <= 5 ? 'low' : '');
    var wished = state.wishlist.indexOf(product.id) !== -1;
    var compared = state.compare.indexOf(product.id) !== -1;
    return '<article class="product-card" data-product-card="' + product.id + '">' +
      '<button class="product-card__media" data-product-open="' + product.id + '" type="button" aria-label="Ver ' + esc(product.name) + '">' +
        '<img src="' + esc(product.images[0]) + '" alt="' + esc(product.name) + '" loading="lazy" decoding="async">' +
        '<span class="card-tag">' + esc(product.tag) + '</span><span class="stock-label ' + stockClass + '">' + stockText + '</span>' +
      '</button>' +
      '<div class="card-actions"><button class="icon-btn ' + (wished ? 'active' : '') + '" data-wishlist-toggle="' + product.id + '" type="button" aria-label="Lista de deseos">♥</button><button class="icon-btn ' + (compared ? 'active' : '') + '" data-compare-toggle="' + product.id + '" type="button" aria-label="Comparar">⇄</button></div>' +
      '<div class="product-card__body"><span class="product-card__category">' + category(product) + ' · ' + (product.isNew ? 'Nuevo' : esc(product.tag)) + '</span><h3>' + esc(product.name) + '</h3><p>' + esc(product.description) + '</p>' +
      '<div class="product-meta">' + starMarkup(product.rating) + '<span>' + product.rating.toFixed(1) + ' · ' + product.reviews + ' reseñas</span></div><div class="product-card__price"><strong>' + money(product.price) + '</strong><del>' + money(product.oldPrice) + '</del></div>' +
      '<button class="btn btn-secondary" data-cart-add="' + product.id + '" type="button" ' + (stock <= 0 ? 'disabled' : '') + '>' + (stock <= 0 ? 'Avisarme cuando llegue' : 'Añadir al carrito') + '</button></div></article>';
  }

  function filtered() {
    var filter = state.filters;
    var term = filter.term.trim().toLowerCase();
    var items = allProducts().filter(function (product) {
      var searchable = (product.name + ' ' + product.description + ' ' + product.tag + ' ' + category(product)).toLowerCase();
      var stock = productStock(product);
      return (filter.category === 'all' || filter.category === product.category) &&
        product.price <= filter.maxPrice &&
        product.rating >= filter.rating &&
        (!filter.inStock || stock > 0) &&
        (!filter.lowStock || (stock > 0 && stock <= 5)) &&
        (!term || searchable.indexOf(term) !== -1);
    });
    var sorting = {
      featured: function (a, b) { return b.popularity - a.popularity; },
      'price-asc': function (a, b) { return a.price - b.price; },
      'price-desc': function (a, b) { return b.price - a.price; },
      rating: function (a, b) { return b.rating - a.rating; },
      new: function (a, b) { return Number(b.isNew) - Number(a.isNew) || b.popularity - a.popularity; },
      discount: function (a, b) { return discount(b) - discount(a); }
    };
    return items.sort(sorting[filter.sort] || sorting.featured);
  }
  function renderCatalog() {
    var items = filtered();
    id('productGrid').innerHTML = items.map(productCard).join('');
    id('resultsCount').textContent = items.length + (items.length === 1 ? ' producto encontrado' : ' productos encontrados');
    id('emptyProducts').hidden = items.length > 0;
    $$('.tag-btn').forEach(function (button) { button.classList.toggle('active', button.dataset.category === state.filters.category); });
    id('priceOutput').textContent = money(state.filters.maxPrice);
    if (state.language === 'en') applyLanguage();
  }
  function renderRails() {
    id('popularRail').innerHTML = allProducts().slice().sort(function (a, b) { return b.popularity - a.popularity; }).slice(0, 6).map(productCard).join('');
    var recent = state.recentlyViewed.map(productById).filter(Boolean);
    id('recentlyViewed').hidden = recent.length === 0;
    id('recentRail').innerHTML = recent.map(productCard).join('');
    var recentCategories = recent.map(function (product) { return product.category; });
    var recommendations = allProducts().filter(function (product) { return state.recentlyViewed.indexOf(product.id) === -1; }).sort(function (a, b) {
      return (recentCategories.indexOf(b.category) !== -1 ? 25 : 0) + b.popularity - ((recentCategories.indexOf(a.category) !== -1 ? 25 : 0) + a.popularity);
    }).slice(0, 5);
    id('recommendations').hidden = recent.length === 0;
    id('recommendationRail').innerHTML = recommendations.map(productCard).join('');
    if (state.language === 'en') applyLanguage();
  }
  function renderCart() {
    var items = cartItems();
    var calculated = totals();
    id('cartCount').textContent = cartQuantity();
    id('wishlistCount').textContent = state.wishlist.length;
    id('compareCount').textContent = state.compare.length;
    id('cartItems').innerHTML = items.length ? items.map(function (item) {
      return '<article class="cart-item"><img src="' + esc(item.product.images[0]) + '" alt=""><div><h3>' + esc(item.product.name) + '</h3><p>' + Object.keys(item.selection).map(function (key) { return esc(item.selection[key]); }).join(' · ') + '</p><div class="cart-item__controls"><button data-cart-change="-1" data-cart-key="' + esc(item.key) + '" type="button" aria-label="Reducir cantidad">−</button><span>' + item.quantity + '</span><button data-cart-change="1" data-cart-key="' + esc(item.key) + '" type="button" aria-label="Aumentar cantidad">+</button><button data-cart-remove="' + esc(item.key) + '" type="button" aria-label="Eliminar">×</button></div></div><strong>' + money(item.product.price * item.quantity) + '</strong></article>';
    }).join('') : '<p class="cart-empty">Tu carrito está vacío. Guarda tus favoritos o explora la colección.</p>';
    var remaining = Math.max(0, 200 - calculated.subtotal);
    id('shippingProgress').innerHTML = calculated.subtotal >= 200 && calculated.subtotal > 0 ? '✓ Ya tienes envío sin costo.<div class="progress-track"><span style="width:100%"></span></div>' : 'Añade ' + money(remaining) + ' para obtener envío sin costo.<div class="progress-track"><span style="width:' + Math.min(100, calculated.subtotal / 2) + '%"></span></div>';
    id('cartSummary').innerHTML = '<div><span>Subtotal</span><strong>' + money(calculated.subtotal) + '</strong></div>' +
      (calculated.discount ? '<div class="positive"><span>' + esc(calculated.coupon.label) + '</span><strong>−' + money(calculated.discount) + '</strong></div>' : '') +
      '<div><span>Envío a ' + calculated.destination.name + '</span><strong>' + (calculated.shipping ? money(calculated.shipping) : 'Gratis') + '</strong></div><div><span>Impuestos estimados</span><strong>' + money(calculated.tax) + '</strong></div><div class="total"><span>Total</span><strong>' + money(calculated.total) + '</strong></div>';
    if (state.language === 'en') applyLanguage();
  }
  function rerenderCommerce() {
    saveCommerce();
    renderCatalog();
    renderRails();
    renderCart();
    applyLanguage();
  }

  function cartKey(product, selection) {
    return product.id + '|' + product.variants.map(function (group) { return selection[group.name]; }).join('|');
  }
  function addToCart(productId, selected) {
    var product = productById(productId);
    if (!product) return;
    var selection = selected || selectionFor(product, state.productView.id === product.id ? state.productView.selection : {});
    var key = cartKey(product, selection);
    var existing = state.cart[key] ? state.cart[key].quantity : 0;
    if (existing >= variantStock(product, selection)) {
      if (variantStock(product, selection) <= 0) openProduct(product.id);
      toast(variantStock(product, selection) <= 0 ? 'Esta variante está agotada. Puedes solicitar aviso de reposición.' : 'Has alcanzado el stock disponible para esta variante.');
      return;
    }
    state.cart[key] = { productId: product.id, selection: selection, quantity: existing + 1 };
    rerenderCommerce();
    toast(product.name + ' se añadió al carrito.');
  }
  function changeCart(key, amount) {
    var item = state.cart[key];
    if (!item) return;
    if (amount < 0 && item.quantity === 1) {
      delete state.cart[key];
    } else if (amount > 0 && item.quantity >= variantStock(productById(item.productId), item.selection)) {
      toast('Has alcanzado el stock disponible.');
      return;
    } else {
      item.quantity += amount;
    }
    rerenderCommerce();
  }
  function toggleWishlist(productId) {
    var idNumber = Number(productId);
    var place = state.wishlist.indexOf(idNumber);
    if (place === -1) {
      state.wishlist.unshift(idNumber);
      toast('Producto guardado en tu lista de deseos.');
    } else {
      state.wishlist.splice(place, 1);
      toast('Producto eliminado de tu lista de deseos.');
    }
    rerenderCommerce();
    if (!id('infoModal').hidden && id('infoModal').dataset.view === 'wishlist') openInfo('wishlist');
    if (!id('productModal').hidden && state.productView.id === idNumber) renderProductModal();
  }
  function toggleCompare(productId) {
    var idNumber = Number(productId);
    var place = state.compare.indexOf(idNumber);
    if (place === -1) {
      if (state.compare.length >= 3) {
        toast('Puedes comparar hasta tres productos a la vez.');
        return;
      }
      state.compare.push(idNumber);
      toast('Producto añadido al comparador.');
    } else {
      state.compare.splice(place, 1);
      toast('Producto eliminado del comparador.');
    }
    rerenderCommerce();
    if (!id('compareModal').hidden) renderCompare();
    if (!id('productModal').hidden && state.productView.id === idNumber) renderProductModal();
  }

  function activate(layer) {
    state.lastFocus = document.activeElement;
    closeMobile();
    id('cartDrawer').classList.remove('open');
    id('cartDrawer').setAttribute('aria-hidden', 'true');
    $$('.modal').forEach(function (modal) { if (modal !== layer) modal.hidden = true; });
    layer.hidden = false;
    applyLanguage();
    id('overlay').classList.add('active');
    document.body.classList.add('is-locked');
    window.setTimeout(function () { var focus = $('.modal-close, input, button', layer); if (focus) focus.focus(); }, 20);
  }
  function closeAll(returnFocus) {
    $$('.modal').forEach(function (modal) { modal.hidden = true; });
    id('cartDrawer').classList.remove('open');
    id('cartDrawer').setAttribute('aria-hidden', 'true');
    closeMobile();
    id('overlay').classList.remove('active');
    document.body.classList.remove('is-locked');
    if (returnFocus !== false && state.lastFocus && typeof state.lastFocus.focus === 'function') state.lastFocus.focus();
  }
  function openCart() {
    state.lastFocus = document.activeElement;
    $$('.modal').forEach(function (modal) { modal.hidden = true; });
    renderCart();
    applyLanguage();
    id('cartDrawer').classList.add('open');
    id('cartDrawer').setAttribute('aria-hidden', 'false');
    id('overlay').classList.add('active');
    document.body.classList.add('is-locked');
    $('[data-close-cart]').focus();
  }
  function closeMobile() {
    id('mobileMenu').classList.remove('open');
    id('mobileMenu').setAttribute('aria-hidden', 'true');
  }
  function openMobile() {
    state.lastFocus = document.activeElement;
    id('mobileMenu').classList.add('open');
    id('mobileMenu').setAttribute('aria-hidden', 'false');
    id('overlay').classList.add('active');
    document.body.classList.add('is-locked');
    $('.close-button', id('mobileMenu')).focus();
  }

  function addRecent(productId) {
    state.recentlyViewed = [Number(productId)].concat(state.recentlyViewed.filter(function (item) { return item !== Number(productId); })).slice(0, 6);
    save('recent', state.recentlyViewed);
    renderRails();
  }
  function openProduct(productId) {
    var product = productById(productId);
    if (!product) return;
    if (state.productView.id !== product.id) state.productView = { id: product.id, selection: selectionFor(product, {}), image: 0, media: 'image' };
    addRecent(product.id);
    renderProductModal();
    activate(id('productModal'));
    history.replaceState(null, '', '#product=' + product.slug);
  }
  function reviewsFor(product) {
    return (sampleReviews[product.id] || []).concat(state.reviews[product.id] || []);
  }
  function questionsFor(product) {
    return (sampleQuestions[product.id] || []).concat(state.questions[product.id] || []);
  }
  function renderProductModal() {
    var product = productById(state.productView.id);
    if (!product) return;
    var view = state.productView;
    view.selection = selectionFor(product, view.selection);
    var stock = variantStock(product, view.selection);
    var reviews = reviewsFor(product);
    var questions = questionsFor(product);
    var average = reviews.length ? reviews.reduce(function (sum, review) { return sum + review.rating; }, 0) / reviews.length : product.rating;
    var gallery;
    if (view.media === '360') {
      gallery = '<div class="gallery-360" id="gallery360" role="application" tabindex="0" aria-label="Vista interactiva en 360 grados. Mantén presionado el clic izquierdo y arrastra para girar."><img src="' + esc(product.images[view.image]) + '" alt="Vista 360 de ' + esc(product.name) + '"><span>Arrastra con clic izquierdo · 360°</span></div>';
    } else if (view.media === 'video') {
      gallery = '<div class="gallery-360"><img src="' + esc(product.images[0]) + '" alt=""><span>Vídeo de producto listo para conectar</span></div><p class="form-help">No se proporcionó un archivo de vídeo. Esta ficha está preparada para recibir una URL de vídeo segura desde tu panel.</p>';
    } else {
      gallery = '<div class="product-gallery"><div class="gallery-thumbs">' + product.images.map(function (src, index) {
        return '<button class="' + (index === view.image ? 'active' : '') + '" data-gallery-index="' + index + '" type="button" aria-label="Ver imagen ' + (index + 1) + '"><img src="' + esc(src) + '" alt=""></button>';
      }).join('') + '</div><div class="gallery-main"><img src="' + esc(product.images[view.image]) + '" alt="' + esc(product.name) + ', imagen ' + (view.image + 1) + ' de ' + product.images.length + '"></div><div class="gallery-controls"><button data-product-media="360" type="button">360°</button><button data-product-media="video" type="button">Vídeo</button></div></div>';
    }
    var variants = product.variants.map(function (group) {
      return '<div class="variant-group"><strong>' + esc(group.name) + ': ' + esc(view.selection[group.name]) + '</strong><div class="variant-options">' + group.values.map(function (option) {
        return '<button class="' + (view.selection[group.name] === option.value ? 'active' : '') + '" data-variant-group="' + esc(group.name) + '" data-variant-value="' + esc(option.value) + '" type="button" ' + (rawStock(product, group, option.value) === 0 ? 'disabled' : '') + '>' + esc(option.value) + '</button>';
      }).join('') + '</div></div>';
    }).join('');
    var reviewList = reviews.slice(-3).reverse().map(function (review) {
      return '<article class="review"><div class="review__top"><strong>' + esc(review.name) + '</strong><span>' + starMarkup(review.rating) + ' · ' + esc(review.date || 'Ahora') + '</span></div><p>' + esc(review.text) + '</p>' + (review.photo ? '<img src="' + esc(review.photo) + '" alt="Foto compartida por ' + esc(review.name) + '">' : '') + '</article>';
    }).join('') || '<p class="form-help">Aún no hay reseñas para esta variante.</p>';
    var questionList = questions.map(function (question) {
      return '<article class="question"><strong>' + esc(question.name) + ' pregunta:</strong><p>' + esc(question.text) + '</p>' + (question.answer ? '<p class="answer"><strong>LUXORA responde:</strong> ' + esc(question.answer) + '</p>' : '<p class="form-help">Pendiente de respuesta del equipo.</p>') + '</article>';
    }).join('') || '<p class="form-help">Sé la primera persona en preguntar.</p>';
    var favourite = state.wishlist.indexOf(product.id) !== -1;
    var compared = state.compare.indexOf(product.id) !== -1;
    id('productModalContent').innerHTML = '<div class="product-detail"><div><nav class="breadcrumb" aria-label="Migas de pan"><span>Inicio</span><span>›</span><span>' + category(product) + '</span><span>›</span><span>' + esc(product.name) + '</span></nav>' + gallery + (view.media !== 'image' ? '<div class="gallery-controls"><button data-product-media="image" type="button">Volver a galería</button></div>' : '') + '</div>' +
      '<div class="product-detail__info"><span class="eyebrow">' + esc(product.tag) + ' · ' + category(product) + '</span><h2 id="productTitle">' + esc(product.name) + '</h2><div class="rating-row">' + starMarkup(average) + '<span>' + average.toFixed(1) + ' · ' + (reviews.length || product.reviews) + ' reseñas</span><button data-scroll-reviews type="button">Leer reseñas</button></div><div class="detail-price"><strong>' + money(product.price) + '</strong><del>' + money(product.oldPrice) + '</del><span class="discount-chip">−' + discount(product) + '%</span></div><p class="product-description">' + esc(product.description) + '</p>' + variants +
      '<p class="detail-stock ' + (stock <= 0 ? 'out' : (stock <= 5 ? 'low' : '')) + '">' + (stock <= 0 ? 'Esta variante está agotada.' : (stock <= 5 ? 'Últimas ' + stock + ' unidades disponibles.' : 'En stock: ' + stock + ' unidades para esta variante.')) + '</p>' +
      '<div class="detail-actions"><button class="btn btn-primary" data-product-cart-add="' + product.id + '" type="button" ' + (stock <= 0 ? 'disabled' : '') + '>' + (stock <= 0 ? 'Agotado' : 'Añadir al carrito') + '</button><button class="icon-btn ' + (favourite ? 'active' : '') + '" data-wishlist-toggle="' + product.id + '" type="button" aria-label="Guardar en deseos">♥</button><button class="icon-btn ' + (compared ? 'active' : '') + '" data-compare-toggle="' + product.id + '" type="button" aria-label="Comparar">⇄</button></div>' +
      (stock <= 0 ? '<form class="mini-form" data-restock-form="' + product.id + '"><input name="email" type="email" required placeholder="tu@email.com" aria-label="Correo para aviso de reposición"><button class="btn btn-secondary" type="submit">Avisarme</button></form>' : '') +
      '<button class="text-button" data-share-product="' + product.id + '" type="button">Compartir o copiar enlace</button><div class="detail-extra"><div><strong>Entrega</strong>Estimación al finalizar</div><div><strong>Garantía</strong>18 meses de cobertura</div><div><strong>Devolución</strong>30 días sin complicaciones</div></div></div>' +
      '<div class="product-lower"><section id="reviews"><h3>Reseñas de clientes</h3><div class="review-summary"><strong>' + average.toFixed(1) + '</strong><div>' + starMarkup(average) + '<p>Las reseñas reales se validan al conectar tus pedidos.</p></div></div><div class="review-list">' + reviewList + '</div><form class="mini-form" data-review-form="' + product.id + '"><input name="name" required maxlength="60" placeholder="Tu nombre" aria-label="Tu nombre"><select name="rating" aria-label="Valoración"><option value="5">5 estrellas</option><option value="4">4 estrellas</option><option value="3">3 estrellas</option><option value="2">2 estrellas</option><option value="1">1 estrella</option></select><textarea name="text" required maxlength="600" placeholder="Comparte tu experiencia"></textarea><input class="file-input" name="photo" type="file" accept="image/*"><button class="btn btn-secondary" type="submit">Publicar reseña</button></form></section>' +
      '<section><h3>Preguntas y respuestas</h3><div class="question-list">' + questionList + '</div><form class="mini-form" data-question-form="' + product.id + '"><input name="name" required maxlength="60" placeholder="Tu nombre" aria-label="Tu nombre"><button class="btn btn-secondary" type="submit">Enviar pregunta</button><textarea name="text" required maxlength="500" placeholder="¿Qué deseas saber?"></textarea></form></section></div></div>';
    applyLanguage();
    init360();
  }
  function init360() {
    var viewer = id('gallery360');
    if (!viewer) return;
    var startX = null;
    viewer.addEventListener('contextmenu', function (event) { event.preventDefault(); });
    viewer.addEventListener('pointerdown', function (event) {
      if (event.button !== 0) return;
      event.preventDefault();
      startX = event.clientX;
      viewer.setPointerCapture(event.pointerId);
    });
    viewer.addEventListener('pointermove', function (event) {
      if (startX == null) return;
      event.preventDefault();
      var distance = event.clientX - startX;
      var imageNode = $('img', viewer);
      imageNode.style.setProperty('--rotate', distance / 2 + 'deg');
      imageNode.style.setProperty('--flip', Math.abs(distance) > 90 ? '-1' : '1');
    });
    viewer.addEventListener('pointerup', function (event) { startX = null; if (viewer.hasPointerCapture(event.pointerId)) viewer.releasePointerCapture(event.pointerId); });
    viewer.addEventListener('pointercancel', function (event) { startX = null; if (viewer.hasPointerCapture(event.pointerId)) viewer.releasePointerCapture(event.pointerId); });
  }

  function renderCompare() {
    var list = state.compare.map(productById).filter(Boolean);
    window.setTimeout(applyLanguage, 0);
    id('compareModalContent').innerHTML = list.length ? '<span class="eyebrow">Comparador</span><h2 id="compareTitle">Compara hasta tres opciones.</h2><p class="modal-intro">Los datos se actualizan con el inventario guardado en este dispositivo.</p><div class="admin-table-wrap"><table class="compare-table"><thead><tr><th>Característica</th>' + list.map(function (product) {
      return '<th><img src="' + esc(product.images[0]) + '" alt=""><br>' + esc(product.name) + '<br><button data-product-open="' + product.id + '" type="button">Ver ficha</button></th>';
    }).join('') + '</tr></thead><tbody><tr><th>Precio</th>' + list.map(function (product) { return '<td><strong>' + money(product.price) + '</strong></td>'; }).join('') + '</tr><tr><th>Valoración</th>' + list.map(function (product) { return '<td>' + starMarkup(product.rating) + ' ' + product.rating.toFixed(1) + '</td>'; }).join('') + '</tr><tr><th>Categoría</th>' + list.map(function (product) { return '<td>' + category(product) + '</td>'; }).join('') + '</tr><tr><th>Disponibilidad</th>' + list.map(function (product) { return '<td>' + productStock(product) + ' unidades</td>'; }).join('') + '</tr><tr><th>Variantes</th>' + list.map(function (product) { return '<td>' + product.variants.map(function (group) { return esc(group.name) + ': ' + group.values.map(function (option) { return esc(option.value); }).join(', '); }).join('<br>') + '</td>'; }).join('') + '</tr><tr><th>Acción</th>' + list.map(function (product) { return '<td><button data-compare-toggle="' + product.id + '" type="button">Quitar</button></td>'; }).join('') + '</tr></tbody></table></div>' : '<div class="compare-empty"><h2 id="compareTitle">Tu comparador está vacío.</h2><p>Selecciona hasta tres productos desde el catálogo para ver sus diferencias de un vistazo.</p></div>';
  }
  function openCompare() {
    renderCompare();
    activate(id('compareModal'));
  }
  function wishlistMarkup() {
    var list = state.wishlist.map(productById).filter(Boolean);
    return list.length ? '<div class="products-grid">' + list.map(productCard).join('') + '</div>' : '<div class="compare-empty">Tu lista de deseos está vacía. Guarda productos para volver a ellos cuando quieras.</div>';
  }

  function orderDate(value) {
    return new Intl.DateTimeFormat(state.language === 'en' ? 'en-US' : 'es-CR', { dateStyle: 'medium' }).format(new Date(value));
  }
  function timeline(order) {
    var phases = [['Pedido confirmado', 'Recibimos tu solicitud.'], ['Preparando tu selección', 'El equipo está comprobando las variantes.'], ['En tránsito', 'El paquete fue entregado al transportista.'], ['Entregado', 'Tu pedido llegó a destino.']];
    var progress = Math.min(3, Number(order && order.progress != null ? order.progress : 1));
    return '<div class="tracking-timeline">' + phases.map(function (phase, index) {
      return '<div class="tracking-step ' + (index < progress ? 'complete' : (index === progress ? 'active' : '')) + '"><strong>' + phase[0] + '</strong><small>' + phase[1] + '</small></div>';
    }).join('') + '</div>';
  }
  function orderCard(order) {
    return '<article class="order-card"><div class="order-card__top"><strong>' + esc(order.id) + '</strong><span class="status-pill ' + (order.progress < 2 ? 'pending' : '') + '">' + esc(order.status) + '</span></div><p>' + orderDate(order.createdAt) + ' · ' + order.items.reduce(function (sum, item) { return sum + item.quantity; }, 0) + ' artículos · <strong>' + money(order.total) + '</strong></p><button class="text-button" data-track-order="' + esc(order.id) + '" type="button">Ver seguimiento e invoice</button></article>';
  }
  function adminMarkup() {
    var sales = state.orders.reduce(function (sum, order) { return sum + order.total; }, 0);
    var low = allProducts().filter(function (product) { return productStock(product) <= 5; }).length;
    return '<span class="eyebrow">Modo demostración</span><h2 id="accountTitle">Panel de administración</h2><p class="modal-intro">Los datos de esta vista viven en el navegador. Conecta base de datos, roles y permisos antes de publicar.</p><div class="account-stat-grid"><div><strong>' + money(sales) + '</strong><span>Ventas locales</span></div><div><strong>' + state.orders.length + '</strong><span>Pedidos demo</span></div><div><strong>' + low + '</strong><span>Stock bajo</span></div></div><div class="admin-actions"><button class="btn btn-secondary" data-export-orders type="button">Exportar pedidos a Excel</button><button class="btn btn-secondary" data-admin-add type="button">Crear producto demo</button><button class="text-button" data-account-tab="profile" type="button">Volver al perfil</button></div><h3>Inventario y productos</h3><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Acción</th></tr></thead><tbody>' + allProducts().map(function (product) {
      return '<tr><td>' + esc(product.name) + '</td><td>' + money(product.price) + '</td><td>' + productStock(product) + '</td><td><button class="text-button" data-admin-stock="' + product.id + '" type="button">Editar stock</button> <button class="text-button" data-admin-delete="' + product.id + '" type="button">Eliminar</button></td></tr>';
    }).join('') + '</tbody></table></div><h3>Pedidos</h3><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead><tbody>' + (state.orders.length ? state.orders.map(function (order) {
      return '<tr><td>' + esc(order.id) + '</td><td>' + esc(order.email) + '</td><td>' + money(order.total) + '</td><td><button class="text-button" data-admin-order="' + esc(order.id) + '" type="button">' + esc(order.status) + '</button></td></tr>';
    }).join('') : '<tr><td colspan="4">Aún no hay pedidos demo.</td></tr>') + '</tbody></table></div>';
  }
  function renderAccount(tab) {
    tab = tab || 'profile';
    var user = state.user;
    var content;
    if (!user) {
      content = '<span class="eyebrow">Cuenta LUXORA</span><h2 id="accountTitle">Crea tu perfil o inicia sesión.</h2><p class="modal-intro">El flujo visual está listo para conectarse a autenticación segura. Esta demostración no guarda contraseñas ni procesa identidad real.</p><div class="modal-tabs"><button class="active" type="button">Acceso</button><button type="button">Registro</button></div><form class="form-grid" data-auth-form><label>Nombre<input name="name" autocomplete="name" required maxlength="70" placeholder="Tu nombre"></label><label>Correo electrónico<input name="email" type="email" autocomplete="email" required placeholder="tu@email.com"></label><label>Contraseña<input name="password" type="password" autocomplete="current-password" required minlength="8" placeholder="Mínimo 8 caracteres"></label><button class="btn btn-primary" type="submit">Continuar en modo demostración</button></form><p class="form-help">Para producción, conecta tu API con contraseñas hasheadas, JWT HttpOnly, CSRF, rate limiting y verificación de correo.</p>';
    } else if (tab === 'admin') {
      content = adminMarkup();
    } else {
      var tabs = '<div class="modal-tabs"><button class="' + (tab === 'profile' ? 'active' : '') + '" data-account-tab="profile" type="button">Perfil</button><button class="' + (tab === 'orders' ? 'active' : '') + '" data-account-tab="orders" type="button">Pedidos</button><button class="' + (tab === 'benefits' ? 'active' : '') + '" data-account-tab="benefits" type="button">Beneficios</button><button data-account-tab="admin" type="button">Panel demo</button></div>';
      if (tab === 'orders') {
        var orders = state.orders.filter(function (order) { return order.email === user.email; });
        content = '<span class="eyebrow">Tu cuenta</span><h2 id="accountTitle">Historial de pedidos</h2>' + tabs + '<div>' + (orders.length ? orders.map(orderCard).join('') : '<p class="form-help">Aún no hay pedidos registrados en este dispositivo.</p>') + '</div>';
      } else if (tab === 'benefits') {
        content = '<span class="eyebrow">Club LUXORA</span><h2 id="accountTitle">Beneficios y recompensas</h2>' + tabs + '<div class="account-stat-grid"><div><strong>' + (user.points || 0) + '</strong><span>Puntos disponibles</span></div><div><strong>' + (user.premium ? 'Activa' : 'Estándar') + '</strong><span>Membresía</span></div><div><strong>' + state.orders.filter(function (order) { return order.email === user.email; }).length + '</strong><span>Pedidos</span></div></div><p class="modal-intro">Tu enlace de referidos: <strong>luxora.example/r/' + esc(user.referral) + '</strong></p><button class="btn btn-secondary" data-premium-toggle type="button">' + (user.premium ? 'Gestionar membresía Premium' : 'Activar demostración Premium') + '</button><p class="form-help">Puntos, membresías y referidos deben validarse en el backend para evitar fraude.</p>';
      } else {
        content = '<span class="eyebrow">Tu cuenta</span><h2 id="accountTitle">Hola, ' + esc(user.name) + '.</h2>' + tabs + '<div class="account-profile"><div class="profile-card"><span class="avatar">' + esc(user.name.slice(0, 1).toUpperCase()) + '</span><div><strong>' + esc(user.name) + '</strong><span>' + esc(user.email) + ' · Cliente ' + (user.premium ? 'Premium' : 'LUXORA') + '</span></div></div><div class="account-stat-grid"><div><strong>' + state.wishlist.length + '</strong><span>Guardados</span></div><div><strong>' + (user.points || 0) + '</strong><span>Puntos</span></div><div><strong>' + state.orders.filter(function (order) { return order.email === user.email; }).length + '</strong><span>Pedidos</span></div></div><button class="btn btn-secondary" data-account-tab="orders" type="button">Ver pedidos y seguimiento</button><button class="text-button" data-sign-out type="button">Cerrar sesión de esta demostración</button></div>';
      }
    }
    id('accountModalContent').innerHTML = content;
    applyLanguage();
  }
  function openAccount(tab) {
    renderAccount(tab);
    activate(id('accountModal'));
  }

  function checkoutMarkup(calculated) {
    return '<div><span>Subtotal</span><strong>' + money(calculated.subtotal) + '</strong></div>' + (calculated.discount ? '<div><span>Descuento</span><strong>−' + money(calculated.discount) + '</strong></div>' : '') + '<div><span>Envío</span><strong>' + (calculated.shipping ? money(calculated.shipping) : 'Gratis') + '</strong></div><div><span>Impuestos estimados</span><strong>' + money(calculated.tax) + '</strong></div><div class="final"><span>Total</span><strong>' + money(calculated.total) + '</strong></div>';
  }
  function openCheckout() {
    if (!cartItems().length) {
      toast('Añade al menos un producto antes de finalizar la compra.');
      return;
    }
    var user = state.user || {};
    var selected = function (country) { return state.country === country ? 'selected' : ''; };
    id('checkoutModalContent').innerHTML = '<span class="eyebrow">Checkout protegido</span><h2 id="checkoutTitle">Finaliza tu selección.</h2><p class="modal-intro">Calculamos la estimación antes del pago. Ningún proveedor está conectado, por lo que este flujo crea únicamente un pedido de demostración local.</p><form class="form-grid" id="checkoutForm"><section class="checkout-section"><h3>Entrega</h3><div class="checkout-grid"><label>Nombre<input name="name" required autocomplete="name" value="' + esc(user.name || '') + '"></label><label>Correo<input name="email" type="email" required autocomplete="email" value="' + esc(user.email || '') + '"></label><label>País<select name="country" id="checkoutCountry"><option value="CR" ' + selected('CR') + '>Costa Rica</option><option value="US" ' + selected('US') + '>Estados Unidos</option><option value="ES" ' + selected('ES') + '>España</option><option value="MX" ' + selected('MX') + '>México</option><option value="CO" ' + selected('CO') + '>Colombia</option></select></label><label>Ciudad<input name="city" required autocomplete="address-level2"></label></div><label>Dirección<input name="address" required autocomplete="street-address"></label></section><section class="checkout-section"><h3>Método de pago</h3><div class="payment-options"><label class="payment-option"><input type="radio" name="payment" value="stripe" checked> Tarjeta / Stripe</label><label class="payment-option"><input type="radio" name="payment" value="paypal"> PayPal</label><label class="payment-option"><input type="radio" name="payment" value="apple"> Apple Pay</label><label class="payment-option"><input type="radio" name="payment" value="google"> Google Pay</label><label class="payment-option"><input type="radio" name="payment" value="mercadopago"> Mercado Pago</label><label class="payment-option"><input type="radio" name="payment" value="crypto"> Cripto (opcional)</label></div><p class="payment-note">Conecta claves y webhooks de cada proveedor desde el servidor. Esta pantalla no procesa tarjetas ni criptomonedas.</p></section><section class="checkout-section"><h3>Resumen</h3><div class="checkout-total" id="checkoutEstimate">' + checkoutMarkup(totals()) + '</div></section><button class="btn btn-primary btn-full" type="submit">Crear pedido de demostración</button></form>';
    applyLanguage();
    activate(id('checkoutModal'));
  }
  function decrementInventory(items) {
    items.forEach(function (item) {
      var product = productById(item.productId);
      if (!product) return;
      product.variants.forEach(function (group) {
        var key = stockKey(product, group, item.selection[group.name]);
        state.inventory[key] = Math.max(0, rawStock(product, group, item.selection[group.name]) - item.quantity);
      });
    });
  }
  function createOrder(form) {
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var items = cartItems().map(function (item) { return { productId: item.productId, selection: item.selection, quantity: item.quantity, unitPrice: item.product.price }; });
    var chosenCountry = String(data.get('country'));
    var calculated = totals(chosenCountry);
    var order = {
      id: 'LX-' + String(Date.now()).slice(-7), createdAt: new Date().toISOString(), name: String(data.get('name')).trim(),
      email: String(data.get('email')).trim().toLowerCase(), city: String(data.get('city')).trim(), address: String(data.get('address')).trim(),
      country: chosenCountry, payment: String(data.get('payment')), items: items, subtotal: calculated.subtotal, discount: calculated.discount,
      shipping: calculated.shipping, tax: calculated.tax, total: calculated.total, status: 'Pedido confirmado', progress: 1, demo: true
    };
    if (state.coupon) {
      state.couponUse[state.coupon] = (state.couponUse[state.coupon] || 0) + 1;
      state.couponUse[state.coupon + ':local'] = (state.couponUse[state.coupon + ':local'] || 0) + 1;
    }
    decrementInventory(items);
    state.orders.unshift(order);
    state.country = chosenCountry;
    state.cart = {};
    state.coupon = null;
    if (state.user && state.user.email === order.email) {
      state.user.points = (state.user.points || 0) + Math.floor(order.total);
      save('user', state.user);
    }
    save('orders', state.orders);
    save('country', state.country);
    rerenderCommerce();
    showOrder(order);
  }
  function showOrder(order) {
    window.setTimeout(applyLanguage, 0);
    id('checkoutModalContent').innerHTML = '<span class="eyebrow">Pedido de demostración</span><h2 id="checkoutTitle">Tu selección fue registrada.</h2><p class="modal-intro">Referencia <strong>' + esc(order.id) + '</strong>. No se realizó ningún cobro, email ni envío real porque los proveedores y el backend aún no están conectados.</p><div class="order-card"><div class="order-card__top"><strong>' + esc(order.id) + '</strong><span class="status-pill pending">' + esc(order.status) + '</span></div><p>Total estimado: <strong>' + money(order.total) + '</strong></p>' + timeline(order) + '</div><div class="admin-actions"><button class="btn btn-primary" data-print-invoice="' + esc(order.id) + '" type="button">Descargar factura PDF</button><button class="btn btn-secondary" data-whatsapp-order="' + esc(order.id) + '" type="button">Preparar WhatsApp</button><button class="btn btn-secondary" data-track-order="' + esc(order.id) + '" type="button">Seguimiento</button></div><p class="form-help">La factura se abre para imprimir y guardar como PDF. Para factura fiscal, correo y WhatsApp reales necesitas un servidor y sus credenciales.</p>';
  }
  function printInvoice(orderId) {
    var order = state.orders.find(function (item) { return item.id === orderId; });
    if (!order) return;
    var rows = order.items.map(function (item) {
      var product = productById(item.productId);
      return '<tr><td>' + esc(product ? product.name : 'Producto') + '</td><td>' + esc(Object.keys(item.selection).map(function (key) { return item.selection[key]; }).join(' · ')) + '</td><td>' + item.quantity + '</td><td>' + money(item.unitPrice * item.quantity) + '</td></tr>';
    }).join('');
    var printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      toast('El navegador bloqueó la impresión. Habilita ventanas emergentes e inténtalo de nuevo.');
      return;
    }
    printWindow.document.write('<!doctype html><html lang="es"><head><title>Factura ' + esc(order.id) + '</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:42px auto;color:#15203a}header{display:flex;justify-content:space-between;border-bottom:2px solid #466ff7;padding-bottom:20px}table{width:100%;border-collapse:collapse;margin:28px 0}th,td{padding:10px;border-bottom:1px solid #dce2ef;text-align:left}footer{margin-top:25px;padding-top:15px;border-top:1px solid #dce2ef}strong{font-size:1.1em}</style></head><body><header><div><h1>LUXORA</h1><p>Premium Tech Accessories</p></div><div><strong>Factura de demostración</strong><p>' + esc(order.id) + '<br>' + orderDate(order.createdAt) + '</p></div></header><p><strong>Cliente:</strong> ' + esc(order.name) + '<br>' + esc(order.email) + '<br>' + esc(order.address) + ', ' + esc(order.city) + '</p><table><thead><tr><th>Producto</th><th>Variante</th><th>Cant.</th><th>Total</th></tr></thead><tbody>' + rows + '</tbody></table><footer><p>Subtotal: ' + money(order.subtotal) + '<br>Envío: ' + money(order.shipping) + '<br>Impuestos: ' + money(order.tax) + '<br><strong>Total: ' + money(order.total) + '</strong></p><p>Documento de demostración; no es una factura fiscal.</p></footer></body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  function openInfo(kind, argument) {
    var title = {
      wishlist: 'Tu lista de deseos', tracking: 'Seguimiento de pedido', help: 'Centro de ayuda', contact: 'Contacto y ubicación',
      about: 'Sobre LUXORA', returns: 'Devoluciones y garantía', privacy: 'Política de privacidad', terms: 'Términos y condiciones',
      journal: 'LUXORA Journal', cookies: 'Preferencias de cookies'
    }[kind] || 'Información';
    var body = '';
    if (kind === 'wishlist') {
      body = wishlistMarkup();
    } else if (kind === 'tracking') {
      var order = argument ? state.orders.find(function (item) { return item.id === argument; }) : state.orders[0];
      body = order ? '<p class="modal-intro">Estado visible en modo demostración. En producción, conéctalo a eventos reales del transportista mediante webhooks o SSE.</p><article class="order-card"><div class="order-card__top"><strong>' + esc(order.id) + '</strong><span class="status-pill pending">' + esc(order.status) + '</span></div><p>Destino: ' + esc(order.city) + ', ' + delivery(order.country).name + '</p>' + timeline(order) + '</article><div class="admin-actions"><button class="btn btn-secondary" data-order-progress="' + esc(order.id) + '" type="button">Simular próxima actualización</button><button class="btn btn-secondary" data-print-invoice="' + esc(order.id) + '" type="button">Factura PDF</button></div>' : '<p class="modal-intro">Introduce tu referencia para consultar un pedido guardado en este dispositivo.</p><form class="form-grid" data-tracking-form><label>Referencia de pedido<input name="orderId" required placeholder="LX-1234567"></label><button class="btn btn-primary" type="submit">Consultar pedido</button><button class="btn btn-secondary" data-scan-qr type="button">Escanear código QR</button></form><p class="form-help">El escaneo usa la cámara o una imagen en navegadores que soportan BarcodeDetector y siempre debe ejecutarse en HTTPS.</p>';
    } else if (kind === 'help') {
      body = '<p class="modal-intro">Encuentra respuestas rápidas o conversa con el asistente de LUXORA.</p><div class="question-list"><article class="question"><strong>¿Cuándo llega mi pedido?</strong><p>La estimación aparece al elegir país en checkout; el seguimiento real se conecta con el transportista.</p></article><article class="question"><strong>¿Cómo devuelvo un producto?</strong><p>Dispones de 30 días desde la recepción para iniciar una solicitud.</p></article><article class="question"><strong>¿Qué pagos aceptan?</strong><p>La interfaz está preparada para Stripe, PayPal, Apple Pay, Google Pay y Mercado Pago; debes habilitarlos con credenciales seguras de servidor.</p></article></div>';
    } else if (kind === 'contact') {
      body = '<p class="modal-intro">Atención de lunes a viernes, 9:00-18:00 (Costa Rica).</p><div class="map-placeholder"><strong>LUXORA Studio</strong><p>San José, Costa Rica<br>Ubicación de demostración preparada para Google Maps u OpenStreetMap.</p><a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">Abrir mapa</a></div><form class="form-grid" data-contact-form><label>Tu correo<input name="email" type="email" required placeholder="tu@email.com"></label><label>Mensaje<textarea name="message" required maxlength="1000" placeholder="¿Cómo podemos ayudarte?"></textarea></label><button class="btn btn-primary" type="submit">Preparar solicitud</button></form>';
    } else if (kind === 'about') {
      body = '<div class="info-content"><p>LUXORA selecciona objetos tecnológicos que trabajan en silencio y se ven extraordinarios.</p><p>Esta base incorpora los puntos de contacto de una tienda premium y está lista para conectar el contenido, el equipo y las operaciones reales.</p></div>';
    } else if (kind === 'returns') {
      body = '<div class="info-content"><p><strong>Devoluciones:</strong> puedes solicitar una devolución dentro de los 30 días posteriores a la entrega, con el producto en condiciones adecuadas.</p><p><strong>Garantía:</strong> LUXORA ofrece 18 meses de cobertura limitada frente a defectos de fabricación.</p><p>Estas políticas son contenido de muestra y deben ser revisadas legalmente para tu país y operación.</p></div>';
    } else if (kind === 'privacy') {
      body = '<div class="info-content"><p>Esta demostración guarda en tu dispositivo el carrito, las preferencias, el perfil demo y los pedidos demo. No transmite datos a un servidor.</p><p>Antes de publicar, añade una política legal completa, base jurídica, consentimiento, retención y derechos aplicables.</p></div>';
    } else if (kind === 'terms') {
      body = '<div class="info-content"><p>Los precios, pedidos y funcionalidades de esta muestra no constituyen una oferta comercial real. Los términos definitivos deben establecer pagos, envíos, garantías, jurisdicción y resolución de disputas.</p></div>';
    } else if (kind === 'journal') {
      body = '<div class="info-content"><p>El Journal tiene su diseño listo para publicaciones. Conviene conectarlo a un CMS o generar páginas estáticas con autores, fechas, Open Graph y datos estructurados de Article.</p></div>';
    } else if (kind === 'cookies') {
      var cookie = state.cookies || { analytics: false, marketing: false };
      body = '<p class="modal-intro">El almacenamiento esencial mantiene tu carrito. Analytics, píxel y experimentos permanecen desactivados hasta que des consentimiento y configures sus identificadores.</p><form class="form-grid" data-cookie-form><label><input type="checkbox" checked disabled> Esenciales (siempre activas)</label><label><input name="analytics" type="checkbox" ' + (cookie.analytics ? 'checked' : '') + '> Medición anónima / Plausible o Google Analytics</label><label><input name="marketing" type="checkbox" ' + (cookie.marketing ? 'checked' : '') + '> Marketing / Meta Pixel</label><button class="btn btn-primary" type="submit">Guardar preferencias</button></form>';
    }
    id('infoModal').dataset.view = kind;
    id('infoModalContent').innerHTML = '<span class="eyebrow">LUXORA</span><h2 id="infoTitle">' + title + '</h2>' + body;
    activate(id('infoModal'));
  }

  function applyCoupon() {
    var code = id('couponInput').value.trim().toUpperCase();
    var message = id('couponMessage');
    var coupon = coupons[code];
    if (!code) {
      message.textContent = 'Escribe un cupón o gift card.';
      message.className = 'error';
      return;
    }
    if (!coupon) {
      message.textContent = 'No reconocemos ese código.';
      message.className = 'error';
      return;
    }
    if (coupon.customerLimit && (state.couponUse[code + ':local'] || 0) >= coupon.customerLimit) {
      message.textContent = 'Ya utilizaste este código en este dispositivo.';
      message.className = 'error';
      return;
    }
    if (cartSubtotal() < coupon.minimum) {
      message.textContent = 'Este código requiere un mínimo de ' + money(coupon.minimum) + '.';
      message.className = 'error';
      return;
    }
    if (coupon.premium && !(state.user && state.user.premium)) {
      message.textContent = 'Este beneficio es exclusivo de membresía Premium.';
      message.className = 'error';
      return;
    }
    state.coupon = code;
    save('coupon', state.coupon);
    message.textContent = coupon.label + ' aplicado.';
    message.className = 'success';
    id('couponInput').value = '';
    renderCart();
  }
  function processReview(form) {
    if (!form.reportValidity()) return;
    var productId = Number(form.dataset.reviewForm);
    var data = new FormData(form);
    var file = $('[name="photo"]', form).files[0];
    if (file && file.size > 300 * 1024) {
      toast('La foto debe pesar menos de 300 KB para guardarse en esta demo local.');
      return;
    }
    var review = { name: String(data.get('name')).trim(), rating: Number(data.get('rating')), text: String(data.get('text')).trim(), date: 'Ahora', photo: '' };
    var persist = function () {
      state.reviews[productId] = (state.reviews[productId] || []).concat(review);
      save('reviews', state.reviews);
      renderProductModal();
      toast('Tu reseña se añadió localmente y quedará pendiente de verificación en producción.');
    };
    if (file) {
      var reader = new FileReader();
      reader.onload = function () { review.photo = String(reader.result || ''); persist(); };
      reader.onerror = function () { toast('No se pudo leer la foto seleccionada.'); };
      reader.readAsDataURL(file);
      return;
    }
    persist();
  }
  function processQuestion(form) {
    if (!form.reportValidity()) return;
    var productId = Number(form.dataset.questionForm);
    var data = new FormData(form);
    state.questions[productId] = (state.questions[productId] || []).concat({ name: String(data.get('name')).trim(), text: String(data.get('text')).trim(), answer: '' });
    save('questions', state.questions);
    renderProductModal();
    toast('Tu pregunta fue enviada al equipo de demostración.');
  }
  function processRestock(form) {
    if (!form.reportValidity()) return;
    state.restock.push({ productId: Number(form.dataset.restockForm), email: String(new FormData(form).get('email')).trim().toLowerCase(), createdAt: new Date().toISOString() });
    save('restock', state.restock);
    form.reset();
    toast('Guardamos tu aviso de reposición en este dispositivo.');
  }
  function processAuth(form) {
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    state.user = { name: String(data.get('name')).trim(), email: String(data.get('email')).trim().toLowerCase(), points: 0, premium: false, referral: Math.random().toString(36).slice(2, 10).toUpperCase() };
    save('user', state.user);
    renderAccount();
    toast('Perfil demo creado. La contraseña no fue almacenada.');
  }
  function exportOrders() {
    var rows = [['ID', 'Fecha', 'Cliente', 'Correo', 'País', 'Total USD', 'Estado']].concat(state.orders.map(function (order) {
      return [order.id, order.createdAt, order.name, order.email, order.country, order.total.toFixed(2), order.status];
    }));
    var csv = rows.map(function (row) { return row.map(function (cell) { return '"' + String(cell).replace(/"/g, '""') + '"'; }).join(','); }).join('\n');
    var url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'luxora-pedidos-demo.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }
  function updateStock(productId) {
    var product = productById(productId);
    if (!product) return;
    var group = product.variants[0];
    var option = group.values[0];
    var requested = window.prompt('Stock para ' + product.name + ' · ' + group.name + ' · ' + option.value, rawStock(product, group, option.value));
    if (requested === null) return;
    var number = Math.max(0, Math.floor(Number(requested)));
    if (!Number.isFinite(number)) {
      toast('Introduce un número válido.');
      return;
    }
    state.inventory[stockKey(product, group, option.value)] = number;
    rerenderCommerce();
    renderAccount('admin');
    toast('Inventario demo actualizado.');
  }
  function addDemoProduct() {
    var name = window.prompt('Nombre del producto demo');
    if (!name || !name.trim()) return;
    var requested = Number(window.prompt('Precio en USD', '79'));
    if (!Number.isFinite(requested) || requested <= 0) {
      toast('El precio no es válido.');
      return;
    }
    var product = { id: Date.now(), slug: 'producto-demo-' + Date.now(), name: name.trim(), category: 'desk', tag: 'Demo', description: 'Producto creado localmente desde el panel de demostración.', price: requested, oldPrice: requested, rating: 4.5, reviews: 0, popularity: 1, isNew: true, images: ['1.jpg'], variants: [{ name: 'Opción', values: [{ value: 'Estándar', stock: 10 }] }] };
    state.customProducts.push(product);
    state.inventory[stockKey(product, product.variants[0], 'Estándar')] = 10;
    save('custom-products', state.customProducts);
    rerenderCommerce();
    renderAccount('admin');
    toast('Producto demo creado.');
  }
  function scanQR() {
    if (!('BarcodeDetector' in window)) {
      toast('El escáner QR necesita un navegador compatible con BarcodeDetector.');
      return;
    }
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      createImageBitmap(file).then(function (bitmap) {
        return new BarcodeDetector({ formats: ['qr_code'] }).detect(bitmap);
      }).then(function (codes) {
        var value = codes[0] && codes[0].rawValue;
        var order = state.orders.find(function (item) { return value && value.indexOf(item.id) !== -1; });
        if (order) openInfo('tracking', order.id);
        else toast('No encontramos un pedido para ese código.');
      }).catch(function () { toast('No fue posible leer ese código QR.'); });
    });
    input.click();
  }

  function toast(message) {
    var element = id('toast');
    element.textContent = localize(message);
    element.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(function () { element.classList.remove('show'); }, 3200);
  }
  function applyTheme() {
    document.body.classList.toggle('theme-dark', state.theme === 'dark');
    document.body.classList.toggle('theme-light', state.theme !== 'dark');
    id('themeToggle').setAttribute('aria-label', state.language === 'en' ? (state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : (state.theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'));
  }
  function setupSearch() {
    var input = id('searchInput');
    var box = document.createElement('div');
    box.className = 'search-suggestions';
    box.hidden = true;
    input.parentElement.appendChild(box);
    input.addEventListener('input', function () {
      state.filters.term = input.value;
      renderCatalog();
      var term = input.value.trim().toLowerCase();
      var found = term ? allProducts().filter(function (product) { return product.name.toLowerCase().indexOf(term) !== -1; }).slice(0, 4) : [];
      box.hidden = found.length === 0;
      box.innerHTML = found.map(function (product) { return '<button data-product-open="' + product.id + '" type="button">' + esc(product.name) + '<span>' + money(product.price) + '</span></button>'; }).join('');
    });
    input.addEventListener('blur', function () { window.setTimeout(function () { box.hidden = true; }, 140); });
  }
  function setupVoice() {
    id('voiceSearch').addEventListener('click', function () {
      var Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Speech) {
        toast('La búsqueda por voz no es compatible con este navegador.');
        return;
      }
      var recognition = new Speech();
      recognition.lang = state.language === 'en' ? 'en-US' : 'es-CR';
      recognition.onresult = function (event) {
        id('searchInput').value = event.results[0][0].transcript;
        id('searchInput').dispatchEvent(new Event('input'));
      };
      recognition.onerror = function () { toast('No pudimos reconocer la búsqueda por voz.'); };
      recognition.start();
      toast('Escuchando tu búsqueda…');
    });
  }
  function setupChat() {
    function open() {
      id('chatPanel').hidden = false;
      id('chatToggle').setAttribute('aria-expanded', 'true');
      id('chatInput').focus();
    }
    function close() {
      id('chatPanel').hidden = true;
      id('chatToggle').setAttribute('aria-expanded', 'false');
    }
    function answer(text) {
      var value = text.toLowerCase();
      var inEnglish = state.language === 'en';
      if (value.indexOf('env') !== -1 || value.indexOf('ship') !== -1 || value.indexOf('order') !== -1 || value.indexOf('pedido') !== -1) return inEnglish ? 'You can see the estimate at the end of checkout. Real tracking connects to the carrier.' : 'Puedes ver la estimación al final del checkout. El seguimiento real se conecta con el transportista.';
      if (value.indexOf('devol') !== -1 || value.indexOf('return') !== -1) return inEnglish ? 'You have 30 days to request a return. Open Returns & warranty to see the process.' : 'Tienes 30 días para solicitar devolución. Abre Devoluciones y garantía para ver el flujo.';
      if (value.indexOf('pago') !== -1 || value.indexOf('tarjeta') !== -1 || value.indexOf('pay') !== -1 || value.indexOf('card') !== -1) return inEnglish ? 'The interface supports Stripe, PayPal, Apple Pay, Google Pay and Mercado Pago once providers are connected.' : 'La interfaz admite Stripe, PayPal, Apple Pay, Google Pay y Mercado Pago cuando conectes los proveedores.';
      return inEnglish ? 'I can help with shipping, payments, returns and products. For complex cases, connect this chat to your team.' : 'Puedo orientarte sobre envíos, pagos, devoluciones y productos. Para casos complejos, conecta este chat con tu equipo.';
    }
    function send(text) {
      var message = text.trim();
      if (!message) return;
      var log = id('chatLog');
      log.insertAdjacentHTML('beforeend', '<p class="user">' + esc(message) + '</p><p>' + esc(answer(message)) + '</p>');
      log.scrollTop = log.scrollHeight;
    }
    id('chatToggle').addEventListener('click', open);
    id('chatClose').addEventListener('click', close);
    id('chatForm').addEventListener('submit', function (event) {
      event.preventDefault();
      send(id('chatInput').value);
      id('chatInput').value = '';
    });
    $$('.chat-suggestions button').forEach(function (button) { button.addEventListener('click', function () { send(button.dataset.chat); }); });
  }
  function setupCookies() {
    id('cookieBanner').hidden = Boolean(state.cookies);
    id('cookieAccept').addEventListener('click', function () {
      state.cookies = { essential: true, analytics: false, marketing: false };
      save('cookies', state.cookies);
      id('cookieBanner').hidden = true;
      toast('Guardamos tus preferencias de cookies.');
    });
    id('cookieCustomize').addEventListener('click', function () { openInfo('cookies'); });
    id('cookieSettings').addEventListener('click', function () { openInfo('cookies'); });
  }
  function setupPWA() {
    if ('serviceWorker' in navigator) window.addEventListener('load', function () { navigator.serviceWorker.register('service-worker.js').catch(function () {}); });
    id('notificationButton').addEventListener('click', function () {
      if (!('Notification' in window)) {
        toast('Las notificaciones no están disponibles en este navegador.');
        return;
      }
      Notification.requestPermission().then(function (permission) {
        toast(permission === 'granted' ? 'Notificaciones habilitadas. Necesitas un servidor push para enviar campañas reales.' : 'No activaste las notificaciones.');
      });
    });
  }
  function reveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (element) { element.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (element) { observer.observe(element); });
  }

  function clickHandler(event) {
    var target = event.target.closest('button, a');
    if (!target) return;
    if (target.matches('[data-close-modal], [data-close-cart], [data-close-mobile]')) closeAll();
    else if (target.id === 'cartToggle') openCart();
    else if (target.id === 'accountButton') openAccount();
    else if (target.id === 'wishlistButton') openInfo('wishlist');
    else if (target.id === 'compareButton') openCompare();
    else if (target.id === 'mobileToggle') openMobile();
    else if (target.id === 'themeToggle') {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      save('theme', state.theme);
      applyTheme();
    } else if (target.id === 'filterToggle') {
      var panel = id('advancedFilters');
      panel.hidden = !panel.hidden;
      target.setAttribute('aria-expanded', String(!panel.hidden));
    } else if (target.id === 'clearFilters' || target.id === 'emptyReset') {
      state.filters = { category: 'all', term: '', maxPrice: 250, rating: 0, inStock: false, lowStock: false, sort: 'featured' };
      id('searchInput').value = '';
      id('priceRange').value = '250';
      id('ratingFilter').value = '0';
      id('inStockFilter').checked = false;
      id('lowStockFilter').checked = false;
      id('sortSelect').value = 'featured';
      renderCatalog();
    } else if (target.matches('.tag-btn')) {
      state.filters.category = target.dataset.category;
      renderCatalog();
    } else if (target.matches('[data-product-open]')) openProduct(target.dataset.productOpen);
    else if (target.matches('[data-cart-add]')) addToCart(target.dataset.cartAdd);
    else if (target.matches('[data-product-cart-add]')) addToCart(target.dataset.productCartAdd, state.productView.selection);
    else if (target.matches('[data-cart-change]')) changeCart(target.dataset.cartKey, Number(target.dataset.cartChange));
    else if (target.matches('[data-cart-remove]')) {
      delete state.cart[target.dataset.cartRemove];
      rerenderCommerce();
      toast('Producto eliminado del carrito.');
    } else if (target.matches('[data-wishlist-toggle]')) toggleWishlist(target.dataset.wishlistToggle);
    else if (target.matches('[data-compare-toggle]')) toggleCompare(target.dataset.compareToggle);
    else if (target.matches('[data-gallery-index]')) {
      state.productView.image = Number(target.dataset.galleryIndex);
      state.productView.media = 'image';
      renderProductModal();
    } else if (target.matches('[data-product-media]')) {
      state.productView.media = target.dataset.productMedia;
      renderProductModal();
    } else if (target.matches('[data-variant-group]')) {
      state.productView.selection[target.dataset.variantGroup] = target.dataset.variantValue;
      renderProductModal();
    } else if (target.matches('[data-share-product]')) {
      var product = productById(target.dataset.shareProduct);
      var url = location.href.split('#')[0] + '#product=' + product.slug;
      if (navigator.share) navigator.share({ title: product.name, text: product.description, url: url }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast('Enlace copiado al portapapeles.'); });
      else toast('Copia este enlace: ' + url);
    } else if (target.matches('[data-scroll-reviews]')) id('reviews').scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (target.id === 'couponApply') applyCoupon();
    else if (target.id === 'checkoutButton') openCheckout();
    else if (target.matches('[data-open-info]')) openInfo(target.dataset.openInfo);
    else if (target.matches('[data-account-tab]')) renderAccount(target.dataset.accountTab);
    else if (target.matches('[data-sign-out]')) {
      state.user = null;
      save('user', null);
      renderAccount();
      toast('Sesión de demostración cerrada.');
    } else if (target.matches('[data-premium-toggle]')) {
      state.user.premium = !state.user.premium;
      save('user', state.user);
      renderAccount('benefits');
      toast(state.user.premium ? 'Membresía Premium demo activada.' : 'Membresía Premium demo desactivada.');
    } else if (target.matches('[data-track-order]')) openInfo('tracking', target.dataset.trackOrder);
    else if (target.matches('[data-order-progress]')) {
      var tracked = state.orders.find(function (order) { return order.id === target.dataset.orderProgress; });
      if (tracked) {
        tracked.progress = Math.min(3, tracked.progress + 1);
        tracked.status = ['Pedido confirmado', 'Preparando tu selección', 'En tránsito', 'Entregado'][tracked.progress];
        save('orders', state.orders);
        openInfo('tracking', tracked.id);
        toast('Estado demo actualizado.');
      }
    } else if (target.matches('[data-print-invoice]')) printInvoice(target.dataset.printInvoice);
    else if (target.matches('[data-whatsapp-order]')) {
      var whatOrder = state.orders.find(function (order) { return order.id === target.dataset.whatsappOrder; });
      if (whatOrder) window.open('https://wa.me/?text=' + encodeURIComponent('Hola, quisiera confirmar mi pedido LUXORA ' + whatOrder.id + '. Total estimado: ' + money(whatOrder.total) + '.'), '_blank', 'noopener,noreferrer');
    } else if (target.matches('[data-scan-qr]')) scanQR();
    else if (target.matches('[data-export-orders]')) exportOrders();
    else if (target.matches('[data-admin-add]')) addDemoProduct();
    else if (target.matches('[data-admin-stock]')) updateStock(Number(target.dataset.adminStock));
    else if (target.matches('[data-admin-delete]')) {
      var removedId = Number(target.dataset.adminDelete);
      if (window.confirm('¿Eliminar este producto de la demostración?')) {
        state.hiddenProducts.push(removedId);
        save('hidden-products', state.hiddenProducts);
        rerenderCommerce();
        renderAccount('admin');
        toast('Producto ocultado del catálogo demo.');
      }
    } else if (target.matches('[data-admin-order]')) openInfo('tracking', target.dataset.adminOrder);
    else if (target.id === 'heroDemo' || target.id === 'heroPreview') {
      openProduct(2);
      state.productView.media = '360';
      renderProductModal();
    }
  }
  function submitHandler(event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.matches('[data-auth-form]')) {
      event.preventDefault();
      processAuth(form);
    } else if (form.matches('[data-review-form]')) {
      event.preventDefault();
      processReview(form);
    } else if (form.matches('[data-question-form]')) {
      event.preventDefault();
      processQuestion(form);
    } else if (form.matches('[data-restock-form]')) {
      event.preventDefault();
      processRestock(form);
    } else if (form.id === 'checkoutForm') {
      event.preventDefault();
      createOrder(form);
    } else if (form.matches('[data-tracking-form]')) {
      event.preventDefault();
      var lookup = String(new FormData(form).get('orderId')).trim().toUpperCase();
      var order = state.orders.find(function (item) { return item.id === lookup; });
      if (order) openInfo('tracking', order.id);
      else toast('No encontramos esa referencia en este dispositivo.');
    } else if (form.matches('[data-contact-form]')) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      toast('Solicitud preparada. Conecta un backend o CRM para enviarla.');
      form.reset();
    } else if (form.matches('[data-cookie-form]')) {
      event.preventDefault();
      var data = new FormData(form);
      state.cookies = { essential: true, analytics: Boolean(data.get('analytics')), marketing: Boolean(data.get('marketing')) };
      save('cookies', state.cookies);
      id('cookieBanner').hidden = true;
      closeAll();
      toast('Preferencias de privacidad guardadas.');
    } else if (form.id === 'newsletterForm') {
      event.preventDefault();
      if (!form.reportValidity()) return;
      toast('Suscripción preparada localmente. Conecta tu proveedor de email para confirmarla.');
      form.reset();
    }
  }
  function changeHandler(event) {
    var target = event.target;
    if (target.id === 'priceRange') {
      state.filters.maxPrice = Number(target.value);
      renderCatalog();
    } else if (target.id === 'ratingFilter') {
      state.filters.rating = Number(target.value);
      renderCatalog();
    } else if (target.id === 'inStockFilter') {
      state.filters.inStock = target.checked;
      renderCatalog();
    } else if (target.id === 'lowStockFilter') {
      state.filters.lowStock = target.checked;
      renderCatalog();
    } else if (target.id === 'sortSelect') {
      state.filters.sort = target.value;
      renderCatalog();
    } else if (target.id === 'currencySelect') {
      state.currency = target.value;
      save('currency', state.currency);
      renderCatalog();
      renderRails();
      renderCart();
      if (!id('productModal').hidden) renderProductModal();
      toast('Moneda actualizada.');
    } else if (target.id === 'checkoutCountry') {
      state.country = target.value;
      id('checkoutEstimate').innerHTML = checkoutMarkup(totals(state.country));
      applyLanguage();
    }
  }
  function setupEvents() {
    document.addEventListener('click', clickHandler);
    document.addEventListener('submit', submitHandler);
    document.addEventListener('change', changeHandler);
    id('couponInput').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        applyCoupon();
      }
    });
    id('overlay').addEventListener('click', function () { closeAll(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeAll(); });
    window.addEventListener('scroll', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      id('readingProgress').style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
      id('navbar').classList.toggle('scrolled', window.scrollY > 18);
    }, { passive: true });
  }
  function init() {
    id('currencySelect').value = state.currency;
    applyTheme();
    renderCatalog();
    renderRails();
    renderCart();
    applyLanguage();
    setupSearch();
    setupVoice();
    setupChat();
    setupCookies();
    setupPWA();
    setupEvents();
    reveal();
    var params = new URLSearchParams(location.hash.slice(1));
    var slug = params.get('product');
    var initial = allProducts().find(function (product) { return product.slug === slug; });
    if (initial) openProduct(initial.id);
  }
  init();
})();
