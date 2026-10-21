/* INTIQ Helper: everything the bot knows.
   - FACTS: numbers used by the calculators and cards. Change them here once programme rules are final.
   - INTENTS: fixed answers in English, Hindi, Marathi and Gujarati.
     who:  "r" retailer, "b" brand, "*" both
     kw:   words that point to this answer (any language, also Hinglish in English letters).
           "two words" = a phrase, word* = any word that starts with it.
     a:    answer per language. ar / ab = separate answers for retailers / brands.
     card: picture card shown under the answer. chips: next questions shown as buttons.
     yes:  what to show if the person says "yes" to the question at the end of the answer.
   Rule for anyone editing: never add a fact here that the programme has not confirmed. */

window.FACTS = {
  phones: ["+91 75063 99935", "+91 75063 99922"],
  rate: 0.04,                                   // example: 4% points on purchases
  levels: [10000, 60000, 110000, 160000],       // points for levels 1 to 4 (indicative, same as retailer deck)
  minPoints: 3000000,                           // ₹30 lakh minimum IQ Points per brand
  fee: 0.02,                                    // 2% INTIQ service fee
  monthly: 506250000,                           // ₹50.63 crore a month, 1,000 retailers, minimum estimates
  threeMonths: 1518750000
};

window.INTENTS = [
  /* ---------------- both ---------------- */
  { id: "greet", who: "*", kw: 'hi hello hey namaste namaskar namaskaar "good morning" "good afternoon" "good evening" hii helo नमस्ते नमस्कार हेलो हाय नमस्कारम् નમસ્તે નમસ્કાર હેલો "kem cho" "केम छो" "કેમ છો"',
    t: { en: "Hello", hi: "नमस्ते", mr: "नमस्कार", gu: "નમસ્તે" },
    a: { en: "Namaste! I am the INTIQ helper. Ask me anything about INTIQ, by speaking or by tapping a button.",
         hi: "नमस्ते! मैं INTIQ हेल्पर हूँ। INTIQ के बारे में कुछ भी पूछिए, बोलकर या बटन दबाकर।",
         mr: "नमस्कार! मी INTIQ मदतनीस आहे. INTIQ बद्दल काहीही विचारा, बोलून किंवा बटण दाबून.",
         gu: "નમસ્તે! હું INTIQ મદદગાર છું. INTIQ વિશે કંઈ પણ પૂછો, બોલીને અથવા બટન દબાવીને." },
    chips: "@start" },

  { id: "what", who: "*", kw: 'intiq intik intiqu "what is"~ "kya hai"~ "kya he"~ "ye kya" "yeh kya" "kay ahe"~ "kai ahe"~ "shu che"~ "su che"~ programme program scheme yojana yojna इंटिक इन्टिक "क्या है"~ योजना स्कीम प्रोग्राम "काय आहे"~ "શું છે"~ યોજના સ્કીમ પ્રોગ્રામ ઇન્ટિક',
    t: { en: "What is INTIQ?", hi: "INTIQ क्या है?", mr: "INTIQ काय आहे?", gu: "INTIQ શું છે?" },
    ar: { en: "INTIQ is one rewards programme for the whole innerwear and sleepwear trade. You purchase from partner brands as usual, points come into one wallet, and you win gifts and trips. Shall I show you the 4 reward levels?",
          hi: "INTIQ पूरे इनरवियर और स्लीपवियर ट्रेड के लिए एक रिवॉर्ड्स प्रोग्राम है। आप पार्टनर ब्रांड्स से हमेशा की तरह खरीदते हैं, पॉइंट्स एक वॉलेट में आते हैं, और आप गिफ्ट और ट्रिप जीतते हैं। क्या मैं आपको 4 लेवल दिखाऊँ?",
          mr: "INTIQ हा संपूर्ण इनरवेअर आणि स्लीपवेअर व्यापारासाठी एक रिवॉर्ड्स प्रोग्राम आहे. तुम्ही पार्टनर ब्रँड्सकडून नेहमीप्रमाणे खरेदी करता, पॉइंट्स एका वॉलेटमध्ये येतात, आणि तुम्ही गिफ्ट आणि सहली जिंकता. मी तुम्हाला 4 लेव्हल दाखवू का?",
          gu: "INTIQ આખા ઇનરવેર અને સ્લીપવેર ટ્રેડ માટે એક રિવોર્ડ્સ પ્રોગ્રામ છે. તમે પાર્ટનર બ્રાન્ડ્સ પાસેથી હંમેશની જેમ ખરીદો, પોઇન્ટ્સ એક વોલેટમાં આવે, અને તમે ગિફ્ટ અને પ્રવાસ જીતો. શું હું તમને 4 લેવલ બતાવું?" },
    ab: { en: "INTIQ is one rewards programme for the whole innerwear and sleepwear trade. Your brand buys IQ Points, retailers earn them when they purchase from you, and they win gifts and trips. Peppermint runs the whole scheme for you. Shall I explain how it works for your brand?",
          hi: "INTIQ पूरे इनरवियर और स्लीपवियर ट्रेड के लिए एक रिवॉर्ड्स प्रोग्राम है। आपका ब्रांड IQ पॉइंट्स लेता है, रिटेलर आपसे खरीदकर वो पॉइंट्स कमाते हैं, और गिफ्ट और ट्रिप जीतते हैं। पूरी स्कीम Peppermint चलाता है। क्या मैं बताऊँ कि आपके ब्रांड के लिए यह कैसे काम करता है?",
          mr: "INTIQ हा संपूर्ण इनरवेअर आणि स्लीपवेअर व्यापारासाठी एक रिवॉर्ड्स प्रोग्राम आहे. तुमचा ब्रँड IQ पॉइंट्स घेतो, रिटेलर्स तुमच्याकडून खरेदी करून ते पॉइंट्स कमावतात, आणि गिफ्ट व सहली जिंकतात. संपूर्ण स्कीम Peppermint चालवते. तुमच्या ब्रँडसाठी हे कसे काम करते ते सांगू का?",
          gu: "INTIQ આખા ઇનરવેર અને સ્લીપવેર ટ્રેડ માટે એક રિવોર્ડ્સ પ્રોગ્રામ છે. તમારી બ્રાન્ડ IQ પોઇન્ટ્સ લે છે, રિટેલર્સ તમારી પાસેથી ખરીદીને એ પોઇન્ટ્સ કમાય છે, અને ગિફ્ટ અને પ્રવાસ જીતે છે. આખી સ્કીમ Peppermint ચલાવે છે. શું હું સમજાવું કે તમારી બ્રાન્ડ માટે આ કેવી રીતે કામ કરે છે?" },
    yes: { r: "levels", b: "brand_how" }, card: { r: "wallet", b: "flow" }, chips: { r: ["free", "earn", "levels"], b: ["brand_how", "cost", "maths"] } },

  { id: "company", who: "*", kw: 'peppermint pepermint company "who is" "who runs" kaun "kon hai" "kaun hai" "kaun chalata" kisne organiser organizer "source nxt" sourcenxt कंपनी पेपरमिंट कौन "किसकी" "कोण" "कोणाची" "કોણ" કંપની પેપરમિન્ટ "kon che" "kon chalave"',
    t: { en: "Who runs INTIQ?", hi: "INTIQ कौन चलाता है?", mr: "INTIQ कोण चालवते?", gu: "INTIQ કોણ ચલાવે છે?" },
    a: { en: "INTIQ is run by Peppermint Communications, Mumbai, the team behind INTIMASIA and SOURCE NXT. At INTIMASIA 2023, more than 200 brands and 15,000 retailers and distributors came together. Did you know we ran Buy & Fly, a retailer rewards programme, about 20 years ago?",
         hi: "INTIQ को Peppermint Communications, मुंबई चलाता है, वही टीम जो INTIMASIA और SOURCE NXT करती है। INTIMASIA 2023 में 200 से ज़्यादा ब्रांड्स और 15,000 से ज़्यादा रिटेलर्स और डिस्ट्रीब्यूटर्स आए थे। क्या आपको पता है, करीब 20 साल पहले हमने Buy & Fly रिवॉर्ड्स प्रोग्राम चलाया था?",
         mr: "INTIQ ला Peppermint Communications, मुंबई चालवते, तीच टीम जी INTIMASIA आणि SOURCE NXT करते. INTIMASIA 2023 मध्ये 200 पेक्षा जास्त ब्रँड्स आणि 15,000 पेक्षा जास्त रिटेलर्स व डिस्ट्रीब्युटर्स आले होते. तुम्हाला माहिती आहे का, सुमारे 20 वर्षांपूर्वी आम्ही Buy & Fly रिवॉर्ड्स प्रोग्राम चालवला होता?",
         gu: "INTIQ ને Peppermint Communications, મુંબઈ ચલાવે છે, એ જ ટીમ જે INTIMASIA અને SOURCE NXT કરે છે. INTIMASIA 2023 માં 200 થી વધુ બ્રાન્ડ્સ અને 15,000 થી વધુ રિટેલર્સ અને ડિસ્ટ્રિબ્યુટર્સ આવ્યા હતા. શું તમને ખબર છે, લગભગ 20 વર્ષ પહેલાં અમે Buy & Fly રિવોર્ડ્સ પ્રોગ્રામ ચલાવ્યો હતો?" },
    yes: "buyfly", card: "about", chips: ["buyfly", "trust", "contact"] },

  { id: "trust", who: "*", kw: 'trust bharosa bharosa bharose fraud fake farzi genuine real safe sach sacha "sahi hai" "sach hai" guarantee bharosemand भरोसा असली नकली धोखा सुरक्षित विश्वास "सच" "खरा" "खरे" फसवणूक "विश्वास" વિશ્વાસ ભરોસો સાચું છેતરપિંડી "khotu" "sachu"',
    t: { en: "Can I trust it?", hi: "क्या भरोसा कर सकते हैं?", mr: "विश्वास ठेवू शकतो का?", gu: "ભરોસો કરી શકાય?" },
    a: { en: "Yes, it is genuine. Peppermint has worked with this trade for years through INTIMASIA and SOURCE NXT, and our team meets you in person to register you. Would you like to call our team now?",
         hi: "जी हाँ, यह बिल्कुल असली है। Peppermint सालों से INTIMASIA और SOURCE NXT के ज़रिए इसी ट्रेड के साथ काम कर रहा है, और हमारी टीम आपसे खुद मिलकर रजिस्टर करती है। क्या आप अभी हमारी टीम से बात करना चाहेंगे?",
         mr: "हो, हे पूर्णपणे खरे आहे. Peppermint अनेक वर्षांपासून INTIMASIA आणि SOURCE NXT द्वारे याच व्यापारासोबत काम करत आहे, आणि आमची टीम तुम्हाला प्रत्यक्ष भेटून नोंदणी करते. तुम्हाला आता आमच्या टीमशी बोलायचे आहे का?",
         gu: "હા, આ બિલકુલ સાચું છે. Peppermint વર્ષોથી INTIMASIA અને SOURCE NXT દ્વારા આ જ ટ્રેડ સાથે કામ કરે છે, અને અમારી ટીમ તમને રૂબરૂ મળીને રજીસ્ટર કરે છે. શું તમે હમણાં અમારી ટીમ સાથે વાત કરવા માંગો છો?" },
    yes: "contact", card: "about", chips: ["contact", "company"] },

  { id: "buyfly", who: "*", kw: '"buy and fly" "buy & fly" "buy n fly" buyfly "बाय एंड फ्लाय" "बाय एन्ड फ्लाई" "बाय अँड फ्लाय" "બાય એન્ડ ફ્લાય" "20 saal" "20 years" "20 sal" "bees saal" purana "पुराना" "20 साल" "20 वर्ष" "20 વર્ષ"',
    t: { en: "What was Buy & Fly?", hi: "Buy & Fly क्या था?", mr: "Buy & Fly काय होते?", gu: "Buy & Fly શું હતું?" },
    a: { en: "Buy & Fly was our retailer rewards programme about 20 years ago. Retailers still ask us to bring it back. INTIQ is that idea, bigger and better.",
         hi: "Buy & Fly करीब 20 साल पहले हमारा रिटेलर रिवॉर्ड्स प्रोग्राम था। रिटेलर्स आज भी पूछते हैं कि वो फिर कब आएगा। INTIQ वही आइडिया है, और भी बड़ा और बेहतर।",
         mr: "Buy & Fly हा सुमारे 20 वर्षांपूर्वीचा आमचा रिटेलर रिवॉर्ड्स प्रोग्राम होता. रिटेलर्स आजही विचारतात की तो पुन्हा कधी येणार. INTIQ हीच कल्पना आहे, अजून मोठी आणि चांगली.",
         gu: "Buy & Fly લગભગ 20 વર્ષ પહેલાં અમારો રિટેલર રિવોર્ડ્સ પ્રોગ્રામ હતો. રિટેલર્સ આજે પણ પૂછે છે કે એ ફરી ક્યારે આવશે. INTIQ એ જ આઇડિયા છે, વધુ મોટો અને વધુ સારો." },
    ask: { r: { en: "Want to see where you can travel this time?", hi: "क्या आप देखना चाहेंगे कि इस बार आप कहाँ घूम सकते हैं?", mr: "या वेळी तुम्ही कुठे फिरू शकता ते पाहायचे आहे का?", gu: "આ વખતે તમે ક્યાં ફરી શકો એ જોવું છે?" },
           b: { en: "Shall I explain how INTIQ works for brands?", hi: "क्या मैं बताऊँ कि ब्रांड्स के लिए INTIQ कैसे काम करता है?", mr: "ब्रँड्ससाठी INTIQ कसे काम करते ते सांगू का?", gu: "શું હું સમજાવું કે બ્રાન્ડ્સ માટે INTIQ કેવી રીતે કામ કરે છે?" } },
    yes: { r: "domestic", b: "brand_how" }, card: "about", chips: { r: ["domestic", "intl", "free"], b: ["brand_how", "cost"] } },

  { id: "when", who: "*", kw: 'when kab start shuru date "kab se" "kab tak" timing duration mahine months month december dec march "kitne din" "kitne mahine" launch कब शुरू तारीख दिसंबर मार्च महीने "केव्हा" "कधी" सुरू "किती महिने" ક્યારે શરૂ ડિસેમ્બર માર્ચ મહિના "kyare" "kevha" "kadhi" "कब तक"^ "kab tak"^ "किती दिवस" "કેટલા દિવસ"',
    t: { en: "When does it start?", hi: "कब शुरू होगा?", mr: "कधी सुरू होणार?", gu: "ક્યારે શરૂ થશે?" },
    a: { en: "Onboarding is on now, till 15 December. The programme launches in December 2026, and Phase 1 runs for 3 months, till 15 March 2027.",
         hi: "रजिस्ट्रेशन अभी चल रहा है, 15 दिसंबर तक। प्रोग्राम दिसंबर 2026 में शुरू होगा, और फेज़ 1 तीन महीने चलेगा, 15 मार्च 2027 तक।",
         mr: "नोंदणी आत्ता सुरू आहे, 15 डिसेंबरपर्यंत. प्रोग्राम डिसेंबर 2026 मध्ये सुरू होईल, आणि फेज 1 तीन महिने चालेल, 15 मार्च 2027 पर्यंत.",
         gu: "રજીસ્ટ્રેશન હમણાં ચાલુ છે, 15 ડિસેમ્બર સુધી. પ્રોગ્રામ ડિસેમ્બર 2026 માં શરૂ થશે, અને ફેઝ 1 ત્રણ મહિના ચાલશે, 15 માર્ચ 2027 સુધી." },
    ask: { r: { en: "Do you want to register before 15 December?", hi: "क्या आप 15 दिसंबर से पहले रजिस्टर करना चाहेंगे?", mr: "15 डिसेंबरपूर्वी नोंदणी करायची आहे का?", gu: "શું તમે 15 ડિસેમ્બર પહેલાં રજીસ્ટર કરવા માંગો છો?" },
           b: { en: "Phase 1 has room for only 20 brands. Shall I tell you how to enrol?", hi: "फेज़ 1 में सिर्फ 20 ब्रांड्स की जगह है। क्या मैं बताऊँ कि कैसे जुड़ें?", mr: "फेज 1 मध्ये फक्त 20 ब्रँड्ससाठी जागा आहे. कसे सामील व्हायचे ते सांगू का?", gu: "ફેઝ 1 માં ફક્ત 20 બ્રાન્ડ્સની જગ્યા છે. શું હું કહું કે કેવી રીતે જોડાવું?" } },
    yes: { r: "join_r", b: "join_b" }, card: "plan", chips: { r: ["join_r", "where"], b: ["join_b", "now"] } },

  { id: "where", who: "*", kw: 'where city cities state kahan kaha shahar shehar maharashtra gujarat mumbai ahmedabad surat pune nagpur vadodara baroda nashik rajkot "kaun se shahar" "konse shahar" कहाँ कहां शहर राज्य महाराष्ट्र गुजरात मुंबई अहमदाबाद सूरत पुणे "कुठे" "कोणत्या" ક્યાં શહેર ગુજરાત મહારાષ્ટ્ર અમદાવાદ સુરત "kyan" "kuthe"',
    t: { en: "Which cities?", hi: "कौन से शहर?", mr: "कोणती शहरे?", gu: "કયા શહેરો?" },
    a: { en: "Phase 1 is in Maharashtra and Gujarat, in more than 15 cities like Mumbai, Ahmedabad, Surat, Pune, Nagpur, Vadodara, Nashik and Rajkot. After that, all of India.",
         hi: "फेज़ 1 महाराष्ट्र और गुजरात में है, 15 से ज़्यादा शहरों में, जैसे मुंबई, अहमदाबाद, सूरत, पुणे, नागपुर, वडोदरा, नाशिक और राजकोट। उसके बाद पूरा भारत।",
         mr: "फेज 1 महाराष्ट्र आणि गुजरातमध्ये आहे, 15 पेक्षा जास्त शहरांमध्ये, जसे मुंबई, अहमदाबाद, सुरत, पुणे, नागपूर, वडोदरा, नाशिक आणि राजकोट. त्यानंतर संपूर्ण भारत.",
         gu: "ફેઝ 1 મહારાષ્ટ્ર અને ગુજરાતમાં છે, 15 થી વધુ શહેરોમાં, જેમ કે મુંબઈ, અમદાવાદ, સુરત, પુણે, નાગપુર, વડોદરા, નાશિક અને રાજકોટ. ત્યાર પછી આખું ભારત." },
    ask: { r: { en: "Is your shop in one of these cities? If not, call us and we will note your name.", hi: "क्या आपकी दुकान इनमें से किसी शहर में है? अगर नहीं, तो हमें कॉल कीजिए, हम आपका नाम लिख लेंगे।", mr: "तुमचे दुकान यापैकी एखाद्या शहरात आहे का? नसेल तर आम्हाला कॉल करा, आम्ही तुमचे नाव नोंदवू.", gu: "શું તમારી દુકાન આમાંથી કોઈ શહેરમાં છે? ન હોય તો અમને કૉલ કરો, અમે તમારું નામ નોંધી લઈશું." },
           b: { en: "Are these your key markets? Our team can open new cities for your brand too.", hi: "क्या ये आपके मुख्य बाज़ार हैं? हमारी टीम आपके ब्रांड के लिए नए शहर भी खोल सकती है।", mr: "ही तुमची मुख्य बाजारपेठ आहे का? आमची टीम तुमच्या ब्रँडसाठी नवीन शहरेही उघडू शकते.", gu: "શું આ તમારા મુખ્ય બજારો છે? અમારી ટીમ તમારી બ્રાન્ડ માટે નવા શહેરો પણ ખોલી શકે છે." } },
    card: "cities", chips: { r: ["panindia", "join_r", "contact"], b: ["newret", "panindia", "maths"] } },

  { id: "panindia", who: "*", kw: '"pan india" "pan-india" "all india" "poore india" "pure india" "whole india" "my city" "mera shahar" "mera sheher" "other city" "other state" delhi kolkata bangalore bengaluru chennai hyderabad jaipur lucknow indore "पूरे भारत" "दूसरे शहर" "मेरा शहर" दिल्ली कोलकाता "संपूर्ण भारत" "माझे शहर" "આખા ભારત" "મારું શહેર" "બીજા શહેર" "phase 1 ke baad" "phase 1 ke bad" "after phase 1" "after phase" "baad mein kya" "uske baad" "फेज 1 के बाद" "उसके बाद" "नंतर काय" "પછી શું"',
    t: { en: "After Phase 1?", hi: "फेज़ 1 के बाद?", mr: "फेज 1 नंतर?", gu: "ફેઝ 1 પછી?" },
    a: { en: "After Phase 1 in Maharashtra and Gujarat, INTIQ will go Pan-India, from Srinagar to Thiruvananthapuram and Ahmedabad to Guwahati. If your city is not in Phase 1, call us and we will note your name. Shall I show our numbers?",
         hi: "महाराष्ट्र और गुजरात में फेज़ 1 के बाद INTIQ पूरे भारत में जाएगा, श्रीनगर से तिरुवनंतपुरम तक और अहमदाबाद से गुवाहाटी तक। अगर आपका शहर फेज़ 1 में नहीं है, तो हमें कॉल कीजिए, हम आपका नाम लिख लेंगे। क्या मैं हमारे नंबर दिखाऊँ?",
         mr: "महाराष्ट्र आणि गुजरातमधील फेज 1 नंतर INTIQ संपूर्ण भारतात जाईल, श्रीनगर ते तिरुवनंतपुरम आणि अहमदाबाद ते गुवाहाटी. तुमचे शहर फेज 1 मध्ये नसेल तर आम्हाला कॉल करा, आम्ही तुमचे नाव नोंदवू. आमचे नंबर दाखवू का?",
         gu: "મહારાષ્ટ્ર અને ગુજરાતમાં ફેઝ 1 પછી INTIQ આખા ભારતમાં જશે, શ્રીનગરથી તિરુવનંતપુરમ અને અમદાવાદથી ગુવાહાટી સુધી. જો તમારું શહેર ફેઝ 1 માં ન હોય, તો અમને કૉલ કરો, અમે તમારું નામ નોંધી લઈશું. શું હું અમારા નંબર બતાવું?" },
    yes: "contact", card: "india", chips: ["contact", "where"] },

  { id: "brands", who: "*", kw: '"which brands" "kaun se brand" "konse brand" "kon se brand" "kaunsi brand" "brand list" "brands list" "brand names" "partner brands" "kitne brand" "how many brands" "कौन से ब्रांड" "कितने ब्रांड" "कोणते ब्रँड" "किती ब्रँड" "કઈ બ્રાન્ડ" "કેટલી બ્રાન્ડ" "20 brands" "20 brand" "kitne brands" "kaun se brands" "konse brands" "कितने ब्रांड्स" "किती ब्रँड्स"',
    t: { en: "Which brands?", hi: "कौन से ब्रांड्स?", mr: "कोणते ब्रँड्स?", gu: "કઈ બ્રાન્ડ્સ?" },
    a: { en: "20 partner brands will join Phase 1, across bras, panties, men's briefs, vests, shapewear, nightwear, socks and thermals. The final list is being made now, and our team can tell you the latest.",
         hi: "फेज़ 1 में 20 पार्टनर ब्रांड्स होंगे: ब्रा, पैंटी, जेंट्स ब्रीफ, बनियान, शेपवियर, नाइटवियर, मोज़े और थर्मल। फाइनल लिस्ट अभी बन रही है, हमारी टीम आपको ताज़ा जानकारी दे सकती है।",
         mr: "फेज 1 मध्ये 20 पार्टनर ब्रँड्स असतील: ब्रा, पँटी, पुरुषांचे ब्रीफ, बनियन, शेपवेअर, नाइटवेअर, मोजे आणि थर्मल. अंतिम यादी आत्ता तयार होत आहे, आमची टीम तुम्हाला ताजी माहिती देऊ शकते.",
         gu: "ફેઝ 1 માં 20 પાર્ટનર બ્રાન્ડ્સ હશે: બ્રા, પેન્ટી, જેન્ટ્સ બ્રીફ, બનિયન, શેપવેર, નાઇટવેર, મોજાં અને થર્મલ. ફાઇનલ લિસ્ટ હમણાં બની રહી છે, અમારી ટીમ તમને તાજી માહિતી આપી શકે છે." },
    ask: { r: { en: "Which brands do you sell the most in your shop?", hi: "आपकी दुकान में कौन से ब्रांड सबसे ज़्यादा बिकते हैं?", mr: "तुमच्या दुकानात कोणते ब्रँड सर्वात जास्त विकले जातात?", gu: "તમારી દુકાનમાં કઈ બ્રાન્ડ સૌથી વધુ વેચાય છે?" },
           b: { en: "Phase 1 takes only 20 brands. Would you like to book your place?", hi: "फेज़ 1 में सिर्फ 20 ब्रांड्स लिए जाएँगे। क्या आप अपनी जगह बुक करना चाहेंगे?", mr: "फेज 1 मध्ये फक्त 20 ब्रँड्स घेतले जातील. तुमची जागा बुक करायची आहे का?", gu: "ફેઝ 1 માં ફક્ત 20 બ્રાન્ડ્સ લેવાશે. શું તમે તમારી જગ્યા બુક કરવા માંગો છો?" } },
    yes: { b: "join_b" }, card: "categories", chips: { r: ["wallet", "earn"], b: ["join_b", "now"] } },

  { id: "products", who: "*", kw: 'product products category categories bra bras panty panties brief briefs vest vests baniyan banian shapewear nightwear sleepwear nighty socks thermal thermals innerwear lingerie undergarment "kaunsa maal" "kaun sa maal" maal माल प्रोडक्ट ब्रा पैंटी बनियान नाइटवियर स्लीपवियर इनरवियर थर्मल "कोणता माल" "कोणते प्रॉडक्ट" પ્રોડક્ટ માલ બ્રા પેન્ટી બનિયન',
    t: { en: "Which products count?", hi: "कौन सा माल गिना जाएगा?", mr: "कोणता माल मोजला जाईल?", gu: "કયો માલ ગણાશે?" },
    a: { en: "Innerwear and sleepwear from the partner brands: bras, panties, men's briefs, vests, shapewear, nightwear, socks and thermals.",
         hi: "पार्टनर ब्रांड्स का इनरवियर और स्लीपवियर: ब्रा, पैंटी, जेंट्स ब्रीफ, बनियान, शेपवियर, नाइटवियर, मोज़े और थर्मल।",
         mr: "पार्टनर ब्रँड्सचे इनरवेअर आणि स्लीपवेअर: ब्रा, पँटी, पुरुषांचे ब्रीफ, बनियन, शेपवेअर, नाइटवेअर, मोजे आणि थर्मल.",
         gu: "પાર્ટનર બ્રાન્ડ્સનું ઇનરવેર અને સ્લીપવેર: બ્રા, પેન્ટી, જેન્ટ્સ બ્રીફ, બનિયન, શેપવેર, નાઇટવેર, મોજાં અને થર્મલ." },
    ask: { r: { en: "Want to know how points are earned?", hi: "क्या जानना चाहेंगे कि पॉइंट्स कैसे मिलते हैं?", mr: "पॉइंट्स कसे मिळतात ते जाणून घ्यायचे आहे का?", gu: "પોઇન્ટ્સ કેવી રીતે મળે છે એ જાણવું છે?" },
           b: { en: "Shall I explain how it works for your brand?", hi: "क्या मैं बताऊँ कि आपके ब्रांड के लिए यह कैसे काम करता है?", mr: "तुमच्या ब्रँडसाठी हे कसे काम करते ते सांगू का?", gu: "શું હું સમજાવું કે તમારી બ્રાન્ડ માટે આ કેવી રીતે કામ કરે છે?" } },
    yes: { r: "earn", b: "brand_how" }, card: "categories", chips: { r: ["earn", "wallet"], b: ["brand_how", "cost"] } },

  { id: "contact", who: "*", kw: 'call phone number contact "baat karni" "baat karna" "baat karo" helpline "kisi se" team human insaan madad help "number do" "number dijiye" mobile whatsapp फोन नंबर कॉल "बात" संपर्क मदद "बोलायचे" "बोलायचंय" मदत फोन "નંબર" "વાત" સંપર્ક મદદ ફોન કૉલ "vaat"',
    t: { en: "Call the team", hi: "टीम से बात करें", mr: "टीमशी बोला", gu: "ટીમ સાથે વાત કરો" },
    a: { en: "Call our INTIQ team on +91 75063 99935 or +91 75063 99922. Just tap a number to call.",
         hi: "हमारी INTIQ टीम को कॉल कीजिए: +91 75063 99935 या +91 75063 99922। कॉल करने के लिए नंबर पर टैप कीजिए।",
         mr: "आमच्या INTIQ टीमला कॉल करा: +91 75063 99935 किंवा +91 75063 99922. कॉल करण्यासाठी नंबरवर टॅप करा.",
         gu: "અમારી INTIQ ટીમને કૉલ કરો: +91 75063 99935 અથવા +91 75063 99922. કૉલ કરવા માટે નંબર પર ટૅપ કરો." },
    card: "contact", chips: "@start" },

  { id: "thanks", who: "*", kw: 'thanks thank thankyou "thank you" dhanyawad dhanyavad shukriya theek thik accha acha achha bye "ok bye" samajh "samajh gaya" "samjh gaya" "got it" great nice super badhiya धन्यवाद शुक्रिया ठीक अच्छा बाय समझ "धन्यवाद" आभार "बरं" "छान" "આભાર" ઠીક "સરસ" "saras" "chhan"',
    t: { en: "Thank you", hi: "धन्यवाद", mr: "धन्यवाद", gu: "આભાર" },
    a: { en: "Happy to help! Is there anything else you want to know?", hi: "मदद करके खुशी हुई! कुछ और जानना चाहेंगे?", mr: "मदत करून आनंद झाला! अजून काही जाणून घ्यायचे आहे का?", gu: "મદદ કરીને આનંદ થયો! બીજું કંઈ જાણવું છે?" },
    chips: "@start" },

  /* ---------------- retailers ---------------- */
  { id: "free", who: "r", kw: 'free^ fee* charge* paisa paise "kitna paisa" kharcha muft* mufat "joining fee" "kuch dena" "pay karna" "paise lagenge" "lagega" फ्री मुफ्त मुफ़्त फीस पैसे खर्च शुल्क "लगेगा" "देना" मोफत "पैसे लागतील" "फी" "ફ્રી" "મફત" "ફી" "પૈસા" "ખર્ચ" "lagse" "lagel" mofat mafat',
    t: { en: "Is joining free?", hi: "क्या जुड़ना फ्री है?", mr: "सामील होणे फ्री आहे का?", gu: "જોડાવું ફ્રી છે?" },
    a: { en: "Yes, joining INTIQ is completely free for retailers. No fee, and no extra work. Shall I tell you how to register?",
         hi: "जी हाँ, रिटेलर्स के लिए INTIQ में जुड़ना बिल्कुल फ्री है। कोई फीस नहीं, कोई एक्स्ट्रा काम नहीं। क्या मैं बताऊँ कि रजिस्टर कैसे करें?",
         mr: "हो, रिटेलर्ससाठी INTIQ मध्ये सामील होणे पूर्णपणे फ्री आहे. कोणतीही फी नाही, कोणतेही जास्त काम नाही. नोंदणी कशी करायची ते सांगू का?",
         gu: "હા, રિટેલર્સ માટે INTIQ માં જોડાવું બિલકુલ ફ્રી છે. કોઈ ફી નહીં, કોઈ વધારાનું કામ નહીં. શું હું કહું કે રજીસ્ટર કેવી રીતે કરવું?" },
    yes: "join_r", card: "free", chips: ["join_r", "earn", "levels"] },

  { id: "join_r", who: "r", kw: 'join joining register registration "kaise jude" "kaise judu" "kaise judna" "kaise joint" enrol enroll signup "sign up" member membership form document documents "kya chahiye" जुड़ना जुड़ें जुड़ूँ रजिस्टर रजिस्ट्रेशन सदस्य "कैसे जुड़" "सामील" नोंदणी "कसे सामील" "જોડાવું" "જોડાઉં" રજીસ્ટર "નોંધણી" "kevi rite" "kase"',
    t: { en: "How do I join?", hi: "कैसे जुड़ें?", mr: "कसे सामील व्हायचे?", gu: "કેવી રીતે જોડાવું?" },
    a: { en: "It is simple. Call our team, or meet them when they visit your shop. They will register you the same day. Onboarding is open till 15 December. Shall I show you the numbers to call?",
         hi: "बहुत आसान है। हमारी टीम को कॉल कीजिए, या जब टीम आपकी दुकान पर आए तब मिलिए। वो उसी दिन आपको रजिस्टर कर देंगे। रजिस्ट्रेशन 15 दिसंबर तक खुला है। क्या मैं कॉल करने के नंबर दिखाऊँ?",
         mr: "खूप सोपे आहे. आमच्या टीमला कॉल करा, किंवा टीम तुमच्या दुकानात आल्यावर भेटा. ते त्याच दिवशी तुमची नोंदणी करतील. नोंदणी 15 डिसेंबरपर्यंत खुली आहे. कॉल करण्यासाठी नंबर दाखवू का?",
         gu: "ખૂબ સરળ છે. અમારી ટીમને કૉલ કરો, અથવા ટીમ તમારી દુકાને આવે ત્યારે મળો. તેઓ એ જ દિવસે તમને રજીસ્ટર કરી દેશે. રજીસ્ટ્રેશન 15 ડિસેમ્બર સુધી ખુલ્લું છે. શું હું કૉલ કરવાના નંબર બતાવું?" },
    yes: "contact", card: "contact", chips: ["contact", "free", "when"] },

  { id: "earn", who: "r", kw: 'earn earning points~ point~ "kaise milenge" "kaise milega" milega~ milenge~ "points kaise" kamai kamana kamaye "kitne points" percent percentage reward~ rewards~ "4%" "4 percent" pointss पॉइंट~ पॉइंट्स~ कमाई कमाएं "कैसे मिलेंगे" मिलेगा~ "कसे मिळतील" कमवा "पॉइंट्स कसे" "મળશે" કમાણી પોઇન્ટ~ પોઇન્ટ્સ~ "kevi rite male" "kase milnar"',
    t: { en: "How do I earn points?", hi: "पॉइंट्स कैसे मिलेंगे?", mr: "पॉइंट्स कसे मिळतील?", gu: "પોઇન્ટ્સ કેવી રીતે મળશે?" },
    a: { en: "Purchase from any partner brand, as usual. Points come into your INTIQ wallet. For example, at 4%, a purchase of ₹3 lakh gives you 12,000 points. How much do you purchase in 3 months? Tell me, and I will tell you your level.",
         hi: "किसी भी पार्टनर ब्रांड से हमेशा की तरह खरीदिए। पॉइंट्स आपके INTIQ वॉलेट में आ जाएँगे। उदाहरण: 4% पर ₹3 लाख की खरीद पर 12,000 पॉइंट्स। आप 3 महीने में कितनी खरीद करते हैं? बताइए, मैं आपका लेवल बताता हूँ।",
         mr: "कोणत्याही पार्टनर ब्रँडकडून नेहमीप्रमाणे खरेदी करा. पॉइंट्स तुमच्या INTIQ वॉलेटमध्ये येतील. उदाहरण: 4% ने ₹3 लाखांच्या खरेदीवर 12,000 पॉइंट्स. तुम्ही 3 महिन्यांत किती खरेदी करता? सांगा, मी तुमचे लेव्हल सांगतो.",
         gu: "કોઈ પણ પાર્ટનર બ્રાન્ડ પાસેથી હંમેશની જેમ ખરીદો. પોઇન્ટ્સ તમારા INTIQ વોલેટમાં આવી જશે. ઉદાહરણ: 4% પર ₹3 લાખની ખરીદી પર 12,000 પોઇન્ટ્સ. તમે 3 મહિનામાં કેટલી ખરીદી કરો છો? કહો, હું તમારું લેવલ કહું." },
    yes: "calc_r", card: "calc_r", chips: ["levels", "wallet", "nochange"] },

  { id: "wallet", who: "r", kw: 'wallet "ek wallet" "one wallet" "sab brand" "sabhi brand" "all brands" "points ek jagah" "alag alag" "alag scheme" scattered "har brand" jama वॉलेट बटुआ "एक जगह" "सभी ब्रांड" "अलग अलग" "एकाच" "सर्व ब्रँड" "एक वॉलेट" "એક જગ્યાએ" "બધી બ્રાન્ડ" વોલેટ "અલગ અલગ"',
    t: { en: "One wallet?", hi: "एक वॉलेट?", mr: "एक वॉलेट?", gu: "એક વોલેટ?" },
    a: { en: "Today every brand's scheme is separate, so small points go waste. With INTIQ, points from all 20 brands go into one wallet and add up fast. Shall I show you the levels these points can reach?",
         hi: "आज हर ब्रांड की स्कीम अलग है, इसलिए छोटे पॉइंट्स बेकार चले जाते हैं। INTIQ में सभी 20 ब्रांड्स के पॉइंट्स एक ही वॉलेट में आते हैं और जल्दी बढ़ते हैं। क्या मैं दिखाऊँ ये पॉइंट्स किस लेवल तक ले जा सकते हैं?",
         mr: "आज प्रत्येक ब्रँडची स्कीम वेगळी आहे, त्यामुळे छोटे पॉइंट्स वाया जातात. INTIQ मध्ये सर्व 20 ब्रँड्सचे पॉइंट्स एकाच वॉलेटमध्ये येतात आणि लवकर वाढतात. हे पॉइंट्स कोणत्या लेव्हलपर्यंत नेऊ शकतात ते दाखवू का?",
         gu: "આજે દરેક બ્રાન્ડની સ્કીમ અલગ છે, એટલે નાના પોઇન્ટ્સ નકામા જાય છે. INTIQ માં બધી 20 બ્રાન્ડ્સના પોઇન્ટ્સ એક જ વોલેટમાં આવે છે અને ઝડપથી વધે છે. શું હું બતાવું કે આ પોઇન્ટ્સ કયા લેવલ સુધી લઈ જઈ શકે?" },
    yes: "levels", card: "wallet", chips: ["levels", "earn"] },

  { id: "levels", who: "*", kw: 'level levels step steps tier tiers "kitne level" "kaun sa level" "konsa level" ladder stage seedhi सीढ़ी लेवल स्तर "कितने लेवल" "लेव्हल" "किती लेव्हल" "પગથિયું" લેવલ "કેટલા લેવલ" "kiti level" "ketla level" "level 1" "level 2" "level 3" "level 4" "लेवल 1" "लेवल 2" "लेवल 3" "लेवल 4"',
    t: { en: "What are the 4 levels?", hi: "4 लेवल कौन से हैं?", mr: "4 लेव्हल कोणते?", gu: "4 લેવલ કયા છે?" },
    a: { en: "There are 4 levels. 1: Gifts. 2: Select domestic trip. 3: Premium domestic trip. 4: International trip. More points, higher level.",
         hi: "4 लेवल हैं। 1: गिफ्ट्स। 2: घरेलू यात्रा। 3: प्रीमियम घरेलू यात्रा। 4: विदेश यात्रा। जितने ज़्यादा पॉइंट्स, उतना ऊँचा लेवल।",
         mr: "4 लेव्हल आहेत. 1: गिफ्ट्स. 2: देशांतर्गत सहल. 3: प्रीमियम देशांतर्गत सहल. 4: परदेश प्रवास. जितके जास्त पॉइंट्स, तितके उंच लेव्हल.",
         gu: "4 લેવલ છે. 1: ગિફ્ટ્સ. 2: ભારતમાં પ્રવાસ. 3: પ્રીમિયમ ભારત પ્રવાસ. 4: વિદેશ પ્રવાસ. જેટલા વધુ પોઇન્ટ્સ, એટલું ઊંચું લેવલ." },
    ask: { r: { en: "Tell me your 3-month purchase, and I will tell you your level.", hi: "अपनी 3 महीने की खरीद बताइए, मैं आपका लेवल बताता हूँ।", mr: "तुमची 3 महिन्यांची खरेदी सांगा, मी तुमचे लेव्हल सांगतो.", gu: "તમારી 3 મહિનાની ખરીદી કહો, હું તમારું લેવલ કહું." },
           b: { en: "Want to see how much purchase your IQ Points can reward?", hi: "क्या आप देखना चाहेंगे कि आपके IQ पॉइंट्स कितनी खरीद को रिवॉर्ड कर सकते हैं?", mr: "तुमचे IQ पॉइंट्स किती खरेदीला रिवॉर्ड देऊ शकतात ते पाहायचे आहे का?", gu: "શું તમે જોવા માંગો છો કે તમારા IQ પોઇન્ટ્સ કેટલી ખરીદીને રિવોર્ડ કરી શકે?" } },
    yes: { r: "calc_r", b: "calc_b" }, card: "levels", chips: { r: ["gifts", "domestic", "intl"], b: ["brand_how", "rate"] } },

  { id: "gifts", who: "r", kw: 'gift gifts hamper hampers tv television speaker phone mobile smartphone gadget gadgets saman samaan "kya milega" "kya kya milega" inaam inam prize prizes इनाम गिफ्ट उपहार टीवी फोन मोबाइल "क्या मिलेगा" "बक्षीस" भेट "काय मिळेल" "ઇનામ" ભેટ "શું મળશે" ગિફ્ટ',
    t: { en: "What gifts?", hi: "कौन से गिफ्ट?", mr: "कोणते गिफ्ट?", gu: "કઈ ગિફ્ટ?" },
    a: { en: "Level 1 is gifts: a festive hamper or family gift box, or a gadget like a smart TV, a party speaker or a smartphone. Would you like to see the trips at the next levels?",
         hi: "लेवल 1 में गिफ्ट्स हैं: त्योहार का हैम्पर या फैमिली गिफ्ट बॉक्स, या गैजेट जैसे स्मार्ट टीवी, पार्टी स्पीकर या स्मार्टफोन। क्या आप अगले लेवल की ट्रिप्स देखना चाहेंगे?",
         mr: "लेव्हल 1 मध्ये गिफ्ट्स आहेत: सणाचा हॅम्पर किंवा फॅमिली गिफ्ट बॉक्स, किंवा स्मार्ट टीव्ही, पार्टी स्पीकर किंवा स्मार्टफोनसारखे गॅजेट. पुढच्या लेव्हलच्या सहली पाहायच्या आहेत का?",
         gu: "લેવલ 1 માં ગિફ્ટ્સ છે: તહેવારનું હેમ્પર કે ફેમિલી ગિફ્ટ બોક્સ, અથવા સ્માર્ટ ટીવી, પાર્ટી સ્પીકર કે સ્માર્ટફોન જેવું ગેજેટ. શું તમે આગળના લેવલના પ્રવાસ જોવા માંગો છો?" },
    yes: "domestic", card: "gifts", chips: ["domestic", "intl", "calc_r"] },

  { id: "domestic", who: "r", kw: 'trip trips tour tours holiday holidays ghoomna ghumna ghumne ghoomne travel goa gokarna udaipur kerala himachal andaman manali "india trip" domestic yatra safar chutti छुट्टी यात्रा टूर घूमना घूमने गोवा केरल हिमाचल अंडमान उदयपुर "सहल" फिरणे प्रवास "फिरायला" "પ્રવાસ" "ફરવા" ગોવા કેરળ "farva" "firayla"',
    t: { en: "Which trips in India?", hi: "भारत में कौन सी ट्रिप?", mr: "भारतातील कोणत्या सहली?", gu: "ભારતમાં કયા પ્રવાસ?" },
    a: { en: "Level 2: a trip to Goa, Gokarna or Udaipur. Level 3: Kerala, the Himachal mountains or the Andaman islands. Flights from Mumbai. Shall I tell you about the international trip too?",
         hi: "लेवल 2: गोवा, गोकर्ण या उदयपुर की ट्रिप। लेवल 3: केरल, हिमाचल के पहाड़ या अंडमान के द्वीप। मुंबई से फ्लाइट। क्या मैं विदेश यात्रा के बारे में भी बताऊँ?",
         mr: "लेव्हल 2: गोवा, गोकर्ण किंवा उदयपूरची सहल. लेव्हल 3: केरळ, हिमाचलचे डोंगर किंवा अंदमानची बेटे. मुंबईहून फ्लाइट. परदेश प्रवासाबद्दलही सांगू का?",
         gu: "લેવલ 2: ગોવા, ગોકર્ણ કે ઉદયપુરનો પ્રવાસ. લેવલ 3: કેરળ, હિમાચલના પહાડ કે આંદામાનના ટાપુ. મુંબઈથી ફ્લાઇટ. શું હું વિદેશ પ્રવાસ વિશે પણ કહું?" },
    yes: "intl", card: "trips", chips: ["intl", "calc_r", "levels"] },

  { id: "intl", who: "r", kw: 'international^ abroad^ foreign^ videsh^ "bahar ka" "bahar" singapore malaysia bali flight plane "foreign trip" विदेश^ "बाहर" सिंगापुर मलेशिया बाली "परदेश" "परदेशी" "વિદેશ" "સિંગાપોર" "બાલી" "videsh" "pardesh" "परदेश"^ pardesh^ "परदेशी"^',
    t: { en: "International trip?", hi: "विदेश यात्रा?", mr: "परदेश प्रवास?", gu: "વિદેશ પ્રવાસ?" },
    a: { en: "Level 4, the top level, is an international trip: Malaysia, Singapore or Bali, flying from Mumbai. Our Buy & Fly retailers did it years ago, and now it is your turn. Tell me your 3-month purchase, and I will check how close you are.",
         hi: "लेवल 4, सबसे ऊपर का लेवल, विदेश यात्रा है: मलेशिया, सिंगापुर या बाली, मुंबई से फ्लाइट। सालों पहले हमारे Buy & Fly रिटेलर्स गए थे, अब आपकी बारी है। अपनी 3 महीने की खरीद बताइए, मैं देखता हूँ आप कितने पास हैं।",
         mr: "लेव्हल 4, सर्वात वरचे लेव्हल, म्हणजे परदेश प्रवास: मलेशिया, सिंगापूर किंवा बाली, मुंबईहून फ्लाइट. वर्षांपूर्वी आमचे Buy & Fly रिटेलर्स गेले होते, आता तुमची पाळी. तुमची 3 महिन्यांची खरेदी सांगा, तुम्ही किती जवळ आहात ते मी पाहतो.",
         gu: "લેવલ 4, સૌથી ઉપરનું લેવલ, વિદેશ પ્રવાસ છે: મલેશિયા, સિંગાપોર કે બાલી, મુંબઈથી ફ્લાઇટ. વર્ષો પહેલાં અમારા Buy & Fly રિટેલર્સ ગયા હતા, હવે તમારો વારો છે. તમારી 3 મહિનાની ખરીદી કહો, હું જોઉં તમે કેટલા નજીક છો." },
    yes: "calc_r", card: "trips", chips: ["calc_r", "levels", "buyfly"] },

  { id: "calc_r", who: "r", kw: '"kitna milega" "mujhe kya milega" "mera level" "my level" "which level" calculate calculator hisab hisaab "kitne points milenge" "kaun sa level milega" "how many points" "how much will i get" "what will i get" "मेरा लेवल" "मुझे क्या मिलेगा" "कितने पॉइंट्स" हिसाब "माझे लेव्हल" "मला काय मिळेल" "किती पॉइंट्स" "મારું લેવલ" "મને શું મળશે" "કેટલા પોઇન્ટ્સ" "hisaab" "ganit"',
    t: { en: "Which level will I reach?", hi: "मेरा कौन सा लेवल आएगा?", mr: "माझे लेव्हल कोणते येईल?", gu: "મારું કયું લેવલ આવશે?" },
    a: { en: "Tell me how much you purchase from these brands in 3 months, for example \"10 lakh\". Or tap an amount below. I will tell you your points and your level.",
         hi: "बताइए आप इन ब्रांड्स से 3 महीने में कितनी खरीद करते हैं, जैसे \"10 लाख\"। या नीचे कोई रकम दबाइए। मैं आपके पॉइंट्स और लेवल बताऊँगा।",
         mr: "सांगा तुम्ही या ब्रँड्सकडून 3 महिन्यांत किती खरेदी करता, जसे \"10 लाख\". किंवा खाली एखादी रक्कम दाबा. मी तुमचे पॉइंट्स आणि लेव्हल सांगेन.",
         gu: "કહો તમે આ બ્રાન્ડ્સ પાસેથી 3 મહિનામાં કેટલી ખરીદી કરો છો, જેમ કે \"10 લાખ\". અથવા નીચે કોઈ રકમ દબાવો. હું તમારા પોઇન્ટ્સ અને લેવલ કહીશ." },
    card: "calc_r", chips: ["levels", "earn"] },

  { id: "nochange", who: "r", kw: 'change "extra kaam" "extra work" "kuch alag" "kya karna" "kya karna padega" "kya karna hoga" process system app "naya kuch" "badalna" "badal" "mujhe kya karna" "मुझे क्या करना" "क्या करना होगा" "बदलना" "एक्स्ट्रा काम" "काय करावे लागेल" "काय करायचे" "बदल" "શું કરવાનું" "શું કરવું પડશે" "બદલવું" "kay karaycha" "shu karvanu"',
    t: { en: "What do I have to do?", hi: "मुझे क्या करना होगा?", mr: "मला काय करावे लागेल?", gu: "મારે શું કરવાનું?" },
    a: { en: "Nothing changes. Purchase just as you do today. INTIQ tracks your purchases from partner brands and adds the points for you. Shall I tell you how the points add up?",
         hi: "कुछ नहीं बदलता। जैसे आज खरीदते हैं, वैसे ही खरीदिए। INTIQ पार्टनर ब्रांड्स से आपकी खरीद का हिसाब रखता है और पॉइंट्स आपके लिए जोड़ता है। क्या मैं बताऊँ पॉइंट्स कैसे बढ़ते हैं?",
         mr: "काहीच बदलत नाही. आज जशी खरेदी करता तशीच करा. INTIQ पार्टनर ब्रँड्सकडून तुमच्या खरेदीचा हिशोब ठेवते आणि पॉइंट्स तुमच्यासाठी जोडते. पॉइंट्स कसे वाढतात ते सांगू का?",
         gu: "કંઈ બદલાતું નથી. આજે જેમ ખરીદો છો એમ જ ખરીદો. INTIQ પાર્ટનર બ્રાન્ડ્સ પાસેથી તમારી ખરીદીનો હિસાબ રાખે છે અને પોઇન્ટ્સ તમારા માટે ઉમેરે છે. શું હું કહું પોઇન્ટ્સ કેવી રીતે વધે છે?" },
    yes: "earn", card: "steps", chips: ["earn", "free"] },

  { id: "cash", who: "r", kw: 'cash money "cash milega" discount discounts nagad "paise milenge" "paisa milega" "cash back" cashback refund रोकड़ नकद "कैश" "डिस्काउंट" "पैसे मिलेंगे" "रोख" "पैसे मिळतील" "રોકડ" "ડિસ્કાઉન્ટ" "પૈસા મળશે" rokda',
    t: { en: "Can I get cash?", hi: "क्या कैश मिलेगा?", mr: "रोख मिळेल का?", gu: "રોકડ મળશે?" },
    a: { en: "INTIQ rewards are gifts and trips, not cash discounts. That is what makes them special for you and your family. Our team will share the full rules when you register. Want to see the rewards?",
         hi: "INTIQ के इनाम गिफ्ट्स और ट्रिप्स हैं, कैश डिस्काउंट नहीं। यही इन्हें आपके और आपके परिवार के लिए खास बनाता है। पूरे नियम रजिस्ट्रेशन पर हमारी टीम बताएगी। क्या आप इनाम देखना चाहेंगे?",
         mr: "INTIQ ची बक्षिसे म्हणजे गिफ्ट्स आणि सहली, रोख सवलत नाही. म्हणूनच ती तुमच्यासाठी आणि कुटुंबासाठी खास आहेत. संपूर्ण नियम नोंदणीच्या वेळी आमची टीम सांगेल. बक्षिसे पाहायची आहेत का?",
         gu: "INTIQ ના ઇનામ ગિફ્ટ્સ અને પ્રવાસ છે, રોકડ ડિસ્કાઉન્ટ નહીં. એ જ એમને તમારા અને તમારા પરિવાર માટે ખાસ બનાવે છે. પૂરા નિયમો રજીસ્ટ્રેશન વખતે અમારી ટીમ કહેશે. શું તમે ઇનામ જોવા માંગો છો?" },
    yes: "levels", card: "levels", chips: ["levels", "contact"] },

  { id: "expiry", who: "r", kw: 'expire^ expiry^ expires^ "khatam" "khatam ho" "kab tak" validity^ valid "time limit" lapse "bekaar" "waste" "बेकार" "खत्म" "समाप्त" "वैधता" "संपणार" "संपतील" "वाया" "પૂરા" "ખતમ" "વેલિડિટી" "નકામા"',
    t: { en: "Do points expire?", hi: "क्या पॉइंट्स खत्म होंगे?", mr: "पॉइंट्स संपतील का?", gu: "પોઇન્ટ્સ પૂરા થઈ જશે?" },
    a: { en: "In INTIQ your points stay together in one wallet, so they don't get lost across brands. Phase 1 runs till 15 March 2027. Our team will share the full points rules when you register. Shall I show you the numbers to call?",
         hi: "INTIQ में आपके पॉइंट्स एक ही वॉलेट में साथ रहते हैं, इसलिए अलग-अलग ब्रांड्स में बिखरकर खोते नहीं। फेज़ 1, 15 मार्च 2027 तक चलेगा। पॉइंट्स के पूरे नियम रजिस्ट्रेशन पर हमारी टीम बताएगी। क्या मैं कॉल करने के नंबर दिखाऊँ?",
         mr: "INTIQ मध्ये तुमचे पॉइंट्स एकाच वॉलेटमध्ये एकत्र राहतात, त्यामुळे वेगवेगळ्या ब्रँड्समध्ये विखुरून हरवत नाहीत. फेज 1, 15 मार्च 2027 पर्यंत चालेल. पॉइंट्सचे संपूर्ण नियम नोंदणीच्या वेळी आमची टीम सांगेल. कॉल करण्यासाठी नंबर दाखवू का?",
         gu: "INTIQ માં તમારા પોઇન્ટ્સ એક જ વોલેટમાં સાથે રહે છે, એટલે અલગ-અલગ બ્રાન્ડ્સમાં વિખેરાઈને ખોવાતા નથી. ફેઝ 1, 15 માર્ચ 2027 સુધી ચાલશે. પોઇન્ટ્સના પૂરા નિયમો રજીસ્ટ્રેશન વખતે અમારી ટીમ કહેશે. શું હું કૉલ કરવાના નંબર બતાવું?" },
    yes: "contact", card: "plan", chips: ["contact", "wallet"] },

  { id: "small", who: "r", kw: '"small shop" "chhoti dukan" "choti dukan" "chhoti shop" chhota choti "kam purchase" "kam kharid" "small retailer" "chhota dukandar" "छोटी दुकान" "छोटा दुकानदार" "कम खरीद" "लहान दुकान" "कमी खरेदी" "નાની દુકાન" "ઓછી ખરીદી" "lahan" "nani dukan"',
    t: { en: "I have a small shop", hi: "मेरी छोटी दुकान है", mr: "माझे लहान दुकान आहे", gu: "મારી નાની દુકાન છે" },
    a: { en: "Every shop can join, small or big. At the example 4% rate, about ₹2.5 lakh of purchases in 3 months already reaches Level 1. How much do you purchase in 3 months?",
         hi: "हर दुकान जुड़ सकती है, छोटी हो या बड़ी। 4% के उदाहरण से, 3 महीने में करीब ₹2.5 लाख की खरीद पर ही लेवल 1 मिल जाता है। आप 3 महीने में कितनी खरीद करते हैं?",
         mr: "प्रत्येक दुकान सामील होऊ शकते, लहान असो वा मोठे. 4% च्या उदाहरणाने, 3 महिन्यांत सुमारे ₹2.5 लाख खरेदीवरच लेव्हल 1 मिळते. तुम्ही 3 महिन्यांत किती खरेदी करता?",
         gu: "દરેક દુકાન જોડાઈ શકે છે, નાની હોય કે મોટી. 4% ના ઉદાહરણથી, 3 મહિનામાં લગભગ ₹2.5 લાખની ખરીદી પર જ લેવલ 1 મળી જાય છે. તમે 3 મહિનામાં કેટલી ખરીદી કરો છો?" },
    yes: "calc_r", card: "calc_r", chips: ["free", "levels"] },

  { id: "bonus", who: "r", kw: 'bonus^ extra "special scheme" honour honor samman award awards "stage par" intimasia "इंटिमेशिया" बोनस सम्मान "सन्मान" "पुरस्कार" "બોનસ" "સન્માન" "એવોર્ડ"',
    t: { en: "Any bonus?", hi: "कोई बोनस?", mr: "काही बोनस?", gu: "કોઈ બોનસ?" },
    a: { en: "Yes! There are bonus points on special schemes, and the top retailers will be honoured at INTIMASIA. Want to see what your points can win?",
         hi: "जी हाँ! स्पेशल स्कीम्स पर बोनस पॉइंट्स हैं, और टॉप रिटेलर्स को INTIMASIA में सम्मानित किया जाएगा। क्या आप देखना चाहेंगे आपके पॉइंट्स क्या जिता सकते हैं?",
         mr: "हो! स्पेशल स्कीम्सवर बोनस पॉइंट्स आहेत, आणि टॉप रिटेलर्सचा INTIMASIA मध्ये सन्मान केला जाईल. तुमचे पॉइंट्स काय जिंकू शकतात ते पाहायचे आहे का?",
         gu: "હા! સ્પેશલ સ્કીમ્સ પર બોનસ પોઇન્ટ્સ છે, અને ટોપ રિટેલર્સનું INTIMASIA માં સન્માન થશે. શું તમે જોવા માંગો છો તમારા પોઇન્ટ્સ શું જીતાડી શકે?" },
    yes: "levels", card: "free", chips: ["levels", "join_r"] },

  { id: "track", who: "r", kw: 'track tracking "kaise pata" "kaise dekhe" "kaise dekhu" balance statement "mere points" "check points" "points check" "how will i know" "points kaise dekhe" "पता कैसे" "कैसे देखें" "मेरे पॉइंट्स" "कसे कळेल" "कसे पाहू" "माझे पॉइंट्स" "કેવી રીતે ખબર" "મારા પોઇન્ટ્સ" "kevi rite jou"',
    t: { en: "How will I see my points?", hi: "पॉइंट्स कैसे देखूँ?", mr: "पॉइंट्स कसे पाहू?", gu: "પોઇન્ટ્સ કેવી રીતે જોઉં?" },
    a: { en: "INTIQ tracks every purchase from partner brands and adds the points to your wallet. When you register, our team will show you how to check your points. Shall I show the numbers to call?",
         hi: "INTIQ पार्टनर ब्रांड्स से हर खरीद का हिसाब रखता है और पॉइंट्स आपके वॉलेट में जोड़ता है। रजिस्ट्रेशन के समय हमारी टीम बताएगी कि पॉइंट्स कैसे देखें। क्या मैं कॉल करने के नंबर दिखाऊँ?",
         mr: "INTIQ पार्टनर ब्रँड्सकडून प्रत्येक खरेदीचा हिशोब ठेवते आणि पॉइंट्स तुमच्या वॉलेटमध्ये जोडते. नोंदणीच्या वेळी आमची टीम पॉइंट्स कसे पाहायचे ते दाखवेल. कॉल करण्यासाठी नंबर दाखवू का?",
         gu: "INTIQ પાર્ટનર બ્રાન્ડ્સ પાસેથી દરેક ખરીદીનો હિસાબ રાખે છે અને પોઇન્ટ્સ તમારા વોલેટમાં ઉમેરે છે. રજીસ્ટ્રેશન વખતે અમારી ટીમ બતાવશે કે પોઇન્ટ્સ કેવી રીતે જોવા. શું હું કૉલ કરવાના નંબર બતાવું?" },
    yes: "contact", card: "steps", chips: ["contact", "earn"] },

  /* ---------------- brands ---------------- */
  { id: "brand_how", who: "b", kw: '"how it works" "how does it work" "kaise kaam" "kaise chalega" "kaise chalta" "brand ke liye" "for brands" "for my brand" process "mere brand" "मेरे ब्रांड" "काम कैसे" "कैसे चलेगा" "ब्रांड के लिए" "कसे काम" "ब्रँडसाठी" "કેવી રીતે કામ" "બ્રાન્ડ માટે" "kem chale"',
    t: { en: "How does it work for brands?", hi: "ब्रांड के लिए कैसे काम करता है?", mr: "ब्रँडसाठी कसे काम करते?", gu: "બ્રાન્ડ માટે કેવી રીતે કામ કરે?" },
    a: { en: "Simple. Your brand buys IQ Points. Retailers purchase from you and earn those points. They climb levels and win gifts and trips. You sell, and we run the scheme. Shall I tell you the cost?",
         hi: "आसान है। आपका ब्रांड IQ पॉइंट्स लेता है। रिटेलर आपसे खरीदते हैं और वो पॉइंट्स कमाते हैं। वो लेवल चढ़ते हैं और गिफ्ट्स और ट्रिप्स जीतते हैं। आप बेचिए, स्कीम हम चलाएँगे। क्या मैं खर्च बताऊँ?",
         mr: "सोपे आहे. तुमचा ब्रँड IQ पॉइंट्स घेतो. रिटेलर्स तुमच्याकडून खरेदी करतात आणि ते पॉइंट्स कमावतात. ते लेव्हल चढतात आणि गिफ्ट्स व सहली जिंकतात. तुम्ही विका, स्कीम आम्ही चालवू. खर्च सांगू का?",
         gu: "સરળ છે. તમારી બ્રાન્ડ IQ પોઇન્ટ્સ લે છે. રિટેલર્સ તમારી પાસેથી ખરીદે છે અને એ પોઇન્ટ્સ કમાય છે. તેઓ લેવલ ચઢે છે અને ગિફ્ટ્સ અને પ્રવાસ જીતે છે. તમે વેચો, સ્કીમ અમે ચલાવીશું. શું હું ખર્ચ કહું?" },
    yes: "cost", card: "flow", chips: ["cost", "work", "why"] },

  { id: "cost", who: "b", kw: 'cost costs price pricing minimum invest investment "kitna lagega" "kitna paisa" "kitne paise" kharcha budget "30 lakh" charges "kitna dena" "kitna invest" fee fees free खर्च कीमत "कितना लगेगा" निवेश "कितने पैसे" "किती लागेल" "किती पैसे" "खर्च" "કેટલો ખર્ચ" "કેટલા પૈસા" "કિંમત" "ketla" "kiti"',
    t: { en: "What does it cost?", hi: "कितना खर्च होगा?", mr: "किती खर्च येईल?", gu: "કેટલો ખર્ચ થશે?" },
    a: { en: "The minimum is ₹30 lakh of IQ Points per brand, plus a 2% INTIQ service fee. That is ₹60,000 on ₹30 lakh. Want to see how much purchase ₹30 lakh can reward?",
         hi: "हर ब्रांड के लिए कम से कम ₹30 लाख के IQ पॉइंट्स, और 2% INTIQ सर्विस फीस। यानी ₹30 लाख पर ₹60,000। क्या आप देखना चाहेंगे कि ₹30 लाख कितनी खरीद को रिवॉर्ड कर सकते हैं?",
         mr: "प्रत्येक ब्रँडसाठी किमान ₹30 लाखांचे IQ पॉइंट्स, आणि 2% INTIQ सर्व्हिस फी. म्हणजे ₹30 लाखांवर ₹60,000. ₹30 लाख किती खरेदीला रिवॉर्ड देऊ शकतात ते पाहायचे आहे का?",
         gu: "દરેક બ્રાન્ડ માટે ઓછામાં ઓછા ₹30 લાખના IQ પોઇન્ટ્સ, અને 2% INTIQ સર્વિસ ફી. એટલે ₹30 લાખ પર ₹60,000. શું તમે જોવા માંગો છો કે ₹30 લાખ કેટલી ખરીદીને રિવોર્ડ કરી શકે?" },
    yes: "calc_b", card: "numbers", chips: ["calc_b", "fee", "maths"] },

  { id: "fee", who: "b", kw: '"service fee" "2%" "2 percent" "do percent" commission "aapka charge" "aapki fees" "peppermint ka" "your fee" "your charge" "सर्विस फीस" "कमीशन" "आपकी फीस" "तुमची फी" "સર્વિસ ફી" "કમિશન"',
    t: { en: "What is your fee?", hi: "आपकी फीस क्या है?", mr: "तुमची फी किती?", gu: "તમારી ફી કેટલી?" },
    a: { en: "Our service fee is 2% of your IQ Points. On ₹30 lakh, that is ₹60,000. For this, INTIQ runs the full scheme for you. Shall I show you everything INTIQ does?",
         hi: "हमारी सर्विस फीस आपके IQ पॉइंट्स का 2% है। ₹30 लाख पर यह ₹60,000 है। इसमें INTIQ आपकी पूरी स्कीम चलाता है। क्या मैं दिखाऊँ INTIQ क्या-क्या करता है?",
         mr: "आमची सर्व्हिस फी तुमच्या IQ पॉइंट्सच्या 2% आहे. ₹30 लाखांवर ती ₹60,000 आहे. यात INTIQ तुमची संपूर्ण स्कीम चालवते. INTIQ काय-काय करते ते दाखवू का?",
         gu: "અમારી સર્વિસ ફી તમારા IQ પોઇન્ટ્સના 2% છે. ₹30 લાખ પર એ ₹60,000 છે. આમાં INTIQ તમારી આખી સ્કીમ ચલાવે છે. શું હું બતાવું INTIQ શું-શું કરે છે?" },
    yes: "work", card: "numbers", chips: ["work", "calc_b"] },

  { id: "rate", who: "b", kw: '"4%" "4 percent" "char percent" "reward rate" "kitna percent" "kitne percent" "retailer ko kitna" "points rate" "कितने प्रतिशत" "कितना प्रतिशत" "रिटेलर को कितना" "किती टक्के" "કેટલા ટકા" "takka" "taka"',
    t: { en: "How much do retailers get?", hi: "रिटेलर को कितना मिलता है?", mr: "रिटेलरला किती मिळते?", gu: "રિટેલરને કેટલું મળે?" },
    a: { en: "4% is our example reward rate: a retailer purchasing ₹3 lakh gets 12,000 points. At 4%, your ₹30 lakh of IQ Points rewards ₹7.5 crore of purchases. Final rates are being confirmed. Tell me your IQ Points budget, and I will work it out.",
         hi: "4% हमारा उदाहरण रेट है: ₹3 लाख खरीदने वाले रिटेलर को 12,000 पॉइंट्स। 4% पर आपके ₹30 लाख के IQ पॉइंट्स ₹7.5 करोड़ की खरीद को रिवॉर्ड करते हैं। फाइनल रेट तय हो रहे हैं। अपना IQ पॉइंट्स बजट बताइए, मैं हिसाब लगाता हूँ।",
         mr: "4% हा आमचा उदाहरण दर आहे: ₹3 लाख खरेदी करणाऱ्या रिटेलरला 12,000 पॉइंट्स. 4% ने तुमचे ₹30 लाखांचे IQ पॉइंट्स ₹7.5 कोटींच्या खरेदीला रिवॉर्ड देतात. अंतिम दर ठरत आहेत. तुमचे IQ पॉइंट्स बजेट सांगा, मी हिशोब करतो.",
         gu: "4% અમારો ઉદાહરણ રેટ છે: ₹3 લાખ ખરીદનાર રિટેલરને 12,000 પોઇન્ટ્સ. 4% પર તમારા ₹30 લાખના IQ પોઇન્ટ્સ ₹7.5 કરોડની ખરીદીને રિવોર્ડ કરે છે. ફાઇનલ રેટ નક્કી થઈ રહ્યા છે. તમારું IQ પોઇન્ટ્સ બજેટ કહો, હું હિસાબ કરું." },
    yes: "calc_b", card: "calc_b", chips: ["calc_b", "levels", "maths"] },

  { id: "maths", who: "b", kw: 'maths math market "kitna business" "how much business" sales "kitna bikega" potential "1000 retailers" "1,000 retailers" "50 crore" fayda faida profit benefit roi return returns "kitna fayda" "kya fayda" "बाज़ार" "बाजार" "फायदा" "बिक्री" "कितना बिज़नेस" "नफा" "फायदा काय" "बाजारपेठ" "નફો" "ફાયદો" "વેચાણ" "બજાર" "business"',
    t: { en: "Show me the maths", hi: "हिसाब दिखाइए", mr: "हिशोब दाखवा", gu: "હિસાબ બતાવો" },
    a: { en: "Phase 1 has 1,000+ retailers. Even with our lowest estimates, they purchase over ₹50 crore a month, about ₹152 crore in 3 months. If your brand wins just 5%, that is ₹7.6 crore of purchases. What share do you think your brand can win?",
         hi: "फेज़ 1 में 1,000 से ज़्यादा रिटेलर्स हैं। हमारे सबसे कम अंदाज़े से भी, वो हर महीने ₹50 करोड़ से ज़्यादा की खरीद करते हैं, यानी 3 महीने में करीब ₹152 करोड़। अगर आपके ब्रांड को सिर्फ 5% भी मिला, तो ₹7.6 करोड़ की खरीद। आपको क्या लगता है, आपका ब्रांड कितना हिस्सा ले सकता है?",
         mr: "फेज 1 मध्ये 1,000 पेक्षा जास्त रिटेलर्स आहेत. आमच्या सर्वात कमी अंदाजानेही, ते दर महिन्याला ₹50 कोटींपेक्षा जास्त खरेदी करतात, म्हणजे 3 महिन्यांत सुमारे ₹152 कोटी. तुमच्या ब्रँडला फक्त 5% जरी मिळाले, तरी ₹7.6 कोटींची खरेदी. तुमचा ब्रँड किती हिस्सा मिळवू शकेल असे वाटते?",
         gu: "ફેઝ 1 માં 1,000 થી વધુ રિટેલર્સ છે. અમારા સૌથી ઓછા અંદાજથી પણ, તેઓ દર મહિને ₹50 કરોડથી વધુની ખરીદી કરે છે, એટલે 3 મહિનામાં લગભગ ₹152 કરોડ. જો તમારી બ્રાન્ડને ફક્ત 5% પણ મળે, તો ₹7.6 કરોડની ખરીદી. તમને શું લાગે છે, તમારી બ્રાન્ડ કેટલો હિસ્સો લઈ શકે?" },
    card: "market", chips: ["calc_b", "newret", "join_b"] },

  { id: "why", who: "b", kw: 'why "kyu" "kyon" "kyun" "kyo" "own scheme" "apni scheme" "hamari scheme" difference fark farak better compare comparison "kya alag" "kyu jude" "kyun jude" "हमारी स्कीम" "अपनी स्कीम" "फर्क" "क्यों" "फरक" "का सामील" "आमची स्कीम" "કેમ" "ફરક" "અમારી સ્કીમ" "kem"',
    t: { en: "Why not my own scheme?", hi: "अपनी स्कीम क्यों नहीं?", mr: "स्वतःची स्कीम का नाही?", gu: "પોતાની સ્કીમ કેમ નહીં?" },
    a: { en: "Your own scheme reaches only your retailers, usually gives cash discounts, and your team does all the work. With INTIQ you also reach new retailers, they win gifts and trips they remember, and we track everything. Shall I show the 8 jobs we take off your team?",
         hi: "आपकी अपनी स्कीम सिर्फ आपके रिटेलर्स तक जाती है, अक्सर कैश डिस्काउंट देती है, और सारा काम आपकी टीम करती है। INTIQ में नए रिटेलर्स भी जुड़ते हैं, वो याद रहने वाले गिफ्ट्स और ट्रिप्स जीतते हैं, और सारा हिसाब हम रखते हैं। क्या मैं वो 8 काम दिखाऊँ जो हम आपकी टीम से हटा देते हैं?",
         mr: "तुमची स्वतःची स्कीम फक्त तुमच्या रिटेलर्सपर्यंत जाते, बहुतेक रोख सवलत देते, आणि सर्व काम तुमची टीम करते. INTIQ मध्ये नवीन रिटेलर्सही जोडले जातात, ते लक्षात राहणारी गिफ्ट्स आणि सहली जिंकतात, आणि सर्व हिशोब आम्ही ठेवतो. आम्ही तुमच्या टीमकडून कमी करतो ती 8 कामे दाखवू का?",
         gu: "તમારી પોતાની સ્કીમ ફક્ત તમારા રિટેલર્સ સુધી જાય છે, મોટેભાગે રોકડ ડિસ્કાઉન્ટ આપે છે, અને બધું કામ તમારી ટીમ કરે છે. INTIQ માં નવા રિટેલર્સ પણ જોડાય છે, તેઓ યાદ રહે એવી ગિફ્ટ્સ અને પ્રવાસ જીતે છે, અને બધો હિસાબ અમે રાખીએ છીએ. શું હું એ 8 કામ બતાવું જે અમે તમારી ટીમ પરથી હટાવીએ છીએ?" },
    yes: "work", card: "compare", chips: ["work", "newret", "cost"] },

  { id: "work", who: "b", kw: '"kya karoge" "aap kya karoge" "what will you do" "what do you do" "team ka kaam" operations "kaun karega" "who will do" "who does" "kaam kaun" "sara kaam" "आप क्या करेंगे" "कौन करेगा" "काम कौन" "तुम्ही काय कराल" "कोण करणार" "તમે શું કરશો" "કોણ કરશે" "8 kaam" "8 jobs" ground events "social media" marketing',
    t: { en: "What will INTIQ do?", hi: "INTIQ क्या करेगा?", mr: "INTIQ काय करेल?", gu: "INTIQ શું કરશે?" },
    a: { en: "INTIQ does all 8 jobs: plan, set targets, announce, track buying, check retailers, calculate, give rewards and review. Our team also works on the ground: new retailers, new cities, social media and events. Want to know how many retailers you can reach?",
         hi: "INTIQ सारे 8 काम करता है: प्लान, टारगेट, ऐलान, खरीद का हिसाब, रिटेलर्स की जाँच, कैलकुलेशन, इनाम देना और रिव्यू। हमारी टीम ज़मीन पर भी काम करती है: नए रिटेलर्स, नए शहर, सोशल मीडिया और इवेंट्स। क्या आप जानना चाहेंगे कि आप कितने रिटेलर्स तक पहुँच सकते हैं?",
         mr: "INTIQ सर्व 8 कामे करते: प्लॅन, टार्गेट, घोषणा, खरेदीचा हिशोब, रिटेलर्सची तपासणी, गणना, बक्षिसे देणे आणि आढावा. आमची टीम प्रत्यक्ष बाजारातही काम करते: नवीन रिटेलर्स, नवीन शहरे, सोशल मीडिया आणि इव्हेंट्स. तुम्ही किती रिटेलर्सपर्यंत पोहोचू शकता ते जाणून घ्यायचे आहे का?",
         gu: "INTIQ બધા 8 કામ કરે છે: પ્લાન, ટાર્ગેટ, જાહેરાત, ખરીદીનો હિસાબ, રિટેલર્સની તપાસ, ગણતરી, ઇનામ આપવા અને રિવ્યૂ. અમારી ટીમ જમીન પર પણ કામ કરે છે: નવા રિટેલર્સ, નવા શહેરો, સોશિયલ મીડિયા અને ઇવેન્ટ્સ. શું તમે જાણવા માંગો છો કે તમે કેટલા રિટેલર્સ સુધી પહોંચી શકો?" },
    yes: "maths", card: "work", chips: ["maths", "newret", "cost"] },

  { id: "newret", who: "b", kw: '"new retailers" "new retailer" "naye retailer" "naye retailers" "nayi dukan" "naye dukandar" reach "zyada retailer" expansion "new cities" "naye shahar" "more retailers" "नए रिटेलर" "नई दुकान" "नए शहर" "नवीन रिटेलर" "नवीन शहर" "નવા રિટેલર" "નવા શહેર"',
    t: { en: "Will I get new retailers?", hi: "क्या नए रिटेलर मिलेंगे?", mr: "नवीन रिटेलर्स मिळतील का?", gu: "નવા રિટેલર્સ મળશે?" },
    a: { en: "Yes. Retailers of all 20 brands share one wallet, so they have a reason to try your brand too. Our team also finds new retailers and opens new cities for you. Shall I tell you about the 1,000+ retailers in Phase 1?",
         hi: "जी हाँ। सभी 20 ब्रांड्स के रिटेलर्स का एक ही वॉलेट है, इसलिए उनके पास आपका ब्रांड आज़माने की वजह होती है। हमारी टीम आपके लिए नए रिटेलर्स ढूँढती है और नए शहर भी खोलती है। क्या मैं फेज़ 1 के 1,000+ रिटेलर्स के बारे में बताऊँ?",
         mr: "हो. सर्व 20 ब्रँड्सच्या रिटेलर्सचे एकच वॉलेट आहे, त्यामुळे त्यांना तुमचा ब्रँड वापरून पाहण्याचे कारण मिळते. आमची टीम तुमच्यासाठी नवीन रिटेलर्स शोधते आणि नवीन शहरेही उघडते. फेज 1 मधील 1,000+ रिटेलर्सबद्दल सांगू का?",
         gu: "હા. બધી 20 બ્રાન્ડ્સના રિટેલર્સનું એક જ વોલેટ છે, એટલે એમને તમારી બ્રાન્ડ અજમાવવાનું કારણ મળે છે. અમારી ટીમ તમારા માટે નવા રિટેલર્સ શોધે છે અને નવા શહેરો પણ ખોલે છે. શું હું ફેઝ 1 ના 1,000+ રિટેલર્સ વિશે કહું?" },
    yes: "maths", card: "cities", chips: ["maths", "where", "join_b"] },

  { id: "join_b", who: "b", kw: 'enrol enroll enrolment join joining "kaise jude" "kaise judna" "sign up" register registration book booking slot jagah "kaise shuru" "start karna" onboarding "बुक" "जुड़ें" "कैसे जुड़" "जगह" "नोंदणी" "सामील" "જોડાવું" "બુક" "નોંધણી"',
    t: { en: "How do we enrol?", hi: "कैसे जुड़ें?", mr: "कसे सामील व्हायचे?", gu: "કેવી રીતે જોડાવું?" },
    a: { en: "Call our team to enrol. Onboarding is open till 15 December, and Phase 1 takes only 20 brands. Shall I show the numbers?",
         hi: "जुड़ने के लिए हमारी टीम को कॉल कीजिए। रजिस्ट्रेशन 15 दिसंबर तक खुला है, और फेज़ 1 में सिर्फ 20 ब्रांड्स लिए जाएँगे। क्या मैं नंबर दिखाऊँ?",
         mr: "सामील होण्यासाठी आमच्या टीमला कॉल करा. नोंदणी 15 डिसेंबरपर्यंत खुली आहे, आणि फेज 1 मध्ये फक्त 20 ब्रँड्स घेतले जातील. नंबर दाखवू का?",
         gu: "જોડાવા માટે અમારી ટીમને કૉલ કરો. રજીસ્ટ્રેશન 15 ડિસેમ્બર સુધી ખુલ્લું છે, અને ફેઝ 1 માં ફક્ત 20 બ્રાન્ડ્સ લેવાશે. શું હું નંબર બતાવું?" },
    yes: "contact", card: "contact", chips: ["contact", "now", "cost"] },

  { id: "now", who: "b", kw: '"abhi kyu"^ "abhi kyun"^ "why now"^ early "pehle" gold copper sona tamba "late" "baad mein" "wait" "अभी क्यों" "सोना" "तांबा" "बाद में" "आता का" "नंतर" "હમણાં કેમ" "સોનું" "પછી" "join now"^ "right now" "अभी जुड़"',
    t: { en: "Why join now?", hi: "अभी क्यों जुड़ें?", mr: "आत्ताच का?", gu: "હમણાં જ કેમ?" },
    a: { en: "Joining now is like getting gold at the price of copper. You start in 2 states, and when INTIQ goes Pan-India, you are already in. Shall I tell you how to enrol?",
         hi: "अभी जुड़ना मतलब तांबे के दाम में सोना। आप 2 राज्यों से शुरू करते हैं, और जब INTIQ पूरे भारत में जाएगा, आप पहले से अंदर होंगे। क्या मैं बताऊँ कैसे जुड़ें?",
         mr: "आत्ता सामील होणे म्हणजे तांब्याच्या किमतीत सोने. तुम्ही 2 राज्यांपासून सुरुवात करता, आणि INTIQ संपूर्ण भारतात जाईल तेव्हा तुम्ही आधीच आत असाल. कसे सामील व्हायचे ते सांगू का?",
         gu: "હમણાં જોડાવું એટલે તાંબાના ભાવે સોનું. તમે 2 રાજ્યોથી શરૂ કરો છો, અને જ્યારે INTIQ આખા ભારતમાં જશે, તમે પહેલેથી અંદર હશો. શું હું કહું કેવી રીતે જોડાવું?" },
    yes: "join_b", card: "india", chips: ["join_b", "when", "maths"] },

  { id: "calc_b", who: "b", kw: '"my budget" "mera budget" "if i put" "agar main" "agar hum" "iq points kitne" "how much will" "calculate" calculator hisab hisaab "kitne ka" "मेरा बजट" "अगर हम" "हिसाब" "माझे बजेट" "हिशोब" "મારું બજેટ" "હિસાબ" "iq points"',
    t: { en: "Work out my budget", hi: "मेरा बजट जोड़िए", mr: "माझे बजेट मोजा", gu: "મારું બજેટ ગણો" },
    a: { en: "Tell me how much you want to put in IQ Points, for example \"50 lakh\". Or tap an amount below. I will show the purchases it can reward and the fee.",
         hi: "बताइए आप कितने के IQ पॉइंट्स लेना चाहते हैं, जैसे \"50 लाख\"। या नीचे कोई रकम दबाइए। मैं दिखाऊँगा कि उससे कितनी खरीद रिवॉर्ड होगी और फीस कितनी।",
         mr: "सांगा तुम्हाला किती रुपयांचे IQ पॉइंट्स घ्यायचे आहेत, जसे \"50 लाख\". किंवा खाली एखादी रक्कम दाबा. त्यातून किती खरेदीला रिवॉर्ड मिळेल आणि फी किती ते मी दाखवेन.",
         gu: "કહો તમે કેટલાના IQ પોઇન્ટ્સ લેવા માંગો છો, જેમ કે \"50 લાખ\". અથવા નીચે કોઈ રકમ દબાવો. હું બતાવીશ કે એનાથી કેટલી ખરીદી રિવોર્ડ થશે અને ફી કેટલી." },
    card: "calc_b", chips: ["cost", "maths"] },

  { id: "report", who: "b", kw: 'report^ reports^ data "kaise pata chalega" result results review transparent transparency "hisab kaun" "रिपोर्ट" "डेटा" "नतीजा" "अहवाल" "निकाल" "રિપોર્ટ" "પરિણામ"',
    t: { en: "Will we see results?", hi: "नतीजे दिखेंगे?", mr: "निकाल दिसतील का?", gu: "પરિણામ દેખાશે?" },
    a: { en: "Yes. INTIQ tracks every purchase and every reward for you, and reviews the results with your brand. Want to see all 8 jobs we handle?",
         hi: "जी हाँ। INTIQ आपके लिए हर खरीद और हर इनाम का हिसाब रखता है, और नतीजों का रिव्यू आपके ब्रांड के साथ करता है। क्या आप वो सारे 8 काम देखना चाहेंगे जो हम संभालते हैं?",
         mr: "हो. INTIQ तुमच्यासाठी प्रत्येक खरेदी आणि प्रत्येक बक्षिसाचा हिशोब ठेवते, आणि निकालांचा आढावा तुमच्या ब्रँडसोबत घेते. आम्ही सांभाळतो ती सर्व 8 कामे पाहायची आहेत का?",
         gu: "હા. INTIQ તમારા માટે દરેક ખરીદી અને દરેક ઇનામનો હિસાબ રાખે છે, અને પરિણામોનો રિવ્યૂ તમારી બ્રાન્ડ સાથે કરે છે. શું તમે એ બધા 8 કામ જોવા માંગો છો જે અમે સંભાળીએ છીએ?" },
    yes: "work", card: "work", chips: ["work", "maths"] }
];

