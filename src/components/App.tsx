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
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

const SECS_PER_QUESTION = 30;

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Maincomp>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartSrceen />}
        {status === "active" && (
          <>
            <Progress
            // questionIndex={questionIndex}
            // numQuestions={numberOfQuestions}
            // points={points}
            // sumOfPoints={sumOfPoints}
            // answer={answer}
            />
            <Question
            // question={questions[questionIndex]}
            // dispatch={dispatch}
            // answer={answer}
            />
            <Footer>
              <Timer
              // dispatch={dispatch} secondsRemaining={secondsRemaining}
              />
              <NextButton
              // dispatch={dispatch}
              // answer={answer}
              // questionIndex={questionIndex}
              // numberOfQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
          // points={points}
          // sumOfPoints={sumOfPoints}
          // highscore={highscore}
          // dispatch={dispatch}
          />
        )}
      </Maincomp>
    </div>
  );
}

export default App;
