const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Transfer Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which language is used to style web pages?",
    answers: ["HTML", "Python", "CSS", "Java"],
    correct: 2,
  },
  {
    question: "Which language is used to make web pages interactive?",
    answers: ["CSS", "JavaScript", "PHP", "SQL"],
    correct: 1,
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Microsoft", "Apple", "Netscape", "Google"],
    correct: 2,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: ["<img>", "<a>", "<link>", "<button>"],
    correct: 1,
  },
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("question-number");

let currentQuestion = 0;
let score = 0;
let quizFinished = false;

function showQuestion() {
  answersElement.innerHTML = "";

  nextButton.style.display = "none";

  scoreElement.textContent = `Score: ${score}`;

  const question = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  questionElement.textContent = question.question;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;
    button.classList.add("answer-btn");

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answersElement.appendChild(button);
  });
}

function showResult() {
  questionNumber.textContent = "";
  questionElement.textContent = "Quiz Completed! 🎉";

  answersElement.innerHTML = `
    <h2>You scored ${score} out of ${questions.length}</h2>
  `;

  scoreElement.textContent = `Final Score: ${score}/${questions.length}`;

  quizFinished = true;
  nextButton.textContent = "Restart Quiz";
  nextButton.style.display = "block";
}

showQuestion();

function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestion].correct;

  const buttons = answersElement.querySelectorAll(".answer-btn");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  buttons.forEach((button, index) => {
    if (index === correctIndex) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  scoreElement.textContent = `Score: ${score}`;

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (quizFinished) {
    restartQuiz();
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizFinished = false;

  scoreElement.textContent = "Score: 0";
  nextButton.textContent = "Next Question";

  showQuestion();
}
