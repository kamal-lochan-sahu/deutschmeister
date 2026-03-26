// ============================================
// DEUTSCHMEISTER - VOICE MODULE
// ============================================

const Voice = {
  recognition: null,
  synthesis: window.speechSynthesis,
  isListening: false,
  voiceEnabled: true,
  germanVoice: null,

  init() {
    // Setup Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "de-DE"; // German by default
    }

    // Find best German voice for TTS
    this.loadVoices();
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  },

  loadVoices() {
    const voices = this.synthesis.getVoices();
    // Prefer German voices
    this.germanVoice = voices.find(v => v.lang === "de-DE" && v.localService) ||
                       voices.find(v => v.lang === "de-DE") ||
                       voices.find(v => v.lang.startsWith("de")) ||
                       null;
  },

  // Start voice input
  startListening(onResult, onEnd, lang = "de-DE") {
    if (!this.recognition) {
      onEnd("Voice input not supported on this browser. Try Chrome!");
      return false;
    }

    if (this.isListening) {
      this.stopListening();
      return false;
    }

    this.recognition.lang = lang;
    this.isListening = true;

    this.recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (e) => {
      this.isListening = false;
      if (e.error !== "aborted") {
        onEnd(null, e.error);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      this.isListening = false;
      return false;
    }
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  },

  // Speak text (extract German parts and speak those)
  speak(text, forceSpeak = false) {
    if (!this.voiceEnabled && !forceSpeak) return;
    if (!this.synthesis) return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    // Extract German text to speak (remove emoji, Hinglish explanations)
    const germanText = this.extractGermanToSpeak(text);
    if (!germanText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(germanText);
    utterance.lang = "de-DE";
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (this.germanVoice) {
      utterance.voice = this.germanVoice;
    }

    this.synthesis.speak(utterance);
  },

  // Speak only a specific German phrase
  speakGerman(germanText) {
    if (!this.synthesis) return;
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(germanText);
    utterance.lang = "de-DE";
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (this.germanVoice) {
      utterance.voice = this.germanVoice;
    }

    this.synthesis.speak(utterance);
  },

  // Extract German sentences from a mixed response for TTS
  extractGermanToSpeak(text) {
    // Remove emoji
    let clean = text.replace(/[\u{1F300}-\u{1FFFF}]/gu, "");
    // Remove correction markers
    clean = clean.replace(/[❌✅💡🎉🌟⚡🔥📝]/g, "");

    // Try to find lines with German (starts with capital, has German chars or structure)
    const lines = clean.split("\n");
    const germanLines = lines.filter(line => {
      const l = line.trim();
      if (!l || l.length < 3) return false;
      // Lines that look like German sentences (contain German words/chars)
      return /[äöüÄÖÜß]/.test(l) ||
             /\b(Ich|Du|Er|Sie|Wir|Ihr|Das|Die|Der|Ein|Eine|Bitte|Danke|Hallo|Guten)\b/.test(l);
    });

    if (germanLines.length > 0) {
      // Speak first German sentence found
      return germanLines[0].replace(/["""''*_`]/g, "").trim();
    }

    // Fallback: speak nothing (mostly Hinglish response)
    return "";
  },

  stopSpeaking() {
    this.synthesis.cancel();
  },

  isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  },

  isTTSSupported() {
    return !!window.speechSynthesis;
  }
};
