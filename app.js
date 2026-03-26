// ============================================
// DEUTSCHMEISTER - MAIN APP
// ============================================

// ---- STATE ----
const State = {
  apiKey: "",
  apiProvider: "groq", // "groq" or "gemini"
  level: "A1",
  xp: 0,
  streak: 0,
  lastActive: null,
  completedLessons: [],
  completedTopics: [],
  vocab: [],
  quizBestScore: 0,
  quizTaken: 0,
  activeTab: "learn",
  currentLesson: null,
  currentTopic: "",
  quizState: null,

  save() {
    const data = {
      apiKey: this.apiKey,
      apiProvider: this.apiProvider,
      level: this.level,
      xp: this.xp,
      streak: this.streak,
      lastActive: this.lastActive,
      completedLessons: this.completedLessons,
      completedTopics: this.completedTopics,
      vocab: this.vocab,
      quizBestScore: this.quizBestScore,
      quizTaken: this.quizTaken
    };
    localStorage.setItem("deutschmeister_v2", JSON.stringify(data));
  },

  load() {
    try {
      const raw = localStorage.getItem("deutschmeister_v2");
      if (!raw) return false;
      const d = JSON.parse(raw);
      Object.assign(this, d);
      return true;
    } catch (e) { return false; }
  },

  addXP(amount) {
    this.xp += amount;
    this.save();
    showXPPopup(`+${amount} XP`);
    updateXPBar();
  },

  getXPForLevel(lvl) {
    const thresholds = { A1:0, A2:200, B1:500, B2:900, C1:1400, C2:2000 };
    return thresholds[lvl] || 0;
  },

  getNextLevel() {
    const order = ["A1","A2","B1","B2","C1","C2"];
    const idx = order.indexOf(this.level);
    return idx < order.length-1 ? order[idx+1] : null;
  },

  checkStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (this.lastActive === today) return;
    if (this.lastActive === yesterday) {
      this.streak++;
    } else if (this.lastActive !== today) {
      this.streak = 1;
    }
    this.lastActive = today;
    this.save();
  }
};

// ---- INIT ----
window.addEventListener("load", () => {
  Voice.init();
  setTimeout(bootApp, 1800);
});

function bootApp() {
  const loaded = State.load();
  hideSplash();

  if (!loaded || !State.apiKey) {
    showSetup();
  } else {
    State.checkStreak();
    AI.init(State.apiProvider, State.apiKey);
    showMainApp();
  }
}

function hideSplash() {
  const splash = document.getElementById("splash");
  splash.style.opacity = "0";
  setTimeout(() => splash.classList.add("hidden"), 500);
}

// ---- SETUP ----
function showSetup() {
  document.getElementById("setup-screen").classList.remove("hidden");
  setupEventListeners();
  renderSetupProviders();
}

function renderSetupProviders() {
  // Inject provider selection into setup
  const card = document.querySelector(".setup-card");
  const existing = document.getElementById("provider-toggle");
  if (existing) return;

  const providerDiv = document.createElement("div");
  providerDiv.innerHTML = `
    <p class="setup-hint" style="margin-bottom:8px;">🤖 AI Provider choose karo:</p>
    <div class="api-toggle" id="provider-toggle">
      <button class="api-opt active" data-prov="groq">
        ⚡ Groq
        <span>Free & Fast (Recommended)</span>
      </button>
      <button class="api-opt" data-prov="gemini">
        ✨ Gemini
        <span>Free by Google</span>
      </button>
    </div>
    <div id="api-link-container"></div>
  `;

  card.insertBefore(providerDiv, card.querySelector(".input-group"));
  updateApiLink("groq");

  document.querySelectorAll(".api-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".api-opt").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      State.apiProvider = btn.dataset.prov;
      updateApiLink(btn.dataset.prov);
    });
  });
}

