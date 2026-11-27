(function () {
  "use strict";

  const LESSONS = window.LESSONS || [];
  const LANG_NAMES = { c: "C", py: "Python", java: "Java", cpp: "C++" };
  const HL = { c: "c", py: "python", java: "java", cpp: "cpp" };
  const isOop = l => l && l.track === "oop";
  const view = document.getElementById("view");

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
  let lastSearch = "";

  // ---------- pomocnicze ----------
  const esc = s => String(s).replace(/[&<>"']/g, ch =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  // `kod` -> <code>kod</code>, reszta escapowana
  const inline = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  const langsShown = () => (lang === "both" ? ["c", "py"] : [lang]);
  const isDark = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

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

  // ---------- nawigacja ----------
  function renderSidebar(activeId) {
    const item = l =>
      `<li><a href="#/lekcja/${l.id}" class="${l.id === activeId ? "active" : ""} ${done.has(l.id) ? "done" : ""}">${esc(l.title)}</a></li>`;
    const syntax = LESSONS.filter(l => !isOop(l)), oop = LESSONS.filter(isOop);
    document.getElementById("lesson-list").innerHTML =
      `<li class="group">Składnia</li>${syntax.map(item).join("")}` +
      (oop.length ? `<li class="group">Obiektowo</li>${oop.map(item).join("")}` : "");
  }

  function setMode(mode) {
    document.querySelectorAll(".modes a").forEach(a => a.classList.toggle("active", a.dataset.mode === mode));
  }

  function setLangButtons() {
    document.querySelectorAll(".compare button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  }

  // ---------- widok lekcji ----------
  function renderLesson(id) {
    const idx = LESSONS.findIndex(l => l.id === id);
    const l = LESSONS[idx];
    if (!l) { location.hash = "#/"; return; }

    const oop = isOop(l);
    setMode(oop ? "oop" : "path");
    document.body.classList.toggle("oop", oop);
    renderSidebar(id);

    // lekcje obiektowe: Kotlin i Java obok siebie, C++ i Python w uzupełnieniach
    const shown = oop ? ["java"] : langsShown();
    const srcPanels = shown.map(k => `
      <section class="panel ${k}">
        <div class="panel-head"><span>${LANG_NAMES[k]}</span>${oop ? `<span class="hint">to samo w Javie</span>` : ""}</div>
        <pre><code class="language-${HL[k]}">${esc(l[k])}</code></pre>
      </section>`).join("");

    const runnable = l.runnable !== false;
    const ktPanel = `
      <section class="panel kt">
        <div class="panel-head"><span>Kotlin</span><span class="hint">${runnable ? "kod można edytować" : "uruchom w IntelliJ"}</span></div>
        ${ktBlock(l.kt, runnable ? "" : "data-highlight-only")}
      </section>`;

    const traps = oop ? l.traps : l.traps.filter(t => shown.includes(t.from));
    const extras = l.extras || [];
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const atoms = Array.isArray(l.atom) ? l.atom : (l.atom ? [l.atom] : []);
    const ex = l.exercise;

    view.innerHTML = `
      <h1>${esc(l.title)}</h1>
      ${atoms.length || l.lecture ? `<p class="atom-ref">${l.lecture ? `Wykład ${esc(l.lecture)}${atoms.length ? " · " : ""}` : ""}${atoms.length ? `Atomic Kotlin: ${atoms.map(a => `„${esc(a)}”`).join(", ")}` : ""}</p>` : `<p class="atom-ref">&nbsp;</p>`}
      <p class="intro">${inline(l.intro)}</p>

      <div class="compare-grid cols-${shown.length + 1}">${oop ? ktPanel + srcPanels : srcPanels + ktPanel}</div>

      <h2>Co się zmienia</h2>
      <ul class="changes">${l.changes.map(c => `<li>${inline(c)}</li>`).join("")}</ul>

      ${traps.length ? `<h2>Pułapki</h2>${traps.map(t =>
        `<div class="trap">${t.from ? `<span class="tag ${t.from}">z ${LANG_NAMES[t.from]}</span>` : ""}${inline(t.text)}</div>`).join("")}` : ""}

      ${extras.length ? `<h2>Dla porównania</h2>${extras.map(x => `
        <details class="extra ${x.lang}">
          <summary><span class="tag ${x.lang}">${LANG_NAMES[x.lang]}</span>${inline(x.title)}</summary>
          <p>${inline(x.text)}</p>
          ${x.code ? `<pre><code class="language-${HL[x.lang]}">${esc(x.code)}</code></pre>` : ""}
        </details>`).join("")}` : ""}

      ${ex ? `
      <h2>Spróbuj sam</h2>
      <div class="exercise">
        <p class="task">${inline(ex.task)}</p>
        <p class="expected">Oczekiwany wynik:</p>
        <pre class="expected-out">${esc(ex.expected)}</pre>
        ${ktBlock(ex.starter)}
        <div class="btn-row">
          <button type="button" class="btn" id="show-solution">Pokaż rozwiązanie</button>
        </div>
        <div class="solution" id="solution" hidden></div>
      </div>` : ""}

      <div class="btn-row">
        <button type="button" class="btn ${done.has(l.id) ? "" : "primary"}" id="mark-done">
          ${done.has(l.id) ? "Oznacz jako nieprzerobione" : "Przerobione ✓"}</button>
      </div>

      <nav class="lesson-nav">
        ${prev ? `<a href="#/lekcja/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a href="#/lekcja/${next.id}">${isOop(next) && !oop ? "Obiektowo: " : ""}${esc(next.title)} →</a>` : `<a href="#/sciaga">Przejdź do ściągi →</a>`}
      </nav>`;

    highlight(view);
    mountPlaygrounds(view);

    if (ex) document.getElementById("show-solution").addEventListener("click", e => {
      const box = document.getElementById("solution");
      if (box.hidden) {
        box.innerHTML = ktBlock(ex.solution);
        box.hidden = false;
        mountPlaygrounds(box);
        e.target.textContent = "Ukryj rozwiązanie";
      } else {
        box.hidden = true; box.innerHTML = "";
        e.target.textContent = "Pokaż rozwiązanie";
      }
    });
    document.getElementById("mark-done").addEventListener("click", () => {
      done.has(l.id) ? done.delete(l.id) : done.add(l.id);
      store.set("done", [...done]);
      renderLesson(l.id);
    });
  }

  // ---------- ściąga ----------
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function allCheats() {
    return LESSONS.flatMap(l => l.cheats.map(c => ({ ...c, lesson: l })));
  }

  function renderCheat() {
    setMode("cheat");
    document.body.classList.remove("oop");
    renderSidebar(null);
    view.innerHTML = `
      <h1>Ściąga</h1>
      <p class="intro">Wpisz, co znasz z ${lang === "both" ? "C lub Pythona" : LANG_NAMES[lang]}, np. <code>range</code>, <code>printf</code>, <code>ternary</code>, <code>stała</code>. Wpisy z Javy (z lekcji obiektowych) są widoczne zawsze, np. <code>static</code>, <code>extends</code>.</p>
      <input class="search" id="search" type="search" placeholder="Szukaj…" autocomplete="off" value="${esc(lastSearch)}">
      <div class="cheat-count" id="cheat-count"></div>
      <div id="cheat-results"></div>`;
    const input = document.getElementById("search");
    input.addEventListener("input", () => { lastSearch = input.value; fillCheat(); });
    fillCheat();
    input.focus();
  }

  function fillCheat() {
    const shown = langsShown();
    const words = norm(lastSearch).split(/\s+/).filter(Boolean);
    const candidates = allCheats().filter(c => c.from === "java" || shown.includes(c.from));
    const matches = fields => c => words.every(w => norm(fields(c)).includes(w));
    // najpierw dopasowania w samych wpisach; słowa kluczowe lekcji tylko, gdy nic nie pasuje
    let rows = words.length ? candidates.filter(matches(c => [c.src, c.kt, c.note].join(" "))) : candidates;
    if (words.length && !rows.length)
      rows = candidates.filter(matches(c => [c.src, c.kt, c.note, c.lesson.title, c.lesson.keywords].join(" ")));
    document.getElementById("cheat-count").textContent =
      words.length ? `Wyniki: ${rows.length}` : `Wszystkie wpisy: ${rows.length}`;
    document.getElementById("cheat-results").innerHTML = rows.length ? `
      <table class="cheat-table">
        <thead><tr><th>Znasz</th><th>W Kotlinie</th><th>Uwaga</th><th>Lekcja</th></tr></thead>
        <tbody>${rows.map(c => `
          <tr>
            <td><span class="tag ${c.from}">${LANG_NAMES[c.from]}</span><br><code>${esc(c.src)}</code></td>
            <td class="kt"><code>${esc(c.kt)}</code></td>
            <td class="note">${inline(c.note || "")}</td>
            <td class="lesson-link"><a href="#/lekcja/${c.lesson.id}">${esc(c.lesson.title)}</a></td>
          </tr>`).join("")}</tbody>
      </table>` : `<p class="empty">Brak wpisów. Spróbuj innego słowa albo przełącz „Porównuj z” na „oba”.</p>`;
  }

  // ---------- router ----------
  function route() {
    const h = location.hash;
    if (h.startsWith("#/lekcja/")) renderLesson(decodeURIComponent(h.slice(9)));
    else if (h === "#/sciaga") renderCheat();
    else if (h === "#/obiektowo" && LESSONS.some(isOop)) renderLesson(LESSONS.find(isOop).id);
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
  setLangButtons();
  route();
})();
