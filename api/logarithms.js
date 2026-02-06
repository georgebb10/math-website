let correctAnswer = null;

// Fetch question from server based on difficulty
async function loadQuestion(difficulty = 'easy') {
  const response = await fetch(`/api/question?topic=logarithms&difficulty=${difficulty}`);
  const data = await response.json();

  document.getElementById('question').innerText = data.question;
  correctAnswer = Number(data.answer);
  document.getElementById('result').innerText = '';
}

// Check user input against the correct answer
function checkAnswer() {
  const userAnswer = Number(document.getElementById('answer').value);

  if (Math.abs(userAnswer - correctAnswer) < 0.001) {
    document.getElementById('result').innerText = 'Correct!';
  } else {
    document.getElementById('result').innerText = 'Incorrect';
  }
}

// Load default question on page load
loadQuestion();
