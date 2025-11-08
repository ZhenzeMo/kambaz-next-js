"use client";

import { useState } from "react";
import { Container, Card } from "react-bootstrap";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    
    const calendarDays = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = currentDate.getMonth() === today.getMonth() && 
                     currentDate.getFullYear() === today.getFullYear() && 
                     day === today.getDate();
      
      calendarDays.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''}`}
        >
          {day}
        </div>
      );
    }
    
    return calendarDays;
  };
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  
  return (
    <Container className="mt-3">
      <h2>Calendar</h2>
      
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>
          <div>
            <button 
              className="btn btn-outline-secondary me-2" 
              onClick={goToPreviousMonth}
            >
              ←
            </button>
            <button 
              className="btn btn-outline-secondary" 
              onClick={goToNextMonth}
            >
              →
            </button>
          </div>
        </Card.Header>
        
        <Card.Body>
          <div className="calendar-container">
            <div className="calendar-header">
              {days.map(day => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-grid">
              {renderCalendar()}
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <style jsx>{`
        .calendar-container {
          font-family: Arial, sans-serif;
        }
        
        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          margin-bottom: 5px;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
        }
        
        .calendar-day-header {
          padding: 10px;
          text-align: center;
          font-weight: bold;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
        }
        
        .calendar-day {
          padding: 10px;
          text-align: center;
          border: 1px solid #dee2e6;
          background-color: white;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .calendar-day.today {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }
        
        .calendar-day:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </Container>
  );
}
