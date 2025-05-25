// === Part 1: Initialization and Global Setup ===
let currentExam = null;
let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let timerInterval;
let bookmarks = [];
let playerName = localStorage.getItem('playerName') || '';

let userId = localStorage.getItem('userId');
if (!userId) {
  userId = crypto.randomUUID(); // creates a unique ID
  localStorage.setItem('userId', userId);
}

const BACKEND_URL = "https://v0-supabase-leaderboard-f3yh3tr6u-alis-projects-17246b21.vercel.app";

function translatePage() {
  const lang = localStorage.getItem('lang') || 'en';
  const t = translations?.[lang];

  if (!t) {
    console.warn(`❌ Missing translations for language: "${lang}"`);
    return;
  }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    } else {
      console.warn(`Missing translation key: "${key}" in "${lang}"`);
    }
  });

  document.querySelectorAll("[data-placeholder]").forEach(el => {
    const key = el.getAttribute("data-placeholder");
    if (t[key]) {
      el.placeholder = t[key];
    } else {
      console.warn(`Missing placeholder key: "${key}" in "${lang}"`);
    }
  });

  if (typeof translateExamList === 'function') {
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function toggleLanguage() {
  const currentLang = localStorage.getItem('lang') || 'en';
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('lang', newLang);
  document.documentElement.lang = newLang;
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';

  loadExams();        // Rebuild exams in new language
  showBookmarks();    // Update bookmark tab if open
  translatePage();    // Re-translate everything
}

// === Part 2: Tab Switching and Profile Modal ===
function setupTabs() {
  const tabs = {
    exams: document.getElementById("exams-tab"),
    bookmarks: document.getElementById("bookmarks-tab"),
    profile: document.getElementById("profile-tab")
  };
  const buttons = {
    exams: document.getElementById("tab-exams"),
    bookmarks: document.getElementById("tab-bookmarks"),
    profile: document.getElementById("tab-profile")
  };

  Object.keys(buttons).forEach(tab => {
    buttons[tab].addEventListener("click", () => {
      Object.values(tabs).forEach(t => t.classList.remove("active"));
      Object.values(buttons).forEach(b => b.classList.remove("active"));

      tabs[tab].classList.add("active");
      buttons[tab].classList.add("active");

      if (tab === 'bookmarks') {
        showBookmarks();
      }
      if (tab === 'profile') {
        updateProfileStats();
      }
    });
  });
}

function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('#tab-buttons button');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  const targetTab = document.getElementById(`${tabName}-tab`);
  const targetBtn = document.getElementById(`tab-${tabName}`);

  if (targetTab) targetTab.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');

  if (tabName === 'bookmarks') {
    showBookmarks();
  } else if (tabName === 'profile') {
    updateProfileStats();
    document.getElementById('profile-name-display').textContent = playerName;
    document.getElementById('profile-avatar-preview').src = localStorage.getItem('avatar') || '';
  }
}

function openProfile() {
  const nameInput = document.getElementById('profile-name');
  const avatarPreview = document.getElementById('profile-avatar-preview-modal');
  const currentName = localStorage.getItem('playerName') || '';
  const nameLocked = localStorage.getItem('nameLocked') === 'false';

  nameInput.value = currentName;
  nameInput.disabled = nameLocked;

  const avatar = localStorage.getItem('avatar');
  if (avatar && avatar !== 'null') {
    avatarPreview.src = avatar;
  }

  document.getElementById('profile-modal').classList.remove('hidden');

  document.getElementById('avatar-upload').onchange = () => {
    const file = document.getElementById('avatar-upload').files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarPreview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
}

function closeProfile() {
  document.getElementById('profile-modal').classList.add('hidden');
}

// === Part 3: Save Profile, Avatar Update, and Reset Progress ===

async function saveProfile() {
  const nameInput = document.getElementById('profile-name');
  const fileInput = document.getElementById('avatar-upload');
  const file = fileInput.files[0];
  const newName = nameInput.value.trim();

  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert(translations[localStorage.getItem('lang') || 'en']?.userIdMissing || "User ID missing. Please refresh.");
    return;
  }

  if (!newName) {
    alert(translations[localStorage.getItem('lang') || 'en']?.enterName || "Please enter a name.");
    return;
  }

  const previousName = localStorage.getItem('playerName');

  if (newName !== previousName) {
    const { data: existing } = await supabase
      .from('LeaderBoard')
      .select('user_id')
      .eq('name', newName)
      .neq('user_id', userId)
      .maybeSingle();

    if (existing) {
      alert(translations[localStorage.getItem('lang') || 'en']?.nameTaken || "Name is already taken. Please choose another.");
      return;
    }
  }

  localStorage.setItem('playerName', newName);

  const { error: updateError } = await supabase
    .from('LeaderBoard')
    .update({ name: newName })
    .eq('user_id', userId);

  if (updateError) {
    console.error("❌ Failed to update name in leaderboard:", updateError);
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('avatar', reader.result);
      updateAvatar();
    };
    reader.readAsDataURL(file);
  } else {
    updateAvatar();
  }

  alert(translations[localStorage.getItem('lang') || 'en']?.profileUpdated || "Profile updated!");
  closeProfile();
}

