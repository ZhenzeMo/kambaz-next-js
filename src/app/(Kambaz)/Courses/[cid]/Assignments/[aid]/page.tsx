"use client";
import { useParams } from "next/navigation";
import { assignments } from "../../../../Database";
import { courses } from "../../../../Database";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

interface Assignment {
  _id: string;
  title: string;
  course: string;
}

interface Course {
  _id: string;
  name: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((a: Assignment) => a._id === aid && a.course === cid);
  const course = courses.find((c: Course) => c._id === cid);
  
  return (
    <div id="wd-assignments-editor" className="p-4">
      {/* Breadcrumb - course name */}
      <div className="mb-4">
        <h4>{course?.name}</h4>
      </div>
      
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control 
              id="wd-name" 
              defaultValue={assignment?.title || ""} 
              type="text"
              className="form-control"
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
              defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kambas application should include a link to navigate back to the landing page.`}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control 
              id="wd-points" 
              type="number"
              defaultValue={100}
              className="form-control"
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
              <Form.Check 
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
              />
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
              <Form.Check 
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
              />
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
                    defaultValue="2024-05-13T23:59"
                    className="form-control"
                    style={{fontFamily: 'monospace'}}
                    title="Select date and time - Month format depends on browser locale"
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                  <Form.Control 
                    type="datetime-local"
                    id="wd-available-from"
                    defaultValue="2024-05-06T00:00"
                    className="form-control"
                    style={{fontFamily: 'monospace'}}
                    title="Select date and time - Month format depends on browser locale"
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                  <Form.Control 
                    type="datetime-local"
                    id="wd-available-until"
                    defaultValue="2024-05-20T23:59"
                    className="form-control"
                    style={{fontFamily: 'monospace'}}
                    title="Select date and time - Month format depends on browser locale"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />
        <Row>
          <Col>
            <div className="d-flex justify-content-end">
              <Link href={`/Courses/${cid}/Assignments`}>
                <Button variant="secondary" className="me-2">
                  Cancel
                </Button>
              </Link>
              <Link href={`/Courses/${cid}/Assignments`}>
                <Button variant="danger">
                  Save
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
