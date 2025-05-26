const exams = [
  {
    id: "ghosts_team",
    name: "Ghosts Team Exam",
    name_ar: "اختبار كوادر الأشباح",
    questions: [
      {
        type: "multiple_choice",
        text: "Types of flame in oxy-acetylene?",
        text_ar: "أنواع اللهب في الأكسي استلين ؟",
        options: ["Carburizing", "Neutral", "Oxidizing", "All of the above"],
        options_ar: ["مكربن", "متعادل", "مؤكسد", "جميع ما سبق"],
        answer: "All of the above",
        answer_ar: "جميع ما سبق",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Welding arc wires are?",
        text_ar: "اسلاك اللحام بالقوس الكهربي بالأسلاك ؟",
        options: ["Electric", "Flash", "Coated"],
        options_ar: ["كهربية", "وميضية", "مغلفة"],
        answer: "Coated",
        answer_ar: "مغلفة",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Which letter denotes the welding electrode?",
        text_ar: "الحرف الذي يدل على الكترود اللحام ؟",
        options: ["E", "F", "H", "A"],
        options_ar: ["E", "F", "H", "A"],
        answer: "E",
        answer_ar: "E",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "In E6013, which number indicates welding position?",
        text_ar: "اين الرقم الذي يدل على وضع اللحام ؟ E6013",
        options: ["6", "0", "3", "1"],
        options_ar: ["6", "0", "3", "1"],
        answer: "1",
        answer_ar: "1",
        points: 1
      },
      {
        type: "true_false",
        text: "Welding transformer increases voltage and reduces amperage.",
        text_ar: "يعمل محول اللحام على رفع الفولت وخفض الامبير",
        answer: "false",
        answer_ar: "خطأ",
        points: 1
      },
      {
        type: "true_false",
        text: "There is a relation between current intensity and metal thickness.",
        text_ar: "توجد علاقة بين شدة التيار وسمك المعدن للقطعة",
        answer: "true",
        answer_ar: "صواب",
        points: 1
      },
      {
        type: "true_false",
        text: "Shielded metal arc welding is not used for thin sheets.",
        text_ar: "لا يستخدم اللحام بالقوس المعدني المحجب في لحام الصفائح الرقيقة",
        answer: "true",
        answer_ar: "صواب",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "What letter denotes weld length in AWS standards?",
        text_ar: "يرمز لطول الدرزة بحرف حسب مقايس الجمعية الامريكية ؟ AWS",
        options: ["L", "A", "Z"],
        options_ar: ["L", "A", "Z"],
        answer: "L",
        answer_ar: "L",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Which current is used for outside corner welding?",
        text_ar: "عند لحام الزاوية الخارجية يستخدم التيار ؟",
        options: ["High", "None of the above"],
        options_ar: ["العالي", "لا شيء مما سبق"],
        answer: "None of the above",
        answer_ar: "لا شيء مما سبق",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Metal Inert Gas welding abbreviation is?",
        text_ar: "اللحام بالقوس المعدني والغاز الخامل ؟",
        options: ["MIG", "MAG", "MEGA"],
        options_ar: ["MIG", "MAG", "MEGA"],
        answer: "MIG",
        answer_ar: "MIG",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "What is AR gas?",
        text_ar: "؟AR ما هو غاز",
        options: ["Argon", "Oxygen", "Acetylene"],
        options_ar: ["الارجون", "الاكسجين", "الاستلين"],
        answer: "Argon",
        answer_ar: "الارجون",
        points: 1
      },
      {
        type: "true_false",
        text: "Inert gas does not react even at high temperatures.",
        text_ar: "الغاز الخامل هو الغاز الذي لا يتفاعل مع غيره حتى في درجات الحرارة المنخفضة",
        answer: "false",
        answer_ar: "خطأ",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Tungsten Arc Gas welding abbreviation is?",
        text_ar: "اللحام بقوس النتجستن والغاز ؟",
        options: ["TIG", "TAG", "TEAM", "GMAW"],
        options_ar: ["TIG", "TAG", "TEAM", "GMAW"],
        answer: "TIG",
        answer_ar: "TIG",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Tungsten wire is?",
        text_ar: "سلك النتجستن ؟",
        options: ["Non-consumable", "Consumable and oscillating", "Coated"],
        options_ar: ["غير مستهلك", "مستهلك وممرجح", "مغلف"],
        answer: "Non-consumable",
        answer_ar: "غير مستهلك",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Angle weld break test is a type of?",
        text_ar: "اختبار كسر اللحام الزاوي هو من أنواع الاختبارات ؟",
        options: ["Destructive", "Ghosts right", "Raspin", "Disappointed"],
        options_ar: ["الأتلافية", "حق الأشباح", "الراسبين", "خائبين الأمل"],
        answer: "Destructive",
        answer_ar: "الأتلافية",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "DC positive polarity gives how much heat to workpiece?",
        text_ar: "عند استخدام التيار المستمر الموجب تكون قيمة الحرارة على قطعة العمل ؟",
        options: ["70%", "30%", "100%"],
        options_ar: ["70%", "30%", "100%"],
        answer: "30%",
        answer_ar: "30%",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Preferred polarity for focused heat and faster welding?",
        text_ar: "يفضل اللحام بهذه القطبية لتركيز الحرارة في المشغولات ...؟",
        options: ["Reversed", "Negative", "AC"],
        options_ar: ["معكوسة", "سالبة", "ترددية"],
        answer: "Negative",
        answer_ar: "سالبة",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Angle types include?",
        text_ar: "نقسم زوايا القياس إلى ؟",
        options: ["Fixed - Movable", "Obtuse - Right", "Fixed - Obtuse"],
        options_ar: ["الزوايا الثابتة - المتحركة", "الزوايا المنفرجة - القائمة", "الزوايا الثابتة - المنفرجة"],
        answer: "Fixed - Movable",
        answer_ar: "الزوايا الثابتة - المتحركة",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Relation between drill diameter and speed?",
        text_ar: "ماهي لعلاقة بين قطر مثقب الثقب وسرعة الدوران ؟",
        options: ["No relation", "Double", "Inverse", "Direct"],
        options_ar: ["لا يوجد علاقة", "مزدوجة", "عكسية", "طردية"],
        answer: "Inverse",
        answer_ar: "عكسية",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Letter/number templates are used for?",
        text_ar: "تستخدم قوالب الحروف والارقام في عملية ؟",
        options: ["Denting", "Marking", "Scribing"],
        options_ar: ["التذنيب", "الترميز وترقيم الالات", "الشنكرة"],
        answer: "Marking",
        answer_ar: "الترميز وترقيم الالات",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Tungsten green tip becomes ... during welding?",
        text_ar: "راس الكترود التنجستين النقي ( الاخضر ) يكون بصورة تلقائية اثناء اللحام ؟",
        options: ["Square", "Sharpened", "Pointed", "Spherical"],
        options_ar: ["مربع", "مبريا", "مدبب", "كروي"],
        answer: "Spherical",
        answer_ar: "كروي",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Shield gas cylinder color?",
        text_ar: "لون اسطوانة غاز الحماية ؟",
        options: ["Yellow", "Silver", "Red", "Blue"],
        options_ar: ["اصفر", "فضي", "احمر", "ازرق"],
        answer: "Silver",
        answer_ar: "فضي",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Green tungsten electrode uses which current?",
        text_ar: "الكترود التنجستين النقي ذو اللون الاخضر يستخدم التيار ؟",
        options: ["DC or AC", "None", "AC", "DC"],
        options_ar: ["تيار مستمر أو متردد", "لا شيء مما سبق", "تيار متردد", "تيار مستمر"],
        answer: "AC",
        answer_ar: "تيار متردد",
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Lihilmahu?",
        text_ar: "اللي هلمحو ................ ؟",
        options: ["I'll slaughter him", "I'll swing him"],
        options_ar: ["هذبحو", "همرجحو"],
        answer: ["I'll slaughter him", "I'll swing him"], // ✅ more than one correct
        answer_ar: ["همرجحو", "هذبحو"],
        points: 1
      },
      {
        type: "multiple_choice",
        text: "Did you cheat in the exam? 😄",
        text_ar: "هل غشيت في الاختبار 😊 ؟",
        options: ["Yes I cheated", "No Amal didn’t cheat me"],
        options_ar: ["نعم غشيت", "لا مؤمل ما غششني"],
        answer: ["Yes I cheated", "No Amal didn’t cheat me"], // ✅ more than one correct
        answer_ar: ["لا مؤمل ما غششني", "نعم غشيت"],
        points: 1
      }
    ]
  }
];


window.exams = exams;