function updateAvatar() {
  const avatar = localStorage.getItem('avatar');

  if (!avatar || avatar === 'null') {
    console.warn('⚠️ No valid avatar set. Skipping updateAvatar().');
    return;
  }

  const sidebarAvatar = document.getElementById('sidebar-avatar');
  const profileTabAvatar = document.getElementById('profile-avatar-preview');
  const modalAvatar = document.getElementById('profile-avatar-preview-modal');

  if (sidebarAvatar) sidebarAvatar.src = avatar;
  if (profileTabAvatar) profileTabAvatar.src = avatar;
  if (modalAvatar) modalAvatar.src = avatar;
}

function resetProgress() {
  const confirmText = translations[localStorage.getItem('lang') || 'en']?.confirmReset || "Are you sure you want to reset all progress and bookmarks?";
  const resetDone = translations[localStorage.getItem('lang') || 'en']?.resetDone || "Progress reset!";

  if (confirm(confirmText)) {
const keep = {
  userId: localStorage.getItem('userId'),
  playerName: localStorage.getItem('playerName'),
  avatar: localStorage.getItem('avatar'),
  nameLocked: localStorage.getItem('nameLocked'),
  lang: localStorage.getItem('lang'),
  theme: localStorage.getItem('theme')
};

    Object.keys(localStorage).forEach(key => {
      if (!key.startsWith("leaderboard_")) {
        localStorage.removeItem(key);
      }
    });

    Object.entries(keep).forEach(([k, v]) => localStorage.setItem(k, v));
    alert(resetDone);
    window.location.reload();
  }
}

function showQuestion() {
  if (!currentExam || !currentExam.questions) return;

  clearInterval(timerInterval);
  timer = 60;

  const q = currentExam.questions[currentQuestionIndex];

  document.getElementById('question-number').textContent = `Q${currentQuestionIndex + 1}`;
  document.getElementById('question-points').textContent = `Points: ${q.points}`;
  document.getElementById('question-text').textContent = getQuestionText(q);

  const img = document.getElementById('question-image');
  if (q.image) {
    img.src = q.image;
    img.classList.remove('hidden');
  } else {
    img.classList.add('hidden');
  }

  const answerArea = document.getElementById('answer-area');
  answerArea.innerHTML = '';

  const submitBtn = document.getElementById('submit-answer');
  submitBtn.classList.add('hidden');
  submitBtn.classList.remove('visible');
  submitBtn.onclick = null;

  if (q.type === 'true_false') {
    ['true', 'false'].forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.onclick = () => submitAnswer(opt);
      answerArea.appendChild(btn);
    });
  } else if (q.type === 'multiple_choice') {
    getQuestionOptions(q).forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.onclick = () => submitAnswer(opt);
      answerArea.appendChild(btn);
    });
  } else if (q.type === 'writing') {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'written-answer';
input.placeholder = translations?.[localStorage.getItem('lang') || 'en']?.writeAnswer || 'Type your answer';
    answerArea.appendChild(input);

    submitBtn.onclick = async () => {
      const input = document.getElementById('written-answer');
      const answer = input?.value?.trim();
      submitBtn.disabled = true;
      await submitAnswer(answer);
      submitBtn.disabled = false;
    };
  }

  if (currentQuestionIndex === currentExam.questions.length - 1) {
    submitBtn.classList.remove('hidden');
    submitBtn.classList.add('visible');
  }

