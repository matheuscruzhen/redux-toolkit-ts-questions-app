import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./../../store";

const QUESTIONS_URL = "http://localhost:1337/questions";

// Define a type for the slice state
interface QuestionState {
  _id: string;
  title: string;
  answer: string;
}

interface InitialState {
  questions: QuestionState[];
  status: string;
  error: any;
}

// Define the initial state using that type
const initialState: InitialState = {
  questions: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await axios.get(QUESTIONS_URL);
    return response.data;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    questionAdded: (
      state,
      action: PayloadAction<Omit<QuestionState, "_id">>
    ) => {
      console.log("Question Added");
      state.questions.push({ _id: nanoid(), ...action.payload });
    },
    questionUpdated: (state, action: PayloadAction<QuestionState>) => {
      const { _id, answer, title } = action.payload;

      const index = state.questions.findIndex(
        (question) => question._id === _id
      );

      state.questions[index].title = title;
      state.questions[index].answer = answer;
    },
    questionDeleted: (state, action: PayloadAction<string>) => {
      state.questions.filter((question) => question._id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { questionAdded, questionDeleted, questionUpdated } =
  questionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllQuestions = (state: RootState) =>
  state.questions.questions;
export const getQuestionsStatus = (state: RootState) => state.questions.status;
export const getQuestionsError = (state: RootState) => state.questions.error;

export const selectById = (state: RootState, questionId: string) =>
  state.questions.questions.find((question) => question._id === questionId);

export default questionsSlice.reducer;
