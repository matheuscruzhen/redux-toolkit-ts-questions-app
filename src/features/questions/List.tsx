import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  fetchQuestions,
  selectAllQuestions,
  getQuestionsError,
  getQuestionsStatus,
} from "./questionsSlice";

const List: React.FC = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectAllQuestions);
  const questionsStatus = useAppSelector(getQuestionsStatus);
  const error = useAppSelector(getQuestionsError);

  useEffect(() => {
    if (questionsStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);

  let content;
  if (questionsStatus === "succeeded") {
    content = questions.map((question) => (
      <Link key={question._id} to={`${question._id}`}>
        <span>{question.title}</span>
      </Link>
    ));
  } else if (questionsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (questionsStatus === "error") {
    content = <p>{error}</p>;
  }
  return (
    <div>
      <Link className="text-xl bg-slate-300 py-1 px-2 rounded-md" to={"create"}>
        New
      </Link>
      <p className="text-3xl mb-4">List Of Questions</p>
      <ul className="flex flex-col">{content}</ul>
    </div>
  );
};

export default List;
