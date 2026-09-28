/* 楊梅高中分機覽表 — 互動邏輯（純 JavaScript，可直接以 file:// 開啟） */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- 儲存（容錯） ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("ymhsExt." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ymhsExt." + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- 文字 ---------- */
  const T = {
    zh: {
      title: "楊梅高中分機覽表", subtitle: "桃園市立楊梅高級中學語音電話分機一覽表",
      navHome: "首頁", navBrowse: "瀏覽", navSearch: "檢索", navMap: "號碼地圖", navFav: "常用", navQuiz: "挑戰",
      footSrc: "資料來源：桃園市立楊梅高級中學語音電話分機一覽表", footEditor: "編製：總務處", footVer: "版本", footPdf: "📄 開啟原始 PDF",
      heroTitle: "一撥即通！<br>楊梅高中分機快速查", heroText: "輸入處室、職稱、姓氏或分機號碼，馬上找到要撥的電話。",
      heroPh: "例如：健康中心、註冊、1601、陳…", go: "查詢",
      mainTitle: "總機電話", mainTip: "撥打總機後，依語音提示輸入 4 碼分機即可轉接。",
      statUnits: "處室／場所", statExts: "支分機", statDirect: "條直撥專線", statFax: "支傳真",
      catTitle: "依類別瀏覽", catSub: "點選類別，直接跳到該類單位", directTitle: "直撥與傳真專線", directSub: "不需轉分機，可直接撥打",
      tel: "直撥", fax: "傳真", recentTitle: "最近查看", all: "全部", expandAll: "全部展開", collapseAll: "全部收合",
      items: "筆", searchPh: "搜尋處室、職稱、姓氏、分機…", keypad: "撥號鍵盤", voice: "語音搜尋",
      tryThese: "試試看：", found: "找到 {n} 筆", sortRel: "依相關度", sortExt: "依分機號碼", sortUnit: "依單位",
      noResult: "找不到符合的分機", noResultTip: "換個關鍵字，或試試只輸入分機的前兩碼（例如 13）。",
      typeToSearch: "輸入關鍵字開始檢索", typeTip: "支援中文、英文、姓氏與分機號碼，多個關鍵字請用空白分隔。",
      mapTitle: "分機號碼地圖", mapSub: "每一格代表一個分機號碼，彩色格子是已使用的分機；點一下就能查看。",
      legendUsed: "已使用", legendFree: "未使用", legendDup: "同號共用",
      favTitle: "我的常用分機", favSub: "在任何分機旁點 ⭐ 即可加入；資料只儲存在這台裝置。", favEmpty: "還沒有常用分機",
      favEmptyTip: "到「瀏覽」或「檢索」點選 ⭐，把常打的電話收進來吧！", clearRecent: "清除紀錄", clearFav: "清除全部常用",
      quizTitle: "分機大挑戰", quizSub: "考考你對校園電話有多熟！每回合 10 題。", modeA: "📇 看職稱猜分機", modeB: "🔢 看分機猜單位", modeC: "🎲 混合挑戰",
      best: "最佳紀錄", qAskExt: "這個人／地方的分機是？", qAskWho: "這支分機是哪裡？", score: "得分", streak: "連對",
      right: "答對了！🎉", wrong: "答錯了，正確答案是 {a}", next: "下一題 ➜", finish: "看成績 🏁", again: "再玩一次", back: "回挑戰首頁",
      resultGreat: "太厲害了！你是分機達人！", resultGood: "表現不錯，再接再厲！", resultTry: "多逛逛「瀏覽」頁，下次一定更好！",
      dUnit: "所屬單位", dPerson: "聯絡人", dExt: "分機", dDirect: "單位直撥", dFax: "單位傳真", call: "📞 撥打", copy: "📋 複製", fav: "⭐ 收藏", unfav: "★ 取消收藏",
      callTip: "手機點「撥打」會先撥總機 03-4789618，再自動輸入分機。", copied: "已複製：{x}", favAdded: "已加入常用 ⭐", favRemoved: "已從常用移除",
      setTitle: "⚙️ 顯示與操作設定", setReset: "↺ 恢復預設",
      sFull: "全螢幕", sSound: "音效", sDevice: "裝置", sLayout: "版面", sLang: "語言", sFont: "字體", sTheme: "色系",
      on: "開啟", off: "關閉", auto: "自動", phone: "手機", tablet: "平板", desktop: "電腦", portrait: "直式", landscape: "橫式",
      zh: "繁體中文", en: "English", small: "縮小", normal: "標準", large: "放大", system: "跟隨系統", light: "亮色", dark: "暗色",
      noteDevice: "選擇手機或平板時，會以該裝置的寬度預覽整個網站。", noteFull: "部分瀏覽器（如 iPhone Safari）不支援網頁全螢幕。",
      fsNo: "此瀏覽器不支援全螢幕", voiceNo: "此瀏覽器不支援語音搜尋", listening: "請說出要找的單位或職稱…", resetDone: "已恢復預設設定",
      unlabeled: "（原表未標示）", persons: "位", dupNote: "與其他場所共用此分機"
    },
    en: {
      title: "YMHS Extensions", subtitle: "Taoyuan Municipal Yangmei Senior High School Phone Extensions",
      navHome: "Home", navBrowse: "Browse", navSearch: "Search", navMap: "Map", navFav: "Saved", navQuiz: "Quiz",
      footSrc: "Source: YMHS voice phone extension list", footEditor: "Compiled by General Affairs Office", footVer: "Version", footPdf: "📄 Open original PDF",
      heroTitle: "One call away!<br>Find any YMHS extension", heroText: "Type an office, job title, surname or extension number to find it instantly.",
      heroPh: "e.g. Health Center, Library, 1601…", go: "Search",
      mainTitle: "Main switchboard", mainTip: "Call the main line, then enter the 4-digit extension when prompted.",
      statUnits: "Offices / Venues", statExts: "Extensions", statDirect: "Direct lines", statFax: "Fax lines",
      catTitle: "Browse by category", catSub: "Tap a category to jump to its offices", directTitle: "Direct & fax lines", directSub: "Call these numbers directly — no extension needed",
      tel: "Direct", fax: "Fax", recentTitle: "Recently viewed", all: "All", expandAll: "Expand all", collapseAll: "Collapse all",
      items: "entries", searchPh: "Search office, title, surname, extension…", keypad: "Keypad", voice: "Voice search",
      tryThese: "Try:", found: "{n} found", sortRel: "Relevance", sortExt: "Extension", sortUnit: "Office",
      noResult: "No matching extensions", noResultTip: "Try another keyword, or just the first two digits (e.g. 13).",
      typeToSearch: "Type to start searching", typeTip: "Chinese, English, surnames and numbers all work. Separate keywords with spaces.",
      mapTitle: "Extension number map", mapSub: "Each square is one extension number. Coloured squares are in use — tap one to see it.",
      legendUsed: "In use", legendFree: "Unused", legendDup: "Shared number",
      favTitle: "My favorites", favSub: "Tap ⭐ next to any extension to save it here. Stored only on this device.", favEmpty: "No favorites yet",
      favEmptyTip: "Tap ⭐ on the Browse or Search page to save numbers you call often.", clearRecent: "Clear history", clearFav: "Clear favorites",
      quizTitle: "Extension Challenge", quizSub: "How well do you know the school's phone numbers? 10 questions per round.", modeA: "📇 Title → Extension", modeB: "🔢 Extension → Office", modeC: "🎲 Mixed",
      best: "Best", qAskExt: "What is the extension for…", qAskWho: "Who answers this extension?", score: "Score", streak: "Streak",
      right: "Correct! 🎉", wrong: "Not quite — the answer is {a}", next: "Next ➜", finish: "See results 🏁", again: "Play again", back: "Quiz home",
      resultGreat: "Amazing! You're an extension expert!", resultGood: "Nice work — keep going!", resultTry: "Browse the directory a bit and try again!",
      dUnit: "Office", dPerson: "Contact", dExt: "Extension", dDirect: "Direct line", dFax: "Fax", call: "📞 Call", copy: "📋 Copy", fav: "⭐ Save", unfav: "★ Unsave",
      callTip: "On a phone, Call dials the main line 03-4789618 and then the extension.", copied: "Copied: {x}", favAdded: "Saved to favorites ⭐", favRemoved: "Removed from favorites",
      setTitle: "⚙️ Display & Controls", setReset: "↺ Reset to defaults",
      sFull: "Full screen", sSound: "Sound", sDevice: "Device", sLayout: "Layout", sLang: "Language", sFont: "Font size", sTheme: "Theme",
      on: "On", off: "Off", auto: "Auto", phone: "Phone", tablet: "Tablet", desktop: "Desktop", portrait: "Portrait", landscape: "Landscape",
      zh: "繁體中文", en: "English", small: "Small", normal: "Standard", large: "Large", system: "System", light: "Light", dark: "Dark",
      noteDevice: "Phone or Tablet previews the whole site at that device's width.", noteFull: "Some browsers (e.g. iPhone Safari) don't support web full screen.",
      fsNo: "Full screen is not supported here", voiceNo: "Voice search is not supported here", listening: "Say an office or title…", resetDone: "Settings reset",
      unlabeled: "(Not labeled)", persons: "", dupNote: "Shares this number with another room"
    }
  };

  /* ---------- 設定 ---------- */
  const DEF = { sound: true, device: "auto", layout: "auto", lang: "zh", font: "normal", theme: "system" };
  const S = Object.assign({}, DEF, store.get("settings", {}));
  const t = (k, vars) => { let s = (T[S.lang] && T[S.lang][k]) || T.zh[k] || k; if (vars) for (const v in vars) s = s.replace("{" + v + "}", vars[v]); return s; };
  const L = o => (S.lang === "en" ? o.en : o.zh);

  /* ---------- 資料整理 ---------- */
  const lum = hex => { const n = parseInt(hex.slice(1), 16); const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255; return 0.299 * r + 0.587 * g + 0.114 * b; };
  const UNITS = window.UNITS.map(u => Object.assign(u, { fg: lum(u.color) > 0.7 ? "#2b2140" : "#ffffff" }));
  const UMAP = Object.fromEntries(UNITS.map(u => [u.id, u]));
  const personEn = p => {
    if (!p) return "";
    const h = Object.keys(window.HONOR).find(k => p.endsWith(k));
    const sur = window.SURNAME[p[0]] || p[0];
    return h ? (h === "小姐" || h === "先生" ? `${window.HONOR[h]} ${sur}` : `${window.HONOR[h]} ${sur}`) : p;
  };
  const ENTRIES = [];
  UNITS.forEach(u => u.items.forEach((it, i) => {
    ENTRIES.push({ key: u.id + "-" + i, unit: u, zh: it[0], en: it[1], exts: it[2].split(/\s+/), person: it[3], personEn: personEn(it[3]) });
  }));
  const EMAP = Object.fromEntries(ENTRIES.map(e => [e.key, e]));
  const EXT_COUNT = {};
  ENTRIES.forEach(e => e.exts.forEach(x => (EXT_COUNT[x] = (EXT_COUNT[x] || 0) + 1)));
  const eName = e => (S.lang === "en" ? e.en : e.zh);
  const ePerson = e => (S.lang === "en" ? e.personEn : e.person);
  const cVars = u => `--c:${u.color};--fg:${u.fg}`;

  let favs = store.get("favs", []).filter(k => EMAP[k]);
  let recent = store.get("recent", []).filter(k => EMAP[k]);
  const isFav = k => favs.includes(k);

  /* ---------- 音效（Web Audio 合成） ---------- */
  let AC = null;
  const ac = () => { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } if (AC.state === "suspended") AC.resume(); return AC; };
  function tone(freq, dur = 0.12, type = "sine", vol = 0.18, delay = 0, slide = 0) {
    if (!S.sound) return; const a = ac(); if (!a) return;
    const t0 = a.currentTime + delay, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t0); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(a.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  }
  const DTMF = { "1": [697, 1209], "2": [697, 1336], "3": [697, 1477], "4": [770, 1209], "5": [770, 1336], "6": [770, 1477], "7": [852, 1209], "8": [852, 1336], "9": [852, 1477], "*": [941, 1209], "0": [941, 1336], "#": [941, 1477] };
  const sfx = {
    tap: () => tone(700, 0.06, "sine", 0.12),
    tab: () => { tone(520, 0.08, "triangle", 0.14); tone(780, 0.1, "triangle", 0.14, 0.06); },
    open: () => { tone(440, 0.1, "sine", 0.14, 0, 880); },
    close: () => { tone(660, 0.1, "sine", 0.12, 0, 330); },
    copy: () => { tone(1200, 0.05, "square", 0.06); tone(1600, 0.07, "square", 0.06, 0.05); },
    star: () => [880, 1175, 1568].forEach((f, i) => tone(f, 0.12, "triangle", 0.12, i * 0.06)),
    unstar: () => tone(500, 0.12, "triangle", 0.1, 0, 300),
    good: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, "triangle", 0.15, i * 0.08)),
    bad: () => { tone(220, 0.25, "sawtooth", 0.1, 0, 140); },
    toggle: () => tone(900, 0.04, "square", 0.07),
    dtmf: d => { const p = DTMF[d]; if (p) { tone(p[0], 0.14, "sine", 0.12); tone(p[1], 0.14, "sine", 0.12); } },
    ring: () => { for (let i = 0; i < 6; i++) { tone(i % 2 ? 480 : 440, 0.09, "sine", 0.14, i * 0.1); } },
    fanfare: () => [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, 0.2, "triangle", 0.16, i * 0.11))
  };

  /* ---------- 共用 UI ---------- */
  let toastTimer;
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1900); }
  async function copyText(txt) {
    try { await navigator.clipboard.writeText(txt); } catch (e) {
      const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e2) {} ta.remove();
    }
    sfx.copy(); toast(t("copied", { x: txt }));
  }
  function toggleFav(k) {
    if (isFav(k)) { favs = favs.filter(x => x !== k); sfx.unstar(); toast(t("favRemoved")); }
    else { favs.unshift(k); sfx.star(); toast(t("favAdded")); }
    store.set("favs", favs);
    $$(`.star[data-fav="${k}"]`).forEach(b => { b.classList.toggle("on", isFav(k)); b.textContent = isFav(k) ? "⭐" : "☆"; });
  }
  function addRecent(k) { recent = [k, ...recent.filter(x => x !== k)].slice(0, 12); store.set("recent", recent); }
  const telExt = x => `tel:034789618,${x}`;
  const telDirect = n => `tel:03${n}`;
  const fmt = n => `03-${n}`;

  function hl(text, terms) {
    let s = esc(text);
    if (!terms || !terms.length) return s;
    terms.forEach(term => { if (!term) return; const re = new RegExp("(" + esc(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"); s = s.replace(re, "<mark>$1</mark>"); });
    return s;
  }
  function rowHTML(e, opt = {}) {
    const terms = opt.terms || [];
    const nm = e.zh.startsWith("（") ? t("unlabeled") : eName(e);
    const per = ePerson(e);
    return `<li class="row" data-key="${e.key}" style="${cVars(e.unit)}" tabindex="0">
      <div class="nm">${opt.showUnit ? `<span class="un">${e.unit.icon} ${esc(L(e.unit))}</span>` : ""}${hl(nm, terms)}${per ? `<span class="ps">👤 ${hl(per, terms)}</span>` : ""}</div>
      <div class="exts">${e.exts.map(x => `<button class="ext" data-copy="${x}" title="${esc(t("copy"))}">${hl(x, terms.filter(q => /^\d+$/.test(q)))}</button>`).join("")}</div>
      <button class="star ${isFav(e.key) ? "on" : ""}" data-fav="${e.key}" aria-label="${esc(t("fav"))}">${isFav(e.key) ? "⭐" : "☆"}</button>
    </li>`;
  }

  /* ---------- 頁面 ---------- */
  const view = $("#view");
  let current = "home";
  const state = { cat: "all", q: "", sort: "rel", scat: "all", keypad: false, closed: new Set() };

  function heroArt() {
    return `<svg viewBox="0 0 220 220" aria-hidden="true">
      <circle class="ring-wave" cx="110" cy="110" r="70" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
      <circle class="ring-wave w2" cx="110" cy="110" r="70" fill="none" stroke="#fff59d" stroke-width="5" opacity=".7"/>
      <circle class="ring-wave w3" cx="110" cy="110" r="70" fill="none" stroke="#b2ebf2" stroke-width="5" opacity=".7"/>
      <g class="phone-body">
        <rect x="70" y="112" width="80" height="54" rx="16" fill="#fff"/>
        <path d="M58 104c0-26 104-26 104 0v10c0 6-5 9-10 8l-16-3c-4-1-6-4-6-8v-6c-14-5-26-5-40 0v6c0 4-2 7-6 8l-16 3c-5 1-10-2-10-8z" fill="#ffeb3b" stroke="#fff" stroke-width="3"/>
        <g fill="#ec407a">${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle cx="${92 + c * 18}" cy="${126 + r * 13}" r="4.5"/>`).join("")).join("")}</g>
      </g>
    </svg>
    <span class="bubble" style="left:4%;top:8%">📚</span><span class="bubble" style="right:6%;top:4%;animation-delay:-2s">🏫</span>
    <span class="bubble" style="left:10%;bottom:6%;animation-delay:-4s">🧪</span><span class="bubble" style="right:2%;bottom:14%;animation-delay:-1s">💬</span>`;
  }

  function pageHome() {
    const uniq = Object.keys(EXT_COUNT).length;
    const nDirect = UNITS.filter(u => u.tel).length, nFax = UNITS.filter(u => u.fax).length;
    const icons = ["☎️", "📞", "📱"], colors = ["#ec407a", "#7e57c2", "#26a69a"];
    const catG = { admin: "linear-gradient(135deg,#ff8a65,#ec407a)", office: "linear-gradient(135deg,#ffb300,#fb8c00)", room: "linear-gradient(135deg,#26c6da,#5c6bc0)" };
    return `<div class="page">
      <section class="hero">
        <div class="hero-deco"><i style="width:120px;height:120px;left:-30px;top:-30px"></i><i style="width:70px;height:70px;left:45%;bottom:-20px;animation-delay:-3s"></i></div>
        <div>
          <h1>${t("heroTitle")}</h1>
          <p>${t("heroText")}</p>
          <form class="hero-search" id="heroForm" role="search">
            <input id="heroQ" type="search" placeholder="${esc(t("heroPh"))}" aria-label="${esc(t("searchPh"))}" autocomplete="off">
            <button type="submit">🔍 ${t("go")}</button>
          </form>
        </div>
        <div class="hero-art">${heroArt()}</div>
      </section>

      <h2 class="sec-title"><span class="dot"></span>☎️ ${t("mainTitle")}</h2>
      <p class="sec-sub">${t("mainTip")}</p>
      <div class="mainlines">${window.PHONE.main.map((m, i) => `
        <a class="mainline" href="tel:${m.num.replace(/-/g, "")}" data-ring style="--c:${colors[i]}">
          <span class="ml-ico">${icons[i]}</span><span><b>${m.num}</b><small>${L(m)}</small></span></a>`).join("")}
      </div>

      <div class="stats">
        <div class="stat" style="--c:#ec407a"><div class="e">🏢</div><div class="n" data-count="${UNITS.length}">0</div><div class="l">${t("statUnits")}</div></div>
        <div class="stat" style="--c:#7e57c2"><div class="e">🔢</div><div class="n" data-count="${uniq}">0</div><div class="l">${t("statExts")}</div></div>
        <div class="stat" style="--c:#26a69a"><div class="e">📞</div><div class="n" data-count="${nDirect}">0</div><div class="l">${t("statDirect")}</div></div>
        <div class="stat" style="--c:#fb8c00"><div class="e">📠</div><div class="n" data-count="${nFax}">0</div><div class="l">${t("statFax")}</div></div>
      </div>

      <h2 class="sec-title"><span class="dot"></span>🧭 ${t("catTitle")}</h2>
      <p class="sec-sub">${t("catSub")}</p>
      <div class="cat-tiles">${window.CATS.map(c => {
        const us = UNITS.filter(u => u.cat === c.id);
        const n = us.reduce((a, u) => a + u.items.length, 0);
        return `<button class="cat-tile" data-cat="${c.id}" style="--g:${catG[c.id]}"><span class="ci">${c.icon}</span><b>${L(c)}</b><small>${us.length} ${S.lang === "en" ? "units" : "個單位"} · ${n} ${t("items")}</small>
          <div class="units">${us.map(u => `<span>${u.icon} ${esc(L(u))}</span>`).join("")}</div></button>`;
      }).join("")}</div>

      <h2 class="sec-title"><span class="dot"></span>📠 ${t("directTitle")}</h2>
      <p class="sec-sub">${t("directSub")}</p>
      <div class="units-grid">${UNITS.filter(u => u.tel || u.fax).map((u, i) => `
        <div class="unit" style="${cVars(u)};animation-delay:${i * 40}ms">
          <button class="unit-head" data-goto="${u.id}"><span class="ui">${u.icon}</span><h3>${esc(L(u))}</h3><span class="caret">➜</span></button>
          <div class="direct" style="padding-bottom:14px">
            ${u.tel ? `<a href="${telDirect(u.tel)}" data-ring>📞 ${t("tel")} ${fmt(u.tel)}</a>` : ""}
            ${u.fax ? `<span>📠 ${t("fax")} ${fmt(u.fax)}</span>` : ""}
          </div></div>`).join("")}
      </div>

      ${recent.length ? `<h2 class="sec-title"><span class="dot"></span>🕘 ${t("recentTitle")}</h2><ul class="rows results">${recent.slice(0, 6).map(k => rowHTML(EMAP[k], { showUnit: true })).join("")}</ul>` : ""}
    </div>`;
  }

  function pageBrowse() {
    const us = UNITS.filter(u => state.cat === "all" || u.cat === state.cat);
    const allClosed = us.every(u => state.closed.has(u.id));
    return `<div class="page">
      <div class="filterbar">
        <button class="chip ${state.cat === "all" ? "on" : ""}" data-bcat="all">🌈 ${t("all")}</button>
        ${window.CATS.map(c => `<button class="chip ${state.cat === c.id ? "on" : ""}" data-bcat="${c.id}">${c.icon} ${L(c)}</button>`).join("")}
        <button class="chip" id="toggleAll" style="margin-left:auto">${allClosed ? "➕ " + t("expandAll") : "➖ " + t("collapseAll")}</button>
      </div>
      <div class="jump">${us.map(u => `<button data-goto="${u.id}" style="${cVars(u)}">${u.icon} ${esc(L(u))}</button>`).join("")}</div>
      <div class="units-grid">${us.map((u, i) => `
        <section class="unit ${state.closed.has(u.id) ? "closed" : ""}" id="u-${u.id}" style="${cVars(u)};animation-delay:${Math.min(i, 10) * 45}ms">
          <button class="unit-head" data-fold="${u.id}" aria-expanded="${!state.closed.has(u.id)}">
            <span class="ui">${u.icon}</span><span><h3>${esc(L(u))}</h3><span class="cnt">${u.items.length} ${t("items")}</span></span><span class="caret">▼</span>
          </button>
          <div class="unit-body">
            ${u.tel || u.fax ? `<div class="direct">${u.tel ? `<a href="${telDirect(u.tel)}" data-ring>📞 ${t("tel")} ${fmt(u.tel)}</a>` : ""}${u.fax ? `<span>📠 ${t("fax")} ${fmt(u.fax)}</span>` : ""}</div>` : ""}
            <ul class="rows">${ENTRIES.filter(e => e.unit === u).map(e => rowHTML(e)).join("")}</ul>
          </div>
        </section>`).join("")}
      </div>
    </div>`;
  }

  /* 檢索 */
  function doSearch(q) {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return { terms, list: [] };
    const list = [];
    ENTRIES.forEach(e => {
      const hay = [e.zh, e.en, e.person, e.personEn, e.unit.zh, e.unit.en, e.exts.join(" ")].join(" ").toLowerCase();
      if (!terms.every(term => hay.includes(term))) return;
      let score = 0;
      terms.forEach(term => {
        if (/^\d+$/.test(term)) { if (e.exts.some(x => x === term)) score += 50; else if (e.exts.some(x => x.startsWith(term))) score += 20; else score += 2; }
        else {
          const n = (e.zh + " " + e.en).toLowerCase();
          if (n === term) score += 40; else if (n.startsWith(term)) score += 25; else if (n.includes(term)) score += 15;
          if ((e.person + " " + e.personEn).toLowerCase().includes(term)) score += 12;
          if ((e.unit.zh + " " + e.unit.en).toLowerCase().includes(term)) score += 8;
        }
      });
      list.push({ e, score });
    });
    return { terms, list };
  }
  function resultsHTML() {
    const { terms, list } = doSearch(state.q);
    const filtered = list.filter(r => state.scat === "all" || r.e.unit.cat === state.scat);
    if (!terms.length) return `<div class="empty"><span class="big">🔎</span><h3>${t("typeToSearch")}</h3><p>${t("typeTip")}</p></div>`;
    if (!filtered.length) return `<div class="empty"><span class="big">🙈</span><h3>${t("noResult")}</h3><p>${t("noResultTip")}</p></div>`;
    const s = state.sort;
    filtered.sort((a, b) => s === "ext" ? a.e.exts[0].localeCompare(b.e.exts[0]) : s === "unit" ? UNITS.indexOf(a.e.unit) - UNITS.indexOf(b.e.unit) || a.e.exts[0].localeCompare(b.e.exts[0]) : b.score - a.score || a.e.exts[0].localeCompare(b.e.exts[0]));
    const origTerms = state.q.trim().split(/\s+/).filter(Boolean);
    return `<div class="result-meta"><span>✨ ${t("found", { n: filtered.length })}</span>
      <select id="sortSel" aria-label="sort"><option value="rel" ${s === "rel" ? "selected" : ""}>${t("sortRel")}</option><option value="ext" ${s === "ext" ? "selected" : ""}>${t("sortExt")}</option><option value="unit" ${s === "unit" ? "selected" : ""}>${t("sortUnit")}</option></select></div>
      <ul class="results">${filtered.map((r, i) => rowHTML(r.e, { showUnit: true, terms: origTerms }).replace('class="row"', `class="row" style="animation-delay:${Math.min(i, 12) * 25}ms;${cVars(r.e.unit)}"`)).join("")}</ul>`;
  }
  function pageSearch() {
    const hints = S.lang === "en" ? ["Director", "Health", "Library", "Lab", "Chen", "13", "Computer"] : ["主任", "健康中心", "圖書館", "實驗室", "陳", "13", "電腦教室"];
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "C"];
    return `<div class="page">
      <div class="search-box">
        <span class="sico">🔍</span>
        <input id="q" type="search" value="${esc(state.q)}" placeholder="${esc(t("searchPh"))}" aria-label="${esc(t("searchPh"))}" autocomplete="off">
        <button class="sb-btn" id="voiceBtn" title="${esc(t("voice"))}" aria-label="${esc(t("voice"))}">🎤</button>
        <button class="sb-btn ${state.keypad ? "on" : ""}" id="padBtn" title="${esc(t("keypad"))}" aria-label="${esc(t("keypad"))}">🔢</button>
      </div>
      ${state.keypad ? `<div class="keypad" id="keypad"><div class="kd" id="kd">${/^\d+$/.test(state.q) ? state.q : "····"}</div>
        ${keys.map(k => `<button class="key ${/\d/.test(k) ? "" : "fn"}" data-k="${k}">${k}${/\d/.test(k) ? `<small>${["", "", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"][+k] || "&nbsp;"}</small>` : ""}</button>`).join("")}</div>` : ""}
      <div class="hints"><span class="lbl">${t("tryThese")}</span>${hints.map(h => `<button class="hint" data-hint="${esc(h)}">${esc(h)}</button>`).join("")}</div>
      <div class="filterbar">
        <button class="chip ${state.scat === "all" ? "on" : ""}" data-scat="all">🌈 ${t("all")}</button>
        ${window.CATS.map(c => `<button class="chip ${state.scat === c.id ? "on" : ""}" data-scat="${c.id}">${c.icon} ${L(c)}</button>`).join("")}
      </div>
      <div id="results">${resultsHTML()}</div>
    </div>`;
  }
  function refreshResults() { const r = $("#results"); if (r) r.innerHTML = resultsHTML(); const kd = $("#kd"); if (kd) kd.textContent = /^\d+$/.test(state.q) ? state.q : "····"; }

  /* 號碼地圖 */
  function pageMap() {
    const byExt = {};
    ENTRIES.forEach(e => e.exts.forEach(x => (byExt[x] = byExt[x] || []).push(e)));
    const bands = [...new Set(Object.keys(byExt).map(x => x.slice(0, 2)))].sort();
    return `<div class="page">
      <h2 class="sec-title"><span class="dot"></span>🗺️ ${t("mapTitle")}</h2>
      <p class="sec-sub">${t("mapSub")}</p>
      <div class="legend"><span><i style="background:var(--grad)"></i>${t("legendUsed")}</span><span><i style="background:var(--chip)"></i>${t("legendFree")}</span><span><i style="outline:3px dashed var(--bad);background:var(--chip)"></i>${t("legendDup")}</span></div>
      <div class="band-list">${bands.map(b => {
        const us = [...new Set(Object.keys(byExt).filter(x => x.startsWith(b)).flatMap(x => byExt[x].map(e => e.unit)))];
        const cells = Array.from({ length: 100 }, (_, i) => {
          const x = b + String(i).padStart(2, "0"); const es = byExt[x];
          if (!es) return `<span class="cell" aria-hidden="true"></span>`;
          const u = es[0].unit;
          return `<button class="cell used ${es.length > 1 ? "dup" : ""}" data-key="${es[0].key}" style="${cVars(u)}" title="${x} ${esc(es.map(e => eName(e)).join(" / "))}" aria-label="${x} ${esc(eName(es[0]))}">${String(i).padStart(2, "0")}</button>`;
        }).join("");
        return `<div class="band"><div class="band-head"><span class="bn">${b}xx</span><div class="bu">${us.map(u => `<span style="${cVars(u)}">${u.icon} ${esc(L(u))}</span>`).join("")}</div></div><div class="cells">${cells}</div></div>`;
      }).join("")}</div>
    </div>`;
  }

  /* 常用 */
  function pageFav() {
    return `<div class="page">
      <h2 class="sec-title"><span class="dot"></span>⭐ ${t("favTitle")}</h2>
      <p class="sec-sub">${t("favSub")}</p>
      ${favs.length ? `<div class="fav-grid">${favs.map((k, i) => { const e = EMAP[k]; return `
        <div class="fav-card" data-key="${k}" style="${cVars(e.unit)};animation-delay:${i * 50}ms" tabindex="0">
          <button class="star on" data-fav="${k}" aria-label="${esc(t("unfav"))}">⭐</button>
          <div class="fu">${e.unit.icon} ${esc(L(e.unit))}</div><div class="fn">${esc(eName(e))}${ePerson(e) ? " · " + esc(ePerson(e)) : ""}</div>
          <div class="fe">${e.exts.join(" / ")}</div></div>`; }).join("")}</div>
        <p style="text-align:right"><button class="btn ghost" id="clearFav">🗑️ ${t("clearFav")}</button></p>`
      : `<div class="empty"><span class="big">🌟</span><h3>${t("favEmpty")}</h3><p>${t("favEmptyTip")}</p></div>`}
      ${recent.length ? `<h2 class="sec-title"><span class="dot"></span>🕘 ${t("recentTitle")}</h2>
        <ul class="results">${recent.map(k => rowHTML(EMAP[k], { showUnit: true })).join("")}</ul>
        <p style="text-align:right"><button class="btn ghost" id="clearRecent">🧹 ${t("clearRecent")}</button></p>` : ""}
    </div>`;
  }

  /* 挑戰 */
  const quiz = { on: false, mode: "A", list: [], i: 0, score: 0, streak: 0 };
  const QPOOL = ENTRIES.filter(e => !e.zh.startsWith("（"));
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function makeQuestion(mode) {
    const type = mode === "C" ? (Math.random() < 0.5 ? "A" : "B") : mode;
    const e = QPOOL[Math.floor(Math.random() * QPOOL.length)];
    const ans = e.exts[0];
    const others = shuffle(QPOOL.filter(o => !o.exts.includes(ans) && !(EXT_COUNT[o.exts[0]] > 1 && o.exts[0] === ans)));
    const picked = []; const seen = new Set([ans]);
    // 干擾選項：優先同單位或相近號碼
    const near = others.filter(o => o.unit === e.unit || o.exts[0].slice(0, 2) === ans.slice(0, 2));
    [...near, ...others].forEach(o => { if (picked.length < 3 && !seen.has(o.exts[0])) { seen.add(o.exts[0]); picked.push(o); } });
    const opts = shuffle([e, ...picked]);
    return { type, e, opts };
  }
  function startQuiz(mode) { quiz.on = true; quiz.mode = mode; quiz.i = 0; quiz.score = 0; quiz.streak = 0; quiz.list = Array.from({ length: 10 }, () => makeQuestion(mode)); sfx.tab(); render(); }
  const optLabel = o => `${eName(o)}${ePerson(o) ? "（" + ePerson(o) + "）" : ""} · ${L(o.unit)}`;
  function pageQuiz() {
    const best = store.get("best", 0);
    if (!quiz.on) return `<div class="page"><div class="quiz-card">
      <span class="big-emoji">🎮</span><h2 style="margin:6px 0">${t("quizTitle")}</h2><p style="color:var(--ink2)">${t("quizSub")}</p>
      <div class="quiz-modes"><button class="btn" data-mode="A">${t("modeA")}</button><button class="btn alt" data-mode="B">${t("modeB")}</button><button class="btn ghost" data-mode="C">${t("modeC")}</button></div>
      <p>🏆 ${t("best")}：<b>${best}</b> / 10</p></div></div>`;
    if (quiz.i >= quiz.list.length) {
      const sc = quiz.score, msg = sc >= 8 ? t("resultGreat") : sc >= 5 ? t("resultGood") : t("resultTry");
      return `<div class="page"><div class="quiz-card"><span class="big-emoji">${sc >= 8 ? "🏆" : sc >= 5 ? "🥈" : "💪"}</span>
        <h2 style="margin:6px 0">${t("score")}：${sc} / 10</h2><p style="font-size:1.6rem;margin:4px 0">${"⭐".repeat(Math.round(sc / 2))}${"☆".repeat(5 - Math.round(sc / 2))}</p>
        <p style="font-weight:700">${msg}</p><p>🏆 ${t("best")}：${best} / 10</p>
        <div class="quiz-modes"><button class="btn" data-mode="${quiz.mode}">🔁 ${t("again")}</button><button class="btn ghost" id="quizHome">${t("back")}</button></div></div></div>`;
    }
    const q = quiz.list[quiz.i], d = q.done;
    const main = q.type === "A"
      ? `<div class="q-ask">${t("qAskExt")}</div><div class="q-main">${esc(eName(q.e))}${ePerson(q.e) ? `<br><small style="font-size:1.1rem;color:var(--ink2)">👤 ${esc(ePerson(q.e))}</small>` : ""}</div><span class="q-unit" style="${cVars(q.e.unit)}">${q.e.unit.icon} ${esc(L(q.e.unit))}</span>`
      : `<div class="q-ask">${t("qAskWho")}</div><div class="q-main num">${q.e.exts[0]}</div>`;
    return `<div class="page"><div class="quiz-card">
      <div class="quiz-top"><span>❓ ${quiz.i + 1} / 10</span><span>🎯 ${t("score")} ${quiz.score}</span><span>🔥 ${t("streak")} ${quiz.streak}</span></div>
      <div class="progress"><i style="width:${quiz.i * 10}%"></i></div>
      ${main}
      <div class="opts">${q.opts.map(o => {
        const cls = !d ? "" : o.exts[0] === q.e.exts[0] ? "right" : o.key === d.key ? "wrong" : "";
        return `<button class="opt ${q.type === "A" ? "num" : ""} ${cls}" data-opt="${o.key}" ${d ? "disabled" : ""}>${q.type === "A" ? o.exts[0] : esc(optLabel(o))}</button>`;
      }).join("")}</div>
      <div class="feedback" style="color:${d && d.ok ? "var(--good)" : "var(--bad)"}">${!d ? "" : d.ok ? t("right") + (quiz.streak >= 3 ? ` 🔥×${quiz.streak}` : "") : esc(t("wrong", { a: q.type === "A" ? q.e.exts[0] : optLabel(q.e) }))}</div>
      ${d ? `<button class="btn" id="nextQ" style="margin-top:10px">${quiz.i === quiz.list.length - 1 ? t("finish") : t("next")}</button>` : ""}</div></div>`;
  }
  function answer(key) {
    const q = quiz.list[quiz.i];
    if (q.done) return;
    const ok = EMAP[key].exts[0] === q.e.exts[0];
    q.done = { key, ok };
    if (ok) { quiz.score++; quiz.streak++; sfx.good(); if (quiz.streak >= 3) confetti(40); }
    else { quiz.streak = 0; sfx.bad(); }
    render();
    const pg = view.firstElementChild; if (pg) pg.style.animation = "none";
    const n = $("#nextQ"); if (n) n.focus({ preventScroll: true });
  }
  function nextQ() {
    quiz.i++;
    if (quiz.i >= quiz.list.length) { if (quiz.score > store.get("best", 0)) store.set("best", quiz.score); if (quiz.score >= 7) { sfx.fanfare(); confetti(160); } else sfx.tab(); }
    else sfx.tap();
    render();
  }

  /* 詳細視窗 */
  function openDetail(key) {
    const e = EMAP[key]; if (!e) return;
    addRecent(key); sfx.open();
    const u = e.unit, dup = e.exts.some(x => EXT_COUNT[x] > 1);
    $("#modalBox").setAttribute("style", cVars(u));
    $("#modalBox").innerHTML = `
      <div class="md-head"><button class="md-close" id="mdClose" aria-label="close">✖️</button><span class="mi">${u.icon}</span>
        <h3>${esc(e.zh.startsWith("（") ? t("unlabeled") : eName(e))}</h3><div class="mu">${esc(L(u))}</div></div>
      <div class="md-body">
        <div class="md-ext">${e.exts.map(x => `<b>${x}</b>`).join("")}</div>
        <ul class="md-info">
          <li><span>${t("dUnit")}</span><span>${u.icon} ${esc(L(u))}</span></li>
          ${e.person ? `<li><span>${t("dPerson")}</span><span>👤 ${esc(ePerson(e))}</span></li>` : ""}
          <li><span>${t("dExt")}</span><span>${e.exts.join("、")}${dup ? ` <small style="color:var(--bad)">（${t("dupNote")}）</small>` : ""}</span></li>
          ${u.tel ? `<li><span>${t("dDirect")}</span><span><a href="${telDirect(u.tel)}" data-ring>${fmt(u.tel)}</a></span></li>` : ""}
          ${u.fax ? `<li><span>${t("dFax")}</span><span>${fmt(u.fax)}</span></li>` : ""}
        </ul>
        <div class="md-actions">
          <a class="btn" href="${telExt(e.exts[0])}" data-ring>${t("call")}</a>
          <button class="btn alt" data-copy="${e.exts[0]}">${t("copy")}</button>
          <button class="btn ghost star-btn" data-mfav="${key}">${isFav(key) ? t("unfav") : t("fav")}</button>
        </div>
        <p class="md-tip">💡 ${t("callTip")}</p>
      </div>`;
    $("#modal").hidden = false;
    setTimeout(() => $("#mdClose").focus({ preventScroll: true }), 30);
  }
  function closeModal() { if ($("#modal").hidden) return; $("#modal").hidden = true; sfx.close(); }

  /* ---------- 路由與繪製 ---------- */
  const PAGES = { home: pageHome, browse: pageBrowse, search: pageSearch, map: pageMap, fav: pageFav, quiz: pageQuiz };
  function render() {
    view.innerHTML = PAGES[current]();
    $$(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.view === current));
    if (current === "home") countUp();
  }
  function go(v, opt = {}) {
    if (!PAGES[v]) v = "home";
    const changed = v !== current; current = v;
    if (location.hash.slice(1) !== v) history.replaceState(null, "", "#" + v);
    render();
    if (changed && !opt.keepScroll) window.scrollTo(0, 0);
    if (opt.focusSearch) { const q = $("#q"); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } }
  }
  window.addEventListener("hashchange", () => { const v = location.hash.slice(1); if (v !== current) { sfx.tab(); go(v); } });

  function countUp() {
    $$("[data-count]").forEach(el => {
      const end = +el.dataset.count, t0 = performance.now(), dur = 900;
      const step = now => { const p = Math.min(1, (now - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  function gotoUnit(id) {
    const u = UMAP[id]; if (!u) return;
    if (state.cat !== "all" && state.cat !== u.cat) state.cat = "all";
    state.closed.delete(id);
    if (current !== "browse") go("browse");
    else render();
    const el = $("#u-" + id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }
  }

  /* ---------- 事件 ---------- */
  document.addEventListener("click", ev => {
    const el = ev.target;
    const btn = el.closest("button, a");
    if (btn && (btn.classList.contains("btn") || btn.classList.contains("cat-tile"))) ripple(btn, ev);

    const ring = el.closest("[data-ring]"); if (ring) { sfx.ring(); return; }
    const tab = el.closest(".tabs button"); if (tab) { sfx.tab(); go(tab.dataset.view); return; }
    const cp = el.closest("[data-copy]"); if (cp) { ev.stopPropagation(); copyText(cp.dataset.copy); return; }
    const fv = el.closest("[data-fav]"); if (fv) { ev.stopPropagation(); toggleFav(fv.dataset.fav); if (current === "fav") render(); return; }
    const mf = el.closest("[data-mfav]"); if (mf) { toggleFav(mf.dataset.mfav); mf.textContent = isFav(mf.dataset.mfav) ? t("unfav") : t("fav"); if (current === "fav") render(); return; }
    if (el.closest("#mdClose") || el.id === "modal") { closeModal(); return; }
    const opt = el.closest("[data-opt]"); if (opt) { answer(opt.dataset.opt); return; }
    if (el.closest("#nextQ")) { nextQ(); return; }
    const md = el.closest("[data-mode]"); if (md) { startQuiz(md.dataset.mode); return; }
    if (el.closest("#quizHome")) { quiz.on = false; sfx.tap(); render(); return; }
    const row = el.closest("[data-key]"); if (row) { openDetail(row.dataset.key); return; }
    const gt = el.closest("[data-goto]"); if (gt) { sfx.tab(); gotoUnit(gt.dataset.goto); return; }
    const fold = el.closest("[data-fold]"); if (fold) {
      const id = fold.dataset.fold; state.closed.has(id) ? state.closed.delete(id) : state.closed.add(id);
      const sec = $("#u-" + id); sec.classList.toggle("closed", state.closed.has(id)); fold.setAttribute("aria-expanded", !state.closed.has(id)); sfx.toggle(); return;
    }
    if (el.closest("#toggleAll")) {
      const us = UNITS.filter(u => state.cat === "all" || u.cat === state.cat);
      const allClosed = us.every(u => state.closed.has(u.id));
      us.forEach(u => allClosed ? state.closed.delete(u.id) : state.closed.add(u.id)); sfx.toggle(); render(); return;
    }
    const bc = el.closest("[data-bcat]"); if (bc) { state.cat = bc.dataset.bcat; sfx.tap(); render(); return; }
    const ct = el.closest("[data-cat]"); if (ct) { state.cat = ct.dataset.cat; sfx.tab(); go("browse"); return; }
    const sc = el.closest("[data-scat]"); if (sc) { state.scat = sc.dataset.scat; sfx.tap(); $$("[data-scat]").forEach(b => b.classList.toggle("on", b === sc)); refreshResults(); return; }
    const hint = el.closest("[data-hint]"); if (hint) { state.q = hint.dataset.hint; $("#q").value = state.q; sfx.tap(); refreshResults(); return; }
    if (el.closest("#padBtn")) { state.keypad = !state.keypad; sfx.toggle(); render(); return; }
    const key = el.closest("[data-k]"); if (key) { pressKey(key.dataset.k, key); return; }
    if (el.closest("#voiceBtn")) { voice(); return; }
    if (el.closest("#clearRecent")) { recent = []; store.set("recent", recent); sfx.unstar(); render(); return; }
    if (el.closest("#clearFav")) { favs = []; store.set("favs", favs); sfx.unstar(); render(); return; }
  });
  document.addEventListener("keydown", ev => {
    if (ev.key === "Escape") { closeModal(); closeDrawer(); return; }
    if ((ev.key === "Enter" || ev.key === " ") && ev.target.matches(".row, .fav-card")) { ev.preventDefault(); openDetail(ev.target.dataset.key); return; }
    const typing = ev.target.matches("input, textarea, select");
    if (ev.key === "/" && !typing) { ev.preventDefault(); go("search", { focusSearch: true }); return; }
    if (current === "search" && state.keypad && !typing && /^[0-9]$/.test(ev.key)) { pressKey(ev.key, $(`[data-k="${ev.key}"]`)); }
    if (current === "search" && state.keypad && !typing && ev.key === "Backspace") { pressKey("⌫", $(`[data-k="⌫"]`)); }
  });
  document.addEventListener("input", ev => {
    if (ev.target.id === "q") { state.q = ev.target.value; refreshResults(); }
  });
  document.addEventListener("change", ev => { if (ev.target.id === "sortSel") { state.sort = ev.target.value; sfx.tap(); refreshResults(); } });
  document.addEventListener("submit", ev => {
    if (ev.target.id === "heroForm") { ev.preventDefault(); state.q = $("#heroQ").value.trim(); sfx.tab(); go("search", { focusSearch: true }); }
  });

  function pressKey(k, el) {
    if (el) { el.classList.add("hit"); setTimeout(() => el.classList.remove("hit"), 120); }
    let v = /^\d+$/.test(state.q) ? state.q : "";
    if (k === "⌫") { v = v.slice(0, -1); sfx.tap(); }
    else if (k === "C") { v = ""; sfx.close(); }
    else { if (v.length >= 4) v = ""; v += k; sfx.dtmf(k); }
    state.q = v; const q = $("#q"); if (q) q.value = v; refreshResults();
    if (v.length === 4) { const exact = ENTRIES.find(e => e.exts.includes(v)); if (exact) setTimeout(() => sfx.ring(), 180); }
  }
  let recog = null;
  function voice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast(t("voiceNo")); sfx.bad(); return; }
    const b = $("#voiceBtn");
    if (recog) { recog.stop(); return; }
    recog = new SR(); recog.lang = S.lang === "en" ? "en-US" : "zh-TW"; recog.interimResults = false;
    recog.onresult = e => { state.q = e.results[0][0].transcript.replace(/[。，.,!?？！]/g, "").trim(); $("#q").value = state.q; refreshResults(); sfx.good(); };
    recog.onend = () => { recog = null; b && b.classList.remove("listening"); };
    recog.onerror = () => { recog = null; b && b.classList.remove("listening"); };
    b.classList.add("listening"); toast(t("listening")); sfx.open();
    try { recog.start(); } catch (e) { recog = null; b.classList.remove("listening"); }
  }

  function ripple(el, ev) {
    const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height);
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    el.style.overflow = "hidden";
    const s = document.createElement("span"); s.className = "ripple";
    const z = parseFloat(getComputedStyle($("#zoomer")).zoom) || 1;
    s.style.cssText = `width:${d / z}px;height:${d / z}px;left:${(ev.clientX - r.left - d / 2) / z}px;top:${(ev.clientY - r.top - d / 2) / z}px`;
    el.appendChild(s); setTimeout(() => s.remove(), 650);
  }

  /* ---------- 彩帶 ---------- */
  const cv = $("#confetti"), cx = cv.getContext("2d"); let parts = [], anim = null;
  function confetti(n = 120) {
    cv.width = innerWidth; cv.height = innerHeight;
    const cols = ["#ff6f61", "#ec407a", "#7e57c2", "#26c6da", "#ffeb3b", "#66bb6a", "#ffa726"];
    for (let i = 0; i < n; i++) parts.push({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 13 - 4, s: Math.random() * 8 + 5, c: cols[i % cols.length], r: Math.random() * 6, vr: (Math.random() - .5) * .4, life: 0 });
    if (!anim) loop();
  }
  function loop() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach(p => { p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore(); });
    parts = parts.filter(p => p.y < cv.height + 30 && p.life < 300);
    anim = parts.length ? requestAnimationFrame(loop) : (cx.clearRect(0, 0, cv.width, cv.height), null);
  }

  /* ---------- 設定面板 ---------- */
  const SET_DEF = [
    { k: "fs", label: "sFull", icon: "🖥️", opts: [["on", "on"], ["off", "off"]], note: "noteFull" },
    { k: "sound", label: "sSound", icon: "🔊", opts: [[true, "on"], [false, "off"]] },
    { k: "device", label: "sDevice", icon: "📱", opts: [["auto", "auto"], ["phone", "phone"], ["tablet", "tablet"], ["desktop", "desktop"]], note: "noteDevice" },
    { k: "layout", label: "sLayout", icon: "🔄", opts: [["auto", "auto"], ["portrait", "portrait"], ["landscape", "landscape"]] },
    { k: "lang", label: "sLang", icon: "🌐", opts: [["zh", "zh"], ["en", "en"]] },
    { k: "font", label: "sFont", icon: "🔠", opts: [["small", "small"], ["normal", "normal"], ["large", "large"]] },
    { k: "theme", label: "sTheme", icon: "🎨", opts: [["system", "system"], ["light", "light"], ["dark", "dark"]] }
  ];
  const isFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  function renderSettings() {
    $("#settingsBody").innerHTML = SET_DEF.map((g, i) => {
      const cur = g.k === "fs" ? (isFs() ? "on" : "off") : S[g.k];
      return `<div class="set-group"><h4><span class="sn">${i + 1}</span>${g.icon} ${t(g.label)}</h4>
        <div class="seg" role="radiogroup" aria-label="${esc(t(g.label))}">${g.opts.map(([v, lb]) => `<button role="radio" aria-checked="${cur === v}" class="${cur === v ? "on" : ""}" data-set="${g.k}" data-val="${v}">${t(lb)}</button>`).join("")}</div>
        ${g.note ? `<div class="set-note">${t(g.note)}</div>` : ""}</div>`;
    }).join("");
  }
  function setOpt(k, raw) {
    const v = raw === "true" ? true : raw === "false" ? false : raw;
    if (k === "fs") { toggleFs(v === "on"); return; }
    S[k] = v; store.set("settings", S);
    if (k === "sound" && v) { ac(); }
    sfx.toggle();
    applySettings(k === "lang");
  }
  async function toggleFs(want) {
    const d = document.documentElement;
    try {
      if (want && !isFs()) { if (d.requestFullscreen) await d.requestFullscreen(); else if (d.webkitRequestFullscreen) d.webkitRequestFullscreen(); else throw 0; }
      else if (!want && isFs()) { if (document.exitFullscreen) await document.exitFullscreen(); else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); }
      sfx.toggle();
    } catch (e) { toast(t("fsNo")); sfx.bad(); }
    renderSettings();
  }
  document.addEventListener("fullscreenchange", renderSettings);
  document.addEventListener("webkitfullscreenchange", renderSettings);
  $("#settingsBody").addEventListener("click", ev => { const b = ev.target.closest("[data-set]"); if (b) setOpt(b.dataset.set, b.dataset.val); });

  const drawer = $("#drawer"), mask = $("#drawerMask");
  function openDrawer() { renderSettings(); mask.hidden = false; drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); sfx.open(); setTimeout(() => $("#closeSettings").focus(), 50); }
  function closeDrawer() { if (!drawer.classList.contains("open")) return; drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); mask.hidden = true; sfx.close(); }
  $("#openSettings").addEventListener("click", openDrawer);
  $("#closeSettings").addEventListener("click", closeDrawer);
  mask.addEventListener("click", closeDrawer);
  $("#resetSettings").addEventListener("click", () => { Object.assign(S, DEF); store.set("settings", S); if (isFs()) toggleFs(false); applySettings(true); sfx.good(); toast(t("resetDone")); });
  $("#quickTheme").addEventListener("click", () => { S.theme = resolvedTheme() === "dark" ? "light" : "dark"; store.set("settings", S); sfx.toggle(); applySettings(); });
  $("#quickSound").addEventListener("click", () => { S.sound = !S.sound; store.set("settings", S); if (S.sound) { ac(); sfx.good(); } applySettings(); toast(`${t("sSound")}：${t(S.sound ? "on" : "off")}`); });

  /* ---------- 套用設定 ---------- */
  const mqDark = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  const resolvedTheme = () => S.theme === "system" ? (mqDark && mqDark.matches ? "dark" : "light") : S.theme;
  if (mqDark && mqDark.addEventListener) mqDark.addEventListener("change", () => S.theme === "system" && applySettings());
  function applyFrame() {
    const app = $("#app");
    const lay = S.layout === "auto" ? null : S.layout;
    let w = null;
    if (S.device === "phone") w = (lay || "portrait") === "portrait" ? 400 : 844;
    else if (S.device === "tablet") w = (lay || "portrait") === "portrait" ? 820 : 1180;
    else if (S.device === "desktop") w = lay === "portrait" ? 1000 : 1320;
    else if (lay === "portrait") w = 620;
    else if (lay === "landscape") w = 1320;
    app.style.maxWidth = w ? w + "px" : "";
    const framed = (S.device === "phone" || S.device === "tablet") && w < innerWidth - 40;
    app.classList.toggle("framed", framed);
  }
  function applySettings(relabel = true) {
    const html = document.documentElement;
    html.dataset.theme = resolvedTheme();
    html.lang = S.lang === "en" ? "en" : "zh-Hant-TW";
    document.title = t("title");
    $("#zoomer").style.setProperty("--z", { small: 0.88, normal: 1, large: 1.2 }[S.font] || 1);
    $("#quickSound").textContent = S.sound ? "🔊" : "🔇";
    $("#quickTheme").textContent = resolvedTheme() === "dark" ? "🌙" : "☀️";
    $("meta[name=theme-color]").setAttribute("content", resolvedTheme() === "dark" ? "#17132a" : "#ff6f61");
    applyFrame();
    if (relabel) { $$("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); }); }
    renderSettings();
    render();
  }
  window.addEventListener("resize", () => { clearTimeout(window.__rz); window.__rz = setTimeout(applyFrame, 150); });
  window.addEventListener("pointerdown", () => ac(), { once: true });

  /* ---------- 啟動 ---------- */
  current = PAGES[location.hash.slice(1)] ? location.hash.slice(1) : "home";
  applySettings(true);
})();
