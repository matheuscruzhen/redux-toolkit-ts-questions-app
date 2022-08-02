import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./common/hooks";
import {
  questionAdded,
  questionDeleted,
  questionUpdated,
  selectAll,
} from "./features/questions/questionsSlice";

const App: React.FC = () => {
  const questions = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  const add = () =>
    dispatch(
      questionAdded({
        id: 4,
        title: "Question D?",
        answer: "",
      })
    );

  const remove = (questionId: number) => dispatch(questionDeleted(questionId));

  const renderedQuestions = questions.map((question) => (
    <li key={question.id}>
      <span>{question.title}</span>
      <button onClick={() => remove(question.id)}>DELETE</button>
    </li>
  ));

  return (
    // <Routes>
    //   <Route path="" element={} />
    // </Routes>
    <div className="App">
      <h2>Questions App</h2>
      <ul>{renderedQuestions}</ul>
      <button onClick={add}>ADD</button>
    </div>
  );
};

export default App;
