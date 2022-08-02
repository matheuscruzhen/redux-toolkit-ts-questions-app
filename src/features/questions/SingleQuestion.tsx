import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../store";
import { useAppDispatch } from "../../common/hooks";
import { questionDeleted, selectById } from "./questionsSlice";

const Question: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const question = useSelector((state: RootState) =>
    selectById(state, Number(id))
  );

  const editQuestion = () => {
    navigate(`/questions/edit/${question?.id}`);
  };

  const removeQuestion = () => {
    dispatch(questionDeleted(Number(question?.id)));

    navigate(`/questions`);
  };

  const renderedQuestion = (
    <section>
      <h3>Title</h3>
      <p>{question?.title}</p>
      <h3>Answer</h3>
      <p>{question?.answer}</p>

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
