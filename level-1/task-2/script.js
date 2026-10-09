/* Level 1 · Task 2 — colour button, greeting alert and addition calculator */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     1. Colour button: cycles through a palette on every click
     --------------------------------------------------------------- */
  var palette = [
    { name: "Blue", hex: "#0071E3" },
    { name: "Purple", hex: "#8944AB" },
    { name: "Pink", hex: "#E3456B" },
    { name: "Orange", hex: "#F56300" },
    { name: "Green", hex: "#1D8A3A" },
    { name: "Graphite", hex: "#1D1D1F" }
  ];

  var colourDemo = document.getElementById("colour-demo");
  var colourBtn = document.getElementById("colour-btn");
  var colourName = document.getElementById("colour-name");
  var colourHex = document.getElementById("colour-hex");
  var swatches = document.getElementById("swatches");
  var current = 0;

  palette.forEach(function (colour, index) {
    var item = document.createElement("li");
    item.style.setProperty("--swatch", colour.hex);
    item.title = colour.name;
    item.dataset.index = index;
    swatches.appendChild(item);
  });

  function applyColour(index) {
    var colour = palette[index];
    colourDemo.style.setProperty("--btn-colour", colour.hex);
    colourName.textContent = colour.name;
    colourHex.textContent = colour.hex;
    swatches.querySelectorAll("li").forEach(function (item) {
      item.classList.toggle("is-active", Number(item.dataset.index) === index);
    });
  }

  colourBtn.addEventListener("click", function () {
    current = (current + 1) % palette.length;
    applyColour(current);
    colourBtn.classList.remove("is-pressed");
    void colourBtn.offsetWidth; // restart the press animation
    colourBtn.classList.add("is-pressed");
  });

  applyColour(current);

  /* ---------------------------------------------------------------
     2. Greeting alert based on the system time
     --------------------------------------------------------------- */
  function getGreeting(hour) {
    if (hour >= 5 && hour < 12) {
      return { title: "Good Morning", icon: "morning" };
    } else if (hour >= 12 && hour < 17) {
      return { title: "Good Afternoon", icon: "afternoon" };
    }
    return { title: "Good Evening", icon: "evening" };
  }

  var icons = {
    morning: '<svg viewBox="0 0 24 24"><path d="M12 3v2M5.6 7.6L4.2 6.2M18.4 7.6l1.4-1.4M3 15h2M19 15h2M7 15a5 5 0 0110 0"/><path d="M3 19h18"/></svg>',
    afternoon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    evening: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/></svg>'
  };

  var dialog = document.getElementById("greeting-dialog");
  var alertTitle = document.getElementById("alert-title");
  var alertText = document.getElementById("alert-text");
  var alertIcon = document.getElementById("alert-icon");
  var clockTime = document.getElementById("clock-time");
  var clockDate = document.getElementById("clock-date");

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function showGreeting(hour, isPreview) {
    var greeting = getGreeting(hour);
    alertTitle.textContent = greeting.title;
    alertIcon.innerHTML = icons[greeting.icon];
    alertIcon.dataset.time = greeting.icon;
    alertText.textContent = isPreview
      ? "This is the greeting a visitor would see at " + hour + ":00."
      : "It is " + formatTime(new Date()) + " on your device. Have a great day ahead!";

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      window.alert(greeting.title + "! " + alertText.textContent);
    }
  }

  // Close the dialog when the backdrop is clicked
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  function tick() {
    var now = new Date();
    clockTime.textContent = formatTime(now);
    clockDate.textContent = now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });
  }

  tick();
  setInterval(tick, 1000);

  document.getElementById("greet-btn").addEventListener("click", function () {
    showGreeting(new Date().getHours(), false);
  });

  var hourRange = document.getElementById("hour-range");
  var hourLabel = document.getElementById("hour-label");

  hourRange.addEventListener("input", function () {
    hourLabel.textContent = hourRange.value + ":00";
  });

  document.getElementById("preview-btn").addEventListener("click", function () {
    showGreeting(Number(hourRange.value), true);
  });

  /* ---------------------------------------------------------------
     3. Calculator: adds two numbers with validation
     --------------------------------------------------------------- */
  var calc = document.getElementById("calc");
  var inputA = document.getElementById("num-a");
  var inputB = document.getElementById("num-b");
  var result = document.getElementById("calc-result");
  var numberPattern = /^[-+]?(\d+\.?\d*|\.\d+)$/;
  var LIMIT = 1e15;

  // Returns { value } for a valid number, { error } otherwise, or {} when empty
  function readNumber(input) {
    var raw = input.value.trim();
    if (raw === "") return {};
    if (!numberPattern.test(raw)) return { error: "Please enter a valid number." };
    var value = parseFloat(raw);
    if (Math.abs(value) >= LIMIT) return { error: "Please enter a number smaller than 1,000,000,000,000,000." };
    return { value: value };
  }

  function setError(input, message) {
    var error = document.getElementById(input.id + "-error");
    error.textContent = message || "";
    input.closest(".calc__field").classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
  }

  function update(showEmptyErrors) {
    var a = readNumber(inputA);
    var b = readNumber(inputB);

    setError(inputA, a.error || (showEmptyErrors && !("value" in a) ? "This field is required." : ""));
    setError(inputB, b.error || (showEmptyErrors && !("value" in b) ? "This field is required." : ""));

    if ("value" in a && "value" in b) {
      // Round away floating-point noise such as 0.1 + 0.2 = 0.30000000000000004
      var sum = Math.round((a.value + b.value) * 1e10) / 1e10;
      result.textContent = sum.toLocaleString("en-IN", { maximumFractionDigits: 10 });
      result.classList.remove("is-muted");
      result.classList.remove("is-pop");
      void result.offsetWidth;
      result.classList.add("is-pop");
    } else {
      result.textContent = a.error || b.error ? "—" : "0";
      result.classList.add("is-muted");
    }
  }

  inputA.addEventListener("input", function () { update(false); });
  inputB.addEventListener("input", function () { update(false); });

  calc.addEventListener("submit", function (event) {
    event.preventDefault();
    update(true);
    var firstInvalid = calc.querySelector(".is-invalid input");
    if (firstInvalid) firstInvalid.focus();
  });

  calc.addEventListener("reset", function () {
    setTimeout(function () {
      update(false);
      inputA.focus();
    });
  });

  update(false);
})();
