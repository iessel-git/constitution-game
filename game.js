// Initialize game state variables
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

const loadQuestions = (level, callback) => {
  fetch(`questions.json`)
    .then(response => response.json())
    .then(data => {
      shuffledQuestions = shuffle(data[level]);
      callback();
    })
    .catch(error => console.error('Error loading questions:', error));
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const displayQuestion = (question, containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div class="scenario">${question.question}</div>
    <div class="choices">
      ${question.choices.map(choice => `
        <button onclick="checkAnswer('${choice}', '${question.answer}')">${choice}</button>
      `).join('')}
    </div>
  `;
};

const checkAnswer = (selectedAnswer, correctAnswer) => {
  const feedbackElement = document.createElement('div');
  feedbackElement.classList.add('feedback');
  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackElement.textContent = '✔️ Correct!';
  } else {
    feedbackElement.textContent = `❌ Incorrect! The correct answer was: ${correctAnswer}`;
  }
  document.getElementById('quiz').appendChild(feedbackElement);
  setTimeout(() => displayNextQuestion(shuffledQuestions), 1000); // Wait before showing next question
};

const displayNextQuestion = (questions) => {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    displayQuestion(question, 'quiz');
    currentQuestionIndex++;
  } else {
    document.getElementById('quiz').innerHTML = `<h3>🎉 You completed the game! Your final score is: ${score}</h3>`;
    saveProgress();
  }
};

const showScore = (containerId) => {
  document.getElementById(containerId).textContent = `Score: ${score}`;
};

const saveProgress = () => {
  // Optional: save progress in local storage or send to backend for tracking
  localStorage.setItem('gameScore', score);
};

const markLevelComplete = (level) => {
  // Optional: mark level complete in local storage or backend
  localStorage.setItem(`${level}Complete`, true);
};

// Start the game when loaded
window.onload = () => {
  loadQuestions('beginner', () => { displayNextQuestion(shuffledQuestions); });
};