document.getElementById('bookmark-question').onclick = () => {
  if (bookmarks.includes(currentQuestionIndex)) {
    alert(translations[localStorage.getItem('lang') || 'en']?.alreadyBookmarked || '❗ Already bookmarked!');
  } else {
    bookmarks.push(currentQuestionIndex);
    saveBookmark(currentExam, currentQuestionIndex);
    alert(translations[localStorage.getItem('lang') || 'en']?.bookmarked || 'Bookmarked!');
  }
};

  document.getElementById('timer').textContent = '60s';
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').textContent = `${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function startExam(exam) {
  currentExam = exam;
  currentQuestionIndex = 0;
  score = 0;

  // ✅ Load bookmarks from localStorage
  const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  bookmarks = saved
    .filter(b => b.examId === exam.id)
    .map(b => b.index);

  document.getElementById('main-menu').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  document.getElementById('sidebar').style.display = 'none';

  showQuestion();
}

function leaveExam() {
  clearInterval(timerInterval);
  hideSidebarDuringExam(false);
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('main-menu').classList.remove('hidden');
}

async function submitAnswer(answer) {
  const q = currentExam.questions[currentQuestionIndex];
  if ((answer + '').toLowerCase().trim() === q.answer.toLowerCase().trim()) {
    score += q.points;
  }
  await nextQuestion();
}

async function nextQuestion() {
  currentQuestionIndex++;

  clearInterval(timerInterval);

  if (currentQuestionIndex >= currentExam.questions.length) {
    await endExam();
  } else {
    showQuestion();
  }
}

function endExam() {
  clearInterval(timerInterval);
  const lang = localStorage.getItem('lang') || 'en';
  const maxScore = getMaxScore(currentExam);

  alert(`${translations[lang]?.examCompleted || "Exam completed!"}\n${translations[lang]?.yourScore || "Your score"}: ${score} / ${maxScore}`);

  const key = 'exam_' + currentExam.id;
  const prev = JSON.parse(localStorage.getItem(key) || '{}');
  const best = prev.bestScore || 0;

  localStorage.setItem(key, JSON.stringify({
    completed: true,
    bestScore: Math.max(score, best)
  }));

  updateLeaderboard(currentExam.id, score);
  updateProfileStats();

  hideSidebarDuringExam(false);
  document.getElementById('main-menu').classList.remove('hidden');
  document.getElementById('game-screen').classList.add('hidden');
  loadExams();
}

function updateProfileStats() {
  let examsCompleted = 0;
  let questionsAnswered = 0;
  let totalScore = 0;
  let totalPossible = 0;

  exams.forEach(exam => {
    const key = 'exam_' + exam.id;
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    if (saved.completed) {
      examsCompleted++;
      questionsAnswered += exam.questions.length;
      totalScore += saved.bestScore || 0;
      totalPossible += getMaxScore(exam);
    }
  });

  const average = totalPossible > 0 ? (totalScore / totalPossible * 100).toFixed(1) : 0;

  document.getElementById('profile-name-display').textContent = localStorage.getItem('playerName') || 'Unknown';
  document.getElementById('profile-exams').textContent = examsCompleted;
  document.getElementById('profile-questions').textContent = questionsAnswered;
  document.getElementById('profile-average').textContent = `${average}%`;
}

function showBookmarks() {
  const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const list = document.getElementById('bookmark-list');
  list.innerHTML = '';

  if (savedBookmarks.length === 0) {
    const emptyMessage = document.createElement('div');
emptyMessage.textContent = translations[localStorage.getItem('lang') || 'en']?.none || ' None';
    emptyMessage.style.textAlign = 'center';
    emptyMessage.style.padding = '20px';
    emptyMessage.style.color = 'gray';
    list.appendChild(emptyMessage);
    return;
  }

  savedBookmarks.forEach((b, i) => {
    const exam = exams.find(e => e.id === b.examId);
    const q = exam?.questions[b.index];
    if (q) {
      const div = document.createElement('div');
      div.className = 'exam-card';
      div.innerHTML = `
        <strong>${b.examName}</strong><br>
        Q${b.index + 1}: ${getQuestionText(q)}
        <br>
        <button onclick="removeBookmark(${i})">${translations[localStorage.getItem('lang') || 'en']?.remove || '🗑 Remove'}</button>
      `;
      list.appendChild(div);
    }
  });
}

function removeBookmark(index) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  showBookmarks();
}