function updateApiLink(prov) {
  const container = document.getElementById("api-link-container");
  if (!container) return;
  if (prov === "groq") {
    document.getElementById("api-key-input").placeholder = "gsk_xxxxxxxxxxxxxxxxxxxx";
    container.innerHTML = `<a href="https://console.groq.com/keys" target="_blank" class="link-btn">→ Groq Free API Key Lelo (groq.com)</a>`;
  } else {
    document.getElementById("api-key-input").placeholder = "AIzaSy_xxxxxxxxxxxxxxxxxxxx";
    container.innerHTML = `<a href="https://aistudio.google.com/apikey" target="_blank" class="link-btn">→ Gemini Free API Key Lelo (aistudio.google.com)</a>`;
  }
}

function setupEventListeners() {
  // Toggle key visibility
  document.getElementById("toggle-key").addEventListener("click", () => {
    const inp = document.getElementById("api-key-input");
    inp.type = inp.type === "password" ? "text" : "password";
  });

  // Level selection
  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      State.level = btn.dataset.level;
    });
  });

  // Start button
  document.getElementById("start-btn").addEventListener("click", async () => {
    const key = document.getElementById("api-key-input").value.trim();
    if (!key) { showToast("API Key daalo pehle! 🔑", "error"); return; }

    State.apiKey = key;
    State.checkStreak();
    State.save();
    AI.init(State.apiProvider, State.apiKey);

    document.getElementById("setup-screen").classList.add("hidden");
    showMainApp();
  });
}

// ---- MAIN APP ----
function showMainApp() {
  document.getElementById("main-app").classList.remove("hidden");
  setupMainListeners();
  switchTab("learn");
  updateNavStats();
}

function setupMainListeners() {
  // Tabs
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Chat
  document.getElementById("send-btn").addEventListener("click", sendChatMessage);
  document.getElementById("chat-input").addEventListener("keypress", e => {
    if (e.key === "Enter") sendChatMessage();
  });
  document.getElementById("voice-input-btn").addEventListener("click", toggleVoiceInput);
  document.getElementById("clear-chat").addEventListener("click", () => {
    document.getElementById("chat-messages").innerHTML = getWelcomeHTML();
    AI.clearHistory();
    showToast("Chat cleared! ✓", "success");
  });

  // Quiz
  document.getElementById("start-quiz-btn").addEventListener("click", startQuiz);

  // Vocab
  document.getElementById("add-vocab-btn").addEventListener("click", () => {
    document.getElementById("vocab-modal").classList.remove("hidden");
  });
  document.getElementById("flashcard-btn").addEventListener("click", showFlashcards);
  document.getElementById("save-vocab-btn").addEventListener("click", saveVocabWord);
  document.getElementById("vocab-search").addEventListener("input", renderVocabList);
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
    });
  });

  // Flashcard controls
  document.getElementById("fc-prev").addEventListener("click", () => navigateFlashcard(-1));
  document.getElementById("fc-next").addEventListener("click", () => navigateFlashcard(1));
  document.getElementById("close-flashcard").addEventListener("click", () => {
    document.getElementById("flashcard-view").classList.add("hidden");
    document.getElementById("vocab-list").classList.remove("hidden");
  });
  document.getElementById("flashcard").addEventListener("click", flipFlashcard);

  // Lesson modal
  document.getElementById("modal-close").addEventListener("click", closeLessonModal);
  document.getElementById("lesson-chat-btn").addEventListener("click", () => {
    closeLessonModal();
    switchTab("chat");
    if (State.currentLesson) {
      const msg = `Mujhe "${State.currentLesson.title}" topic practice karwao!`;
      document.getElementById("chat-input").value = msg;
      sendChatMessage();
    }
  });

  // Progress settings
  document.getElementById("change-key-btn").addEventListener("click", () => {
    const key = prompt("Nayi API Key daalo:");
    if (key && key.trim()) {
      State.apiKey = key.trim();
      AI.init(State.apiProvider, State.apiKey);
      State.save();
      showToast("API Key update ho gayi! ✓", "success");
    }
  });

  document.getElementById("voice-toggle").addEventListener("change", e => {
    Voice.voiceEnabled = e.target.checked;
  });

  document.getElementById("level-change").addEventListener("change", e => {
    State.level = e.target.value;
    State.save();
    renderLearnTab();
    updateNavStats();
    showToast(`Level changed to ${State.level}! ✓`, "success");
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Sach mein? Saara progress delete ho jayega!")) {
      localStorage.removeItem("deutschmeister_v2");
      location.reload();
    }
  });
}

