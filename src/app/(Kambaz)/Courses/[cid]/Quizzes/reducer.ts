import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizSummary } from "./client";

interface QuizzesState {
  quizzes: QuizSummary[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<QuizSummary[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<QuizSummary>) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },
    updateQuiz: (state, action: PayloadAction<QuizSummary>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;