function loadExams() {
  const list = document.getElementById('exam-list');
  const lang = localStorage.getItem('lang') || 'en';
  list.innerHTML = '';

  exams.forEach((exam, index) => {
    const saved = JSON.parse(localStorage.getItem('exam_' + exam.id)) || {};
    const card = document.createElement('div');
    card.className = 'exam-card';

    card.innerHTML = `
      <strong>${lang === 'ar' && exam.name_ar ? exam.name_ar : exam.name}</strong>
      <div>🧾 ${exam.questions.length} ${translations[lang]?.questions || 'Questions'}</div>
      <div>${saved.completed ? '✅ ' + (translations[lang]?.completed || 'Completed') : '❌ ' + (translations[lang]?.not_completed || 'Not Completed')}</div>
      ${saved.bestScore ? `<div>🏅 ${translations[lang]?.best || 'Best'}: ${saved.bestScore}/${getMaxScore(exam)}</div>` : ''}
    `;

    const btnContainer = document.createElement('div');
    btnContainer.style.marginTop = '10px';
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '10px';
    btnContainer.style.flexWrap = 'wrap';

    const startBtn = document.createElement('button');
    startBtn.textContent = translations[lang]?.start || 'Start';
    startBtn.onclick = () => startExam(exam);

    const leaderboardBtn = document.createElement('button');
    leaderboardBtn.textContent = `🏆 ${translations[lang]?.leaderboard || 'Leaderboard'}`;
    leaderboardBtn.onclick = (e) => {
      e.stopPropagation();
      showLeaderboard(exam);
    };

    btnContainer.appendChild(startBtn);
    btnContainer.appendChild(leaderboardBtn);
    card.appendChild(btnContainer);
    list.appendChild(card);
  });
}

function translateExamList() {
  const lang = localStorage.getItem('lang') || 'en';
  const t = translations[lang];

  document.querySelectorAll('.exam-card').forEach(card => {
    const name = card.querySelector('strong')?.textContent;
    const questionsCountEl = card.querySelector('div:nth-child(2)');
    const statusEl = card.querySelector('div:nth-child(3)');
    const bestEl = card.querySelector('div:nth-child(4)');
    const buttons = card.querySelectorAll('button');

    const questionsMatch = questionsCountEl?.textContent.match(/\d+/);
    if (questionsMatch) {
      questionsCountEl.textContent = `🧾 ${questionsMatch[0]} ${t["questions"]}`;
    }

    if (statusEl?.textContent.includes('✅')) {
      statusEl.textContent = t["completed"];
    } else if (statusEl?.textContent.includes('❌')) {
      statusEl.textContent = t["not_completed"];
    }

    if (bestEl?.textContent.includes('🏅')) {
      const match = bestEl.textContent.match(/\d+\/\d+/);
      if (match) {
        bestEl.textContent = `🏅 ${t["best"]}: ${match[0]}`;
      }
    }

if (buttons.length >= 2) {
  buttons[0].textContent = t["start"] || "Start";
  buttons[1].textContent = `🏆 ${t["leaderboard"] || "Leaderboard"}`;
}
  });
}

function saveBookmark(exam, index) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const exists = bookmarks.some(b => b.examId === exam.id && b.index === index);
  if (!exists) {
    bookmarks.push({ examId: exam.id, index, examName: exam.name });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    showBookmarks();
  }
}

async function isNameTaken(name) {
  const { data, error } = await supabase
    .from('LeaderBoard')
    .select('name')
    .eq('name', name);

  return data && data.length > 0;
}

async function promptPlayer() {
  if (localStorage.getItem("playerName")) return;

  const lang = localStorage.getItem('lang') || 'en';

  while (true) {
    const input = prompt(translations[lang]?.enterName || "Enter your name:");
    if (!input) continue;

    const taken = await isNameTaken(input.trim());
    if (taken) {
      alert(translations[lang]?.nameTaken || "This name is already taken. Please choose another.");
    } else {
      localStorage.setItem("playerName", input.trim());
      break;
    }
  }
}