// ---- TABS ----
function switchTab(tab) {
  State.activeTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
  document.getElementById(`tab-${tab}`).classList.remove("hidden");

  if (tab === "learn") renderLearnTab();
  if (tab === "vocab") renderVocabList();
  if (tab === "progress") renderProgressTab();
  if (tab === "quiz") renderQuizHome();
}

// ---- LEARN TAB ----
function renderLearnTab() {
  const lvlData = LESSONS_DATA[State.level];
  if (!lvlData) return;

  document.getElementById("current-level-display").textContent = State.level;
  updateXPBar();

  // Topics grid
  const grid = document.getElementById("topics-grid");
  grid.innerHTML = lvlData.topics.map((t, i) => {
    const done = State.completedTopics.includes(`${State.level}_${i}`);
    return `<div class="topic-card ${done?'done':''}" onclick="practiceTopicChat('${t.name}', ${i})">
      <div class="topic-emoji">${t.emoji}</div>
      <div class="topic-name">${t.name}</div>
      <div class="topic-xp">+${t.xp} XP</div>
      ${done ? '<div class="topic-done-badge">✓ Done</div>' : '<div class="topic-done-badge" style="color:var(--text2)">Tap to practice</div>'}
    </div>`;
  }).join("");

  // Lessons list
  const list = document.getElementById("lessons-list");
  list.innerHTML = lvlData.lessons.map(l => {
    const done = State.completedLessons.includes(l.id);
    return `<div class="lesson-item ${done?'done':''}" onclick="openLesson('${l.id}')">
      <div class="lesson-icon">${l.icon}</div>
      <div class="lesson-info">
        <div class="lesson-title">${l.title}</div>
        <div class="lesson-desc">${l.desc}</div>
        <div class="lesson-meta">
          <span class="lesson-tag ${l.tag}">${l.tag}</span>
          <span class="lesson-tag" style="color:var(--gold)">+${l.xp} XP</span>
        </div>
      </div>
      <div class="lesson-check">${done ? '✅' : '📖'}</div>
    </div>`;
  }).join("");
}

function updateXPBar() {
  const order = ["A1","A2","B1","B2","C1","C2"];
  const lvls = { A1:0, A2:200, B1:500, B2:900, C1:1400, C2:2000 };
  const curr = lvls[State.level] || 0;
  const next = State.getNextLevel() ? lvls[State.getNextLevel()] : curr + 200;
  const progress = Math.min(((State.xp - curr) / (next - curr)) * 100, 100);

  document.getElementById("xp-bar").style.width = `${Math.max(0,progress)}%`;
  document.getElementById("xp-current").textContent = Math.max(0, State.xp - curr);
  document.getElementById("xp-needed").textContent = next - curr;
  document.getElementById("xp-count").textContent = State.xp;
  document.getElementById("streak-count").textContent = State.streak;
}

function practiceTopicChat(topicName, idx) {
  State.currentTopic = topicName;
  if (!State.completedTopics.includes(`${State.level}_${idx}`)) {
    State.completedTopics.push(`${State.level}_${idx}`);
    State.addXP(10);
  }
  switchTab("chat");
  const msg = `Mujhe ${State.level} level ka "${topicName}" topic sikhao Meister Klaus! Ek structured lesson shuru karo.`;
  document.getElementById("chat-input").value = msg;
  sendChatMessage();
}

