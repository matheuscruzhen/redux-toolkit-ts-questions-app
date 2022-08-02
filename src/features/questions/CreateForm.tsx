import React, { FormEvent, useState } from "react";

const CreateForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");

  const onTitleChange = (e: FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const onAnswerChange = (e: FormEvent<HTMLInputElement>) =>
    setAnswer(e.currentTarget.value);

  const submit = () => {
    console.log({
      title,
      answer,
    });
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
