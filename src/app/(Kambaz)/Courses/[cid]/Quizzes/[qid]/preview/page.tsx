"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Alert, Form } from "react-bootstrap";
import * as quizzesClient from "../../client";
import type { Quiz, Question } from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string | boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await quizzesClient.findQuizById(qid as string);
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [qid]);

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const gradeQuiz = () => {
    if (!quiz) return;

    let totalScore = 0;

    quiz.questions?.forEach((question) => {
      const userAnswer = answers[question._id!];

      if (question.type === "MC") {
        const correctChoice = question.choices?.find((c) => c.isCorrect);
        if (userAnswer === correctChoice?.id) {
          totalScore += question.points || 0;
        }
      } else if (question.type === "TF") {
        if (userAnswer === question.correctAnswer) {
          totalScore += question.points || 0;
        }
      } else if (question.type === "FIB") {
        const normalizedAnswer = String(userAnswer || "").toLowerCase().trim();
        const isCorrect = question.acceptableAnswers?.some(
          (acceptable: string) => acceptable.toLowerCase().trim() === normalizedAnswer
        );
        if (isCorrect) {
          totalScore += question.points || 0;
        }
      }
    });

    setScore(totalScore);
    setSubmitted(true);
  };

  const isCorrect = (question: Question) => {
    const userAnswer = answers[question._id!];

    if (question.type === "MC") {
      const correctChoice = question.choices?.find((c) => c.isCorrect);
      return userAnswer === correctChoice?.id;
    } else if (question.type === "TF") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "FIB") {
      const normalizedAnswer = String(userAnswer || "").toLowerCase().trim();
      return question.acceptableAnswers?.some(
        (acceptable: string) => acceptable.toLowerCase().trim() === normalizedAnswer
      );
    }
    return false;
  };

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  if (!quiz) {
    return <div className="p-3">Quiz not found.</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="p-4">
            <h2>{quiz.name}</h2>

            <Alert variant="warning" className="mt-3">
               This is a preview of the published version of the quiz
            </Alert>

            {submitted && (
              <Alert variant={score >= (quiz.points || 0) * 0.7 ? "success" : "info"}>
                <h4>Quiz Results</h4>
                <p className="mb-0">
                  Score: {score} / {quiz.points} points
                </p>
              </Alert>
            )}

            {!submitted && (
              <div className="mb-3">
                <p className="text-muted">Started: {new Date().toLocaleString()}</p>
              </div>
            )}

            {quiz.description && (
              <div className="mb-4">
                <h5>Quiz Instructions</h5>
                <p>{quiz.description}</p>
              </div>
            )}

            {quiz.questions && quiz.questions[currentQuestionIndex] && (() => {
              const question = quiz.questions[currentQuestionIndex];
              return (
                <Card key={question._id} className="mb-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5>
                        Question {currentQuestionIndex + 1}
                        {submitted && (
                          <span className={`ms-2 ${isCorrect(question) ? "text-success" : "text-danger"}`}>
                            {isCorrect(question) ? "✓" : "✗"}
                          </span>
                        )}
                      </h5>
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
                            disabled={submitted}
                            className={
                              submitted
                                ? choice.isCorrect
                                  ? "text-success fw-bold"
                                  : answers[question._id!] === choice.id
                                  ? "text-danger"
                                  : ""
                                : ""
                            }
                          />
                        ))}
                        {submitted && (
                          <div className="mt-2 text-muted small">
                            Correct answer:{" "}
                            {question.choices?.find((c) => c.isCorrect)?.text}
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === "TF" && (
                      <div>
                        <Form.Check
                          type="radio"
                          name={`question-${question._id}`}
                          label="True"
                          value="true"
                          checked={answers[question._id!] === true}
                          onChange={() => handleAnswerChange(question._id!, true)}
                          disabled={submitted}
                          className={
                            submitted
                              ? question.correctAnswer === true
                                ? "text-success fw-bold"
                                : answers[question._id!] === true
                                ? "text-danger"
                                : ""
                              : ""
                          }
                        />
                        <Form.Check
                          type="radio"
                          name={`question-${question._id}`}
                          label="False"
                          value="false"
                          checked={answers[question._id!] === false}
                          onChange={() => handleAnswerChange(question._id!, false)}
                          disabled={submitted}
                          className={
                            submitted
                              ? question.correctAnswer === false
                                ? "text-success fw-bold"
                                : answers[question._id!] === false
                                ? "text-danger"
                                : ""
                              : ""
                          }
                        />
                        {submitted && (
                          <div className="mt-2 text-muted small">
                            Correct answer: {question.correctAnswer ? "True" : "False"}
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === "FIB" && (
                      <div>
                        <Form.Control
                          type="text"
                          placeholder="Enter your answer"
                          value={String(answers[question._id!] || "")}
                          onChange={(e) => handleAnswerChange(question._id!, e.target.value)}
                          disabled={submitted}
                          className={
                            submitted
                              ? isCorrect(question)
                                ? "border-success"
                                : "border-danger"
                              : ""
                          }
                        />
                        {submitted && (
                          <div className="mt-2 text-muted small">
                            Acceptable answers: {question.acceptableAnswers?.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              );
            })()}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button
                variant="secondary"
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <span className="text-muted">
                Question {currentQuestionIndex + 1} of {quiz.questions?.length || 0}
              </span>
              <Button
                variant="primary"
                onClick={() => setCurrentQuestionIndex(Math.min((quiz.questions?.length || 1) - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === (quiz.questions?.length || 1) - 1}
              >
                Next
              </Button>
            </div>

            <div className="d-flex gap-2 mb-3">
              {!submitted ? (
                <Button variant="danger" onClick={gradeQuiz}>
                  Submit Quiz
                </Button>
              ) : (
                <Button variant="primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
                  Back to Quiz
                </Button>
              )}
            </div>

            <Button
              variant="outline-secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit?tab=questions`)}
              className="mb-3"
            >
               Keep Editing This Quiz
            </Button>
          </div>
        </div>

        <div className="col-md-3 bg-light p-3">
          <h5>Questions</h5>
          <div className="list-group">
            {quiz.questions?.map((question, index) => (
              <button
                key={question._id}
                className={`list-group-item list-group-item-action ${
                  currentQuestionIndex === index ? "active" : ""
                } ${
                  submitted
                    ? isCorrect(question)
                      ? "list-group-item-success"
                      : answers[question._id!]
                      ? "list-group-item-danger"
                      : ""
                    : answers[question._id!] !== undefined
                    ? "list-group-item-info"
                    : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                <span
                  className={submitted ? (isCorrect(question) ? "text-success" : "text-danger") : ""}
                >
                  {submitted && (isCorrect(question) ? "✓" : "✗")} Question {index + 1}
                </span>
              </button>
            ))}
          </div>

          {submitted && (
            <div className="mt-3">
              <div className="card">
                <div className="card-body">
                  <h6>Summary</h6>
                  <p className="mb-1">
                    Score: {score} / {quiz.points}
                  </p>
                  <p className="mb-0 small text-muted">
                    {((score / (quiz.points || 1)) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

