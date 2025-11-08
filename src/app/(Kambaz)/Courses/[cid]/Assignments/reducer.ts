import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
  [key: string]: unknown;
}

interface AssignmentInput {
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
}

const initialState = {
  assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }: PayloadAction<AssignmentInput>) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description || "",
        points: assignment.points || 100,
        dueDate: assignment.dueDate || "",
        availableFromDate: assignment.availableFromDate || "",
        availableUntilDate: assignment.availableUntilDate || "",
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a: Assignment) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a: Assignment) =>
        a._id === assignment._id ? assignment : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;