/* "Did you know?" facts the bot adds after some answers */
window.DYK = {
  r: [
    { en: "Points from all 20 brands add up in one wallet.", hi: "सभी 20 ब्रांड्स के पॉइंट्स एक ही वॉलेट में जुड़ते हैं।", mr: "सर्व 20 ब्रँड्सचे पॉइंट्स एकाच वॉलेटमध्ये जमा होतात.", gu: "બધી 20 બ્રાન્ડ્સના પોઇન્ટ્સ એક જ વોલેટમાં ઉમેરાય છે." },
    { en: "The top retailers will be honoured at INTIMASIA.", hi: "टॉप रिटेलर्स को INTIMASIA में सम्मानित किया जाएगा।", mr: "टॉप रिटेलर्सचा INTIMASIA मध्ये सन्मान केला जाईल.", gu: "ટોપ રિટેલર્સનું INTIMASIA માં સન્માન થશે." },
    { en: "About 20 years ago, Peppermint ran Buy & Fly. Retailers still ask for it.", hi: "करीब 20 साल पहले Peppermint ने Buy & Fly चलाया था। रिटेलर्स आज भी उसके बारे में पूछते हैं।", mr: "सुमारे 20 वर्षांपूर्वी Peppermint ने Buy & Fly चालवले होते. रिटेलर्स आजही त्याबद्दल विचारतात.", gu: "લગભગ 20 વર્ષ પહેલાં Peppermint એ Buy & Fly ચલાવ્યું હતું. રિટેલર્સ આજે પણ એના વિશે પૂછે છે." },
    { en: "Joining is free, and nothing changes in how you purchase.", hi: "जुड़ना फ्री है, और आपकी खरीद का तरीका नहीं बदलता।", mr: "सामील होणे फ्री आहे, आणि तुमच्या खरेदीची पद्धत बदलत नाही.", gu: "જોડાવું ફ્રી છે, અને તમારી ખરીદીની રીત બદલાતી નથી." },
    { en: "Level 4 can take you to Malaysia, Singapore or Bali.", hi: "लेवल 4 आपको मलेशिया, सिंगापुर या बाली ले जा सकता है।", mr: "लेव्हल 4 तुम्हाला मलेशिया, सिंगापूर किंवा बालीला नेऊ शकते.", gu: "લેવલ 4 તમને મલેશિયા, સિંગાપોર કે બાલી લઈ જઈ શકે છે." }
  ],
  b: [
    { en: "At INTIMASIA 2023, more than 200 brands and 15,000 retailers and distributors came together.", hi: "INTIMASIA 2023 में 200 से ज़्यादा ब्रांड्स और 15,000 से ज़्यादा रिटेलर्स और डिस्ट्रीब्यूटर्स आए थे।", mr: "INTIMASIA 2023 मध्ये 200 पेक्षा जास्त ब्रँड्स आणि 15,000 पेक्षा जास्त रिटेलर्स व डिस्ट्रीब्युटर्स आले होते.", gu: "INTIMASIA 2023 માં 200 થી વધુ બ્રાન્ડ્સ અને 15,000 થી વધુ રિટેલર્સ અને ડિસ્ટ્રિબ્યુટર્સ આવ્યા હતા." },
    { en: "Phase 1 takes only 20 brands.", hi: "फेज़ 1 में सिर्फ 20 ब्रांड्स लिए जाएँगे।", mr: "फेज 1 मध्ये फक्त 20 ब्रँड्स घेतले जातील.", gu: "ફેઝ 1 માં ફક્ત 20 બ્રાન્ડ્સ લેવાશે." },
    { en: "Even at our lowest estimates, Phase 1 retailers purchase over ₹50 crore a month.", hi: "सबसे कम अंदाज़े से भी, फेज़ 1 के रिटेलर्स हर महीने ₹50 करोड़ से ज़्यादा खरीदते हैं।", mr: "सर्वात कमी अंदाजानेही, फेज 1 चे रिटेलर्स दर महिन्याला ₹50 कोटींपेक्षा जास्त खरेदी करतात.", gu: "સૌથી ઓછા અંદાજથી પણ, ફેઝ 1 ના રિટેલર્સ દર મહિને ₹50 કરોડથી વધુ ખરીદે છે." },
    { en: "Retailers win trips, not just cash discounts, so they remember your brand.", hi: "रिटेलर्स ट्रिप्स जीतते हैं, सिर्फ कैश डिस्काउंट नहीं, इसलिए वो आपका ब्रांड याद रखते हैं।", mr: "रिटेलर्स सहली जिंकतात, फक्त रोख सवलत नाही, म्हणून ते तुमचा ब्रँड लक्षात ठेवतात.", gu: "રિટેલર્સ પ્રવાસ જીતે છે, ફક્ત રોકડ ડિસ્કાઉન્ટ નહીં, એટલે તેઓ તમારી બ્રાન્ડ યાદ રાખે છે." },
    { en: "After Phase 1, INTIQ goes from 2 states to the whole country.", hi: "फेज़ 1 के बाद INTIQ 2 राज्यों से पूरे देश में जाएगा।", mr: "फेज 1 नंतर INTIQ 2 राज्यांमधून संपूर्ण देशात जाईल.", gu: "ફેઝ 1 પછી INTIQ 2 રાજ્યોથી આખા દેશમાં જશે." }
  ]
};
