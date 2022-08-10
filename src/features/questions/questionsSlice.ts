import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./../../store";

const QUESTIONS_URL = "http://localhost:1337/questions";

interface QuestionState {
  _id?: string;
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

export const addNewQuestion = createAsyncThunk(
  "questions/addNewQuestion",
  async (question: QuestionState) => {
    const response = await axios.post(QUESTIONS_URL, question);
    return response.data;
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (question: QuestionState) => {
    const { _id } = question;

    try {
      const response = await axios.patch(`${QUESTIONS_URL}/${_id}`, question);
      return response.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (question: QuestionState) => {
    const { _id } = question;

    try {
      const response = await axios.delete(`${QUESTIONS_URL}/${_id}`);
      if (response?.status === 200) return question;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
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
      })
      .addCase(
        addNewQuestion.fulfilled,
        (state, action: PayloadAction<QuestionState>) => {
          console.log(action.payload);
          state.questions.push(action.payload);
        }
      )
      .addCase(
        updateQuestion.fulfilled,
        (state, action: PayloadAction<QuestionState>) => {
          if (!action.payload?._id) {
            console.log("Update could not complete");
            console.log(action.payload);
            return;
          }
          console.log(action.payload);
          const { _id } = action.payload;
          const questions = state.questions.filter(
            (question) => question._id !== _id
          );
          state.questions = [...questions, action.payload];
        }
      )
      .addCase(
        deleteQuestion.fulfilled,
        (state, action: PayloadAction<QuestionState>) => {
          if (!action.payload?._id) {
            console.log("Delete could not complete");
            console.log(action.payload);
            return;
          }
          const { _id } = action.payload;
          const questions = state.questions.filter(
            (question) => question._id !== _id
          );
          state.questions = questions;
        }
      );
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectAllQuestions = (state: RootState) =>
  state.questions.questions;
export const getQuestionsStatus = (state: RootState) => state.questions.status;
export const getQuestionsError = (state: RootState) => state.questions.error;

export const selectById = (state: RootState, questionId: string) =>
  state.questions.questions.find((question) => question._id === questionId);

export default questionsSlice.reducer;
