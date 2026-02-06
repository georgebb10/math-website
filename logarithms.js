let correctAnswer = null;

// Fetch a new AI-generated logarithms question from the server
async function loadQuestion(difficulty = 'easy') {
  try {
    const response = await fetch(`/api/question?topic=logarithms&difficulty=${difficulty}`);
    
    // Parse JSON returned by the server
    const data = await response.json();
    
    // Update the question text on the page
    document.getElementById('question').innerText = data.question;
    
    // Store the correct answer for checking
    correctAnswer = Number(data.answer);
    
    // Clear previous result
    document.getElementById('result').innerText = '';
    
  } catch (error) {
    console.error("Failed to load question:", error);
    document.getElementById('question').innerText = "Failed to load question. Try again later.";
  }
}

// Check user input against the correct answer
function checkAnswer() {
  const userAnswer = Number(document.getElementById('answer').value);

  if (correctAnswer === null) {
    alert("No question loaded yet!");
    return;
  }

  if (Math.abs(userAnswer - correctAnswer) < 0.001) {
    document.getElementById('result').innerText = 'Correct!';
  } else {
    document.getElementById('result').innerText = 'Incorrect';
  }
}

// Load default easy question when the page first opens
loadQuestion();
