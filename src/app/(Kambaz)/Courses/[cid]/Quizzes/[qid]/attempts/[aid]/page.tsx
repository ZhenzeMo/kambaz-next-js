"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Card, Alert, Badge } from "react-bootstrap";
import { RootState } from "../../../../../../store";
import * as quizzesClient from "../../../client";
import type { Quiz, QuizAttempt } from "../../../client";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function AttemptDetails() {
  const { cid, qid, aid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [allAttempts, setAllAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await quizzesClient.findQuizById(qid as string);
        setQuiz(quizData);

        const attemptResponse = await axios.get(
          `${HTTP_SERVER}/api/quiz-attempts/${aid}`,
          { withCredentials: true }
        );
        setAttempt(attemptResponse.data);

        if (currentUser) {
          const attemptsData = await quizzesClient.getStudentAttempts(qid as string, currentUser._id);
          setAllAttempts(attemptsData);
        }
      } catch (error) {
        console.error("Error fetching attempt:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [qid, aid, currentUser]);

  const canRetake = () => {
    if (!quiz) return false;
    if (!quiz.multipleAttempts) return false;
    return allAttempts.length < (quiz.maxAttempts || 1);
  };

  const getAnswerForQuestion = (questionId: string) => {
    return attempt?.answers?.find((a) => a.question === questionId);
  };

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  if (!quiz || !attempt) {
    return <div className="p-3">Attempt not found.</div>;
  }

  const scorePercentage = ((attempt.score / attempt.maxScore) * 100).toFixed(0);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="p-4">
            <h2>{quiz.name}</h2>

            <Alert variant={attempt.score >= attempt.maxScore * 0.7 ? "success" : "info"}>
              <h4>Quiz Results - Attempt #{attempt.attemptNumber}</h4>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0">
                    <strong>Score:</strong> {attempt.score} / {attempt.maxScore} points
                  </p>
                  <p className="mb-0">
                    <strong>Percentage:</strong> {scorePercentage}%
                  </p>
                </div>
                <div className="text-end">
                  <p className="mb-0 small">
                    <strong>Started:</strong> {new Date(attempt.startedAt).toLocaleString()}
                  </p>
                  <p className="mb-0 small">
                    <strong>Submitted:</strong> {new Date(attempt.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </Alert>

            {quiz.questions?.map((question, index) => {
              const answer = getAnswerForQuestion(question._id!);
              const isCorrect = answer?.isCorrect;

              return (
                <Card key={question._id} className={`mb-4 ${isCorrect ? 'border-success' : 'border-danger'}`}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5>
                        Question {index + 1}
                        <span className={`ms-2 ${isCorrect ? "text-success" : "text-danger"}`}>
                          {isCorrect ? "✓" : "✗"}
                        </span>
                      </h5>
                      <div>
                        <Badge bg="secondary">{question.points} pts</Badge>
                        <Badge bg={isCorrect ? "success" : "danger"} className="ms-2">
                          {answer?.earnedPoints || 0} pts earned
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3" dangerouslySetInnerHTML={{ __html: question.questionHtml || question.title }} />

                    {question.type === "MC" && (
                      <div>
                        {question.choices?.map((choice) => {
                          const isUserChoice = answer?.selectedChoiceId === choice.id;
                          const isCorrectChoice = choice.isCorrect;

                          return (
                            <div
                              key={choice.id}
                              className={`p-2 mb-2 rounded ${
                                isCorrectChoice
                                  ? "bg-success bg-opacity-10 border border-success"
                                  : isUserChoice
                                  ? "bg-danger bg-opacity-10 border border-danger"
                                  : ""
                              }`}
                            >
                              <div className="d-flex align-items-center">
                                {isUserChoice && <span className="me-2">➜</span>}
                                {isCorrectChoice && <span className="me-2 text-success">✓</span>}
                                <span>{choice.text}</span>
                              </div>
                            </div>
                          );
                        })}
                        {quiz.showCorrectAnswers === "IMMEDIATELY" && !isCorrect && (
                          <div className="mt-2 alert alert-info small">
                            <strong>Correct answer:</strong>{" "}
                            {question.choices?.find((c) => c.isCorrect)?.text}
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === "TF" && (
                      <div>
                        <div
                          className={`p-2 mb-2 rounded ${
                            question.correctAnswer === true
                              ? "bg-success bg-opacity-10 border border-success"
                              : answer?.answer === true
                              ? "bg-danger bg-opacity-10 border border-danger"
                              : ""
                          }`}
                        >
                          {answer?.answer === true && <span className="me-2">➜</span>}
                          {question.correctAnswer === true && <span className="me-2 text-success">✓</span>}
                          True
                        </div>
                        <div
                          className={`p-2 mb-2 rounded ${
                            question.correctAnswer === false
                              ? "bg-success bg-opacity-10 border border-success"
                              : answer?.answer === false
                              ? "bg-danger bg-opacity-10 border border-danger"
                              : ""
                          }`}
                        >
                          {answer?.answer === false && <span className="me-2">➜</span>}
                          {question.correctAnswer === false && <span className="me-2 text-success">✓</span>}
                          False
                        </div>
                        {quiz.showCorrectAnswers === "IMMEDIATELY" && !isCorrect && (
                          <div className="mt-2 alert alert-info small">
                            <strong>Correct answer:</strong> {question.correctAnswer ? "True" : "False"}
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === "FIB" && (
                      <div>
                        <div className={`p-2 mb-2 rounded border ${isCorrect ? "border-success bg-success bg-opacity-10" : "border-danger bg-danger bg-opacity-10"}`}>
                          <strong>Your answer:</strong> {answer?.answer || "(blank)"}
                        </div>
                        {quiz.showCorrectAnswers === "IMMEDIATELY" && (
                          <div className="mt-2 alert alert-info small">
                            <strong>Acceptable answers:</strong>{" "}
                            {question.acceptableAnswers?.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              );
            })}

            <div className="d-flex gap-2 mb-3">
              {canRetake() && (
                <Button variant="primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}>
                  Retake Quiz
                </Button>
              )}
              <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
                Back to Quiz
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-3 bg-light p-3">
          <h5>Attempt Summary</h5>
          <div className="card mb-3">
            <div className="card-body">
              <h6>Score</h6>
              <p className="h3 mb-0">{scorePercentage}%</p>
              <p className="text-muted small mb-0">
                {attempt.score} / {attempt.maxScore} points
              </p>
            </div>
          </div>

          <h5 className="mt-3">Questions</h5>
          <div className="list-group">
            {quiz.questions?.map((question, index) => {
              const answer = getAnswerForQuestion(question._id!);
              const isCorrect = answer?.isCorrect;

              return (
                <div
                  key={question._id}
                  className={`list-group-item ${
                    isCorrect ? "list-group-item-success" : "list-group-item-danger"
                  }`}
                >
                  <span className={isCorrect ? "text-success" : "text-danger"}>
                    {isCorrect ? "✓" : "✗"} Question {index + 1}
                  </span>
                  <br />
                  <small className="text-muted">
                    {answer?.earnedPoints || 0} / {question.points} pts
                  </small>
                </div>
              );
            })}
          </div>

          {allAttempts.length > 1 && (
            <div className="mt-3">
              <h5>All Attempts</h5>
              <div className="list-group">
                {allAttempts.map((att) => (
                  <button
                    key={att._id}
                    className={`list-group-item list-group-item-action ${att._id === aid ? "active" : ""}`}
                    onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/attempts/${att._id}`)}
                  >
                    Attempt #{att.attemptNumber}
                    <br />
                    <small>{att.score} / {att.maxScore} pts</small>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

