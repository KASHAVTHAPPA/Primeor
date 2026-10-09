/* Level 1 · Task 1 — light validation for the contact form (no data leaves the page) */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  var status = form.querySelector(".form__status");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function check(input) {
    var value = input.value.trim();
    var valid = input.type === "email" ? emailPattern.test(value) : value.length >= 2;
    var field = input.closest(".field");
    field.classList.toggle("is-invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    input.setAttribute("aria-describedby", input.id + "-error");
    return valid;
  }

  var required = [form.elements.name, form.elements.email];

  required.forEach(function (input) {
    input.addEventListener("blur", function () {
      if (input.value) check(input);
    });
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("is-invalid")) check(input);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var results = required.map(check);
    var firstInvalid = required[results.indexOf(false)];

    if (firstInvalid) {
      status.textContent = "";
      firstInvalid.focus();
      return;
    }

    var name = form.elements.name.value.trim().split(" ")[0];
    status.textContent = "Thanks, " + name + "! Your message has been noted.";
    form.reset();
  });
})();