function openLesson(id) {
  let lesson = null;
  for (const lvl of Object.values(LESSONS_DATA)) {
    const found = lvl.lessons.find(l => l.id === id);
    if (found) { lesson = found; break; }
  }
  if (!lesson) return;

  State.currentLesson = lesson;
  document.getElementById("modal-title").textContent = `${lesson.icon} ${lesson.title}`;

  const c = lesson.content;
  let html = `<div class="lesson-content">`;
  html += `<p style="color:var(--text2);margin-bottom:16px;">${c.intro}</p>`;

  c.sections.forEach(sec => {
    html += `<h3>${sec.heading}</h3>`;
    sec.vocab.forEach(v => {
      html += `<div class="vocab-row">
        <span class="german" onclick="Voice.speakGerman('${v.de.replace(/'/g,"\\'")}')">🔊 ${v.de}</span>
        <span class="meaning">${v.hi}</span>
      </div>`;
    });
  });

  if (c.tip) {
    html += `<div class="tip-box">${c.tip}</div>`;
  }

  if (c.examples && c.examples.length) {
    html += `<h3>📝 Examples</h3>`;
    c.examples.forEach(ex => {
      html += `<div class="example" onclick="Voice.speakGerman('${ex.replace(/'/g,"\\'")}')">🔊 ${ex}</div>`;
    });
  }

  if (c.practice) {
    html += `<div style="background:rgba(88,204,2,0.1);border:2px solid var(--primary);border-radius:10px;padding:12px;margin-top:12px;">
      <strong style="color:var(--primary)">🎯 Practice Task:</strong><br>
      <span style="font-size:0.9rem;">${c.practice}</span>
    </div>`;
  }

  html += `</div>`;
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("lesson-modal").classList.remove("hidden");

  // Mark complete & give XP
  if (!State.completedLessons.includes(lesson.id)) {
    State.completedLessons.push(lesson.id);
    State.addXP(lesson.xp);
    showToast(`Lesson complete! +${lesson.xp} XP 🎉`, "success");
    State.save();
    renderLearnTab();
  }
}

function closeLessonModal() {
  document.getElementById("lesson-modal").classList.add("hidden");
}

// ---- CHAT TAB ----
function getWelcomeHTML() {
  return `<div class="chat-welcome">
    <div class="welcome-avatar">👨‍🏫</div>
    <div class="welcome-text">
      <strong>Meister Klaus</strong>
      <p>Hallo! Main hoon Meister Klaus — aapka personal German teacher! 🎉<br><br>
      Aaj hum German seekhenge — main aapko Hinglish mein samjhaunga, aur aapki galtiyan pyaar se sudharunga! 😊<br><br>
      Apna pehla sawaal poochho ya kaho <strong>"Start karo"</strong>!</p>
    </div>
  </div>`;
}

async function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text || !State.apiKey) {
    if (!State.apiKey) showToast("API Key set nahi hai! Settings mein jao.", "error");
    return;
  }

  input.value = "";
  appendUserMessage(text);
  showTyping();

  const result = await AI.chat(text, State.level, State.currentTopic);
  hideTyping();

  if (result.success) {
    appendTeacherMessage(result.text);
    if (Voice.voiceEnabled) {
      setTimeout(() => Voice.speak(result.text), 300);
    }
    // Award XP for active conversation
    if (text.length > 5) State.addXP(2);
    updateNavStats();
  } else {
    appendTeacherMessage("⚠️ " + result.text);
  }
}

