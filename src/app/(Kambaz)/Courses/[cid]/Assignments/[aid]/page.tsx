import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control 
            id="wd-name" 
            defaultValue="A1" 
            type="text"
          />
        </div>

        <div className="mb-3">
          <Form.Control 
            as="textarea"
            id="wd-description"
            rows={10}
            defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kambas application should include a link to navigate back to the landing page.`}
          />
        </div>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control 
              id="wd-points" 
              type="number"
              defaultValue={100} 
            />
          </Col>
        </Row>

        <div className="mb-3">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          <Form.Select id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </Form.Select>
        </div>

        <div className="mb-3">
          <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
          <Form.Select id="wd-display-grade-as">
            <option value="Percentage">Percentage</option>
          </Form.Select>
        </div>

        <div className="mb-3">
          <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
          <Form.Select id="wd-submission-type" className="mb-3">
            <option value="Online">Online</option>
          </Form.Select>

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
        </div>

        <div className="mb-3">
          <Form.Label>Assign</Form.Label>
          <div className="border p-3">
            <div className="mb-3">
              <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
              <Form.Control 
                id="wd-assign-to" 
                defaultValue="Everyone"
                type="text"
              />
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="wd-due-date">Due</Form.Label>
              <Form.Control 
                type="datetime-local"
                id="wd-due-date"
                defaultValue="2024-05-13T23:59"
              />
            </div>

            <Row>
              <Col className="mb-3">
                <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                <Form.Control 
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue="2024-05-06T00:00"
                />
              </Col>

              <Col className="mb-3">
                <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                <Form.Control 
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue="2024-05-20T23:59"
                />
              </Col>
            </Row>
          </div>
        </div>

        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
