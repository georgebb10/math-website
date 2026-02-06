let correctAnswer = null;

async function loadQuestion(difficulty = 'easy') {
  try {
    const response = await fetch(`/api/question?topic=logarithms&difficulty=${difficulty}`);
    
    // Safely parse JSON
    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      document.getElementById('question').innerText = "Failed to parse question JSON.";
      return;
    }

    // Display question and store answer
    document.getElementById('question').innerText = data.question || "No question returned";
    correctAnswer = Number(data.answer) || null;
    document.getElementById('result').innerText = '';

  } catch (err) {
    console.error("Failed to fetch question:", err);
    document.getElementById('question').innerText = "Failed to load question. Check console.";
  }
}

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

// Load default easy question
loadQuestion();
