// translations.js

const translations = {
  en: {
    "settings": "Settings",
    "language": "Language",
    "profile": "Profile",
    "reset_progress": "Reset Progress",
    "exams": "Exams",
    "bookmarks": "Bookmarks",
    "profile_tab": "Profile",
    "exams_title": "Exams",
    "bookmarks_title": "Bookmarked Questions",
    "update_profile": "Update Profile",
    "name_label": "Name:",
    "name_placeholder": "Enter your name",
    "choose_avatar": "Choose Avatar:",
    "save": "Save",
    "cancel": "Cancel",
    "exams_completed": "Exams Completed:",
    "questions_answered": "Questions Answered:",
    "average_score": "Average Score:",
    "time_spent": "Time Spent:",
    "leave_exam": "← Leave Exam",
    "submit": "Submit",
    "bookmark": "Bookmark",
    "start": "Start",
    "leaderboard": "Leaderboard",
    "completed": "Completed",
    "not_completed": "Not Completed",
    "questions": "Questions",
    "best": "Best",
    "none": "None",
    "writeAnswer": "Type your answer",
    "enter_name": "Enter your name:",
    "name_taken": "This name is already taken. Please choose another.",
    "profile_updated": "Profile updated!",
    "reset_confirm": "Are you sure you want to reset all progress and bookmarks?",
    "progress_reset": "Progress reset!",
    "alreadyBookmarked": "This question is already bookmarked!",
    "bookmarked": "Bookmarked!",
    "credits": "This Game Was Made By: Ali Al-Junibi / Mumil Al-Junibi"
  },
  ar: {
    "settings": "الإعدادات",
    "language": "اللغة",
    "profile": "الملف الشخصي",
    "reset_progress": "إعادة التقدم",
    "exams": "الاختبارات",
    "bookmarks": "المحفوظات",
    "profile_tab": "الملف الشخصي",
    "exams_title": "الاختبارات",
    "bookmarks_title": "الأسئلة المحفوظة",
    "update_profile": "تحديث الملف الشخصي",
    "name_label": "الاسم:",
    "name_placeholder": "أدخل اسمك",
    "choose_avatar": "اختر الصورة الرمزية:",
    "save": "حفظ",
    "cancel": "إلغاء",
    "exams_completed": "الاختبارات المكتملة:",
    "questions_answered": "الأسئلة المجابة:",
    "average_score": "متوسط المعدل:",
    "time_spent": "الوقت المستغرق:",
    "leave_exam": "الخروج من الاختبار",
    "submit": "إرسال",
    "bookmark": "حفظ",
    "start": "ابدأ",
    "leaderboard": "لوحة المتصدرين",
    "completed": "مكتمل",
    "not_completed": "غير مكتمل",
    "questions": "أسئلة",
    "best": "الأفضل",
    "none": "لا يوجد",
    "writeAnswer": "اكتب إجابتك",
    "enter_name": "أدخل اسمك:",
    "name_taken": "هذا الاسم مستخدم بالفعل. الرجاء اختيار اسم آخر.",
    "profile_updated": "تم تحديث الملف الشخصي!",
    "reset_confirm": "هل أنت متأكد أنك تريد إعادة تعيين جميع التقدم والإشارات المرجعية؟",
    "progress_reset": "تمت إعادة التقدم!",
    "alreadyBookmarked": "هذا السؤال محفوظ بالفعل!",
    "bookmarked": "تم الحفظ!",
    "credits": "تم تطوير هذه اللعبة بواسطة: علي الجنيبي / مؤمل الجنيبي"
  }
};

function translateUI(language) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[language]?.[key];
    if (translation) el.textContent = translation;
  });
}

function toggleLanguage() {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('lang', newLang); // 🔥 Save it
  document.documentElement.lang = newLang;
  document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';

  translateUI(newLang);
  loadExams();       // 🔥 Rebuild exam cards in new language
  translatePage();   // 🔥 Update all translations (especially dynamic ones)
}