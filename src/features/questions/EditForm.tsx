import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { RootState } from "../../rootReducer";
import { updateQuestion, selectById } from "./questionsSlice";

const EditForm: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");

  const question =
    id && useAppSelector((state: RootState) => selectById(state, id));

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setAnswer(question.answer);
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onTitleChange = (e: FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const onAnswerChange = (e: FormEvent<HTMLInputElement>) =>
    setAnswer(e.currentTarget.value);

  const canSave = [title, answer].every(Boolean);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (canSave) {
      const updated = { ...question, title, answer };

      id && dispatch(updateQuestion(updated));

      navigate("/questions");
    } else {
      console.log("could not save");
    }
  };

  return (
    <form>
      <label htmlFor="questionTitle">Title: </label>
      <input
        type="text"
        id="questionTitle"
        name="questionTitle"
        value={title}
        onChange={onTitleChange}
      />

      <label htmlFor="questionAnswer">Answer: </label>
      <input
        type="text"
        id="questionAnswer"
        name="questionAnswer"
        value={answer}
        onChange={onAnswerChange}
      />

      <button onClick={submit}>Save</button>
    </form>
  );
};

export default EditForm;
