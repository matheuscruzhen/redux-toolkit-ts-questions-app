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

  const classes = {
    container: "h-screen p-8 bg-neutral-900 text-white",
    heading: "text-2xl text-center font-semibold uppercase mb-4",
    list: "p-2 flex flex-col border-solid border-y rounded border-neutral-700",
    listElement: "mb-2 text-xl",
    button: "bg-emerald-400 text-white rounded h-8 px-4 py-1",
  };

  useEffect(() => {
    if (questionsStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);

  let content;
  if (questionsStatus === "succeeded") {
    content = questions.map((question) => (
      <Link
        className={classes.listElement}
        key={question._id}
        to={`${question._id}`}
      >
        <span>{question.title}</span>
      </Link>
    ));
  } else if (questionsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (questionsStatus === "error") {
    content = <p>{error}</p>;
  }
  return (
    <div className={classes.container}>
      <Link className={classes.button} to={"create"}>
        New
      </Link>
      <p className={classes.heading}>List Of Questions</p>
      <ul className={classes.list}>{content}</ul>
    </div>
  );
};

export default List;
