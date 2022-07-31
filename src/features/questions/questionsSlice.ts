import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./../../store";

// Define a type for the slice state
interface QuestionState {
  id: number;
  title: string;
  body: string;
  rightAnswer: number;
  wrongAnswer: number;
}

// Define the initial state using that type
const initialState: QuestionState[] = [
  {
    id: 1,
    title: "Question A?",
    body: "",
    rightAnswer: 0,
    wrongAnswer: 0,
  },
  {
    id: 2,

    title: "Question B?",
    body: "",
    rightAnswer: 0,
    wrongAnswer: 0,
  },
  {
    id: 3,
    title: "Question C?",
    body: "",
    rightAnswer: 0,
    wrongAnswer: 0,
  },
];

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.push(action.payload);
    },
  },
});

export const { addQuestion } = questionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAll = (state: RootState) => state.questions;

export default questionsSlice.reducer;
