import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./../../store";

// Define a type for the slice state
interface QuestionState {
  id: string;
  title: string;
  answer: string;
}

// Define the initial state using that type
const initialState: QuestionState[] = [
  {
    id: "1",
    title: "Question A?",
    answer: "",
  },
  {
    id: "2",

    title: "Question B?",
    answer: "",
  },
  {
    id: "3",
    title: "Question C?",
    answer: "",
  },
];

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    questionAdded: (
      state,
      action: PayloadAction<Omit<QuestionState, "id">>
    ) => {
      console.log("Question Added");
      state.push({ id: nanoid(), ...action.payload });
    },
    questionUpdated: (state, action: PayloadAction<QuestionState>) => {
      const questions = state.filter(
        (question) => question.id !== action.payload.id
      );
      const updated = action.payload;
      state = [...questions, updated];
    },
    questionDeleted: (state, action: PayloadAction<string>) => {
      return state.filter((question) => question.id !== action.payload);
    },
  },
});

export const { questionAdded, questionDeleted, questionUpdated } =
  questionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAll = (state: RootState) => state.questions;

export const selectById = (state: RootState, questionId: string) =>
  state.questions.find((question) => question.id === questionId);

export default questionsSlice.reducer;
