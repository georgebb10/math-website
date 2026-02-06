// Add this at the top to make fetch work in Node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Export the function using CommonJS syntax
module.exports = async function handler(req, res) {
  const topic = req.query.topic || "logarithms";
  const difficulty = req.query.difficulty || "easy";

  // Calculate the daily style number (0-49)
  const startDate = new Date("2026-01-01");
  const today = new Date();
  const daysPassed = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );
  const styleNumber = daysPassed % 50;

  // Create the AI prompt
  const prompt = `
You are a maths exam question generator.

Topic: ${topic}
Difficulty: ${difficulty}
Style number: ${styleNumber}

Generate ONE maths question.
Use random numbers.
Return ONLY JSON in this format:

{
  "question": "...",
  "answer": 0.000
}

Answer must be numerical and rounded to 3 decimal places.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    // Send the JSON response to the frontend
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch question from OpenAI" });
  }
};
