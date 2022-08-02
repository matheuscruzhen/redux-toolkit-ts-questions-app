import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../common/hooks";
import { selectAll } from "./questionsSlice";

const List: React.FC = () => {
  const questions = useAppSelector(selectAll);

  const renderedQuestions = questions.map((question) => (
    <Link to={`${question.id}`} key={question.id}>
      <span>{question.title}</span>
    </Link>
  ));

  return (
    <div className="App">
      <Link to={"create"}>New</Link>
      <h2>Questions</h2>
      <ul>{renderedQuestions}</ul>
    </div>
  );
};

export default List;
