"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Form, Button, Tabs, Tab, Row, Col } from "react-bootstrap";
import * as quizzesClient from "../../client";
import type { Quiz, Question } from "../../client";
import QuestionEditor from "./QuestionEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "details");

  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    name: "",
    description: "",
    quizType: "GRADED_QUIZ",
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: "IMMEDIATELY",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    points: 0,
  });

  const [loading, setLoading] = useState(true);
  const [hasTimeLimit, setHasTimeLimit] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (qid !== "new") {
          const data = await quizzesClient.findQuizById(qid as string);
          setQuiz(data);
          setHasTimeLimit(!!data.timeLimit);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [qid]);

  const handleSave = async () => {
    try {
      if (qid === "new") {
        await quizzesClient.createQuiz({ ...quiz, course: cid as string });
      } else {
        await quizzesClient.updateQuiz({ ...quiz, _id: qid as string });
      }
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      if (qid === "new") {
        const newQuiz = await quizzesClient.createQuiz({ ...quiz, course: cid as string });
        await quizzesClient.publishQuiz(newQuiz._id);
      } else {
        await quizzesClient.updateQuiz({ ...quiz, _id: qid as string });
        await quizzesClient.publishQuiz(qid as string);
      }
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
        className="mb-4"
      >
        <Tab eventKey="details" title="Details">
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Unnamed Quiz"
                value={quiz.name}
                onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quiz Instructions:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter quiz instructions..."
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Quiz Type</Form.Label>
                  <Form.Select
                    value={quiz.quizType}
                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                  >
                    <option value="GRADED_QUIZ">Graded Quiz</option>
                    <option value="PRACTICE_QUIZ">Practice Quiz</option>
                    <option value="GRADED_SURVEY">Graded Survey</option>
                    <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Assignment Group</Form.Label>
                  <Form.Select
                    value={quiz.assignmentGroup}
                    onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                  >
                    <option value="QUIZZES">Quizzes</option>
                    <option value="EXAMS">Exams</option>
                    <option value="ASSIGNMENTS">Assignments</option>
                    <option value="PROJECT">Project</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="border rounded p-3 mb-3">
              <h5>Options</h5>
              
              <Form.Check
                type="checkbox"
                label="Shuffle Answers"
                checked={quiz.shuffleAnswers}
                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                className="mb-2"
              />

              <Form.Check
                type="checkbox"
                label="Time Limit"
                checked={hasTimeLimit}
                onChange={(e) => {
                  setHasTimeLimit(e.target.checked);
                  if (!e.target.checked) {
                    setQuiz({ ...quiz, timeLimit: 0 });
                  }
                }}
                className="mb-2"
              />
              {hasTimeLimit && (
                <Form.Group className="mb-2 ms-4">
                  <Row>
                    <Col xs="auto">
                      <Form.Control
                        type="number"
                        value={quiz.timeLimit || 20}
                        onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
                        style={{ width: "100px" }}
                      />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                      <span>Minutes</span>
                    </Col>
                  </Row>
                </Form.Group>
              )}

              <Form.Check
                type="checkbox"
                label="Allow Multiple Attempts"
                checked={quiz.multipleAttempts}
                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                className="mb-2"
              />
            </div>

            <div className="border rounded p-3 mb-3">
              <h5>Assign</h5>
              
              <Form.Group className="mb-3">
                <Form.Label>Assign to</Form.Label>
                <div className="border rounded p-2 bg-light">
                  <span className="badge bg-secondary">Everyone ✕</span>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={quiz.dueAt ? new Date(quiz.dueAt).toISOString().slice(0, 16) : ""}
                  onChange={(e) => setQuiz({ ...quiz, dueAt: e.target.value })}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.availableFrom ? new Date(quiz.availableFrom).toISOString().slice(0, 16) : ""}
                      onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.availableUntil ? new Date(quiz.availableUntil).toISOString().slice(0, 16) : ""}
                      onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleSaveAndPublish}>
                Save & Publish
              </Button>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Form>
        </Tab>

        <Tab eventKey="questions" title="Questions">
          <QuestionsTab quiz={quiz} setQuiz={setQuiz} />
        </Tab>
      </Tabs>
    </div>
  );
}

function QuestionsTab({ quiz, setQuiz }: { quiz: Partial<Quiz>; setQuiz: (quiz: Partial<Quiz>) => void }) {
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const addNewQuestion = () => {
    const newQuestion = {
      _id: `Q${Date.now()}`,
      type: "MC" as const,
      title: "",
      points: 0,
      questionHtml: "",
      choices: [
        { id: "A", text: "", isCorrect: false },
        { id: "B", text: "", isCorrect: false },
      ],
    };
    setQuiz({
      ...quiz,
      questions: [...(quiz.questions || []), newQuestion],
    });
    setEditingQuestionIndex((quiz.questions?.length || 0));
  };

  const saveQuestion = (question: Question) => {
    const updatedQuestions = [...(quiz.questions || [])];
    if (editingQuestionIndex !== null) {
      updatedQuestions[editingQuestionIndex] = question;
    }
    const totalPoints = updatedQuestions.reduce((sum, q) => sum + (q.points || 0), 0);
    setQuiz({
      ...quiz,
      questions: updatedQuestions,
      points: totalPoints,
    });
    setEditingQuestionIndex(null);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = quiz.questions?.filter((_, i) => i !== index);
    const totalPoints = updatedQuestions?.reduce((sum, q) => sum + (q.points || 0), 0) || 0;
    setQuiz({
      ...quiz,
      questions: updatedQuestions,
      points: totalPoints,
    });
  };

  const totalPoints = quiz.questions?.reduce((sum, q) => sum + (q.points || 0), 0) || 0;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Points {totalPoints}</h5>
      </div>

      {quiz.questions?.map((question, index) => (
        <div key={index}>
          {editingQuestionIndex === index ? (
            <QuestionEditor
              question={question}
              onSave={saveQuestion}
              onCancel={() => setEditingQuestionIndex(null)}
            />
          ) : (
            <div className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{question.title || "Untitled Question"}</strong>
                  <span className="text-muted ms-2">
                    ({question.type}) - {question.points} pts
                  </span>
                </div>
                <div>
                  <Button
                    variant="link"
                    onClick={() => setEditingQuestionIndex(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => deleteQuestion(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="text-center">
        <Button variant="outline-secondary" onClick={addNewQuestion}>
          + New Question
        </Button>
      </div>
    </div>
  );
}

