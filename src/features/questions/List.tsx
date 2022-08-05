import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../common/hooks";
import { selectAll } from "./questionsSlice";

const List: React.FC = () => {
  const questions = useAppSelector(selectAll);

  const renderedQuestions = questions?.map((question) => (
    <Link className="text-xl mb-2" to={`${question.id}`} key={question.id}>
      <span>{question.title}</span>
    </Link>
  ));

  return (
    <div>
      <Link className="text-xl bg-slate-300 py-1 px-2 rounded-md" to={"create"}>
        New
      </Link>
      <p className="text-3xl mb-4">List Of Questions</p>
      <ul className="flex flex-col">{renderedQuestions}</ul>
    </div>
  );
};

export default List;
