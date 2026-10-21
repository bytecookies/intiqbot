/* INTIQ Helper settings */
window.INTIQ_BOT = {
  aiEndpoint: "/api/chat",   // Vercel function. If it is not set up, the bot uses fixed answers only.
  useAI: true,               // set false to use fixed answers only
  speakByDefault: true,      // the bot reads its answers aloud (people can switch it off with the speaker button)
  dykEvery: 3                // add a "Did you know?" fact after every 3rd answer
};
