import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { questionIndex, numQuestions, points, sumOfPoints, answer } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={questionIndex + Number(answer !== null)}
      />
      <p>
        Question <strong>{questionIndex + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{sumOfPoints}
      </p>
    </header>
  );
}

export default Progress;
