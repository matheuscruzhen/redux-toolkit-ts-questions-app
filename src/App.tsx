import React from "react";
import { useAppDispatch, useAppSelector } from "./common/hooks";
import {
  addQuestion,
  deleteQuestion,
  selectAll,
} from "./features/questions/questionsSlice";

const App: React.FC = () => {
  const questions = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  const add = () =>
    dispatch(
      addQuestion({
        id: 4,
        title: "Question D?",
        body: "",
        rightAnswer: 0,
        wrongAnswer: 0,
      })
    );

  const remove = (questionId: number) => dispatch(deleteQuestion(questionId));

  const renderedQuestions = questions.map((question) => (
    <li key={question.id}>
      <span>{question.title}</span>
      <button onClick={() => remove(question.id)}>DELETE</button>
    </li>
  ));

  return (
    <div className="App">
      <h2>Questions App</h2>
      <ul>{renderedQuestions}</ul>
      <button onClick={add}>ADD</button>
    </div>
  );
};

export default App;
