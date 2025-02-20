import { useState } from "react";

function Assessment2() {
  const passage = `
    First, our class got on the big yellow bus early in the morning. Everyone was excited and chatting about what they wanted to see.
    Next, we arrived at the zoo and saw many amazing animals. We watched the lions, fed the giraffes, and laughed at the playful monkeys.
    Then, we had lunch in a picnic area near a pond. We sat on benches, ate sandwiches, and shared snacks with friends.
    Finally, it was time to go back to school. We got on the bus, feeling happy and a little tired. It was a fun and exciting day!
  `;

  const questions = [
    { q: "Who went on the school trip?", options: ["The class", "Parents", "Only teachers", "The principal"], answer: "The class" },
    { q: "What did the students do at the zoo?", options: ["Saw animals and took pictures", "Went swimming", "Played games", "Read books"], answer: "Saw animals and took pictures" },
    { q: "Where did they have lunch?", options: ["Near a pond", "In a hotel", "On the bus", "At school"], answer: "Near a pond" },
    { q: "What did the students do after lunch?", options: ["Visited the souvenir shop", "Went home immediately", "Took a test", "Played soccer"], answer: "Visited the souvenir shop" },
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
      <h1 className="text-2xl font-bold">Grade 3 Comprehension</h1>
      <p className="mt-4" style={{ whiteSpace: "pre-line" }}>{passage}</p>

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

export default Assessment2;
