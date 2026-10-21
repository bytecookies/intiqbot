/* INTIQ Helper: AI answers (Vercel serverless function).
   Needs one setting in Vercel → Project → Settings → Environment Variables:
     ANTHROPIC_API_KEY = your Claude API key            (required)
     ANTHROPIC_MODEL   = claude-haiku-5-5               (optional, this is the default: fast and low cost)
   Without the key, this returns 503 and the page quietly uses its fixed answers only. */

const KNOWLEDGE = `
INTIQ (by Peppermint Communications, Mumbai)
- What: one rewards programme for the whole innerwear and sleepwear trade. Brands fund rewards; retailers earn points when they purchase from partner brands; INTIQ (Peppermint) runs everything.
- Peppermint: organisers of INTIMASIA (trade show for intimate wear) and SOURCE NXT (sourcing show for the industry). At INTIMASIA 2023: 200+ brands and 15,000+ retailers and distributors.
- Buy & Fly: Peppermint's retailer rewards programme about 20 years ago. Retailers still ask for it. INTIQ is that idea, bigger and better.
- Phase 1: 20 partner brands, 1,000+ retailers, Maharashtra and Gujarat, 15+ cities (Mumbai, Pune, Nagpur, Nashik, Chhatrapati Sambhajinagar, Solapur, Amravati, Kolhapur, Ahmedabad, Surat, Vadodara, Rajkot, Bhavnagar, Jamnagar, Junagadh). Onboarding now till 15 December. Launch December 2026. Runs 3 months, till 15 March 2027. After Phase 1: Pan-India (Srinagar to Thiruvananthapuram, Ahmedabad to Guwahati).
- Product categories: bras, panties, men's briefs, vests, shapewear, nightwear, socks, thermals.
- The final list of 20 partner brands is being made; the team shares the latest.
- Contact: +91 75063 99935 or +91 75063 99922. The team registers retailers and enrols brands.

FOR RETAILERS
- Joining is free. No fee, no extra work. Nothing changes in how they purchase.
- Points from all 20 brands go into one INTIQ wallet (today each brand's scheme is separate and small points go waste).
- Example rate 4%: ₹3 lakh purchase = 12,000 points. Points = purchase x 4%.
- 4 levels (indicative points): Level 1 Gifts (10,000 points; festive hamper, family gift box, smart TV, party speaker, smartphone). Level 2 Select domestic trip (60,000 points; Goa, Gokarna or Udaipur). Level 3 Premium domestic trip (1,10,000 points; Kerala, Himachal mountains or Andaman islands). Level 4 International trip (1,60,000 points; Malaysia, Singapore or Bali). Flights from Mumbai.
- At 4%, purchases needed in 3 months: Level 1 about ₹2.5 lakh, Level 2 about ₹15 lakh, Level 3 about ₹27.5 lakh, Level 4 about ₹40 lakh. Examples: small shop ₹11 lakh = 44,000 points (Level 1); medium ₹19 lakh = 76,000 points (Level 2); large ₹45 lakh = 1,80,000 points (Level 4).
- Bonus points on special schemes. Top retailers honoured at INTIMASIA.
- Rewards are gifts and trips, not cash discounts.
- Points stay in one wallet. Full points rules (and how to check points) are shared by the team at registration.

FOR BRANDS
- Brand buys IQ Points; retailers earn them on purchases from the brand; retailers climb levels and win rewards. "You sell, we run the scheme."
- Minimum ₹30 lakh of IQ Points per brand. INTIQ service fee 2% of IQ Points (₹60,000 on ₹30 lakh).
- Example reward rate 4%: ₹30 lakh of IQ Points rewards ₹7.5 crore of retailer purchases. Final rates being confirmed.
- INTIQ does all 8 jobs: plan, set targets, announce, track buying, check retailers, calculate, give rewards, review. Team on ground: find new retailers, open new cities, social media push, on-ground events, track every scheme.
- Own scheme vs INTIQ: own = your team runs it, only your retailers, cash discounts, points stay with one brand, hard to track. INTIQ = INTIQ runs it, new retailers too, gifts and trips, one wallet for all brands, tracked for you.
- Market maths, Phase 1, lowest estimates (not guaranteed): 1,000 retailers = 600 small (₹15,000 a day, ₹3.75 lakh a month each, ₹22.5 crore a month together), 300 medium (₹25,000 a day, ₹6.25 lakh a month each, ₹18.75 crore), 100 large (₹37,500 a day, ₹9.375 lakh a month each, ₹9.38 crore). Total ₹50.63 crore purchased a month, ₹151.9 crore in 3 months. 25 trading days a month. If a brand wins 5%: ₹7.6 crore of purchases, about ₹30.4 lakh of rewards at 4%; every ₹1 of rewards comes with ₹25 of purchases.
- Phase 1 takes only 20 brands. Joining now = "gold at the price of copper": start in 2 states, already in when INTIQ goes Pan-India.
`;

