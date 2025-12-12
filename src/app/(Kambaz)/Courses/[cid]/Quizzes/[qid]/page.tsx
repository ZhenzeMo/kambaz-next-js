"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { RootState } from "../../../../store";
import * as quizzesClient from "../client";
import type { Quiz, QuizAttempt } from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizData = await quizzesClient.findQuizById(qid as string);
        setQuiz(quizData);

        if (!isFaculty && currentUser) {
          try {
            const attempts = await quizzesClient.getStudentAttempts(qid as string, currentUser._id);
            if (attempts.length > 0) {
              setLastAttempt(attempts[0]);
            }
          } catch (error) {
            console.error("Error fetching attempts:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [qid, isFaculty, currentUser]);

  const getAvailabilityStatus = () => {
    if (!quiz) return "Unknown";
    
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (availableUntil && now > availableUntil) {
      return "Closed";
    }

    if (availableFrom && now < availableFrom) {
      return "Not Yet Available";
    }

    return "Available";
  };

  const isQuizAvailable = () => {
    if (!quiz || !quiz.published) return false;
    
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (availableFrom && now < availableFrom) return false;
    if (availableUntil && now > availableUntil) return false;

    return true;
  };

  if (loading) {
    return (
      <div className="p-3">
        <p>Loading...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-3">
        <p>Quiz not found.</p>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="row mb-2">
      <div className="col-5 text-end">
        <strong>{label}</strong>
      </div>
      <div className="col-7">{value}</div>
    </div>
  );

  return (
    <div className="p-4">
      {isFaculty ? (
        <>
          <div className="d-flex justify-content-end gap-2 mb-3">
            <Button
              variant="outline-secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)}
            >
              Preview
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
            >
               Edit
            </Button>
          </div>

          <div className="border rounded p-4">
            <h3 className="mb-4">{quiz.name}</h3>

            <DetailRow label="Quiz Type" value={quiz.quizType?.replace(/_/g, " ") || "Graded Quiz"} />
            <DetailRow label="Points" value={quiz.points} />
            <DetailRow label="Assignment Group" value={quiz.assignmentGroup} />
            <DetailRow label="Shuffle Answers" value={quiz.shuffleAnswers ? "Yes" : "No"} />
            <DetailRow label="Time Limit" value={`${quiz.timeLimit} Minutes`} />
            <DetailRow label="Multiple Attempts" value={quiz.multipleAttempts ? "Yes" : "No"} />
            <DetailRow label="View Responses" value="Always" />
            <DetailRow label="Show Correct Answers" value={quiz.showCorrectAnswers} />
            <DetailRow label="One Question at a Time" value={quiz.oneQuestionAtATime ? "Yes" : "No"} />
            <DetailRow label="Require Respondus LockDown Browser" value="No" />
            <DetailRow label="Required to View Quiz Results" value="No" />
            <DetailRow label="Webcam Required" value={quiz.webcamRequired ? "Yes" : "No"} />
            <DetailRow label="Lock Questions After Answering" value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"} />

            <table className="table table-bordered mt-4">
              <thead className="table-light">
                <tr>
                  <th>Due</th>
                  <th>For</th>
                  <th>Available from</th>
                  <th>Until</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDate(quiz.dueAt)}</td>
                  <td>Everyone</td>
                  <td>{formatDate(quiz.availableFrom)}</td>
                  <td>{formatDate(quiz.availableUntil)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Student View
        <div>
          <Card className="mb-3">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>Status:</strong>{" "}
                    <Badge
                      bg={
                        getAvailabilityStatus() === "Available"
                          ? "success"
                          : getAvailabilityStatus() === "Closed"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {getAvailabilityStatus()}
                    </Badge>
                  </p>
                  <p className="mb-2">
                    <strong>Due Date:</strong>{" "}
                    {quiz.dueAt
                      ? new Date(quiz.dueAt).toLocaleString()
                      : "No due date"}
                  </p>
                  <p className="mb-2">
                    <strong>Points:</strong> {quiz.points}
                  </p>
                  <p className="mb-2">
                    <strong>Questions:</strong> {quiz.questions?.length || 0}
                  </p>
                  <p className="mb-2">
                    <strong>Time Limit:</strong> {quiz.timeLimit} Minutes
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>Attempts Allowed:</strong>{" "}
                    {quiz.multipleAttempts ? quiz.maxAttempts : 1}
                  </p>
                  {lastAttempt && (
                    <>
                      <p className="mb-2">
                        <strong>Last Attempt Score:</strong>{" "}
                        <span className="fs-4 text-primary">
                          {lastAttempt.score} / {lastAttempt.maxScore}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong>Submitted:</strong>{" "}
                        {new Date(lastAttempt.submittedAt).toLocaleString()}
                      </p>
                    </>
                  )}
                </Col>
              </Row>

              {quiz.description && (
                <div className="mt-3">
                  <h5>Description</h5>
                  <p>{quiz.description}</p>
                </div>
              )}

              <div className="mt-4">
                {isQuizAvailable() ? (
                  <Button
                    variant="danger"
                    size="lg"
                    onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}
                  >
                    Start Quiz
                  </Button>
                ) : (
                  <Button variant="secondary" size="lg" disabled>
                    Quiz Not Available
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>

          {lastAttempt && (
            <Card>
              <Card.Body>
                <h5>Previous Attempts</h5>
                <p>
                  Attempt #{lastAttempt.attemptNumber} - Score: {lastAttempt.score} /{" "}
                  {lastAttempt.maxScore}
                </p>
                <Button
                  variant="link"
                  onClick={() =>
                    router.push(`/Courses/${cid}/Quizzes/${qid}/attempts/${lastAttempt._id}`)
                  }
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

