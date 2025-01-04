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
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Maincomp>
    </div>
  );
}

export default App;
