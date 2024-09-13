import { useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Maincomp from "./Maincomp";
import Loader from "./Loader";
import Error from "./Error";
import StartSrceen from "./StartSrceen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
  questionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer": {
      const currQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currQuestion.correctOption
            ? state.points + currQuestion.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, questionIndex: state.questionIndex + 1, answer: null };
    case "finish":
      return { ...state, status: "finished", highscore: state.points };
    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [{ questions, status, questionIndex, answer, points }, dispatch] =
    useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const sumOfPoints = questions.reduce((prev, cur) => (prev += cur.points), 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Maincomp>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartSrceen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              questionIndex={questionIndex}
              numQuestions={numberOfQuestions}
              points={points}
              sumOfPoints={sumOfPoints}
              answer={answer}
            />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              questionIndex={questionIndex}
              numberOfQuestions={numberOfQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen points={points} sumOfPoints={sumOfPoints} />
        )}
      </Maincomp>
    </div>
  );
}

export default App;
