import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaFolder className="me-2 text-primary" />
            <span className="flex-grow-1">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</span>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">LEARNING OBJECTIVES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Introduction to the course</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Learn what is Web Development</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">READING</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Full Stack Developer - Chapter 1 - Introduction</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Full Stack Developer - Chapter 2 - Creating User Interfaces</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">SLIDES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Introduction to Web Development</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Creating an HTTP server with Node.js</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Creating a React Application</span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaFolder className="me-2 text-primary" />
            <span className="flex-grow-1">Week 1, Lecture 2 - Formatting User Interfaces with HTML</span>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">LEARNING OBJECTIVES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Learn how to create user interfaces with HTML</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Deploy the assignment to Netlify</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">SLIDES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Introduction to HTML and the DOM</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Formatting Web content with Headings and Paragraphs</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Formatting content with Lists and Tables</span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaFolder className="me-2 text-primary" />
            <span className="flex-grow-1">Week 2, Lecture 1 - Styling with CSS</span>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">LEARNING OBJECTIVES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Learn CSS fundamentals</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Style web pages with CSS</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">SLIDES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">CSS Selectors and Properties</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Box Model and Layout</span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaFolder className="me-2 text-primary" />
            <span className="flex-grow-1">Week 2, Lecture 2 - JavaScript Basics</span>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">LEARNING OBJECTIVES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Understand JavaScript syntax</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Work with DOM manipulation</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">SLIDES</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Variables and Functions</span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 bg-white border-start border-success border-3 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileAlt className="me-2 text-success" />
              <span className="flex-grow-1">Event Handling</span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
  
  