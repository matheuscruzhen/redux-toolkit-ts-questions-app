import React from "react";
import { useAppSelector } from "../../common/hooks";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../store";
import { useAppDispatch } from "../../common/hooks";
import { deleteQuestion, selectById } from "./questionsSlice";

const Question: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const question =
    id && useAppSelector((state: RootState) => selectById(state, id));

  const editQuestion = () => {
    id && navigate(`/questions/edit/${id}`);
  };

  const removeQuestion = () => {
    question && dispatch(deleteQuestion(question));

    navigate(`/questions`);
  };

  const classes = {
    container: "h-screen p-8 bg-neutral-900 text-white",
    heading: "text-3xl text-center font-semibold uppercase mb-8",
    questionContainer: "border-y border-neutral-700 p-8",
    title: "text-2xl mb-2 border-neutral-700",
    answer: "mb-8 ",
    buttonContainer: "flex flex-row justify-center space-x-4",
    button: "bg-neutral-500 text-white rounded h-8 px-4 py-1",
  };

  const renderedQuestion = question && (
    <section className={classes.questionContainer}>
      <p className={classes.title}>{question.title}</p>
      <blockquote className={classes.answer}>{question.answer}</blockquote>

      <span className={classes.buttonContainer}>
        <button className={classes.button} onClick={editQuestion}>
          Edit
        </button>
        <button className={classes.button} onClick={removeQuestion}>
          Remove
        </button>
      </span>
    </section>
  );

  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={() => navigate("/questions")}>
        Back
      </button>
      <p className={classes.heading}>Question</p>
      {renderedQuestion}
    </div>
  );
};

export default Question;