function appendUserMessage(text) {
  const div = document.createElement("div");
  div.className = "msg user";
  div.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div><div class="msg-avatar">🧑‍🎓</div>`;
  document.getElementById("chat-messages").appendChild(div);
  scrollChat();
}

function appendTeacherMessage(text) {
  const formatted = formatTeacherMessage(text);
  const div = document.createElement("div");
  div.className = "msg teacher";
  const msgId = "msg_" + Date.now();
  div.innerHTML = `
    <div class="msg-avatar">👨‍🏫</div>
    <div class="msg-bubble" id="${msgId}">
      ${formatted}
      <button class="speak-btn" onclick="Voice.speak(document.getElementById('${msgId}').innerText)">🔊 Sunо</button>
    </div>`;
  document.getElementById("chat-messages").appendChild(div);
  scrollChat();
}

function formatTeacherMessage(text) {
  let html = escapeHtml(text);
  // Format corrections
  html = html.replace(/❌/g, '<span class="wrong">❌</span>');
  html = html.replace(/✅/g, '<span class="correct">✅</span>');
  html = html.replace(/💡/g, '<span class="tip">💡</span>');
  // Convert newlines
  html = html.replace(/\n/g, "<br>");
  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return html;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg teacher";
  div.id = "typing-indicator";
  div.innerHTML = `<div class="msg-avatar">👨‍🏫</div>
    <div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
  document.getElementById("chat-messages").appendChild(div);
  scrollChat();
}

function hideTyping() {
  document.getElementById("typing-indicator")?.remove();
}

function scrollChat() {
  setTimeout(() => {
    const msgs = document.getElementById("chat-messages");
    msgs.scrollTop = msgs.scrollHeight;
  }, 50);
}

// Voice Input
function toggleVoiceInput() {
  const btn = document.getElementById("voice-input-btn");
  const status = document.getElementById("voice-status");

  if (Voice.isListening) {
    Voice.stopListening();
    btn.classList.remove("recording");
    status.classList.add("hidden");
    return;
  }

  // Try German first, fallback to Hindi
  const started = Voice.startListening(
    (transcript) => {
      document.getElementById("chat-input").value = transcript;
      btn.classList.remove("recording");
      status.classList.add("hidden");
    },
    (err) => {
      btn.classList.remove("recording");
      status.classList.add("hidden");
      if (err) showToast("Voice error: " + err, "error");
    },
    "de-DE"
  );

  if (started) {
    btn.classList.add("recording");
    status.classList.remove("hidden");
  } else {
    showToast("Voice not supported! Chrome use karo.", "error");
  }
}

// ---- QUIZ ----
let currentQuizData = [];
let currentQIdx = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuizHome() {
  document.getElementById("quiz-score").textContent = State.quizBestScore;
  document.getElementById("quiz-taken").textContent = State.quizTaken;
  document.getElementById("quiz-container").innerHTML = `
    <div class="quiz-home">
      <div class="quiz-hero">🧠</div>
      <h2>Knowledge Check!</h2>
      <p>Apni German knowledge test karo!<br>Questions aapke level <strong>${State.level}</strong> ke hisaab se honge.</p>
      <button id="start-quiz-btn" class="start-btn" onclick="startQuiz()">Quiz Shuru Karo! 🚀</button>
      <div class="quiz-stats">
        <div class="qstat"><span>${State.quizBestScore}</span><small>Best Score</small></div>
        <div class="qstat"><span>${State.quizTaken}</span><small>Quizzes Done</small></div>
      </div>
    </div>`;
}

function startQuiz() {
  // Get questions for current level + easier levels
  const order = ["A1","A2","B1","B2","C1","C2"];
  const idx = order.indexOf(State.level);
  let pool = [];
  for (let i = 0; i <= idx; i++) {
    if (QUIZ_DATA[order[i]]) pool.push(...QUIZ_DATA[order[i]]);
  }

  // Shuffle and pick 8
  pool = pool.sort(() => Math.random() - 0.5).slice(0, 8);
  currentQuizData = pool;
  currentQIdx = 0;
  quizScore = 0;
  quizAnswered = false;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (currentQIdx >= currentQuizData.length) {
    showQuizResult();
    return;
  }

  const q = currentQuizData[currentQIdx];
  const progress = (currentQIdx / currentQuizData.length) * 100;

  document.getElementById("quiz-container").innerHTML = `
    <div class="quiz-active">
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progress}%"></div></div>
      <div class="quiz-q-num">Q${currentQIdx+1} / ${currentQuizData.length} | Score: ${quizScore}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((opt, i) => `<button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>`).join("")}
      </div>
    </div>`;
}

