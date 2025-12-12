import { useState } from "react";
import { Form, Button, InputGroup, Badge } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id?: string;
  type: "MC" | "TF" | "FIB";
  title: string;
  points: number;
  questionHtml: string;
  choices?: Choice[];
  correctAnswer?: boolean;
  acceptableAnswers?: string[];
}

interface QuestionEditorProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

export default function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question);

  const handleSave = () => {
    onSave(editedQuestion);
  };

  if (editedQuestion.type === "MC") {
    return <MCEditor question={editedQuestion} setQuestion={setEditedQuestion} onSave={handleSave} onCancel={onCancel} />;
  }

  if (editedQuestion.type === "TF") {
    return <TFEditor question={editedQuestion} setQuestion={setEditedQuestion} onSave={handleSave} onCancel={onCancel} />;
  }

  if (editedQuestion.type === "FIB") {
    return <FIBEditor question={editedQuestion} setQuestion={setEditedQuestion} onSave={handleSave} onCancel={onCancel} />;
  }

  return null;
}

function MCEditor({ question, setQuestion, onSave, onCancel }: any) {
  const addChoice = () => {
    const newChoice: Choice = {
      id: String.fromCharCode(65 + (question.choices?.length || 0)),
      text: "",
      isCorrect: false,
    };
    setQuestion({
      ...question,
      choices: [...(question.choices || []), newChoice],
    });
  };

  const updateChoice = (index: number, text: string) => {
    const updatedChoices = [...(question.choices || [])];
    updatedChoices[index].text = text;
    setQuestion({ ...question, choices: updatedChoices });
  };

  const setCorrectChoice = (index: number) => {
    const updatedChoices = (question.choices || []).map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setQuestion({ ...question, choices: updatedChoices });
  };

  const removeChoice = (index: number) => {
    const updatedChoices = question.choices?.filter((_, i) => i !== index);
    setQuestion({ ...question, choices: updatedChoices });
  };

  return (
    <div className="border rounded p-4 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2 align-items-center flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Easy Question"
            value={question.title}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            style={{ maxWidth: "300px" }}
          />
          <Form.Select
            value={question.type}
            onChange={(e) => setQuestion({ ...question, type: e.target.value as any })}
            style={{ maxWidth: "200px" }}
          >
            <option value="MC">Multiple Choice</option>
            <option value="TF">True/False</option>
            <option value="FIB">Fill In the Blank</option>
          </Form.Select>
        </div>
        <InputGroup style={{ maxWidth: "120px" }}>
          <InputGroup.Text>pts:</InputGroup.Text>
          <Form.Control
            type="number"
            value={question.points}
            onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) || 0 })}
          />
        </InputGroup>
      </div>

      <p className="text-muted small">
        Enter your question and multiple answers, then select the one correct answer.
      </p>

      <Form.Group className="mb-3">
        <Form.Label>Question:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={question.questionHtml}
          onChange={(e) => setQuestion({ ...question, questionHtml: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answers:</Form.Label>
        {question.choices?.map((choice: Choice, index: number) => (
          <div key={index} className="d-flex gap-2 mb-2 align-items-center">
            <div className="d-flex align-items-center">
              {choice.isCorrect ? (
                <Badge bg="success" className="me-2">
                  ✓ Correct Answer
                </Badge>
              ) : (
                <Badge bg="secondary" className="me-2">
                  Possible Answer
                </Badge>
              )}
            </div>
            <Form.Control
              type="text"
              placeholder={choice.id}
              value={choice.text}
              onChange={(e) => updateChoice(index, e.target.value)}
            />
            <Form.Check
              type="radio"
              name="correctAnswer"
              checked={choice.isCorrect}
              onChange={() => setCorrectChoice(index)}
            />
            <Button variant="link" onClick={() => removeChoice(index)}>
              <FaTrash />
            </Button>
          </div>
        ))}
        <Button variant="link" className="text-danger" onClick={addChoice}>
          + Add Another Answer
        </Button>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Update Question
        </Button>
      </div>
    </div>
  );
}

function TFEditor({ question, setQuestion, onSave, onCancel }: any) {
  return (
    <div className="border rounded p-4 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2 align-items-center flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Is 2 + 2 = 4?"
            value={question.title}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            style={{ maxWidth: "300px" }}
          />
          <Form.Select
            value={question.type}
            onChange={(e) => setQuestion({ ...question, type: e.target.value as any })}
            style={{ maxWidth: "200px" }}
          >
            <option value="MC">Multiple Choice</option>
            <option value="TF">True/False</option>
            <option value="FIB">Fill In the Blank</option>
          </Form.Select>
        </div>
        <InputGroup style={{ maxWidth: "120px" }}>
          <InputGroup.Text>pts:</InputGroup.Text>
          <Form.Control
            type="number"
            value={question.points}
            onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) || 0 })}
          />
        </InputGroup>
      </div>

      <p className="text-muted small">
        Enter your question text, then select if True or False is the correct answer.
      </p>

      <Form.Group className="mb-3">
        <Form.Label>Question:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={question.questionHtml}
          onChange={(e) => setQuestion({ ...question, questionHtml: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answers:</Form.Label>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center">
            {question.correctAnswer === true && (
              <Badge bg="success" className="me-2">✓</Badge>
            )}
            <Form.Check
              type="radio"
              label="True"
              name="tfAnswer"
              checked={question.correctAnswer === true}
              onChange={() => setQuestion({ ...question, correctAnswer: true })}
            />
          </div>
          <div className="d-flex align-items-center">
            {question.correctAnswer === false && (
              <Badge bg="success" className="me-2">✓</Badge>
            )}
            <Form.Check
              type="radio"
              label="False"
              name="tfAnswer"
              checked={question.correctAnswer === false}
              onChange={() => setQuestion({ ...question, correctAnswer: false })}
            />
          </div>
        </div>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Update Question
        </Button>
      </div>
    </div>
  );
}

function FIBEditor({ question, setQuestion, onSave, onCancel }: any) {
  const addAnswer = () => {
    setQuestion({
      ...question,
      acceptableAnswers: [...(question.acceptableAnswers || []), ""],
    });
  };

  const updateAnswer = (index: number, value: string) => {
    const updatedAnswers = [...(question.acceptableAnswers || [])];
    updatedAnswers[index] = value;
    setQuestion({ ...question, acceptableAnswers: updatedAnswers });
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = question.acceptableAnswers?.filter((_: any, i: number) => i !== index);
    setQuestion({ ...question, acceptableAnswers: updatedAnswers });
  };

  return (
    <div className="border rounded p-4 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2 align-items-center flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Easy fill the blank"
            value={question.title}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            style={{ maxWidth: "300px" }}
          />
          <Form.Select
            value={question.type}
            onChange={(e) => setQuestion({ ...question, type: e.target.value as any })}
            style={{ maxWidth: "200px" }}
          >
            <option value="MC">Multiple Choice</option>
            <option value="TF">True/False</option>
            <option value="FIB">Fill In the Blank</option>
          </Form.Select>
        </div>
        <InputGroup style={{ maxWidth: "120px" }}>
          <InputGroup.Text>pts:</InputGroup.Text>
          <Form.Control
            type="number"
            value={question.points}
            onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) || 0 })}
          />
        </InputGroup>
      </div>

      <p className="text-muted small">
        Enter your question text, then define all possible correct answers for the blank.
        Students will see the question followed by a small text box to type their answer.
      </p>

      <Form.Group className="mb-3">
        <Form.Label>Question:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={question.questionHtml}
          onChange={(e) => setQuestion({ ...question, questionHtml: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answers:</Form.Label>
        {question.acceptableAnswers?.map((answer: string, index: number) => (
          <div key={index} className="d-flex gap-2 mb-2 align-items-center">
            <span className="text-muted">Possible Answer:</span>
            <Form.Control
              type="text"
              value={answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
            />
            <Button variant="link" onClick={() => removeAnswer(index)}>
              <FaTrash />
            </Button>
          </div>
        ))}
        <Button variant="link" className="text-danger" onClick={addAnswer}>
          + Add Another Answer
        </Button>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Update Question
        </Button>
      </div>
    </div>
  );
}

