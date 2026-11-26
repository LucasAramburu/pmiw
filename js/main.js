// Pétalos de sakura cayendo (decoración interactiva)
// Marca como activo el botón de la página actual
(function () {
  const actual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-botones .btn-marco").forEach((a) => {
    if (a.getAttribute("href") === actual) a.classList.add("activo");
  });
})();

// Pétalos de sakura cayendo (decoración)
(function () {


  const CANTIDAD = window.innerWidth < 992 ? 10 : 22;

  for (let i = 0; i < CANTIDAD; i++) {
    const p = document.createElement("div");
    const tam = 10 + Math.random() * 14;
    p.className = "petalo";
    p.style.left = Math.random() * 100 + "vw";
    p.style.width = tam + "px";
    p.style.height = tam * 0.75 + "px";
    p.style.animationDuration = 9 + Math.random() * 10 + "s";
    p.style.animationDelay = -Math.random() * 15 + "s";
    document.body.appendChild(p);
  }
})();
// Música de fondo: arranca con el primer click, excepto al ir a jugar
const musicaFondo = new Audio("MusicaFondo.mp3");
musicaFondo.volume = 0.1;
musicaFondo.loop = true;

const enPaginaJugar = window.location.pathname.includes("jugar");

document.addEventListener("click", (evento) => {
  // ¿El click fue en un enlace hacia jugar.html? ("Jugar" o "Jugar ahora")
  if (evento.target.closest('a[href*="jugar.html"]')) {
    musicaFondo.pause();
    musicaFondo.currentTime = 0;
    return;
  }

  // En la página del juego no suena la música de fondo
  if (!enPaginaJugar && musicaFondo.paused) {
    musicaFondo.play().catch(error => console.error("No se pudo reproducir la música:", error));
  }
});