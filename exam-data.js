const exams = [
  {
    id: "math_exam",
    name: "Math Basics",
    questions: [
      { type: "true_false", text: "2 + 2 = 4", answer: "true", points: 5 },
      { type: "multiple_choice", text: "What is 5 * 3?", options: ["10", "15", "20"], answer: "15", points: 5 },
      { type: "writing", text: "Write the number 7 as a word.", answer: "seven", points: 5 }
    ]
  },
  {
    id: "science_exam",
    name: "Science Basics",
    questions: [
      { type: "true_false", text: "Water boils at 100°C", answer: "true", points: 5 },
      { type: "multiple_choice", text: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Venus"], answer: "Mars", points: 5 },
      { type: "writing", text: "What gas do plants breathe in?", answer: "carbon dioxide", points: 5 }
    ]
  },
  {
    id: "history_exam",
    name: "History Facts",
    questions: [
      { type: "true_false", text: "World War II ended in 1945", answer: "true", points: 5 },
      { type: "multiple_choice", text: "Who discovered America?", options: ["Columbus", "Einstein", "Newton"], answer: "Columbus", points: 5 },
      { type: "writing", text: "Who was the first President of the USA?", answer: "George Washington", points: 5 }
    ]
  },
  {
    id: "english_exam",
    name: "English Basics",
    questions: [
      { type: "true_false", text: "‘Run’ is a verb", answer: "true", points: 5 },
      { type: "multiple_choice", text: "Which word is a noun?", options: ["blue", "happiness", "quick"], answer: "happiness", points: 5 },
      { type: "writing", text: "What is the opposite of 'hot'?", answer: "cold", points: 5 }
    ]
  }
];

window.exams = exams;
