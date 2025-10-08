"use client";

import { Container, Card, ListGroup, ListGroupItem, Badge } from "react-bootstrap";

export default function InboxPage() {
  // Sample inbox messages for placeholder
  const messages = [
    {
      id: 1,
      from: "Professor Smith",
      subject: "Assignment 3 Due Tomorrow",
      preview: "Don't forget to submit your assignment by 11:59 PM...",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "CS5610 TA",
      subject: "Lab Session Reminder",
      preview: "Lab session will be held in Snell Library room 120...",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      from: "Northeastern University",
      subject: "Tuition Payment Due",
      preview: "Your tuition payment for Spring 2025 is due on...",
      time: "3 days ago",
      unread: false
    },
    {
      id: 4,
      from: "Study Group",
      subject: "Meeting Time Changed",
      preview: "Our study group meeting has been moved to Friday...",
      time: "1 week ago",
      unread: false
    }
  ];

  const unreadCount = messages.filter(msg => msg.unread).length;

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inbox</h2>
        {unreadCount > 0 && (
          <Badge bg="primary" pill>
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <Card>
        <Card.Header>
          <h5 className="mb-0">Messages</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <ListGroup variant="flush">
            {messages.map((message) => (
              <ListGroupItem 
                key={message.id} 
                className={`d-flex justify-content-between align-items-start ${
                  message.unread ? 'fw-bold' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {message.from}
                    {message.unread && (
                      <Badge bg="primary" className="ms-2">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="text-muted">{message.subject}</div>
                  <small className="text-muted">{message.preview}</small>
                </div>
                <small className="text-muted">{message.time}</small>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body className="text-center text-muted">
          <h6>Inbox Placeholder</h6>
          <p className="mb-0">This is a placeholder inbox page. In a real application, this would display actual messages and notifications.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}
