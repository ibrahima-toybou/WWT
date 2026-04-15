/* ═══════════════════════════════════════════════════════════════════ */
/* CURSEUR PERSONNALISÉ - Suivre le mouvement de la souris            */
/* ═══════════════════════════════════════════════════════════════════ */

// Récupérer les éléments du curseur dans le DOM
const cur = document.getElementById("cursor");
const ring = document.getElementById("ring");

// Vérifier que les éléments existent avant de continuer
if (cur && ring) {
  // Variables pour stocker la position du curseur et l'anneau
  let mx = 0, // Position X de la souris
    my = 0, // Position Y de la souris
    rx = 0, // Position X de l'anneau (avec easing)
    ry = 0; // Position Y de l'anneau (avec easing)

  // Écouter les mouvements de la souris
  document.addEventListener("mousemove", (e) => {
    // Mettre à jour la position de la souris
    mx = e.clientX;
    my = e.clientY;
    // Positionner le point du curseur exactement à la souris
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });

  // Animation en boucle pour créer un effet de "traîne" avec l'anneau
  (function anim() {
    // Appliquer une interpolation progressive (easing) à la position de l'anneau
    // Cela crée un effet de suivi lisse plutôt que de suivre exactement
    rx += (mx - rx) * 0.1; // 10% du chemin restant chaque frame
    ry += (my - ry) * 0.1;
    // Positionner l'anneau à la position interpolée
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    // Continuer l'animation (60 fps)
    requestAnimationFrame(anim);
  })();

  // Ajouter les événements de survol pour agrandir le curseur au-dessus des éléments interactifs
  document
    .querySelectorAll("a,button,.act-card,.srv-card,.plat-card")
    .forEach((el) => {
      // Quand la souris entre sur un élément interactif
      el.addEventListener("mouseenter", () => {
        // Agrandir le point du curseur
        cur.style.width = "18px";
        cur.style.height = "18px";
        // Agrandir l'anneau du curseur
        ring.style.width = "56px";
        ring.style.height = "56px";
      });
      // Quand la souris quitte un élément interactif
      el.addEventListener("mouseleave", () => {
        // Restaurer la taille normale du curseur
        cur.style.width = "10px";
        cur.style.height = "10px";
        // Restaurer la taille normale de l'anneau
        ring.style.width = "36px";
        ring.style.height = "36px";
      });
    });
}

/* ═══════════════════════════════════════════════════════════════════ */
/* RÉVÉLATION AU DÉFILEMENT - Animer les sections en montant           */
/* ═══════════════════════════════════════════════════════════════════ */

// Créer un observateur pour détecter quand les éléments entrent dans la vue
const io = new IntersectionObserver(
  (entries) => {
    // Parcourir tous les éléments observés
    entries.forEach((e) => {
      // Si l'élément devient visible (intersecte avec la vue)
      if (e.isIntersecting) {
        // Ajouter la classe "on" pour déclencher l'animation CSS
        e.target.classList.add("on");
      }
    });
  },
  { threshold: 0.07 }, // L'élément doit être au moins à 7% visible
);

// Observer tous les éléments avec la classe "reveal"
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
// ── GALERIE FILTRES ──
const filterBtns = /** @type {NodeListOf<HTMLElement>} */ (
  document.querySelectorAll(".filter-btn")
);
const galleryItems = /** @type {NodeListOf<HTMLElement>} */ (
  document.querySelectorAll(".gallery-item")
);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    galleryItems.forEach((item) => {
      const category = item.dataset.category;
      const match = filter === "all" || category === filter;

      if (match) {
        item.classList.remove("gone");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.remove("hidden");
          });
        });
      } else {
        item.classList.add("hidden");
        item.addEventListener(
          "transitionend",
          () => {
            if (item.classList.contains("hidden")) {
              item.classList.add("gone");
            }
          },
          { once: true },
        );
      }
    });
  });
});
