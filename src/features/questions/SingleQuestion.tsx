import React from "react";
import { useAppSelector } from "../../common/hooks";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../store";
import { useAppDispatch } from "../../common/hooks";
import { questionDeleted, selectById } from "./questionsSlice";

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
    id && dispatch(questionDeleted(id));

    navigate(`/questions`);
  };

  const renderedQuestion = question && (
    <section>
      <h3>Title</h3>
      <p>{question.title}</p>
      <h3>Answer</h3>
      <p>{question.answer}</p>

      <button onClick={editQuestion}>Edit</button>
      <button onClick={removeQuestion}>Remove</button>
    </section>
  );

  return (
    <div>
      <button onClick={() => navigate("/questions")}>Back</button>
      <h2>Question</h2>
      {renderedQuestion}
    </div>
  );
};

export default Question;