function answerQuiz(selectedIdx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = currentQuizData[currentQIdx];
  const correct = selectedIdx === q.ans;
  if (correct) quizScore++;

  const options = document.querySelectorAll(".quiz-option");
  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add("correct");
    else if (i === selectedIdx && !correct) btn.classList.add("wrong");
  });

  // Show feedback
  const container = document.querySelector(".quiz-active");
  const feedback = document.createElement("div");
  feedback.className = `quiz-feedback ${correct ? "correct" : "wrong"}`;
  feedback.innerHTML = correct
    ? `✅ Bilkul sahi! Wunderbar! 🎉<br><small>${q.exp}</small>`
    : `❌ Galat! Sahi answer: <strong>${q.opts[q.ans]}</strong><br><small>${q.exp}</small>`;
  container.appendChild(feedback);

  if (correct) State.addXP(5);

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.className = "next-q-btn";
  nextBtn.textContent = currentQIdx < currentQuizData.length - 1 ? "Agla Sawaal →" : "Result Dekho 🏆";
  nextBtn.onclick = () => {
    currentQIdx++;
    quizAnswered = false;
    renderQuizQuestion();
  };
  container.appendChild(nextBtn);
}

function showQuizResult() {
  const total = currentQuizData.length;
  const pct = Math.round((quizScore / total) * 100);
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "😊" : pct >= 40 ? "🤔" : "📚";
  const msg = pct >= 80 ? "Ausgezeichnet! Bahut badhiya!" : pct >= 60 ? "Gut gemacht! Achha kiya!" : pct >= 40 ? "Theek hai, aur practice karo!" : "Koi baat nahi, dobara try karo!";

  if (quizScore > State.quizBestScore) State.quizBestScore = quizScore;
  State.quizTaken++;
  State.addXP(quizScore * 3);
  State.save();

  document.getElementById("quiz-container").innerHTML = `
    <div class="quiz-result">
      <div class="result-emoji">${emoji}</div>
      <div class="result-score">${quizScore}/${total}</div>
      <p style="font-size:1.2rem;font-weight:800;margin:8px 0;">${pct}%</p>
      <p class="result-msg">${msg}</p>
      <button class="start-btn" onclick="startQuiz()" style="margin-bottom:12px;">🔄 Dobara Khelو</button>
      <br>
      <button class="pill-btn" onclick="renderQuizHome()">← Quiz Home</button>
    </div>`;
}

// ---- VOCAB ----
let flashcardIdx = 0;
let flashcardFlipped = false;

function renderVocabList() {
  const search = document.getElementById("vocab-search").value.toLowerCase();
  const list = document.getElementById("vocab-list");

  const filtered = State.vocab.filter(v =>
    v.de.toLowerCase().includes(search) || v.en.toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    list.innerHTML = `<div class="vocab-empty">
      <div class="ve-icon">📖</div>
      <p>${search ? "Koi word nahi mila!" : "Abhi koi word nahi hai!<br>Lessons se seekho ya khud add karo."}</p>
    </div>`;
    return;
  }

  list.innerHTML = filtered.map((v, i) => `
    <div class="vocab-item">
      <button class="vocab-speak" onclick="Voice.speakGerman('${v.de.replace(/'/g,"\\'")}')">🔊</button>
      <span class="vocab-de">${v.de}</span>
      <span class="vocab-en">${v.en}</span>
      <button class="vocab-del" onclick="deleteVocab(${i})">🗑️</button>
    </div>`).join("");
}

