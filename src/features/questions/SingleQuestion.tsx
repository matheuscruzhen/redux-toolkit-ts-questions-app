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

  const renderedQuestion = question && (
    <section>
      <p className="text-xl mb-2">{question.title}</p>
      <blockquote className="mb-2">{question.answer}</blockquote>

      <span className="flex flex-row sm:justify-center space-x-4">
        <button
          className="text-xl bg-blue-300 py-1 px-2 rounded-md"
          onClick={editQuestion}
        >
          Edit
        </button>
        <button
          className="text-xl bg-red-300 py-1 px-2 rounded-md"
          onClick={removeQuestion}
        >
          Remove
        </button>
      </span>
    </section>
  );

  return (
    <div>
      <button
        className="text-xl bg-slate-300 py-1 px-2 rounded-md"
        onClick={() => navigate("/questions")}
      >
        Back
      </button>
      <p className="flex sm:justify-center text-3xl mb-4">Question</p>
      {renderedQuestion}
    </div>
  );
};

export default Question;
