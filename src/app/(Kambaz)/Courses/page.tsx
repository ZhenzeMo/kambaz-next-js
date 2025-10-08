"use client";

import { useState } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { LiaBookSolid } from "react-icons/lia";
import Link from "next/link";

export default function CoursesPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Sample course data
  const courses = [
    {
      id: "123",
      name: "CS5610 - Web Development",
      instructor: "Professor Smith",
      semester: "Spring 2025",
      status: "active"
    },
    {
      id: "456", 
      name: "CS5500 - Software Engineering",
      instructor: "Professor Johnson",
      semester: "Spring 2025",
      status: "active"
    },
    {
      id: "789",
      name: "CS5800 - Algorithms",
      instructor: "Professor Davis",
      semester: "Fall 2024",
      status: "completed"
    }
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Courses</h2>
        <Button 
          variant="outline-primary" 
          onClick={toggleSidebar}
          className="d-md-none"
        >
          <LiaBookSolid className="me-2" />
          {showSidebar ? 'Hide' : 'Show'} Classes
        </Button>
      </div>

      <Row>
        {/* Sidebar - Always visible on desktop, toggleable on mobile */}
        <Col 
          md={showSidebar ? 4 : 0} 
          className={`${showSidebar ? 'd-block' : 'd-none'} d-md-block`}
        >
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">My Classes</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {courses.map((course) => (
                  <ListGroupItem 
                    key={course.id}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{course.name}</div>
                      <small className="text-muted">
                        {course.instructor} • {course.semester}
                      </small>
                    </div>
                    <span 
                      className={`badge ${
                        course.status === 'active' ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {course.status}
                    </span>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h6 className="mb-0">Quick Actions</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                {courses.filter(c => c.status === 'active').map((course) => (
                  <Link 
                    key={course.id}
                    href={`/Courses/${course.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Go to {course.name}
                  </Link>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={showSidebar ? 8 : 12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Course Overview</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center text-muted py-5">
                <LiaBookSolid size={64} className="mb-3" />
                <h5>Welcome to Courses</h5>
                <p>
                  {showSidebar 
                    ? "Click on any course in the sidebar to view details, assignments, and modules."
                    : "Click the 'Show Classes' button to view your enrolled courses and access course materials."
                  }
                </p>
                
                {!showSidebar && (
                  <div className="mt-4">
                    <h6>Your Active Courses:</h6>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      {courses.filter(c => c.status === 'active').map((course) => (
                        <Link 
                          key={course.id}
                          href={`/Courses/${course.id}`}
                          className="btn btn-primary"
                        >
                          {course.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
