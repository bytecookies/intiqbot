# INTIQ Helper

A very simple voice and chat helper for INTIQ, for **retailers and brands**, in **English, Hindi, Marathi and Gujarati**.

- Tap the big gold button and speak. The helper answers out loud and in large text.
- Big question buttons for people who prefer tapping.
- It asks back ("How much do you purchase in 3 months?"), works out points and levels, and adds "Did you know?" facts from the decks.
- A green **Call** button to the team is always on screen.

## How it answers

1. **Fixed answers** (`assets/js/kb.js`): about 40 topics, written in all 4 languages. Used whenever a question clearly matches. Free, instant, always correct.
2. **AI answers** (`api/chat.js`): for anything else, the question goes to Claude. Claude is only given INTIQ facts, so it does not make things up, and it sends people to the phone numbers when unsure.
3. If the AI is not set up or fails, the closest fixed answer is used, or "please call our team".

## Put it online (GitHub + Vercel)

1. Upload all these files to the **top level** of a new GitHub repository (`index.html` must sit at the root).
2. In Vercel: **Add New → Project →** pick the repository → Framework Preset **Other** → **Deploy**.
3. Turn on AI answers: Vercel → your project → **Settings → Environment Variables**:
   - `ANTHROPIC_API_KEY` = your Claude API key (from console.anthropic.com)
   - `ANTHROPIC_MODEL` = `claude-haiku-5-5` (optional, this is already the default: fast and low cost)
   Then **Deployments → Redeploy**.

Without the key, the helper still works with fixed answers only.

## Change things

| What | Where |
|---|---|
| Fixed answers, keywords, follow-up questions | `assets/js/kb.js` |
| Numbers (4% rate, level points, ₹30 lakh, 2% fee, phone numbers) | `FACTS` at the top of `assets/js/kb.js` |
| Words on buttons and picture cards | `assets/js/ui.js` |
| Facts the AI knows | `KNOWLEDGE` in `api/chat.js` (keep it in line with `kb.js`) |
| Speak aloud by default, AI on/off, "Did you know" frequency | `assets/js/config.js` |

Rule: only add facts the programme has confirmed. Points rules, how retailers check points, and the final brand list are deliberately left to the team.

## Good to know

- **Voice works best in Chrome on Android.** Listening needs the microphone permission and an internet connection. Some phones have no Marathi or Gujarati speaking voice; those phones show the text and use the closest voice available.
- AI cost: each AI answer is one short Claude request. Most common questions use fixed answers and cost nothing.
- Basic protection: each visitor can ask up to 40 AI questions per 10 minutes.
- Nothing personal is stored. The page remembers only the sound on/off setting on that phone.
