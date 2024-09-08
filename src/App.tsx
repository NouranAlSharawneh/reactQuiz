import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Maincomp from "./Maincomp";

const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
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
    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Maincomp>
        <p>1/15</p>
        <p>Questions</p>
      </Maincomp>
    </div>
  );
}

export default App;
