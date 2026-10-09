/* Level 3 · Task 2 — header behaviour and application form */
(function () {
  "use strict";

  /* ---------- Header: border on scroll + mobile menu ---------- */
  var header = document.querySelector(".lp-header");
  var toggle = document.querySelector(".lp-toggle");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  header.querySelectorAll(".lp-nav a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  /* ---------- Application form ---------- */
  var form = document.getElementById("apply-form");
  var success = form.querySelector(".apply__success");
  var successText = document.getElementById("apply-success-text");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    name: function (v) { return v.length >= 2; },
    email: function (v) { return emailPattern.test(v); },
    college: function (v) { return v.length >= 2; },
    level: function (v) { return v !== ""; },
    link: function (v) { return v === "" || /^https?:\/\/\S+\.\S+/.test(v); }
  };

  function validate(input) {
    var valid = rules[input.name](input.value.trim());
    input.closest(".field").classList.toggle("is-invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    return valid;
  }

  Object.keys(rules).forEach(function (name) {
    var input = form.elements[name];
    var eventName = input.tagName === "SELECT" ? "change" : "blur";
    input.addEventListener(eventName, function () {
      if (input.value || input.closest(".field").classList.contains("is-invalid")) validate(input);
    });
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("is-invalid")) validate(input);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var firstName = form.elements.name.value.trim().split(/\s+/)[0];
    successText.textContent = "Thank you, " + firstName + ". We will email you at " +
      form.elements.email.value.trim() + " about the next batch.";
    success.hidden = false;
    document.getElementById("apply-again").focus();
  });

  document.getElementById("apply-again").addEventListener("click", function () {
    form.reset();
    success.hidden = true;
    form.elements.name.focus();
  });
})();
