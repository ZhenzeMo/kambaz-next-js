import { QuizSummary } from "./client";

export const formatAvailability = (quiz: QuizSummary): string => {
  const now = new Date();
  const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
  const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

  if (!availableFrom && !availableUntil) {
    return "Available";
  }

  if (availableUntil && now > availableUntil) {
    return "Closed";
  }

  if (availableFrom && now < availableFrom) {
    return `Not available until ${availableFrom.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  if (availableFrom && availableUntil && now >= availableFrom && now <= availableUntil) {
    return "Available";
  }

  return "Available";
};

export const formatDueDate = (quiz: QuizSummary): string => {
  if (!quiz.dueAt) {
    return "No due date";
  }

  const dueDate = new Date(quiz.dueAt);
  return dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatPoints = (quiz: QuizSummary): string => {
  return `${quiz.points} pts`;
};

