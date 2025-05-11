let currentQuestionIndex = 0;
let score = 0;
let timer = 45;
let interval;
let questions = [
  {
    question: "Congress shall have power... To regulate commerce with foreign Nations, and among the several States, and with the ____.",
    options: ["Merchants", "Tribes", "Governors", "Territories"],
    answer: "Tribes"
  },
  // Add more questions here...
];

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const timerDisplay = document.getElementById('timer');
const currentQuestionDisplay = document.getElementById('current-question');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');

const startTimer = () => {
  interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;
    if (timer <= 0) {
      clearInterval(interval);
      alert("Time's up!");
    }
  }, 1000);
};

const loadQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkAnswer(option, currentQuestion.answer);
    optionsContainer.appendChild(button);
  });
  currentQuestionDisplay.textContent = `${currentQuestionIndex + 1}/10`;
};

const checkAnswer = (selectedAnswer, correctAnswer) => {
  if (selectedAnswer === correctAnswer) {
    score++;
  }
  nextButton.disabled = false;
};

const nextQuestion = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    nextButton.disabled = true;
  } else {
    alert(`Game Over! Your score: ${score}`);
  }
};

nextButton.addEventListener('click', nextQuestion);

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
  startTimer();
});
