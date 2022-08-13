import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { addNewQuestion } from "./questionsSlice";

const CreateForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onTitleChange = (e: FormEvent<HTMLTextAreaElement>) =>
    setTitle(e.currentTarget.value);
  const onAnswerChange = (e: FormEvent<HTMLTextAreaElement>) =>
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

  const classes = {
    container: "h-screen p-8 bg-neutral-900 text-white",
    heading: "text-3xl text-center font-semibold uppercase mb-4",
    form: "flex flex-col m-auto w-6/12",
    formControl: "mb-4 flex flex-col",
    label: "text-xl text-red mb-1",
    input: "text-neutral-500 rounded p-1",
    button: "bg-neutral-500 text-white rounded h-8 px-4 py-1",
  };

  return (
    <div className={classes.container}>
      <p className={classes.heading}>Create Question</p>
      <form className={classes.form}>
        <span className={classes.formControl}>
          <label className={classes.label} htmlFor="questionTitle">
            Title:{" "}
          </label>
          <textarea
            className={classes.input}
            id="questionTitle"
            name="questionTitle"
            value={title}
            onChange={onTitleChange}
          />
        </span>

        <span className={classes.formControl}>
          <label className={classes.label} htmlFor="questionAnswer">
            Answer:{" "}
          </label>
          <textarea
            className={classes.input}
            id="questionAnswer"
            name="questionAnswer"
            value={answer}
            onChange={onAnswerChange}
          />
        </span>

        <button className={classes.button} onClick={submit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
