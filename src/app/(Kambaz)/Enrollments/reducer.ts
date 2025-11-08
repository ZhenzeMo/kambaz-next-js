import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollUserPayload {
  userId: string;
  courseId: string;
}

const initialState = {
  enrollments: enrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload: { userId, courseId } }: PayloadAction<EnrollUserPayload>) => {
      const existingEnrollment = state.enrollments.find(
        (e: Enrollment) => e.user === userId && e.course === courseId
      );
      if (!existingEnrollment) {
        const newEnrollment: Enrollment = {
          _id: uuidv4(),
          user: userId,
          course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment];
      }
    },
    unenrollUser: (state, { payload: { userId, courseId } }: PayloadAction<EnrollUserPayload>) => {
      state.enrollments = state.enrollments.filter(
        (e: Enrollment) => !(e.user === userId && e.course === courseId)
      );
    },
    setEnrollments: (state, { payload: enrollments }: PayloadAction<Enrollment[]>) => {
      state.enrollments = enrollments;
    },
  },
});

export const { enrollUser, unenrollUser, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;

