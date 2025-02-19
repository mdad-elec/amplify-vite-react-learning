import { useState } from "react";

function Assessment1() {
  const passage = `
    First, our class got on the big yellow bus in the morning. Everyone was excited and talking about the trip.
    Next, we arrived at the zoo and saw many animals. We watched the lions, fed the giraffes, and took pictures of the monkeys.
    Then, we had lunch in a picnic area. We sat on benches, ate our sandwiches, and shared snacks with our friends.
    Finally, it was time to go back to school. We got on the bus, feeling happy and tired. It was a fun and exciting day!
    The sun is bright and gives us light. It helps plants grow.
  `;
  const questions = [
    { q: "What does the sun give us?", options: ["Light", "Water", "Food", "Air"], answer: "Light" },
    { q: "What does the sun help grow?", options: ["Plants", "Animals", "Rocks", "Cars"], answer: "Plants" },
    { q: "What color is the sun?", options: ["Blue", "Yellow", "Red", "Green"], answer: "Yellow" },
    { q: "Is the sun cold or hot?", options: ["Cold", "Hot"], answer: "Hot" },
  ];

  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    let totalScore = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) totalScore += 25;
    });
    setScore(totalScore);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Grade 2 Comprehension</h1>
      <p className="mt-4">{passage}</p>

      {questions.map((q, index) => (
        <div key={index} className="mt-4">
          <p>{q.q}</p>
          {q.options.map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => {
                  const newAnswers = [...answers];
                  newAnswers[index] = option;
                  setAnswers(newAnswers);
                }}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      ))}

      <button className="bg-blue-500 text-white p-2 mt-4" onClick={handleSubmit}>
        Submit Answers
      </button>

      {score !== null && <h2 className="mt-4 text-xl font-bold">Your Score: {score}/100</h2>}
    </div>
  );
}

export default Assessment1;

  