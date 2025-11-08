"use client";

import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface CoursesSlideoutProps {
  show: boolean;
  onHide: () => void;
}

export default function CoursesSlideout({ show, onHide }: CoursesSlideoutProps) {
  // Course data matching Dashboard
  const courses = [
    {
      id: "1234",
      name: "CS1234 React JS",
      description: "Full Stack software developer",
      image: "/images/reactjs.jpg"
    },
    {
      id: "1234",
      name: "CS5610 Web Development", 
      description: "Learn modern web development with React, Node.js, and MongoDB",
      image: "/images/NEU.jpeg"
    },
    {
      id: "1234",
      name: "CS3200 Database Design",
      description: "Database management systems and SQL programming",
      image: "/images/stacked.jpg"
    },
    {
      id: "1234",
      name: "CS4100 Artificial Intelligence",
      description: "Introduction to AI concepts and machine learning algorithms",
      image: "/images/teslabot.jpg"
    },
    {
      id: "1234",
      name: "CS2500 Fundamentals of CS",
      description: "Introduction to programming and problem solving",
      image: "/images/reactjs.jpg"
    },
    {
      id: "1234",
      name: "CS3500 Object-Oriented Design",
      description: "Design patterns and software architecture principles",
      image: "/images/stacked.jpg"
    },
    {
      id: "1234",
      name: "CS4500 Software Development",
      description: "Agile methodologies and team-based software projects",
      image: "/images/teslabot.jpg"
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {show && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={onHide}
        />
      )}
      
      {/* Slideout Panel */}
      <div 
        className={`position-fixed top-0 start-0 h-100 bg-white shadow-lg overflow-auto`}
        style={{ 
          width: "400px", 
          zIndex: 1050,
          transform: show ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Courses</h4>
            <button 
              type="button" 
              className="btn btn-link p-0"
              onClick={onHide}
              style={{ fontSize: '1.5rem' }}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="mb-3">
            <Link 
              href="/Courses" 
              className="text-danger text-decoration-none fw-bold"
              onClick={onHide}
            >
              All Courses
            </Link>
          </div>
          
          <div className="mb-3">
            <h6 className="fw-bold mb-3">Published Courses (12)</h6>
            
            <div className="d-flex flex-column gap-3">
              {courses.map((course, index) => (
                <Card key={index} style={{ width: '100%' }}>
                  <Link 
                    href={`/Courses/${course.id}/Home`} 
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={onHide}
                  >
                    <CardImg 
                      variant="top" 
                      src={course.image} 
                      style={{ height: '120px', objectFit: 'cover' }} 
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title">
                        {course.name}
                      </CardTitle>
                      <CardText className="wd-dashboard-course-description" style={{ fontSize: '0.9rem' }}>
                        {course.description}
                      </CardText>
                      <Button variant="primary" size="sm">Go</Button>
                    </CardBody>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
