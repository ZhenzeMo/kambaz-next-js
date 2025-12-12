"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import { RiProhibitedLine } from "react-icons/ri";
import { IoEllipsisVertical, IoRocketSharp } from "react-icons/io5";
import Link from "next/link";
import { setQuizzes, deleteQuiz as deleteQuizAction, updateQuiz } from "./reducer";
import { RootState } from "../../../store";
import * as quizzesClient from "./client";
import { formatAvailability, formatDueDate, formatPoints } from "./utils";
import type { QuizSummary } from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await quizzesClient.findQuizzesForCourse(cid as string);
      const sortedQuizzes = [...quizzes].sort((a, b) => {
        const dateA = a.availableFrom ? new Date(a.availableFrom).getTime() : 0;
        const dateB = b.availableFrom ? new Date(b.availableFrom).getTime() : 0;
        return dateB - dateA;
      });
      dispatch(setQuizzes(sortedQuizzes));
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  const handleCreateQuiz = async () => {
    try {
      const newQuiz = await quizzesClient.createQuiz({
        course: cid as string,
        name: "New Quiz",
      });
      router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleDelete = async (quizId: string) => {
    try {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuizAction(quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handlePublishToggle = async (quiz: QuizSummary) => {
    try {
      if (quiz.published) {
        await quizzesClient.unpublishQuiz(quiz._id);
        dispatch(updateQuiz({ ...quiz, published: false }));
      } else {
        await quizzesClient.publishQuiz(quiz._id);
        dispatch(updateQuiz({ ...quiz, published: true }));
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  return (
    <div id="wd-quizzes" className="p-3">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3 gap-2">
          <Button variant="danger" onClick={handleCreateQuiz}>
            + Quiz
          </Button>
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className="text-center p-5">
          <p className="text-muted">No quizzes available.</p>
          {isFaculty && (
            <p className="text-muted">Click &quot;+ Quiz&quot; to create a new quiz.</p>
          )}
        </div>
      ) : (
        <ul className="list-group">
          <li className="list-group-item bg-secondary">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="fw-bold">Assignment Quizzes</span>
            </div>
          </li>
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="list-group-item">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 text-muted" />
                <IoRocketSharp className="me-3 fs-3 text-success" />
                
                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="fw-bold text-dark text-decoration-none"
                  >
                    {quiz.name}
                  </Link>
                  
                  <div className="small text-muted mt-1">
                    <div>
                      <span className="fw-semibold">{formatAvailability(quiz)}</span>
                      {" | "}
                      <span className="fw-semibold">Due</span> {formatDueDate(quiz)}
                      {" | "}
                      {formatPoints(quiz)}
                      {" | "}
                      {quiz.numQuestions} {quiz.numQuestions === 1 ? "Question" : "Questions"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  {quiz.published ? (
                    <FaCheckCircle className="text-success fs-5" title="Published" />
                  ) : (
                    <RiProhibitedLine className="text-muted fs-5" title="Unpublished" />
                  )}

                  {isFaculty && (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        className="text-dark p-0 border-0"
                        style={{ boxShadow: "none" }}
                      >
                        <IoEllipsisVertical className="fs-4" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            router.push(`/Courses/${cid}/Quizzes/${quiz._id}/edit`)
                          }
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handlePublishToggle(quiz)}>
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

