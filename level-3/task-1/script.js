/* Level 3 · Task 1 — optional keyboard support for the CSS-only lightbox.
   Opening, closing and moving between images already works without this file. */
(function () {
  "use strict";

  function openLightbox() {
    var hash = window.location.hash;
    return hash.indexOf("#view-") === 0 ? document.querySelector(hash) : null;
  }

  function sync() {
    document.documentElement.classList.toggle("has-lightbox", Boolean(openLightbox()));
  }

  window.addEventListener("hashchange", sync);
  sync();

  document.addEventListener("keydown", function (event) {
    var box = openLightbox();
    if (!box) return;

    var target = null;
    if (event.key === "Escape") target = box.querySelector(".lightbox__close");
    if (event.key === "ArrowRight") target = box.querySelector(".lightbox__next");
    if (event.key === "ArrowLeft") target = box.querySelector(".lightbox__prev");

    if (target) {
      event.preventDefault();
      // location.replace updates :target without adding a history entry per image
      window.location.replace(target.href);
    }
  });
})();
