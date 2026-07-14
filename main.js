/* Rajveer Bishnoi — portfolio interactions */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var THEME_KEY = "rb-theme";
  function prefersDark() { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; }
  function applyTheme(t) { root.setAttribute("data-theme", t); try { localStorage.setItem(THEME_KEY, t); } catch (e) {} }
  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(saved || (prefersDark() ? "dark" : "light"));
  var toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mobileMenu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 12); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- Active section in nav ---------- */
  var navLinks = [].slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute("id");
          navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Command palette (⌘K) ---------- */
  var ITEMS = [
    { label: "Experience", hint: "section", href: "#experience" },
    { label: "Projects", hint: "section", href: "#projects" },
    { label: "Open-Source Contributions", hint: "section", href: "#open-source" },
    { label: "About", hint: "section", href: "#about" },
    { label: "Skills", hint: "section", href: "#skills" },
    { label: "Honors & Education", hint: "section", href: "#journey" },
    { label: "Contact", hint: "section", href: "#contact" },
    { label: "Download résumé", hint: "PDF", href: "assets/Rajveer_Bishnoi_Resume.pdf", ext: true },
    { label: "GitHub — @RAJVEER42", hint: "external", href: "https://github.com/RAJVEER42", ext: true },
    { label: "GitHub — @Valyrian-Code", hint: "open source", href: "https://github.com/Valyrian-Code", ext: true },
    { label: "LinkedIn", hint: "external", href: "https://www.linkedin.com/in/rajveer-bishnoi-576b62356", ext: true },
    { label: "Email me", hint: "mailto", href: "mailto:irajveer.bishnoi2310@gmail.com", ext: true }
  ];
  var cmdk = document.getElementById("cmdk");
  var cmdkInput = document.getElementById("cmdk-input");
  var cmdkList = document.getElementById("cmdk-list");
  var searchBtn = document.getElementById("search-btn");
  var filtered = ITEMS.slice();
  var active = 0;

  function render() {
    cmdkList.innerHTML = "";
    if (!filtered.length) {
      var empty = document.createElement("li");
      empty.className = "cmdk-empty";
      empty.textContent = "No matches";
      cmdkList.appendChild(empty);
      return;
    }
    filtered.forEach(function (it, i) {
      var li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", i === active ? "true" : "false");
      var l = document.createElement("span"); l.textContent = it.label;
      var h = document.createElement("span"); h.className = "hint"; h.textContent = it.hint;
      li.appendChild(l); li.appendChild(h);
      li.addEventListener("click", function () { go(it); });
      li.addEventListener("mousemove", function () { if (active !== i) { active = i; paint(); } });
      cmdkList.appendChild(li);
    });
  }
  function paint() {
    [].slice.call(cmdkList.children).forEach(function (li, i) {
      if (li.setAttribute) li.setAttribute("aria-selected", i === active ? "true" : "false");
    });
    var sel = cmdkList.children[active];
    if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: "nearest" });
  }
  function openCmdk() {
    filtered = ITEMS.slice(); active = 0; render();
    cmdk.hidden = false; cmdkInput.value = "";
    setTimeout(function () { cmdkInput.focus(); }, 20);
  }
  function closeCmdk() { cmdk.hidden = true; }
  function go(it) {
    closeCmdk();
    if (it.ext) { window.open(it.href, "_blank", "noopener"); return; }
    var el = document.querySelector(it.href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (history.replaceState) history.replaceState(null, "", it.href);
  }
  function filter() {
    var q = cmdkInput.value.trim().toLowerCase();
    filtered = ITEMS.filter(function (it) { return !q || it.label.toLowerCase().indexOf(q) !== -1 || it.hint.toLowerCase().indexOf(q) !== -1; });
    active = 0; render();
  }
  if (cmdk && cmdkInput && cmdkList) {
    if (searchBtn) searchBtn.addEventListener("click", openCmdk);
    cmdkInput.addEventListener("input", filter);
    cmdk.querySelectorAll("[data-close]").forEach(function (el) { el.addEventListener("click", closeCmdk); });
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); cmdk.hidden ? openCmdk() : closeCmdk(); return; }
      if (cmdk.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); closeCmdk(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); if (filtered.length) { active = (active + 1) % filtered.length; paint(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (filtered.length) { active = (active - 1 + filtered.length) % filtered.length; paint(); } }
      else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) go(filtered[active]); }
    });
  }

  /* ---------- Custom cursor (fine pointers only) ---------- */
  var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fine && !reduce) {
    var dot = document.createElement("div"); dot.className = "cursor-dot";
    var ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    root.classList.add("cursor-enabled");
    var mx = 0, my = 0, rx = 0, ry = 0, ready = false;
    function place(el, x, y) { el.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)"; }
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY; place(dot, mx, my);
      if (!ready) { ready = true; rx = mx; ry = my; root.classList.add("cursor-ready"); }
    }, { passive: true });
    (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; place(ring, rx, ry); requestAnimationFrame(loop); })();
    var interactive = "a, button, input, .proj, .oss, .skill-card, .jcard, .now-card, .cmdk-list li";
    document.addEventListener("mouseover", function (e) { if (e.target.closest && e.target.closest(interactive)) ring.classList.add("is-hover"); });
    document.addEventListener("mouseout", function (e) { if (e.target.closest && e.target.closest(interactive)) ring.classList.remove("is-hover"); });
    document.addEventListener("mousedown", function () { ring.classList.add("is-down"); });
    document.addEventListener("mouseup", function () { ring.classList.remove("is-down"); });
    document.addEventListener("mouseleave", function () { root.classList.remove("cursor-ready"); });
    document.addEventListener("mouseenter", function () { if (ready) root.classList.add("cursor-ready"); });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
