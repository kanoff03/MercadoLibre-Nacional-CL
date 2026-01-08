const toggle = document.getElementById("toggle");

// cargar estado guardado
chrome.storage.sync.get(["enabled"], result => {
  toggle.checked = result.enabled !== false;
});

// guardar cambios
toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

function actualizarIcono(enabled) {
  const icon = enabled ? "icons/icon48.png" : "icons/icon48-off.png";
  chrome.action.setIcon({ path: icon });
}

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
  actualizarIcono(toggle.checked);
});