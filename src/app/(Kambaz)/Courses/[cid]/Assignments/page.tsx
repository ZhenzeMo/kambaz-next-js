"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, Modal, Button as BootstrapButton } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";
import Link from "next/link";
import { setAssignments } from "./reducer";
import { RootState } from "../../../store";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentGroupControls from "./AssignmentGroupControls";
import * as coursesClient from "../../client";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (assignmentToDelete) {
      await coursesClient.deleteAssignment(assignmentToDelete);
      dispatch(setAssignments(assignments.filter((a: Assignment) => a._id !== assignmentToDelete)));
      setShowDeleteModal(false);
      setAssignmentToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      // Handle datetime-local format (YYYY-MM-DDTHH:mm)
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <ListGroup className="rounded-0">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-4" />
            <strong>ASSIGNMENTS</strong>
            <span className="ms-3">40% of Total</span>
            <AssignmentGroupControls />
          </div>
          <ListGroup className="rounded-0">
            {assignments.map((assignment: Assignment) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment-list-item p-3 ps-1"
                  style={{
                    borderLeft: "5px solid #198754",
                    borderTop: "1px solid #dee2e6",
                    borderRight: "1px solid #dee2e6",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdOutlineAssignment className="me-3 fs-3 text-success" />
                    <div className="flex-grow-1">
                      <Link
                        href={`/Courses/${cid}/Assignments/${assignment._id}`}
                        className="wd-assignment-link text-dark fw-bold text-decoration-none"
                      >
                        {assignment.title}
                      </Link>
                      <div className="text-muted small">
                        {assignment.availableFromDate && (
                          <>
                            <strong>Not available until</strong> {formatDate(assignment.availableFromDate)} |{" "}
                          </>
                        )}
                        {assignment.dueDate && (
                          <>
                            <strong>Due</strong> {formatDate(assignment.dueDate)} |{" "}
                          </>
                        )}
                        {assignment.points || 100} pts
                      </div>
                    </div>
                    <AssignmentControlButtons
                      assignmentId={assignment._id}
                      onDelete={handleDeleteClick}
                    />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </BootstrapButton>
          <BootstrapButton variant="danger" onClick={handleDeleteConfirm}>
            Yes
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
