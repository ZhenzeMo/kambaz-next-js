"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Card, Alert, Form, ProgressBar } from "react-bootstrap";
import { RootState } from "../../../../../store";
import * as quizzesClient from "../../client";
import type { Quiz } from "../../client";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await quizzesClient.findQuizById(qid as string);
        setQuiz(quizData);

        if (currentUser) {
          const attemptsData = await quizzesClient.getStudentAttempts(qid as string, currentUser._id);
          setAttempts(attemptsData);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [qid, currentUser]);

  const isQuizAvailable = () => {
    if (!quiz || !quiz.published) return false;
    
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (availableFrom && now < availableFrom) return false;
    if (availableUntil && now > availableUntil) return false;

    return true;
  };

  const canTakeQuiz = () => {
    if (!quiz) return false;
    if (!quiz.multipleAttempts && attempts.length > 0) return false;
    if (quiz.multipleAttempts && attempts.length >= (quiz.maxAttempts || 1)) return false;
    return true;
  };

  const handleStartQuiz = () => {
    setStarted(true);
    setStartTime(new Date());
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleQuestionClick = (index: number) => {
    if (quiz?.oneQuestionAtATime) {
      setCurrentQuestionIndex(index);
    } else {
      const element = document.getElementById(`question-${index}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    if (quiz?.oneQuestionAtATime && currentQuestionIndex < (quiz.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (quiz?.oneQuestionAtATime && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !currentUser) return;

    setSubmitting(true);
    try {
      const submissionAnswers = quiz.questions?.map((q) => ({
        question: q._id,
        type: q.type,
        ...(q.type === "MC" && { selectedChoiceId: answers[q._id!] }),
        ...(q.type === "TF" && { answer: answers[q._id!] }),
        ...(q.type === "FIB" && { answer: answers[q._id!] }),
      }));

      const response = await axios.post(
        `${HTTP_SERVER}/api/quizzes/${qid}/attempts`,
        {
          startedAt: startTime,
          answers: submissionAnswers,
        },
        { withCredentials: true }
      );

      router.push(`/Courses/${cid}/Quizzes/${qid}/attempts/${response.data._id}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  if (!quiz) {
    return <div className="p-3">Quiz not found.</div>;
  }

  if (!isQuizAvailable()) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          This quiz is not currently available.
        </Alert>
        <Button onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
          Back to Quiz
        </Button>
      </div>
    );
  }

  if (!canTakeQuiz()) {
    return (
      <div className="p-4">
        <Alert variant="info">
          You have used all available attempts for this quiz.
        </Alert>
        {attempts.length > 0 && (
          <Button onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/attempts/${attempts[0]._id}`)}>
            View Last Attempt
          </Button>
        )}
      </div>
    );
  }

  if (!started) {
    return (
      <div className="p-4">
        <h2>{quiz.name}</h2>
        
        {quiz.description && (
          <Card className="mb-3">
            <Card.Body>
              <h5>Quiz Instructions</h5>
              <p>{quiz.description}</p>
            </Card.Body>
          </Card>
        )}

        <Card className="mb-3">
          <Card.Body>
            <h5>Quiz Details</h5>
            <p><strong>Points:</strong> {quiz.points}</p>
            <p><strong>Questions:</strong> {quiz.questions?.length || 0}</p>
            <p><strong>Time Limit:</strong> {quiz.timeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}</p>
            <p><strong>Attempts:</strong> {attempts.length} / {quiz.multipleAttempts ? quiz.maxAttempts : 1}</p>
            {quiz.dueAt && (
              <p><strong>Due:</strong> {new Date(quiz.dueAt).toLocaleString()}</p>
            )}
          </Card.Body>
        </Card>

        <Button variant="danger" size="lg" onClick={handleStartQuiz}>
          Start Quiz
        </Button>
      </div>
    );
  }

  const questionsToShow = quiz.oneQuestionAtATime 
    ? [quiz.questions?.[currentQuestionIndex]].filter(Boolean)
    : quiz.questions || [];

  const progress = quiz.oneQuestionAtATime 
    ? ((currentQuestionIndex + 1) / (quiz.questions?.length || 1)) * 100
    : (Object.keys(answers).length / (quiz.questions?.length || 1)) * 100;

  return (
    <div className="p-4">
      <h2>{quiz.name}</h2>
      
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />

      <Alert variant="info">
        Time started: {startTime?.toLocaleTimeString()}
        {quiz.timeLimit && ` • Time limit: ${quiz.timeLimit} minutes`}
      </Alert>

      <div className="row">
        <div className="col-md-9">
          {questionsToShow.map((question, index) => {
        const actualIndex = quiz.oneQuestionAtATime ? currentQuestionIndex : index;
        
        return (
          <Card key={question._id} id={`question-${actualIndex}`} className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5>Question {actualIndex + 1}</h5>
                <span className="badge bg-secondary">{question.points} pts</span>
              </div>

              <div className="mb-3" dangerouslySetInnerHTML={{ __html: question.questionHtml || question.title }} />

              {question.type === "MC" && (
                <div>
                  {question.choices?.map((choice) => (
                    <Form.Check
                      key={choice.id}
                      type="radio"
                      name={`question-${question._id}`}
                      label={choice.text}
                      value={choice.id}
                      checked={answers[question._id!] === choice.id}
                      onChange={(e) => handleAnswerChange(question._id!, e.target.value)}
                    />
                  ))}
                </div>
              )}

              {question.type === "TF" && (
                <div>
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="True"
                    checked={answers[question._id!] === true}
                    onChange={() => handleAnswerChange(question._id!, true)}
                  />
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="False"
                    checked={answers[question._id!] === false}
                    onChange={() => handleAnswerChange(question._id!, false)}
                  />
                </div>
              )}

              {question.type === "FIB" && (
                <Form.Control
                  type="text"
                  placeholder="Enter your answer"
                  value={answers[question._id!] || ""}
                  onChange={(e) => handleAnswerChange(question._id!, e.target.value)}
                />
              )}
            </Card.Body>
          </Card>
        );
      })}

          <div className="d-flex justify-content-between align-items-center">
            {quiz.oneQuestionAtATime ? (
              <>
                <Button 
                  variant="secondary" 
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                {currentQuestionIndex < (quiz.questions?.length || 0) - 1 ? (
                  <Button variant="primary" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    variant="danger" 
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Quiz"}
                  </Button>
                )}
              </>
            ) : (
              <Button 
                variant="danger" 
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </div>

        <div className="col-md-3 bg-light p-3">
          <h5>Questions</h5>
          <div className="list-group">
            {quiz.questions?.map((question, index) => (
              <button
                key={question._id}
                className={`list-group-item list-group-item-action ${
                  quiz.oneQuestionAtATime && currentQuestionIndex === index ? "active" : ""
                } ${
                  answers[question._id!] !== undefined
                    ? "list-group-item-info"
                    : ""
                }`}
                onClick={() => handleQuestionClick(index)}
              >
                Question {index + 1}
                {answers[question._id!] !== undefined && " ✓"}
              </button>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-white rounded">
            <small className="text-muted">
              <div className="mb-1">
                <strong>Answered:</strong> {Object.keys(answers).length} / {quiz.questions?.length || 0}
              </div>
              <div className="text-primary mt-1">
                {quiz.oneQuestionAtATime 
                  ? "" 
                  : "Click to scroll to question"}
              </div>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

