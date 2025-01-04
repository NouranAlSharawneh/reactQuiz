function NextButton({ dispatch, answer, numberOfQuestions, questionIndex }) {
  if (answer === null) return;
  if (questionIndex < numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (questionIndex === numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finsih
      </button>
    );
}
export default NextButton;
