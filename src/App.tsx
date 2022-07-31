import React from "react";
import { useAppSelector } from "./common/hooks";
import { selectAll } from "./features/questions/questionsSlice";

const App: React.FC = () => {
  const questions = useAppSelector(selectAll);

  console.log(questions);

  const renderedQuestions = questions.map((question) => (
    <li key={question.id}>{question.title}</li>
  ));

  return (
    <div className="App">
      <h2>Questions App</h2>
      <ul>{renderedQuestions}</ul>
    </div>
  );
};

export default App;
