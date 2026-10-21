/* INTIQ Helper: the conversation.
   1. A fixed answer is used when the question clearly matches one (fast, free, always correct).
   2. Otherwise the question goes to the AI (api/chat.js), which only knows INTIQ facts.
   3. If the AI is not set up or fails, the closest fixed answer or "please call us" is used. */
(function () {
  "use strict";
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const CFG = window.INTIQ_BOT || {}, F = window.FACTS, INTENTS = window.INTENTS, UI = window.UI, DYK = window.DYK;
  const BY = Object.fromEntries(INTENTS.map(i => [i.id, i]));
  const S = { lang: "en", role: null, sound: CFG.speakByDefault !== false, pend: null, expect: null, n: 0, dyk: { r: 0, b: 0 }, hist: [], ai: CFG.useAI !== false, busy: false };
  const store = { get(k, d) { try { const v = localStorage.getItem("intiq." + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
                  set(k, v) { try { localStorage.setItem("intiq." + k, JSON.stringify(v)); } catch (e) {} } };
  S.sound = store.get("sound", S.sound);

  const T = k => { const d = UI[S.lang] || UI.en; return d[k] !== undefined ? d[k] : UI.en[k]; };
  const L = o => (o && (o[S.lang] || o.en)) || "";
  const isRB = v => v && typeof v === "object" && !Array.isArray(v) && ("r" in v || "b" in v);
  const RV = v => (isRB(v) ? (v[S.role] !== undefined ? v[S.role] : null) : v);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fill = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => (o[k] !== undefined ? o[k] : ""));
  const LANGCODE = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", gu: "gu-IN" };
  const SHORT = { en: "EN", hi: "हिं", mr: "म", gu: "ગુ" };
  const START = { r: ["what", "free", "earn", "levels", "domestic", "join_r"], b: ["what", "brand_how", "cost", "maths", "why", "join_b"] };
  const ICON = { what: "info", company: "info", trust: "shield", buyfly: "plane", when: "calendar", where: "pin", panindia: "pin", brands: "tag", products: "tag",
    contact: "phone", thanks: "check", greet: "info", free: "rupee", join_r: "userplus", earn: "coins", wallet: "wallet", levels: "stairs", gifts: "gift",
    domestic: "palm", intl: "plane", calc_r: "calc", nochange: "check", cash: "rupee", expiry: "calendar", small: "shop", bonus: "star", track: "chart",
    brand_how: "info", cost: "rupee", fee: "rupee", rate: "coins", maths: "chart", why: "check", work: "list", newret: "users", join_b: "userplus", now: "star", calc_b: "calc", report: "chart" };
  const svg = (id, cls) => `<svg${cls ? ` class="${cls}"` : ""}><use href="#i-${id}"/></svg>`;
  const EXTRA = {
    yes: { en: "Yes, please", hi: "हाँ, ज़रूर", mr: "हो, नक्की", gu: "હા, ચોક્કસ" },
    share: { en: "If your brand wins {s}%, that is about {p} of purchases in 3 months, with about {r} of rewards at 4%.",
             hi: "अगर आपके ब्रांड को {s}% मिला, तो 3 महीने में करीब {p} की खरीद, और 4% पर करीब {r} के इनाम।",
             mr: "तुमच्या ब्रँडला {s}% मिळाले, तर 3 महिन्यांत सुमारे {p} ची खरेदी, आणि 4% ने सुमारे {r} ची बक्षिसे.",
             gu: "જો તમારી બ્રાન્ડને {s}% મળે, તો 3 મહિનામાં લગભગ {p} ની ખરીદી, અને 4% પર લગભગ {r} ના ઇનામ." }
  };

  /* ================= understanding words ================= */
  const DEV = "०१२३४५६७८९", GUJ = "૦૧૨૩૪૫૬૭૮૯";
  function norm(s) {
    return String(s).normalize("NFC").toLowerCase()
      .replace(/[०-९]/g, d => DEV.indexOf(d)).replace(/[૦-૯]/g, d => GUJ.indexOf(d))
      .normalize("NFD").replace(/[़઼]/g, "").normalize("NFC").replace(/ँ/g, "ं")
      .replace(/(\d),(?=\d)/g, "$1").replace(/₹/g, " ")
      .replace(/[^\p{L}\p{M}\p{N}%&.\s]/gu, " ").replace(/(\D)\.|\.(\D)/g, "$1 $2").replace(/\s+/g, " ").trim();
  }
  const latin = w => /^[a-z0-9%&.]+$/.test(w);
  INTENTS.forEach(it => {
    it._kw = [];
    String(it.kw).replace(/"([^"]+)"([\^~]?)|(\S+)/g, (_, ph, phw, w) => {
      let raw = ph || w, wt = 1;
      const suf = ph ? phw : (/[\^~]$/.test(raw) ? raw.slice(-1) : "");
      if (!ph && suf) raw = raw.slice(0, -1);
      if (suf === "^") wt = 2; else if (suf === "~") wt = .4;
      const pre = raw.endsWith("*"), k = norm(pre ? raw.slice(0, -1) : raw);
      if (k) it._kw.push({ k, ph: k.includes(" "), pre: pre || !latin(k), wt });
      return "";
    });
  });
  function score(t) {
    const pad = " " + t + " ", tok = t.split(" "), out = [];
    INTENTS.forEach(it => {
      let s = 0; const used = new Map();
      it._kw.forEach(({ k, ph, pre, wt }) => {
        if (ph) { if (pad.includes(" " + k + " ") || (!latin(k.replace(/ /g, "")) && pad.includes(" " + k))) s += (1 + k.split(" ").length * .5) * wt; }
        else tok.forEach((x, i) => { if (x === k || x === k + "s" || (pre && x.startsWith(k))) used.set(i, Math.max(used.get(i) || 0, wt)); });
      });
      used.forEach(v => { s += v; });
      if ((it.id === "greet" || it.id === "thanks") && tok.length > 5) s = 0;
      if (it.who !== "*" && it.who !== S.role) s *= .5;
      if (s) out.push({ id: it.id, s });
    });
    return out.sort((a, b) => b.s - a.s);
  }
  const YES = new Set("yes ya yeah yep sure ok okay haan haa ha han hanji haanji ji bilkul zaroor jarur jaroor chalo theek thik ho hoy barabar dikhao batao show tell sango sanga dakhva batavo hmm हाँ हां हा जी ज़रूर जरूर बिल्कुल ठीक चलो हो होय चालेल हाँजी હા હાં બરાબર ચોક્કસ ઠીક".split(" ").map(norm));
  const NO = new Set("no nope nahi nahin na mat nako nai नहीं नही ना नको नाही મત ના નહીં નથી".split(" ").map(norm));
  const isYes = t => { const w = t.split(" "); return w.length <= 4 && w.some(x => YES.has(x)) && !w.some(x => NO.has(x)); };
  const isNo = t => { const w = t.split(" "); return w.length <= 4 && w.some(x => NO.has(x)); };

  function parseAmount(t) {
    const m = t.match(/(\d+(?:\.\d+)?)\s*(lakhs?|lacs?|lakh\S*|lac\S*|lk|l|लाख\S*|લાખ\S*|crores?|cr|karod\S*|करोड\S*|कोटी\S*|કરોડ\S*|k|hazar\S*|hazaar\S*|thousand|हजार\S*|હજાર\S*)?(?=\s|$)/);
    if (!m) return null;
    const n = parseFloat(m[1]), u = m[2] || "";
    if (/%/.test(t.slice(m.index + m[0].length, m.index + m[0].length + 2))) return null;
    if (/^(l|lk|lakh|lac|लाख|લાખ)/.test(u)) return n * 1e5;
    if (/^(cr|karod|करोड|कोटी|કરોડ)/.test(u)) return n * 1e7;
    if (/^(k|hazar|hazaar|thousand|हजार|હજાર)/.test(u)) return n * 1e3;
    if (n >= 10000) return n;
    if (S.expect === "amount" && n > 0 && n <= 500) return n * 1e5;
    return null;
  }
  function parseShare(t) {
    const m = t.match(/(\d+(?:\.\d+)?)\s*(%|percent|pratishat|प्रतिशत|टक्के|टक्का|ટકા|taka|takka)/);
    if (m) return parseFloat(m[1]);
    if (S.expect === "share") { const k = t.match(/^(\d+(?:\.\d+)?)$/); if (k) return parseFloat(k[1]); }
    return null;
  }

  /* ================= numbers ================= */
  const r2 = x => String(Math.round(x * 100) / 100);
  const money = v => v >= 1e7 ? `₹${r2(v / 1e7)} ${T("crore")}` : v >= 1e5 ? `₹${r2(v / 1e5)} ${T("lakh")}` : `₹${Math.round(v).toLocaleString("en-IN")}`;
  const pts = v => Math.round(v).toLocaleString("en-IN");
  const lvName = n => T("l" + n);
  function rCalc(amt) {
    const p = amt * F.rate; let lv = 0; F.levels.forEach((th, i) => { if (p >= th) lv = i + 1; });
    let s = fill(T("rRes"), { amt: money(amt), pts: pts(p) }) + " ";
    if (!lv) s += fill(T("rNone"), { gap: money((F.levels[0] - p) / F.rate) });
    else {
      s += fill(T("rLvl"), { n: lv, name: lvName(lv) });
      if (lv < F.levels.length) s += " " + fill(T("rNext"), { gap: money((F.levels[lv] - p) / F.rate), n: lv + 1, name: lvName(lv + 1) });
      else s += " " + T("rTop");
    }
    return { text: s, lv, p };
  }
  function bCalc(amt) {
    let s = fill(T("bRes"), { amt: money(amt), cov: money(amt / F.rate) }) + " " + fill(T("bFee"), { fee: money(amt * F.fee) });
    if (amt < F.minPoints) s += " " + T("bMin");
    return { text: s };
  }

  /* ================= voice out ================= */
  const synth = window.speechSynthesis; let voices = [], speakingEl = null;
  const loadV = () => { try { voices = synth.getVoices() || []; } catch (e) { voices = []; } };
  if (synth) { loadV(); synth.onvoiceschanged = loadV; }
  function voiceFor(l) {
    const want = { en: ["en-in", "en-gb", "en-us", "en"], hi: ["hi-in", "hi"], mr: ["mr-in", "mr", "hi-in"], gu: ["gu-in", "gu"] }[l];
    for (const w of want) { const v = voices.find(v => v.lang.replace("_", "-").toLowerCase().startsWith(w)); if (v) return v; }
    return null;
  }
  const sayable = s => s.replace(/INTIQ/g, "Intiq").replace(/INTIMASIA/g, "Intimasia").replace(/SOURCE NXT/g, "Source Next").replace(/&/g, " and ")
    .replace(/[·→=]/g, ", ").replace(/\+91 ?(\d{5}) ?(\d{5})/g, (_, a, b) => `+91 ${a.split("").join(" ")}, ${b.split("").join(" ")}`).replace(/"/g, "");
  function stopSpeak() { if (synth) synth.cancel(); if (speakingEl) speakingEl.classList.remove("on"); speakingEl = null; }
  function speak(text, btn, force) {
    if (!synth || (!S.sound && !force)) return;
    stopSpeak();
    const parts = sayable(text).match(/[^.!?।]+[.!?।]?/g) || [text];
    const v = voiceFor(S.lang);
    speakingEl = btn || null; if (btn) btn.classList.add("on");
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p.trim());
      u.lang = (v && v.lang) || LANGCODE[S.lang]; if (v) u.voice = v; u.rate = S.lang === "en" ? .95 : .92;
      if (i === parts.length - 1) u.onend = () => { if (btn) btn.classList.remove("on"); if (speakingEl === btn) speakingEl = null; };
      synth.speak(u);
    });
  }

  /* ================= voice in ================= */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; let rec = null, heard = "";
  function setLive(on) { $("#mic").classList.toggle("live", on); $("#micLab").textContent = on ? T("listening") : T("tap"); }
  function listen() {
    if (rec) { try { rec.stop(); } catch (e) {} return; }
    if (!SR) { bot(T("noVoice")); openTyper(true); return; }
    stopSpeak(); heard = "";
    rec = new SR(); rec.lang = LANGCODE[S.lang]; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
    rec.onresult = e => { let f = "", i = ""; for (const r of e.results) (r.isFinal ? (f += r[0].transcript) : (i += r[0].transcript)); heard = f || i; $("#micLab").textContent = heard || T("listening"); };
    rec.onerror = e => { if (e.error === "not-allowed" || e.error === "service-not-allowed") { bot(T("micBlocked")); openTyper(true); } };
    rec.onend = () => { rec = null; setLive(false); const q = heard.trim(); heard = ""; if (q) handle(q); };
    try { rec.start(); setLive(true); } catch (e) { rec = null; setLive(false); }
  }

  /* ================= drawing the chat ================= */
  const log = $("#log");
  const toBottom = () => requestAnimationFrame(() => { log.scrollTop = log.scrollHeight; });
  function me(text) {
    const d = document.createElement("div"); d.className = "msg me"; d.innerHTML = `<div class="bub">${esc(text)}</div>`; log.appendChild(d); toBottom();
  }
  const linkify = h => h.replace(/\+91[\s-]?\d{5}[\s-]?\d{5}/g, m => `<a class="tel" href="tel:+${m.replace(/\D/g, "")}">${m}</a>`);
  function bot(text, o = {}) {
    const d = document.createElement("div"); d.className = "msg bot";
    d.innerHTML = `<div class="av">IQ</div><div class="bwrap"><div class="bub${o.dyk ? " dyk" : ""}">${synth ? `<button type="button" class="play" aria-label="Play">${svg("replay")}</button>` : ""}${o.dyk ? `<div class="k">${svg("star")}${esc(T("dyk"))}</div>` : ""}${linkify(esc(text))}</div></div>`;
    const w = d.querySelector(".bwrap"), play = d.querySelector(".play");
    if (play) play.addEventListener("click", () => { if (speakingEl === play) stopSpeak(); else speak(text, play, true); });
    if (o.card && CARDS[o.card]) { const c = document.createElement("div"); c.className = "card"; c.innerHTML = CARDS[o.card](o.cardArg); w.appendChild(c); wireCard(c, o.card); }
    const chips = chipList(o.chips, o.pend);
    if (chips) w.appendChild(chips);
    log.appendChild(d); toBottom();
    if (!o.quiet) speak(text, play);
    return d;
  }
  function chipList(list, pend) {
    let ids = list === "@start" ? START[S.role] : RV(list) || [];
    ids = ids.filter(id => BY[id] && id !== pend).slice(0, 3);
    if (!ids.length && !pend) return null;
    const box = document.createElement("div"); box.className = "chips";
    if (pend && BY[pend]) box.appendChild(chip(L(EXTRA.yes), "check", () => { me(L(EXTRA.yes)); answer(pend); }, "yes"));
    ids.forEach(id => box.appendChild(chip(L(BY[id].t), ICON[id] || "info", () => { me(L(BY[id].t)); answer(id); })));
    return box;
  }
  function chip(label, icon, fn, cls) {
    const b = document.createElement("button"); b.type = "button"; b.className = "chip" + (cls ? " " + cls : "");
    b.innerHTML = `<span class="ci">${svg(icon)}</span><span>${esc(label)}</span>`; b.addEventListener("click", e => { e.stopPropagation(); closeSheet(); fn(); }); return b;
  }
  let typingEl = null;
  function typing(on) {
    if (on && !typingEl) { typingEl = document.createElement("div"); typingEl.className = "msg bot"; typingEl.innerHTML = `<div class="av">IQ</div><div class="bub"><span class="typing"><i></i><i></i><i></i></span></div>`; log.appendChild(typingEl); toBottom(); }
    if (!on && typingEl) { typingEl.remove(); typingEl = null; }
  }

  /* ================= picture cards ================= */
  const LVI = ["gift", "palm", "palm", "plane"];
  const CARDS = {
    levels: hit => `<div class="ct">${svg("stairs")}${esc(T("level"))} 1 – 4</div>` + [1, 2, 3, 4].map(n => `<div class="lv${hit === n ? " hit" : ""}"><div class="n">${svg(LVI[n - 1])}<b>${n}</b></div><div><div class="t1">${esc(T("l" + n))}</div><div class="t2">${esc(T("l" + n + "s"))} · ${pts(F.levels[n - 1])} ${esc(T("points"))}</div></div></div>`).join("") + `<div class="foot">${esc(T("note"))}</div>`,
    gifts: () => CARDS.levels(1),
    trips: () => `<div class="ct">${svg("plane")}${esc(T("fromMum"))}</div><div class="dest"><div class="dc"><div class="dk">${esc(T("level"))} 2 · ${esc(T("inIndia"))}</div><div class="dv">${esc(T("l2s"))}</div></div><div class="dc g"><div class="dk">${esc(T("level"))} 3 · ${esc(T("inIndia"))}</div><div class="dv">${esc(T("l3s"))}</div></div><div class="dc a"><div class="dk">${esc(T("level"))} 4 · ${esc(T("abroad"))}</div><div class="dv">${esc(T("l4s"))}</div></div></div><div class="foot">${esc(T("note"))}</div>`,
    wallet: () => `<div class="wallet"><div class="wdots">${"<i></i>".repeat(20)}</div><span class="arr">${svg("arrow")}</span><div class="wbox">${svg("wallet")}</div></div><div class="wtxt">${esc(T("walletT"))}</div><div class="foot" style="font-size:15px">${esc(T("walletS"))}</div>`,
    free: () => `<div class="flow">${[["rupee", "free1", 1], ["check", "free2"], ["star", "free3"], ["users", "free4"]].map(([i, k, g]) => `<div class="fstep"><span class="fi${g ? " g" : ""}">${svg(i)}</span>${esc(T(k))}</div>`).join("")}</div>`,
    plan: () => `<div class="plan">${[1, 2, 3].map(n => `<div class="ps"><span class="dot"></span><div><b>${esc(T("plan" + n))}</b><span>${esc(T("plan" + n + "s"))}</span></div></div>`).join("")}</div>`,
    cities: () => `<div class="ct">${svg("pin")}${esc(T("citiesT"))} · ${esc(T("citiesS"))}</div><div class="pills">${T("cityList").split(" · ").map(c => `<span class="pill">${esc(c)}</span>`).join("")}</div>`,
    india: () => `<div class="flow"><div class="fstep"><span class="fi g">${svg("pin")}</span>${esc(T("indiaT"))}: ${esc(T("citiesT"))}</div><div class="fdown"></div><div class="fstep"><span class="fi">${svg("globe")}</span>${esc(T("indiaS"))}</div></div>`,
    categories: () => `<div class="cats">${T("cats").map(c => `<span>${esc(c)}</span>`).join("")}</div>`,
    steps: () => `<div class="flow">${[["shop", "st1"], ["coins", "st2"], ["stairs", "st3"], ["gift", "st4"]].map(([i, k], n) => `${n ? '<div class="fdown"></div>' : ""}<div class="fstep"><span class="fi${n === 3 ? " g" : ""}">${svg(i)}</span>${n + 1}. ${esc(T(k))}</div>`).join("")}</div>`,
    flow: () => `<div class="flow">${[["factory", "f1"], ["shop", "f2"], ["gift", "f3"]].map(([i, k], n) => `${n ? '<div class="fdown"></div>' : ""}<div class="fstep"><span class="fi${n === 2 ? " g" : ""}">${svg(i)}</span>${esc(T(k))}</div>`).join("")}</div>`,
    numbers: () => `<div class="big2">${[1, 2, 3, 4].map(n => `<div class="stat"><b>${esc(T("n" + n))}</b><span>${esc(T("n" + n + "s"))}</span></div>`).join("")}</div><div class="foot">${esc(T("note"))}</div>`,
    market: () => `<div class="ct">${svg("chart")}${esc(T("mT"))}</div>` + [["mSmall", 22.5, "#B05A8E"], ["mMed", 18.75, "#E6B3CC"], ["mLarge", 9.375, "#D9B467"]].map(([k, v, c]) => `<div class="mrow"><b>${esc(T(k))}</b><span>${money(v * 1e7)}</span><div class="mb"><i style="width:${v / 22.5 * 100}%;background:${c}"></i></div></div>`).join("") + `<div class="mtot"><span>${esc(T("mTotal"))}</span><b>${money(F.monthly)}</b></div><div class="foot">${esc(T("mLow"))}</div>`,
    compare: () => `<div class="cmp"><div class="cc"><div class="ch">${esc(T("ownT"))}</div>${T("own").map(x => `<div class="ci2"><i>✕</i>${esc(x)}</div>`).join("")}</div><div class="cc g"><div class="ch">${esc(T("intT"))}</div>${T("int").map(x => `<div class="ci2"><i>✓</i>${esc(x)}</div>`).join("")}</div></div>`,
    work: () => `<div class="ct">${svg("list")}${esc(T("jobsT"))}</div><div class="jobs">${T("jobs").map(j => `<span>${esc(j)}</span>`).join("")}</div>`,
    contact: () => `<div class="ct">${svg("phone")}${esc(T("contactS"))}</div><div class="phones">${F.phones.map(p => `<a href="tel:${p.replace(/\s/g, "")}">${svg("phone")}${esc(p)}</a>`).join("")}</div>`,
    about: () => `<div class="ct">${svg("info")}${esc(T("aboutT"))}</div><div class="about"><div class="ab"><span class="pill">INTIMASIA</span><span class="pill">SOURCE NXT</span><span class="pill">Buy &amp; Fly</span></div></div><div class="big2"><div class="stat"><b>200+</b><span>${esc(T("ab1").replace("200+ ", ""))} · ${esc(T("ab3"))}</span></div><div class="stat"><b>15,000+</b><span>${esc(T("ab2").replace("15,000+ ", ""))}</span></div></div>`,
    calc_r: v => `<div class="ct">${svg("calc")}${esc(T("rAmt"))}</div><div class="amts">${[2.5, 5, 11, 19, 30, 45].map(x => `<button type="button" data-amt="${x * 1e5}"${v === x * 1e5 ? ' class="sel"' : ""}>₹${x}L</button>`).join("")}</div><div class="cres">${v ? calcHTML(v) : ""}</div><div class="foot">${esc(T("note"))}</div>`,
    calc_b: v => `<div class="ct">${svg("calc")}${esc(T("bAmt"))}</div><div class="amts">${[30, 50, 100, 200].map(x => `<button type="button" data-amt="${x * 1e5}"${v === x * 1e5 ? ' class="sel"' : ""}>${x >= 100 ? "₹" + x / 100 + " Cr" : "₹" + x + "L"}</button>`).join("")}</div><div class="cres">${v ? calcBHTML(v) : ""}</div><div class="foot">${esc(T("note"))}</div>`
  };
  function calcHTML(v) { const r = rCalc(v); return `<span class="pts">${pts(r.p)} ${esc(T("points"))}</span>${esc(r.text)}`; }
  function calcBHTML(v) { return `<span class="pts">${money(v / F.rate)}</span>${esc(bCalc(v).text)}`; }
  function wireCard(c, id) {
    if (id !== "calc_r" && id !== "calc_b") return;
    c.querySelectorAll("[data-amt]").forEach(b => b.addEventListener("click", e => {
      e.stopPropagation();
      const v = +b.dataset.amt;
      c.querySelectorAll("[data-amt]").forEach(x => x.classList.toggle("sel", x === b));
      c.querySelector(".cres").innerHTML = id === "calc_r" ? calcHTML(v) : calcBHTML(v);
      speak(id === "calc_r" ? rCalc(v).text : bCalc(v).text);
      hist("assistant", id === "calc_r" ? rCalc(v).text : bCalc(v).text);
    }));
  }

  /* ================= answering ================= */
  const EXPECT_AMT = new Set(["earn", "levels", "calc_r", "small", "intl", "calc_b", "rate"]);
  function hist(role, content) { S.hist.push({ role, content: String(content).slice(0, 600) }); if (S.hist.length > 14) S.hist.splice(0, S.hist.length - 14); }
  function answer(id, from) {
    const it = BY[id]; if (!it) return;
    const a = (S.role === "r" && it.ar) || (S.role === "b" && it.ab) || it.a;
    let text = L(a); const ask = RV(it.ask); if (ask) text += " " + L(ask);
    S.pend = RV(it.yes) || null; S.expect = EXPECT_AMT.has(id) ? "amount" : id === "maths" ? "share" : null;
    if (id === "levels" && S.role === "b") S.expect = "amount";
    bot(text, { card: RV(it.card), chips: it.chips, pend: S.pend });
    if (from !== "ai") hist("assistant", text);
    afterAnswer();
  }
  function afterAnswer() {
    S.n++;
    const every = CFG.dykEvery || 3;
    if (S.n % every === 0) {
      const list = DYK[S.role] || [], f = list[S.dyk[S.role] % list.length]; S.dyk[S.role]++;
      if (f) setTimeout(() => bot(L(f), { dyk: true, quiet: true }), 700);
    }
  }
  async function handle(text) {
    text = String(text).trim(); if (!text || S.busy) return;
    stopSpeak(); me(text); hist("user", text);
    const t = norm(text);
    if (S.pend && isYes(t)) { const p = S.pend; S.pend = null; return answer(p); }
    if (S.pend && isNo(t)) { S.pend = null; S.expect = null; bot(T("okNo"), { chips: "@start" }); hist("assistant", T("okNo")); return; }
    const sh = S.role === "b" ? parseShare(t) : null;
    if (sh !== null && sh > 0 && sh <= 100) {
      const p = sh / 100 * F.threeMonths, s = fill(L(EXTRA.share), { s: r2(sh), p: money(p), r: money(p * F.rate) });
      S.expect = null; S.pend = "now"; bot(s + " " + L(BY.now.t), { card: "market", chips: ["join_b", "calc_b"], pend: "now" }); hist("assistant", s); return afterAnswer();
    }
    const amt = parseAmount(t);
    if (amt) {
      S.expect = null; S.pend = null;
      if (S.role === "r") { const r = rCalc(amt); bot(r.text, { card: "calc_r", cardArg: amt, chips: r.lv >= 2 ? ["domestic", "intl", "join_r"] : ["gifts", "join_r", "free"] }); hist("assistant", r.text); }
      else { const r = bCalc(amt); bot(r.text, { card: "calc_b", cardArg: amt, chips: ["maths", "join_b", "work"] }); hist("assistant", r.text); }
      return afterAnswer();
    }
    const sc = score(t), best = sc[0], second = sc[1];
    const words = t.split(" ").length;
    const strong = best && (best.s >= 2 || (best.s >= 1 && (!second || second.s < best.s) && words <= 6));
    if (strong) return answer(best.id);
    if (S.ai && CFG.aiEndpoint) { const ok = await askAI(); if (ok) return; }
    if (best) return answer(best.id);
    S.pend = "contact"; bot(T("sorry"), { chips: "@start", pend: "contact" }); hist("assistant", T("sorry"));
  }
  async function askAI() {
    S.busy = true; typing(true);
    const ctrl = window.AbortController ? new AbortController() : null; const to = setTimeout(() => ctrl && ctrl.abort(), 20000);
    try {
      const r = await fetch(CFG.aiEndpoint, { method: "POST", headers: { "content-type": "application/json" }, signal: ctrl && ctrl.signal,
        body: JSON.stringify({ lang: S.lang, role: S.role, messages: S.hist.slice(-12) }) });
      if (r.status === 404 || r.status === 501 || r.status === 503) S.ai = false;
      if (!r.ok) throw new Error("http " + r.status);
      const j = await r.json(); if (!j || !j.reply) throw new Error("empty");
      typing(false);
      const card = CARDS[j.card] ? j.card : null, chips = Array.isArray(j.chips) ? j.chips.filter(id => BY[id]) : [];
      S.pend = BY[j.yes] ? j.yes : null; S.expect = j.expect === "amount" || j.expect === "share" ? j.expect : null;
      bot(j.reply, { card, chips, pend: S.pend }); hist("assistant", j.reply); afterAnswer();
      return true;
    } catch (e) { typing(false); return false; }
    finally { clearTimeout(to); S.busy = false; }
  }

  /* ================= screens ================= */
  function paint() {
    document.documentElement.lang = S.lang;
    $$("[data-t]").forEach(el => { el.textContent = T(el.dataset.t); });
    $$("[data-tp]").forEach(el => { el.placeholder = T(el.dataset.tp); });
    $("#langShort").textContent = SHORT[S.lang];
    $("#roleTag").textContent = S.role ? (S.role === "r" ? T("roleR") : T("roleB")) : "";
    const sb = $("#bSound"); sb.innerHTML = svg(S.sound ? "sound" : "mute"); sb.classList.toggle("off", !S.sound); sb.setAttribute("aria-label", S.sound ? T("soundOn") : T("soundOff"));
    $("#bCall").href = "tel:" + F.phones[0].replace(/\s/g, "");
  }
  function show(id) { ["#pickLang", "#pickRole", "#chat"].forEach(s => { $(s).hidden = s !== id; }); }
  $$("#pickLang [data-lang]").forEach(b => b.addEventListener("click", () => {
    S.lang = b.dataset.lang; store.set("lang", S.lang); paint();
    if (S.role) { show("#chat"); bot(L({ en: "Okay, English from now.", hi: "ठीक है, अब हिंदी में बात करेंगे।", mr: "ठीक आहे, आता मराठीत बोलूया.", gu: "ઠીક છે, હવે ગુજરાતીમાં વાત કરીએ." }), { chips: "@start" }); return; }
    show("#pickRole"); speak(T("who"));
  }));
  $$("#pickRole [data-role]").forEach(b => b.addEventListener("click", () => {
    S.role = b.dataset.role; S.hist = []; S.n = 0; S.pend = null; S.expect = null; log.innerHTML = ""; paint(); show("#chat");
    const w = T(S.role === "r" ? "welcomeR" : "welcomeB"); bot(w, { chips: "@start" }); hist("assistant", w);
    $("#mic").classList.add("idle-hint");
  }));
  $("#backLang").addEventListener("click", () => show("#pickLang"));
  $("#bLang").addEventListener("click", () => { stopSpeak(); show("#pickLang"); });
  $("#bSound").addEventListener("click", () => { S.sound = !S.sound; store.set("sound", S.sound); if (!S.sound) stopSpeak(); paint(); });
  $("#mic").addEventListener("click", () => { $("#mic").classList.remove("idle-hint"); listen(); });
  function openTyper(focus) { $("#typer").hidden = false; $("#bType").classList.add("on"); if (focus) setTimeout(() => $("#q").focus(), 50); }
  $("#bType").addEventListener("click", () => { if ($("#typer").hidden) openTyper(true); else { $("#typer").hidden = true; $("#bType").classList.remove("on"); } });
  $("#typer").addEventListener("submit", e => { e.preventDefault(); const v = $("#q").value; $("#q").value = ""; handle(v); });
  function openSheet() {
    const g = $("#qgrid"); g.innerHTML = "";
    INTENTS.filter(i => (i.who === "*" || i.who === S.role) && i.id !== "greet" && i.id !== "thanks")
      .forEach(i => g.appendChild(chip(L(i.t), ICON[i.id] || "info", () => { me(L(i.t)); answer(i.id); })));
    $("#sheet").hidden = false;
  }
  function closeSheet() { $("#sheet").hidden = true; }
  $("#bAll").addEventListener("click", openSheet);
  $("#sheetX").addEventListener("click", closeSheet);
  $("#sheet").addEventListener("click", e => { if (e.target.id === "sheet") closeSheet(); });
  $("#bHome").addEventListener("click", () => { closeSheet(); stopSpeak(); S.role = null; log.innerHTML = ""; paint(); show("#pickRole"); });
  paint();
  window.INTIQ_HELPER = { handle, answer, state: S, score: t => score(norm(t)) };
})();