function saveVocabWord() {
  const de = document.getElementById("vocab-german").value.trim();
  const en = document.getElementById("vocab-meaning").value.trim();
  const ex = document.getElementById("vocab-example").value.trim();

  if (!de || !en) { showToast("German word aur meaning daalo!", "error"); return; }

  State.vocab.push({ de, en, example: ex, addedAt: Date.now() });
  State.save();
  State.addXP(3);

  document.getElementById("vocab-german").value = "";
  document.getElementById("vocab-meaning").value = "";
  document.getElementById("vocab-example").value = "";
  document.getElementById("vocab-modal").classList.add("hidden");

  renderVocabList();
  showToast(`"${de}" save ho gaya! +3 XP`, "success");
}

function deleteVocab(idx) {
  State.vocab.splice(idx, 1);
  State.save();
  renderVocabList();
}

function showFlashcards() {
  if (State.vocab.length === 0) {
    showToast("Pehle kuch words add karo!", "error");
    return;
  }
  flashcardIdx = 0;
  flashcardFlipped = false;
  document.getElementById("vocab-list").classList.add("hidden");
  document.getElementById("flashcard-view").classList.remove("hidden");
  updateFlashcard();
}

function updateFlashcard() {
  const v = State.vocab[flashcardIdx];
  const front = document.getElementById("fc-front");
  const back = document.getElementById("fc-back");
  front.textContent = v.de;
  back.textContent = v.en + (v.example ? `\n"${v.example}"` : "");
  front.classList.remove("hidden");
  back.classList.add("hidden");
  flashcardFlipped = false;
  document.getElementById("fc-counter").textContent = `${flashcardIdx+1}/${State.vocab.length}`;
}

function flipFlashcard() {
  const front = document.getElementById("fc-front");
  const back = document.getElementById("fc-back");
  flashcardFlipped = !flashcardFlipped;
  front.classList.toggle("hidden", flashcardFlipped);
  back.classList.toggle("hidden", !flashcardFlipped);
  if (flashcardFlipped) Voice.speakGerman(State.vocab[flashcardIdx].de);
}

function navigateFlashcard(dir) {
  flashcardIdx = (flashcardIdx + dir + State.vocab.length) % State.vocab.length;
  updateFlashcard();
}

// ---- PROGRESS TAB ----
function renderProgressTab() {
  document.getElementById("stat-xp").textContent = State.xp;
  document.getElementById("stat-streak").textContent = State.streak;
  document.getElementById("stat-lessons").textContent = State.completedLessons.length;
  document.getElementById("stat-vocab").textContent = State.vocab.length;
  document.getElementById("level-change").value = State.level;

  const order = ["A1","A2","B1","B2","C1","C2"];
  const names = { A1:"Beginner", A2:"Elementary", B1:"Intermediate", B2:"Upper-Inter", C1:"Advanced", C2:"Mastery" };
  const idx = order.indexOf(State.level);

  document.getElementById("level-journey").innerHTML = order.map((lvl, i) => {
    const status = i < idx ? "done" : i === idx ? "current" : "";
    const icon = i < idx ? "✅" : i === idx ? "⭐" : "🔒";
    return `<div class="lj-item ${status}">
      <div class="lj-badge">${lvl}</div>
      <div class="lj-info">
        <div class="lj-name">${names[lvl]}</div>
        <div class="lj-desc">${i < idx ? "Completed!" : i === idx ? "Current Level" : "Locked"}</div>
      </div>
      <div class="lj-status">${icon}</div>
    </div>`;
  }).join("");
}

// ---- UTILS ----
function updateNavStats() {
  document.getElementById("xp-count").textContent = State.xp;
  document.getElementById("streak-count").textContent = State.streak;
}

function showToast(msg, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

function showXPPopup(text) {
  const p = document.createElement("div");
  p.className = "xp-popup";
  p.textContent = text;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1500);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
