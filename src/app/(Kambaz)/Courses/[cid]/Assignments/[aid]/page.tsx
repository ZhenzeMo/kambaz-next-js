import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      {/* Breadcrumb - just course name */}
      <div className="mb-4">
        <h4>CS5610</h4>
      </div>
      
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control 
              id="wd-name" 
              defaultValue="A1" 
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
                    type="text"
                    id="wd-due-date"
                    defaultValue="05/13/2024"
                    placeholder="MM/DD/YYYY"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                  <Form.Control 
                    type="text"
                    id="wd-available-from"
                    defaultValue="05/06/2024"
                    placeholder="MM/DD/YYYY"
                    className="form-control"
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                  <Form.Control 
                    type="text"
                    id="wd-available-until"
                    defaultValue="05/20/2024"
                    placeholder="MM/DD/YYYY"
                    className="form-control"
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
              <Button variant="secondary" className="me-2">
                Cancel
              </Button>
              <Button variant="danger">
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
