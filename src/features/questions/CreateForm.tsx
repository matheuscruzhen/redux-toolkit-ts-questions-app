import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { addNewQuestion } from "./questionsSlice";

const CreateForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");

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
      dispatch(addNewQuestion({ title, answer }));

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

export default CreateForm;
