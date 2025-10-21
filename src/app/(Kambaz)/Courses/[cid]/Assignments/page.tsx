"use client";
import { useParams } from "next/navigation";
import { assignments } from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";
import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentGroupControls from "./AssignmentGroupControls";

interface Assignment {
  _id: string;
  title: string;
  course: string;
}

export default function Assignments() {
  const { cid } = useParams();
  
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
            {assignments
              .filter((assignment: Assignment) => assignment.course === cid)
              .map((assignment: Assignment) => (
                <ListGroupItem key={assignment._id} className="wd-assignment-list-item p-3 ps-1" style={{ borderLeft: '5px solid #198754', borderTop: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6' }}>
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
                        <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | 
                        <br />
                        <strong>Due</strong> May 13 at 11:59pm | 100 pts
                      </div>
                    </div>
                    <AssignmentControlButtons />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
