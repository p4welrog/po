(function () {
  "use strict";

  const LESSONS = window.LESSONS || [];
  const WYKLADY = window.WYKLADY || [];
  const lname = id => id.replace("_cd", " (cd.)");
  const LANG_NAMES = { c: "C", py: "Python", java: "Java", cpp: "C++", kt: "Kotlin" };
  const HL = { c: "c", py: "python", java: "java", cpp: "cpp" };
  const isOop = l => l && l.track === "oop";
  const view = document.getElementById("view");
  const pad = n => String(n).padStart(2, "0");

  // ---------- preferencje (tylko dla wygody, w przeglądarce studenta) ----------
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("ktr:" + key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("ktr:" + key, JSON.stringify(value)); } catch (e) { /* brak storage */ }
    }
  };
  let lang = store.get("lang", "both");
  let done = new Set(store.get("done", []));
  let codeFs = store.get("fs", 13);
  let lastSearch = "";
  let cheatTrack = "all";

  // ---------- ikony ----------
  const svg = d => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICON = {
    expand: svg('<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'),
    shrink: svg('<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>'),
    copy: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    dock: svg('<path d="M15 18l-6-6 6-6"/>'),
    compare: svg('<path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/>'),
    swap: svg('<path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>'),
    warn: svg('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>'),
    code: svg('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'),
    layers: svg('<path d="m12 2 10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>')
  };

  // ---------- motyw ----------
  const sysDark = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = () => (document.documentElement.dataset.theme || (sysDark() ? "dark" : "light")) === "dark";
  function applyTheme() {
    const dark = isDark();
    document.getElementById("hl-light").disabled = dark;
    document.getElementById("hl-dark").disabled = !dark;
    const b = document.getElementById("theme-toggle");
    b.innerHTML = dark ? ICON.sun : ICON.moon;
    b.title = dark ? "Jasny motyw" : "Ciemny motyw";
  }
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const t = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = t;
    store.set("theme", t);
    applyTheme();
    route();          // Playground dobiera motyw przy tworzeniu edytora
  });

  // ---------- pomocnicze ----------
  const esc = s => String(s).replace(/[&<>"']/g, ch =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  // polska typografia: jednoliterowy spójnik lub przyimek nie zostaje na końcu wiersza
  // (dwa przebiegi, bo sąsiednie spójniki, np. „i w domu”, dzielą spację)
  const SIEROTKA = /(^|[\s(„"])([aiouwzAIOUWZ]) +/g;
  const sierotki = s => s.replace(SIEROTKA, "$1$2\u00a0").replace(SIEROTKA, "$1$2\u00a0");
  // `kod` -> <code>kod</code>, reszta escapowana; twarde spacje tylko poza kodem
  const inline = s => String(s).split("`").map((part, i) =>
    i % 2 ? `<code>${esc(part)}</code>` : esc(sierotki(part))).join("");
  const langsShown = () => (lang === "both" ? ["c", "py"] : [lang]);
  const setFs = v => {
    codeFs = Math.max(11, Math.min(22, v));
    store.set("fs", codeFs);
    document.documentElement.style.setProperty("--code-fs", codeFs + "px");
    document.querySelectorAll(".fs").forEach(e => { e.textContent = codeFs + "px"; });
    refreshEditors();
  };
  // CodeMirror w Playground musi przeliczyć wymiary po zmianie rozmiaru ramki lub czcionki
  function refreshEditors() {
    setTimeout(() => {
      document.querySelectorAll(".CodeMirror").forEach(cm => { if (cm.CodeMirror) cm.CodeMirror.refresh(); });
      window.dispatchEvent(new Event("resize"));
    }, 30);
  }

  function ktBlock(code, extraAttrs) {
    return `<div class="kt-host"><div class="kt-run" theme="${isDark() ? "darcula" : "idea"}" ` +
      `match-brackets="true" auto-indent="true" ${extraAttrs || ""}>${esc(code)}</div></div>`;
  }

  // Fallback: Playground niedostępny (offline, błąd) — pokaż kod statycznie z kolorowaniem
  function staticKotlin(n) {
    if (!n.isConnected || n.getAttribute("data-kotlin-playground-initialized") === "true") return;
    const pre = document.createElement("pre");
    pre.innerHTML = `<code class="language-kotlin">${esc(n.textContent)}</code>`;
    n.replaceWith(pre);
    if (window.hljs) window.hljs.highlightElement(pre.firstChild);
  }

  // Sprawdzenie, czy serwer kompilacji jest osiągalny (np. strona otwarta jako plik lokalny)
  let serverCheck = null;
  function checkServer() {
    if (serverCheck) return;
    serverCheck = fetch("https://api.kotlinlang.org/versions")
      .then(r => { if (!r.ok) throw new Error(r.status); })
      .catch(() => {
        const b = document.createElement("div");
        b.className = "offline-banner";
        b.innerHTML = "Nie można połączyć się z serwerem kompilacji Kotlina, więc kod nie da się uruchomić " +
          "(przycisk ▶ nie pojawi się w edytorze). Otwórz stronę przez adres http(s), np. z GitHub Pages, " +
          "a nie jako plik z dysku, i sprawdź połączenie z internetem.";
        document.querySelector(".topbar").after(b);
      });
  }

  function mountPlaygrounds(root) {
    checkServer();
    const nodes = Array.from(root.querySelectorAll(".kt-run"));
    if (!nodes.length) return;
    if (typeof window.KotlinPlayground !== "function") { nodes.forEach(staticKotlin); return; }
    // Playground przyjmuje pojedynczy Node albo selektor (NodeList ma w v1 błąd),
    // a obiekt opcji musi być przekazany jawnie.
    nodes.forEach(n => {
      try {
        Promise.resolve(window.KotlinPlayground(n, {}))
          .catch(err => { console.error(err); staticKotlin(n); });
      } catch (err) {
        console.error(err);
        staticKotlin(n);
      }
    });
  }

  function highlight(root) {
    if (!window.hljs) return;
    root.querySelectorAll("pre code[class^='language-']").forEach(el => window.hljs.highlightElement(el));
  }

  // kopiowanie: dla Kotlina bieżąca treść edytora (z poprawkami studenta)
  function copyFrom(btn, fallback) {
    const host = btn.closest(".panel, .editor-frame");
    const cm = host && host.querySelector(".CodeMirror");
    const text = cm && cm.CodeMirror ? cm.CodeMirror.getValue() : fallback;
    const ok = () => { btn.innerHTML = ICON.check; setTimeout(() => { btn.innerHTML = ICON.copy; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, () => {});
  }

  // ---------- nawigacja ----------
  function renderSidebar(activeId) {
    const item = l =>
      `<li><a href="#/lekcja/${l.id}" class="${l.id === activeId ? "active" : ""} ${done.has(l.id) ? "done" : ""}">` +
      `<span class="num">${pad(LESSONS.indexOf(l) + 1)}</span><span>${esc(l.title)}</span></a></li>`;
    const syntax = LESSONS.filter(l => !isOop(l)), oop = LESSONS.filter(isOop);
    const count = n => `${n} ${n === 1 ? "lekcja" : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? "lekcje" : "lekcji"}`;
    document.getElementById("lesson-list").innerHTML =
      `<li class="group">Składnia <small>${count(syntax.length)}</small></li>${syntax.map(item).join("")}` +
      (oop.length ? `<li class="group">Obiektowo <small>${count(oop.length)}</small></li>${oop.map(item).join("")}` : "") +
      (WYKLADY.length ? `<li class="group">Przykłady z wykładów</li>` + WYKLADY.map(w =>
        `<li><a href="#/wyklad/${w.id}" class="${activeId === "wyklad:" + w.id ? "active" : ""}"><span class="num">${esc(w.id.replace("_cd", "+"))}</span><span>Wykład ${esc(lname(w.id))}</span></a></li>`).join("") : "");
    const a = document.querySelector(".sidebar a.active");
    if (a && a.scrollIntoView && window.innerWidth > 860) a.scrollIntoView({ block: "nearest" });
  }

  function setMode(mode) {
    document.querySelectorAll(".modes a").forEach(a => a.classList.toggle("active", a.dataset.mode === mode));
  }

  function setLangButtons() {
    document.querySelectorAll(".compare button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  }

  // ---------- tryb pełnoekranowy ----------
  let focus = null;   // { kind: "code" | "exercise", el, keys, visible:Set, weights:{} }
  const backdrop = document.createElement("div");
  backdrop.className = "focus-backdrop";
  document.body.appendChild(backdrop);
  backdrop.addEventListener("click", () => closeFocus());

  function openCodeFocus(zone, visibleKeys) {
    if (focus) closeFocus();
    const keys = Array.from(zone.querySelectorAll(".compare-grid > .panel")).map(p => p.dataset.key);
    focus = { kind: "code", el: zone, keys, visible: new Set(visibleKeys || keys), weights: {} };
    keys.forEach(k => { focus.weights[k] = 1; });
    zone.classList.add("focus");
    // uchwyty do zmiany proporcji między kolumnami
    const panels = zone.querySelectorAll(".compare-grid > .panel");
    panels.forEach((p, i) => {
      if (i === panels.length - 1) return;
      const s = document.createElement("div");
      s.className = "splitter";
      s.title = "Przeciągnij, aby zmienić proporcje";
      s.addEventListener("pointerdown", startDrag);
      p.after(s);
    });
    backdrop.classList.add("on");
    document.body.classList.add("focus-open");
    layoutFocus();
    zone.querySelector(".btn-close").focus({ preventScroll: true });
  }

  function openExerciseFocus(box) {
    if (focus) closeFocus();
    focus = { kind: "exercise", el: box };
    box.classList.add("focus");
    backdrop.classList.add("on");
    document.body.classList.add("focus-open");
    box.querySelectorAll(".ex-max").forEach(b => { b.innerHTML = ICON.shrink; b.title = "Zamknij pełny ekran"; });
    refreshEditors();
  }

  function closeFocus() {
    if (!focus) return;
    const el = focus.el;
    el.classList.remove("focus");
    el.querySelectorAll(".splitter").forEach(s => s.remove());
    el.querySelectorAll(".compare-grid > .panel").forEach(p => { p.style.flex = ""; p.classList.remove("docked"); });
    el.querySelectorAll(".ex-max").forEach(b => { b.innerHTML = ICON.expand; b.title = "Pełny ekran"; });
    el.querySelectorAll('[data-act="max"]').forEach(b => { b.innerHTML = ICON.expand; b.title = `Powiększ: tylko ${LANG_NAMES[b.closest(".panel").dataset.key]}`; });
    backdrop.classList.remove("on");
    document.body.classList.remove("focus-open");
    focus = null;
    refreshEditors();
  }

  function layoutFocus() {
    if (!focus || focus.kind !== "code") return;
    const zone = focus.el;
    const panels = Array.from(zone.querySelectorAll(".compare-grid > .panel"));
    panels.forEach(p => {
      const k = p.dataset.key, on = focus.visible.has(k);
      p.classList.toggle("docked", !on);
      p.style.flex = on ? `${focus.weights[k]} 1 0` : "";
    });
    zone.querySelectorAll(".splitter").forEach(s => {
      const a = s.previousElementSibling, b = s.nextElementSibling;
      s.classList.toggle("off", a.classList.contains("docked") || b.classList.contains("docked"));
    });
    panels.forEach(p => {
      const b = p.querySelector('[data-act="max"]'), solo = focus.visible.size === 1 && focus.visible.has(p.dataset.key);
      b.innerHTML = solo ? ICON.shrink : ICON.expand;
      b.title = solo ? "Przywróć poprzednią wielkość" : `Powiększ: tylko ${LANG_NAMES[p.dataset.key]}`;
    });
    const vis = focus.keys.filter(k => focus.visible.has(k)).join(",");
    zone.querySelectorAll("[data-view]").forEach(b => b.classList.toggle("on", b.dataset.view === vis));
    const n = focus.visible.size, w = focus.weights;
    const equal = focus.keys.every(k => !focus.visible.has(k) || Math.abs(w[k] - 1) < 1e-6);
    const ktFocus = n > 1 && Math.abs(w.kt - 1.5 * (n - 1)) < 1e-6 && focus.keys.every(k => k === "kt" || !focus.visible.has(k) || Math.abs(w[k] - 1) < 1e-6);
    zone.querySelectorAll("[data-ratio]").forEach(b =>
      b.classList.toggle("on", (b.dataset.ratio === "equal" && equal) || (b.dataset.ratio === "kt" && ktFocus)));
    refreshEditors();
  }

  function startDrag(e) {
    const s = e.currentTarget;
    if (s.classList.contains("off")) return;
    const a = s.previousElementSibling, b = s.nextElementSibling;
    const ka = a.dataset.key, kb = b.dataset.key;
    const wa = a.getBoundingClientRect().width, wb = b.getBoundingClientRect().width;
    const sum = focus.weights[ka] + focus.weights[kb], x0 = e.clientX;
    s.classList.add("drag");
    document.body.classList.add("dragging");
    s.setPointerCapture(e.pointerId);
    const move = ev => {
      const na = Math.max(120, Math.min(wa + wb - 120, wa + ev.clientX - x0));
      focus.weights[ka] = sum * na / (wa + wb);
      focus.weights[kb] = sum - focus.weights[ka];
      a.style.flex = `${focus.weights[ka]} 1 0`;
      b.style.flex = `${focus.weights[kb]} 1 0`;
    };
    const up = () => {
      s.classList.remove("drag");
      document.body.classList.remove("dragging");
      s.removeEventListener("pointermove", move);
      s.removeEventListener("pointerup", up);
      s.removeEventListener("pointercancel", up);
      layoutFocus();
    };
    s.addEventListener("pointermove", move);
    s.addEventListener("pointerup", up);
    s.addEventListener("pointercancel", up);
    e.preventDefault();
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && focus) { e.preventDefault(); closeFocus(); }
  }, true);

  function fontSeg() {
    return `<div class="seg" title="Rozmiar czcionki kodu"><button type="button" data-fs="-1" aria-label="Mniejsza czcionka">A−</button>` +
      `<span class="fs">${codeFs}px</span><button type="button" data-fs="1" aria-label="Większa czcionka">A+</button></div>`;
  }
  const closeBtn = `<button type="button" class="btn-close">${ICON.shrink}<span>Zamknij</span><kbd>Esc</kbd></button>`;

  // ---------- widok lekcji ----------
  function renderLesson(id) {
    closeFocus();
    const idx = LESSONS.findIndex(l => l.id === id);
    const l = LESSONS[idx];
    if (!l) { location.hash = "#/"; return; }

    const oop = isOop(l);
    setMode(oop ? "oop" : "path");
    document.body.classList.toggle("oop", oop);
    renderSidebar(id);

    // lekcje obiektowe: Kotlin i Java obok siebie, C++ i Python w uzupełnieniach
    const shown = oop ? ["java"] : langsShown();
    const order = oop ? ["kt", "java"] : [...shown, "kt"];
    const runnable = l.runnable !== false;
    const hint = { java: "to samo w Javie", kt: runnable ? "kod można edytować" : "uruchom w IntelliJ" };
    const pairTitle = k => `Powiększ: tylko ${LANG_NAMES[k]}`;
    const panel = k => `
      <section class="panel ${k}" data-key="${k}">
        <div class="panel-head">
          <span class="badge ${k}">${LANG_NAMES[k]}</span>
          ${hint[k] ? `<span class="hint">${hint[k]}</span>` : ""}
          <div class="tools">
            <button type="button" class="tool" data-act="max" title="${pairTitle(k)}">${ICON.expand}</button>
            <button type="button" class="tool" data-act="copy" title="Kopiuj kod">${ICON.copy}</button>
          </div>
        </div>
        <div class="panel-body">${k === "kt"
          ? ktBlock(l.kt, runnable ? "" : "data-highlight-only")
          : `<pre><code class="language-${HL[k]}">${esc(l[k])}</code></pre>`}</div>
        <div class="dock-label" title="Rozwiń ${LANG_NAMES[k]}"><span class="badge ${k}">${k === "kt" ? "Kt" : k === "java" ? "Java" : LANG_NAMES[k]}</span><span class="vert">${LANG_NAMES[k]}</span>${ICON.expand}</div>
      </section>`;

    // widoki w trybie pełnoekranowym
    const srcKeys = order.filter(k => k !== "kt");
    const views = [];
    if (srcKeys.length > 1) views.push([order, "Wszystkie"]);
    srcKeys.forEach(k => views.push([order.filter(x => x === k || x === "kt"), `${LANG_NAMES[k]} + Kotlin`]));
    order.forEach(k => views.push([[k], `Tylko ${LANG_NAMES[k]}`]));
    const viewBtns = views.map(([ks, label]) => `<button type="button" data-view="${ks.join(",")}">${label}</button>`).join("");

    const traps = oop ? l.traps : l.traps.filter(t => shown.includes(t.from));
    const extras = l.extras || [];
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const atoms = Array.isArray(l.atom) ? l.atom : (l.atom ? [l.atom] : []);
    const ex = l.exercise;
    const num = pad(idx + 1);

    view.innerHTML = `
      <div class="lesson-meta">
        <span class="pill">${oop ? "Obiektowo" : "Składnia"} · lekcja ${num}</span>
        ${l.lecture ? `<span class="pill plain">Wykład ${esc(l.lecture)}</span>` : ""}
        <span class="progress">Ukończono ${done.size} z ${LESSONS.length}
          <span class="progress-bar"><span style="width:${Math.round(100 * done.size / LESSONS.length)}%"></span></span></span>
      </div>
      <header class="lesson-head">
        <h1><span class="num">${num}</span>${esc(sierotki(l.title))}</h1>
        ${atoms.length ? `<div class="refs"><span class="label">Atomic Kotlin:</span>${atoms.map(a => `<span class="ref-chip">„${esc(a)}”</span>`).join("")}</div>` : ""}
        <p class="intro">${inline(l.intro)}</p>
      </header>

      <section class="code-zone" id="code-zone">
        <h2><span class="h-ico">${ICON.compare}</span>Porównanie kodu
          <span class="h-side"><button type="button" class="btn small ghost" data-act="focus" title="Pokaż kod na całym ekranie">${ICON.expand}Pełny ekran</button></span></h2>
        <div class="focus-bar">
          <div class="focus-title"><span class="num">${num}</span>${esc(l.title)}</div>
          <div class="seg"><span class="seg-label">Widok:</span>${viewBtns}</div>
          ${order.length > 1 ? `<div class="seg"><span class="seg-label">Proporcje:</span><button type="button" data-ratio="equal">Równe</button><button type="button" data-ratio="kt">Kotlin 60%</button></div>` : ""}
          ${fontSeg()}
          ${closeBtn}
        </div>
        <div class="compare-grid cols-${order.length}">${order.map(panel).join("")}</div>
      </section>

      <h2><span class="h-ico">${ICON.swap}</span>Co się zmienia</h2>
      <ul class="changes">${l.changes.map(c => `<li>${inline(c)}</li>`).join("")}</ul>

      ${traps.length ? `<h2><span class="h-ico">${ICON.warn}</span>Pułapki</h2>${traps.map(t =>
        `<div class="trap">${t.from ? `<span class="tag ${t.from}">z ${LANG_NAMES[t.from]}</span>` : ""}<div>${inline(t.text)}</div></div>`).join("")}` : ""}

      ${extras.length ? `<h2><span class="h-ico">${ICON.layers}</span>Dla porównania</h2>${extras.map(x => `
        <details class="extra ${x.lang}">
          <summary><span class="badge ${x.lang}">${LANG_NAMES[x.lang]}</span>${inline(x.title)}</summary>
          <div class="extra-box">
          <div class="focus-bar">
            <div class="focus-title"><span class="badge ${x.lang}">${LANG_NAMES[x.lang]}</span>${inline(x.title)}</div>
            ${fontSeg()}
            ${closeBtn}
          </div>
          <div class="ex-body">
            <p>${inline(x.text)}</p>
            ${x.code ? `<div class="extra-code"><div class="tools">
                <button type="button" class="tool ex-max" title="Pełny ekran">${ICON.expand}</button>
                <button type="button" class="tool" data-act="copy-x" title="Kopiuj kod">${ICON.copy}</button></div>
              <pre><code class="language-${HL[x.lang]}">${esc(x.code)}</code></pre></div>` : ""}
          </div>
          </div>
        </details>`).join("")}` : ""}

      ${ex ? `
      <h2><span class="h-ico">${ICON.code}</span>Spróbuj sam</h2>
      <div class="exercise" id="exercise">
        <div class="focus-bar">
          <div class="focus-title"><span class="num">${num}</span>Spróbuj sam: ${esc(l.title)}</div>
          ${fontSeg()}
          ${closeBtn}
        </div>
        <div class="ex-body">
          <p class="task">${inline(ex.task)}</p>
          <div class="expected-row"><span class="label">Oczekiwany wynik:</span><pre class="expected-out">${esc(ex.expected)}</pre></div>
          <div class="editor-frame">
            <div class="editor-head"><span class="dots"><i></i><i></i><i></i></span>Zadanie.kt
              <div class="tools">
                <button type="button" class="tool ex-max" title="Pełny ekran">${ICON.expand}</button>
                <button type="button" class="tool" data-act="copy-ex" title="Kopiuj kod">${ICON.copy}</button>
              </div></div>
            ${ktBlock(ex.starter)}
          </div>
          <div class="btn-row">
            <button type="button" class="btn" id="show-solution">Pokaż rozwiązanie</button>
          </div>
          <div class="solution" id="solution" hidden></div>
        </div>
      </div>` : ""}

      <div class="lesson-foot">
        <div class="left">
          <button type="button" class="btn ${done.has(l.id) ? "" : "primary"}" id="mark-done">
            ${done.has(l.id) ? "Oznacz jako nieprzerobione" : `${ICON.check} Przerobione`}</button>
          ${prev ? `<a class="prev-link" href="#/lekcja/${prev.id}">← ${esc(prev.title)}</a>` : ""}
        </div>
        ${next ? `<a class="next-card" href="#/lekcja/${next.id}"><span><small>Następna lekcja${isOop(next) && !oop ? " · Obiektowo" : ""}</small><strong>${esc(next.title)}</strong></span><span class="arrow">→</span></a>`
               : `<a class="next-card" href="#/sciaga"><span><small>Koniec ścieżki</small><strong>Przejdź do ściągi</strong></span><span class="arrow">→</span></a>`}
      </div>`;

    highlight(view);
    mountPlaygrounds(view);

    const zone = document.getElementById("code-zone");
    zone.addEventListener("click", e => {
      const t = e.target.closest("button, .dock-label");
      if (!t) return;
      const p = t.closest(".panel");
      if (t.classList.contains("dock-label")) {
        focus.prevVisible = null; focus.visible.add(p.dataset.key); layoutFocus();
      } else if (t.dataset.act === "focus") {
        openCodeFocus(zone);
      } else if (t.dataset.act === "max") {
        const k = p.dataset.key;
        const solo = focus && focus.visible.size === 1 && focus.visible.has(k);
        if (solo) {                                   // drugie kliknięcie: powrót do poprzedniej wielkości
          if (focus.prevVisible) { focus.visible = focus.prevVisible; focus.prevVisible = null; layoutFocus(); }
          else closeFocus();
        } else if (focus) {
          focus.prevVisible = new Set(focus.visible); focus.visible = new Set([k]); layoutFocus();
        } else openCodeFocus(zone, [k]);
      } else if (t.dataset.act === "copy") {
        copyFrom(t, p.dataset.key === "kt" ? l.kt : l[p.dataset.key]);
      } else if (t.dataset.view) {
        focus.prevVisible = null; focus.visible = new Set(t.dataset.view.split(",")); layoutFocus();
      } else if (t.dataset.ratio) {
        const n = focus.visible.size;
        focus.keys.forEach(k => { focus.weights[k] = 1; });
        if (t.dataset.ratio === "kt" && n > 1) focus.weights.kt = 1.5 * (n - 1);
        layoutFocus();
      } else if (t.dataset.fs) {
        setFs(codeFs + Number(t.dataset.fs));
      } else if (t.classList.contains("btn-close")) {
        closeFocus();
      }
    });

    view.querySelectorAll(".extra-box").forEach((box, i) => box.addEventListener("click", e => {
      const t = e.target.closest("button");
      if (!t) return;
      if (t.classList.contains("ex-max")) focus && focus.el === box ? closeFocus() : openExerciseFocus(box);
      else if (t.classList.contains("btn-close")) closeFocus();
      else if (t.dataset.fs) setFs(codeFs + Number(t.dataset.fs));
      else if (t.dataset.act === "copy-x") copyFrom(t, extras[i].code);
    }));

    if (ex) {
      const box = document.getElementById("exercise");
      box.addEventListener("click", e => {
        const t = e.target.closest("button");
        if (!t) return;
        if (t.classList.contains("ex-max")) focus && focus.el === box ? closeFocus() : openExerciseFocus(box);
        else if (t.classList.contains("btn-close")) closeFocus();
        else if (t.dataset.fs) setFs(codeFs + Number(t.dataset.fs));
        else if (t.dataset.act === "copy-ex") copyFrom(t, ex.starter);
      });
      document.getElementById("show-solution").addEventListener("click", e => {
        const sol = document.getElementById("solution");
        if (sol.hidden) {
          sol.innerHTML = `<div class="editor-frame"><div class="editor-head"><span class="dots"><i></i><i></i><i></i></span>Rozwiązanie.kt</div>${ktBlock(ex.solution)}</div>`;
          sol.hidden = false;
          mountPlaygrounds(sol);
          e.currentTarget.textContent = "Ukryj rozwiązanie";
        } else {
          sol.hidden = true; sol.innerHTML = "";
          e.currentTarget.textContent = "Pokaż rozwiązanie";
        }
      });
    }
    document.getElementById("mark-done").addEventListener("click", () => {
      done.has(l.id) ? done.delete(l.id) : done.add(l.id);
      store.set("done", [...done]);
      renderLesson(l.id);
    });
  }

  // ---------- przykłady z wykładów ----------
  const MODE = {
    run: ["", ""],
    wrap: ["main dopisany", "Kod ze slajdu jest wstawiony do funkcji `main()`, żeby dało się go uruchomić."],
    split: ["main dopisany", "Na końcu dopisano funkcję `main()` z instrukcjami ze slajdu."],
    decl: ["same deklaracje", "Slajd zawiera same deklaracje. Wypróbuj je w dopisanej na końcu funkcji `main()`."],
    frag: ["fragment", "Fragment, który zakłada kod spoza slajdu, więc nie uruchomi się samodzielnie."]
  };

  // Playground ładowany dopiero, gdy przykład zbliża się do ekranu (na stronie jest ich kilkadziesiąt)
  let lazyObs = null;
  function mountLazy(root) {
    if (lazyObs) lazyObs.disconnect();
    if (!("IntersectionObserver" in window)) { mountPlaygrounds(root); return; }
    lazyObs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { lazyObs.unobserve(e.target); mountPlaygrounds(e.target); }
    }), { rootMargin: "600px 0px" });
    root.querySelectorAll(".example").forEach(el => lazyObs.observe(el));
  }

  function renderLecture(id, n) {
    closeFocus();
    const w = WYKLADY.find(x => x.id === id);
    if (!w) { location.hash = "#/"; return; }
    setMode("lecture");
    document.body.classList.remove("oop");
    renderSidebar("wyklad:" + id);
    const sections = [];
    w.examples.forEach(e => {
      const last = sections[sections.length - 1];
      if (last && last.title === e.section) last.items.push(e); else sections.push({ title: e.section, lesson: e.lesson, items: [e] });
    });
    const runnable = w.examples.filter(e => e.mode !== "frag").length;
    view.innerHTML = `
      <div class="lesson-meta"><span class="pill">Przykłady z wykładu ${esc(lname(w.id))}</span>
        <span class="pill plain">${w.examples.length} przykładów · ${runnable} do uruchomienia</span></div>
      <header class="lesson-head">
        <h1><span class="num">${esc(lname(w.id))}</span>${esc(sierotki(w.title))}</h1>
        <p class="intro">${inline("Kod ze slajdów wykładu, gotowy do uruchomienia i zmieniania. Na slajdzie kliknij ▶ przy przykładzie, żeby trafić prosto do niego. Gdy przykład korzysta z klas z wcześniejszych slajdów, są one ukryte nad kodem i rozwiniesz je przyciskiem w edytorze.")}</p>
      </header>
      ${sections.map(sec => `
        <h2><span class="h-ico">${ICON.code}</span>${esc(sec.title)}
          ${sec.lesson && LESSONS.some(l => l.id === sec.lesson) ? `<span class="h-side"><a class="btn small ghost" href="#/lekcja/${sec.lesson}">Lekcja: ${esc(LESSONS.find(l => l.id === sec.lesson).title)} →</a></span>` : ""}</h2>
        ${sec.items.map(e => `
          <section class="example panel kt ${e.mode}" id="ex-${e.n}">
            <div class="panel-head">
              <span class="badge kt">#${e.n}</span><span class="hint ex-slide">${inline(e.slide)}</span>
              ${MODE[e.mode][0] ? `<span class="pill plain">${MODE[e.mode][0]}</span>` : ""}
              <div class="tools"><button type="button" class="tool" data-act="copy" title="Kopiuj kod">${ICON.copy}</button></div>
            </div>
            ${MODE[e.mode][1] ? `<p class="ex-note">${inline(MODE[e.mode][1])}</p>` : ""}
            <div class="panel-body">${ktBlock(e.code, e.mode === "frag" ? "data-highlight-only" : "")}</div>
          </section>`).join("")}`).join("")}`;
    view.querySelectorAll(".example [data-act=copy]").forEach(b => b.addEventListener("click", () => {
      const e = w.examples.find(x => "ex-" + x.n === b.closest(".example").id);
      copyFrom(b, e.code.replace(/^\/\/sample(Start|End)\n/gm, ""));
    }));
    mountLazy(view);
    if (n) {
      const el = document.getElementById("ex-" + n);
      if (el) {
        mountPlaygrounds(el);
        el.classList.add("target");
        // ponownie po załadowaniu edytorów powyżej (zmieniają wysokość strony)
        [50, 900, 2000].forEach(t => setTimeout(() => { if (location.hash.endsWith("/" + n)) el.scrollIntoView({ block: "start" }); }, t));
        return true;
      }
    }
  }

  // ---------- ściąga ----------
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function allCheats() {
    return LESSONS.flatMap(l => l.cheats.map(c => ({ ...c, lesson: l })));
  }

  function renderCheat() {
    closeFocus();
    setMode("cheat");
    document.body.classList.remove("oop");
    renderSidebar(null);
    view.innerHTML = `
      <header class="lesson-head cheat-head">
        <h1>Ściąga</h1>
        <p class="intro">Wpisz, co znasz z ${lang === "both" ? "C lub Pythona" : LANG_NAMES[lang]}, np. <code>range</code>, <code>printf</code>, <code>ternary</code>, <code>stała</code>. Wpisy z Javy (z lekcji obiektowych) są widoczne zawsze, np. <code>static</code>, <code>extends</code>.</p>
      </header>
      <div class="cheat-controls">
        <input class="search" id="search" type="search" placeholder="Szukaj konstrukcji, np. printf, range, static…" autocomplete="off" value="${esc(lastSearch)}">
        <div class="filter-pills" id="cheat-filter">
          <button type="button" data-t="all">Wszystkie</button>
          <button type="button" data-t="syntax">Składnia</button>
          <button type="button" data-t="oop">Obiektowo</button>
        </div>
      </div>
      <div class="cheat-count" id="cheat-count"></div>
      <div id="cheat-results"></div>`;
    const input = document.getElementById("search");
    input.addEventListener("input", () => { lastSearch = input.value; fillCheat(); });
    document.getElementById("cheat-filter").addEventListener("click", e => {
      const b = e.target.closest("button");
      if (b) { cheatTrack = b.dataset.t; fillCheat(); }
    });
    fillCheat();
    input.focus();
  }

  function fillCheat() {
    document.querySelectorAll("#cheat-filter button").forEach(b => b.classList.toggle("on", b.dataset.t === cheatTrack));
    const shown = langsShown();
    const words = norm(lastSearch).split(/\s+/).filter(Boolean);
    const candidates = allCheats()
      .filter(c => c.from === "java" || shown.includes(c.from))
      .filter(c => cheatTrack === "all" || (cheatTrack === "oop") === isOop(c.lesson));
    const matches = fields => c => words.every(w => norm(fields(c)).includes(w));
    // najpierw dopasowania w samych wpisach; słowa kluczowe lekcji tylko, gdy nic nie pasuje
    let rows = words.length ? candidates.filter(matches(c => [c.src, c.kt, c.note].join(" "))) : candidates;
    if (words.length && !rows.length)
      rows = candidates.filter(matches(c => [c.src, c.kt, c.note, c.lesson.title, c.lesson.keywords].join(" ")));
    document.getElementById("cheat-count").textContent =
      words.length ? `Wyniki: ${rows.length}` : `Wszystkie wpisy: ${rows.length}`;
    const groups = [];
    rows.forEach(c => {
      const g = groups[groups.length - 1];
      if (g && g.lesson === c.lesson) g.rows.push(c); else groups.push({ lesson: c.lesson, rows: [c] });
    });
    document.getElementById("cheat-results").innerHTML = rows.length ? groups.map(g => `
      <section class="cheat-group">
        <h3><span class="num">${pad(LESSONS.indexOf(g.lesson) + 1)}</span><a href="#/lekcja/${g.lesson.id}">${esc(g.lesson.title)}</a></h3>
        ${g.rows.map(c => `
          <div class="cheat-row">
            <div class="cheat-cell ${c.from}"><span class="tag ${c.from}">${LANG_NAMES[c.from]}</span>${esc(c.src)}</div>
            <div class="cheat-cell kt"><span class="tag">Kotlin</span>${esc(c.kt)}</div>
            <div class="cheat-note">${inline(c.note || "")}</div>
          </div>`).join("")}
      </section>`).join("")
      : `<p class="empty">Brak wpisów. Spróbuj innego słowa, zmień filtr albo przełącz „Porównuj z” na „oba”.</p>`;
  }

  // ---------- router ----------
  function route() {
    const h = location.hash;
    if (h.startsWith("#/lekcja/")) renderLesson(decodeURIComponent(h.slice(9)));
    else if (h === "#/sciaga") renderCheat();
    else if (h === "#/obiektowo" && LESSONS.some(isOop)) renderLesson(LESSONS.find(isOop).id);
    else if (h.startsWith("#/wyklad/")) {
      const [id, n] = decodeURIComponent(h.slice(9)).split("/");
      if (renderLecture(id, n)) { view.focus({ preventScroll: true }); return; }
    }
    else if (LESSONS.length) renderLesson(LESSONS[0].id);
    view.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  document.querySelectorAll(".compare button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    store.set("lang", lang);
    setLangButtons();
    route();
  }));

  window.addEventListener("hashchange", route);
  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSys = () => { if (!document.documentElement.dataset.theme) { applyTheme(); route(); } };
    if (mq.addEventListener) mq.addEventListener("change", onSys); else if (mq.addListener) mq.addListener(onSys);
  }
  document.documentElement.style.setProperty("--code-fs", codeFs + "px");
  applyTheme();
  setLangButtons();
  route();
})();
