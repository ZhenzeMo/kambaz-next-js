"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface AssignmentControlButtonsProps {
  assignmentId: string;
  onDelete: (assignmentId: string) => void;
}

export default function AssignmentControlButtons({
  assignmentId,
  onDelete,
}: AssignmentControlButtonsProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  return (
    <div className="float-end">
      {isFaculty && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={() => onDelete(assignmentId)}
          style={{ cursor: "pointer" }}
        />
      )}
      <FaCheckCircle className="text-success fs-5 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

