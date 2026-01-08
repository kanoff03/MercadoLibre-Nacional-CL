console.log("ML sin internacionales: script cargado");

// ===============================
// MercadoLibre – Filtro Internacional
// content.js
// ===============================

// Inyectar CSS persistente
(function injectCSS() {
  const style = document.createElement("style");
  style.id = "ml-internacional-style";
  style.textContent = `
    [data-ml-internacional="true"] {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
})();

// Detectar si un producto es internacional
function esProductoInternacional(card) {
  // Texto "Internacional" (visible u oculto)
  const texto = card.textContent?.toLowerCase() || "";
  if (texto.includes("internacional")) return true;

  // Ícono CBT (muy común en Home)
  if (card.querySelector(".poly-component__cbt")) return true;

  // Envío desde China
  const envioDesde = card.querySelector(".poly-component__shipped-from")
    ?.textContent?.toLowerCase();
  if (envioDesde?.includes("china")) return true;

  return false;
}

// Marcar y ocultar productos internacionales
function filtrarInternacionales() {
  const cards = document.querySelectorAll(".poly-card");

  cards.forEach(card => {
    if (!esProductoInternacional(card)) return;

    const contenedor =
      card.closest("li.ui-search-layout__item") ||
      card.closest(".andes-carousel-snapped__slide") ||
      card.closest("[data-slider]") ||
      card;

    contenedor.setAttribute("data-ml-internacional", "true");
  });
}

// Observador de cambios del DOM (scroll infinito, React)
const observer = new MutationObserver(() => {
  filtrarInternacionales();
});

// Activar observador
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Ejecución inicial
filtrarInternacionales();