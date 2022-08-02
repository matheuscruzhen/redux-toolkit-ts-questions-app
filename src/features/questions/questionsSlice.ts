import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./../../store";

// Define a type for the slice state
interface QuestionState {
  id: number;
  title: string;
  answer: string;
}

// Define the initial state using that type
const initialState: QuestionState[] = [
  {
    id: 1,
    title: "Question A?",
    answer: "",
  },
  {
    id: 2,

    title: "Question B?",
    answer: "",
  },
  {
    id: 3,
    title: "Question C?",
    answer: "",
  },
];

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    questionAdded: (state, action: PayloadAction<QuestionState>) => {
      state.push(action.payload);
    },
    questionUpdated: (state, action: PayloadAction<QuestionState>) => {
      const questions = state.filter(
        (question) => question.id !== action.payload.id
      );
      const updated = action.payload;
      state = [...questions, updated];
    },
    questionDeleted: (state, action: PayloadAction<number>) => {
      return state.filter((question) => question.id !== action.payload);
    },
  },
});

export const { questionAdded, questionDeleted, questionUpdated } =
  questionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAll = (state: RootState) => state.questions;

export const selectById = (state: RootState, id: number) =>
  state.questions.find((question) => question.id === id);

export default questionsSlice.reducer;
