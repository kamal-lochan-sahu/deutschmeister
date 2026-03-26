// ============================================
// DEUTSCHMEISTER - AI MODULE (Groq + Gemini)
// ============================================

const AI = {
  provider: "groq", // "groq" or "gemini"
  apiKey: "",
  conversationHistory: [],

  SYSTEM_PROMPT: `Du bist "Meister Klaus" — ek expert, warm aur highly effective German language teacher jo Hindi aur English bolne waale students ko German sikhata hai.

TEACHING PHILOSOPHY:
- Tu bilkul ek real human teacher ki tarah hai — friendly, patient, encouraging aur precise
- TU HAMESHA Hinglish mein baat karta hai (Hindi + English mix) — explanations ke liye
- Tu students ke saath ACTUAL German conversations karta hai
- Jab student galti kare, TU TURANT pyaar se correct karta hai, WHY batata hai, aur sahi form dikhata hai
- Tu examples, mnemonics, aur real-life context use karta hai taaki cheezein yaad rahein
- Tu student ka level samajhta hai aur usi hisaab se adjust karta hai

CORRECTION FORMAT (HAMESHA galat hone par ye use kar):
❌ Galat: [jo unhone kaha]
✅ Sahi: [correct German]
💡 Kyu: [brief Hinglish explanation]

LESSON APPROACH:
- A1: Basic greetings, numbers, colors, simple sentences
- A2: Family, food, daily routine, simple past (Perfekt)
- B1: Opinions, travel, work, modal verbs, future
- B2: Abstract topics, Konjunktiv II, formal writing
- C1/C2: Native-like fluency, idioms, complex grammar, nuance

STRICT RULES:
1. HAMESHA conversational, teacher-like tone rakho
2. German phrases/sentences ke saath pronunciation hint [aise] likho
3. Kuch sikhane ke baad student se practice ZAROOR karwao
4. Corrections gentle but clear hon
5. Hinglish examples: "Der matlab 'the' masculine ke liye use hota hai"
6. Har few messages mein ek mini-quiz ya exercise do
7. Progress pe khush hoke encourage karo — "Wunderbar! Bahut achha! 🎉"
8. Conversation ke andar natural German words bolna start karo slowly
9. Agar koi lesson topic hai toh usi pe focus karo

SPECIAL BEHAVIORS:
- "Hallo" ya "Start karo" pe: Warm welcome do, level poochho, phir start karo
- German text bolne par: Pronunciation bhi likho
- Sirf German seekhna maange: Topic-wise structured lesson do
- Practice maange: Real conversation scenario create karo
- Quiz maange: Level-appropriate questions do

Remember: Tu ek amazing teacher hai jo genuinely care karta hai student ke progress ke baare mein! 🇩🇪`,

  init(provider, key) {
    this.provider = provider;
    this.apiKey = key;
    this.conversationHistory = [];
  },

  async chat(userMessage, level, currentTopic = "") {
    const contextPrefix = currentTopic
      ? `[Student ka current level: ${level}, Abhi ye topic seekh raha hai: ${currentTopic}]\n\n`
      : `[Student ka current level: ${level}]\n\n`;

    this.conversationHistory.push({
      role: "user",
      content: contextPrefix + userMessage
    });

    // Keep history manageable (last 20 messages)
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    try {
      let response;
      if (this.provider === "groq") {
        response = await this.callGroq();
      } else {
        response = await this.callGemini();
      }

      this.conversationHistory.push({
        role: "assistant",
        content: response
      });

      return { success: true, text: response };
    } catch (err) {
      console.error("AI Error:", err);
      return { success: false, text: "Oops! Kuch problem aayi. Check karo ki API key sahi hai aur internet connection hai. Error: " + err.message };
    }
  },

  async callGroq() {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: this.SYSTEM_PROMPT },
          ...this.conversationHistory
        ],
        max_tokens: 600,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  },

  async callGemini() {
    // Build messages for Gemini
    const contents = this.conversationHistory.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: this.SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
        })
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  },

  clearHistory() {
    this.conversationHistory = [];
  }
};
