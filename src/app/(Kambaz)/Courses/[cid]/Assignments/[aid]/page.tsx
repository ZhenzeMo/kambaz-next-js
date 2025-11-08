"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";

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

interface Course {
  _id: string;
  name: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const isNew = aid === "new";
  const assignment = isNew
    ? null
    : (assignments.find((a: Assignment) => a._id === aid && a.course === cid) as Assignment | undefined);
  const course = courses.find((c: Course) => c._id === cid);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  // Students can only view assignments, not edit
  const isReadOnly = !isFaculty && !isNew;

  const [assignmentData, setAssignmentData] = useState({
    title: assignment?.title || "",
    description: (assignment as Assignment)?.description || "The assignment is available online\n\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kanbas application\n• Links to all relevant source code repositories\n\nThe Kambas application should include a link to navigate back to the landing page.",
    points: (assignment as Assignment)?.points || 100,
    dueDate: (assignment as Assignment)?.dueDate || "2024-05-13T23:59",
    availableFromDate: (assignment as Assignment)?.availableFromDate || "2024-05-06T00:00",
    availableUntilDate: (assignment as Assignment)?.availableUntilDate || "2024-05-20T23:59",
  });

  useEffect(() => {
    if (assignment) {
      const assignmentTyped = assignment as Assignment;
      setAssignmentData({
        title: assignmentTyped.title || "",
        description: assignmentTyped.description || "",
        points: assignmentTyped.points || 100,
        dueDate: assignmentTyped.dueDate || "",
        availableFromDate: assignmentTyped.availableFromDate || "",
        availableUntilDate: assignmentTyped.availableUntilDate || "",
      });
    }
  }, [assignment]);

  const handleSave = () => {
    if (isNew) {
      dispatch(
        addAssignment({
          ...assignmentData,
          course: cid as string,
        })
      );
    } else {
      dispatch(
        updateAssignment({
          _id: aid as string,
          ...assignmentData,
          course: cid as string,
        })
      );
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <div className="mb-4">
        <h4>{course?.name}</h4>
      </div>

      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control
              id="wd-name"
              value={assignmentData.title}
              onChange={(e) =>
                setAssignmentData({ ...assignmentData, title: e.target.value })
              }
              type="text"
              className="form-control"
              readOnly={isReadOnly}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Control
              as="textarea"
              id="wd-description"
              rows={10}
              className="form-control"
              value={assignmentData.description}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  description: e.target.value,
                })
              }
              readOnly={isReadOnly}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control
              id="wd-points"
              type="number"
              value={assignmentData.points}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  points: parseInt(e.target.value) || 0,
                })
              }
              className="form-control"
              readOnly={isReadOnly}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
            <Form.Select id="wd-group" className="form-control">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
            <Form.Select id="wd-display-grade-as" className="form-control">
              <option value="Percentage">Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
            <Form.Select id="wd-submission-type" className="form-control mb-3">
              <option value="Online">Online</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div className="border p-3">
              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                defaultChecked
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
              />
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
              />
              <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Assign</Form.Label>
            <div className="border p-3">
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
                  <Form.Control
                    id="wd-assign-to"
                    defaultValue="Everyone"
                    type="text"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-due-date"
                    value={assignmentData.dueDate}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        dueDate: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{ fontFamily: "monospace" }}
                    readOnly={isReadOnly}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-from"
                    value={assignmentData.availableFromDate}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        availableFromDate: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{ fontFamily: "monospace" }}
                    readOnly={isReadOnly}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-until"
                    value={assignmentData.availableUntilDate}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        availableUntilDate: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{ fontFamily: "monospace" }}
                    readOnly={isReadOnly}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />
        {!isReadOnly && (
          <Row>
            <Col>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        )}
        {isReadOnly && (
          <Row>
            <Col>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleCancel}>
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
}