async function showLeaderboard(exam) {
  const lang = localStorage.getItem('lang') || 'en';
  const { data, error } = await supabase
    .from('LeaderBoard')
    .select('*')
    .eq('exam_id', exam.id)
    .order('score', { ascending: false });

  if (error) {
    console.error('❌ Supabase leaderboard error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    return;
  }

  let out = `🏆 ${translations[lang]?.leaderboard || 'Leaderboard'} - ${exam.name}\n`;
  data.slice(0, 5).forEach((entry, i) => {
    out += `${i + 1}. ${entry.name} - ${entry.score}\n`;
  });

  const avg = data.reduce((sum, e) => sum + e.score, 0) / (data.length || 1);
  out += `\n📊 ${translations[lang]?.averageScore || 'Average Score'}: ${avg.toFixed(1)}`;

  alert(out);
}

async function updateLeaderboard(examId, newScore) {
  const name = localStorage.getItem('playerName') || 'Player';
  const userId = localStorage.getItem('userId');

  const { data: existing, error: fetchError } = await supabase
    .from('LeaderBoard')
    .select('score')
    .eq('user_id', userId)
    .eq('exam_id', examId)
    .maybeSingle(); // Use maybeSingle to avoid 406

  if (fetchError) {
    console.error('❌ Failed to fetch existing leaderboard score:', fetchError);
    return;
  }

  const currentBest = existing?.score ?? 0;

  // 🔥 Only update if new score is strictly greater
  if (newScore > currentBest) {
    const { error: updateError } = await supabase
      .from('LeaderBoard')
      .upsert(
        [{ user_id: userId, name, exam_id: examId, score: newScore }],
        { onConflict: ['user_id', 'exam_id'] }
      );

    if (updateError) {
      console.error('❌ Failed to update leaderboard:', updateError);
    } else {
      console.log('✅ Leaderboard updated with new high score.');
    }
  } else {
    console.log('ℹ️ New score is not higher. Leaderboard unchanged.');
  }
}

function hideSidebarDuringExam(isHidden) {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.display = isHidden ? 'none' : 'flex';
  }
}

function getQuestionText(q) {
  const lang = localStorage.getItem('lang') || 'en';
  return lang === 'ar' && q.text_ar ? q.text_ar : q.text;
}

function getQuestionOptions(q) {
  const lang = localStorage.getItem('lang') || 'en';
  return lang === 'ar' && q.options_ar ? q.options_ar : q.options;
}

function getMaxScore(exam) {
  return exam.questions.reduce((sum, q) => sum + (q.points || 0), 0);
}

function removeBookmark(index) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  showBookmarks();
}

function showTab(tabName) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('#tab-buttons button');

  contents.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  const targetContent = document.getElementById(`${tabName}-tab`);
  const targetButton = document.querySelector(`#tab-buttons #tab-${tabName}`);

  if (targetContent) targetContent.classList.add('active');
  if (targetButton) targetButton.classList.add('active');

  if (tabName === 'bookmarks') {
    showBookmarks();
  } else if (tabName === 'profile') {
    updateProfileStats();
    document.getElementById('profile-name-display').textContent = localStorage.getItem('playerName') || '';
    document.getElementById('profile-avatar-preview').src = localStorage.getItem('avatar') || '';
  }
}

// === Persistent Time Tracking ===
let sessionStart = Date.now();
let totalTime = parseInt(localStorage.getItem(`timeSpent_${userId}`) || '0', 10);

function updateTimeSpent() {
  const now = Date.now();
  const sessionElapsed = Math.floor((now - sessionStart) / 1000);
  const totalElapsed = totalTime + sessionElapsed;

  const hours = Math.floor(totalElapsed / 3600);
  const minutes = Math.floor((totalElapsed % 3600) / 60);
  const seconds = totalElapsed % 60;

  const formatted = `${hours}h ${minutes}m ${seconds}s`;
  const timeDisplay = document.getElementById('profile-time');
  if (timeDisplay) timeDisplay.textContent = formatted;
}

window.addEventListener('beforeunload', () => {
  const now = Date.now();
  const sessionElapsed = Math.floor((now - sessionStart) / 1000);
  localStorage.setItem(`timeSpent_${userId}`, totalTime + sessionElapsed);
});

setInterval(updateTimeSpent, 1000);

document.addEventListener('DOMContentLoaded', () => {
  promptPlayer();
  updateAvatar();

  const lang = localStorage.getItem('lang') || 'en';
  translatePage();

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  if (typeof loadExams === 'function') {
    loadExams();
  }

  showTab('exams');

  const modal = document.getElementById('profile-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  setupTabs();
});
