import { useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Maincomp from "./Maincomp";
import Loader from "./Loader";
import Error from "./Error";
import StartSrceen from "./StartSrceen";
import Question from "./Question";

const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
  questionIndex: 0,
  answer: null,
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
    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [{ questions, status, questionIndex }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numberOfQuestions = questions.length;

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
          <Question question={questions[questionIndex]} />
        )}
      </Maincomp>
    </div>
  );
}

export default App;