const INTENT_IDS = "what, company, trust, buyfly, when, where, panindia, brands, products, contact, free, join_r, earn, wallet, levels, gifts, domestic, intl, calc_r, nochange, cash, expiry, small, bonus, track, brand_how, cost, fee, rate, maths, why, work, newret, join_b, now, calc_b, report";
const CARD_IDS = "levels, trips, wallet, free, plan, cities, india, categories, steps, flow, numbers, market, compare, work, contact, about, calc_r, calc_b";
const LANGS = { en: "simple English", hi: "simple Hindi in Devanagari script (common English trade words like पॉइंट्स, ब्रांड, गिफ्ट are fine)", mr: "simple Marathi in Devanagari script", gu: "simple Gujarati in Gujarati script" };

function system(lang, role) {
  const who = role === "b" ? "a brand owner or manager (they make or sell an innerwear or sleepwear brand)" : "a retailer (shop owner selling innerwear and sleepwear)";
  return `You are the INTIQ Helper, a friendly voice assistant. You are talking to ${who}. Many users are not comfortable with technology and may not read well. Your answer is read aloud.

Reply in ${LANGS[lang] || LANGS.en}, even if the user mixes languages.
Style: warm and respectful, like a helpful person at a shop counter. Very simple words. 2 to 4 short sentences, under 60 words. Write numbers as digits with ₹ and lakh/crore. No lists, no markdown, no emojis.
Always end with ONE short follow-up question that keeps the conversation going, or add one useful related fact from the facts below and then ask.

Only use the facts below. Never invent brands, dates, prices, rules, apps, cash options, expiry rules or features. If something is not in the facts, say our team will confirm it and give the phone numbers.
Say "rewards programme", never "loyalty". Never call Phase 1 a "pilot". Do not mention any INTIMASIA date.
If the question is not about INTIQ, politely say you can only help with INTIQ and offer a related topic.
You may do simple maths with the 4% example rate and say it is an example.

FACTS
${KNOWLEDGE}

OUTPUT: reply with only a JSON object, no other text:
{"reply": "<your answer>", "card": "<one of: ${CARD_IDS}, or null>", "chips": ["<up to 3 of: ${INTENT_IDS}>"], "yes": "<the topic id to show if the user says yes to your question, or null>", "expect": "<'amount' if you asked for a rupee amount, 'share' if you asked for a percentage, else null>"}
Pick a card only when it clearly helps (for example levels for rewards, contact when giving numbers, calc_r when asking a retailer's purchase, market for brand maths).`;
}

const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000, max = 40;
  const a = (hits.get(ip) || []).filter(t => now - t < win); a.push(now); hits.set(ip, a);
  if (hits.size > 5000) hits.clear();
  return a.length > max;
}

function parseJSON(text) {
  const m = String(text).match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
  return { reply: String(text).trim(), card: null, chips: [], yes: null, expect: null };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "AI not set up" });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "x";
  if (limited(ip)) return res.status(429).json({ error: "Too many questions. Please wait a few minutes." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  const lang = ["en", "hi", "mr", "gu"].includes(body.lang) ? body.lang : "en";
  const role = body.role === "b" ? "b" : "r";
  let msgs = Array.isArray(body.messages) ? body.messages : [];
  msgs = msgs.filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
             .slice(-12).map(m => ({ role: m.role, content: m.content.slice(0, 600) }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  const merged = [];
  msgs.forEach(m => { const last = merged[merged.length - 1]; if (last && last.role === m.role) last.content += "\n" + m.content; else merged.push({ ...m }); });
  if (!merged.length || merged[merged.length - 1].role !== "user") return res.status(400).json({ error: "No question" });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5", max_tokens: 500, temperature: 0.3, system: system(lang, role), messages: merged })
    });
    if (!r.ok) { const t = await r.text(); console.error("Claude API", r.status, t.slice(0, 300)); return res.status(502).json({ error: "AI error" }); }
    const data = await r.json();
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
    const out = parseJSON(text);
    if (!out.reply) return res.status(502).json({ error: "Empty reply" });
    return res.status(200).json({ reply: String(out.reply).slice(0, 900), card: out.card || null, chips: Array.isArray(out.chips) ? out.chips.slice(0, 3) : [], yes: out.yes || null, expect: out.expect || null });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ error: "AI error" });
  }
};
