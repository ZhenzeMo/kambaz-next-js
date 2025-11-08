"use client";

import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function AssignmentControls() {
  const router = useRouter();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";
  
  return (
    <div id="wd-assignments-controls" className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="position-relative" style={{ width: "300px" }}>
          <CiSearch className="position-absolute fs-5" style={{ left: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }} />
          <Form.Control
            id="wd-search-assignment"
            placeholder="Search..."
            style={{ paddingLeft: "35px" }}
          />
        </div>
        {isFaculty && (
          <div>
            <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
              <FaPlus className="me-1" /> Group
            </Button>
            <Button 
              variant="danger" 
              size="lg" 
              id="wd-add-assignment"
              onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
            >
              <FaPlus className="me-1" /> Assignment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

