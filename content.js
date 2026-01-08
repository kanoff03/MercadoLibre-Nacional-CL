console.log("ML sin internacionales: script cargado");

function ocultarInternacionales() {
  chrome.storage.sync.get(["enabled"], result => {
    if (result.enabled === false) return;

    const items = document.querySelectorAll("li.ui-search-layout__item");

    items.forEach(item => {
      const esInternacional = item.querySelector(
        'span.andes-visually-hidden'
      )?.innerText?.toLowerCase().includes("internacional");

      const envioDesde = item.querySelector(
        '.poly-component__shipped-from'
      )?.innerText?.toLowerCase();

      if (
        esInternacional ||
        (envioDesde && envioDesde.includes("envío desde"))
      ) {
        item.style.display = "none";
      }
    });
  });
}

// ejecuciones múltiples
[500, 1500, 3000].forEach(t => setTimeout(ocultarInternacionales, t));

// scroll infinito
const observer = new MutationObserver(ocultarInternacionales);
observer.observe(document.body, { childList: true, subtree: true });
