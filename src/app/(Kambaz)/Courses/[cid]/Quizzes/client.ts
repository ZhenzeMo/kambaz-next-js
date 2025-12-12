import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id?: string;
  type: "MC" | "TF" | "FIB";
  title: string;
  points: number;
  questionHtml?: string;
  choices?: Choice[];
  correctAnswer?: boolean;
  acceptableAnswers?: string[];
}

export interface Quiz {
  _id: string;
  name: string;
  description: string;
  course: string;
  published: boolean;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueAt?: string;
  availableFrom?: string;
  availableUntil?: string;
  points: number;
  questions?: Question[];
}

export interface QuizSummary {
  _id: string;
  name: string;
  published: boolean;
  dueAt?: string;
  availableFrom?: string;
  availableUntil?: string;
  points: number;
  numQuestions: number;
}

export const findQuizzesForCourse = async (courseId: string): Promise<QuizSummary[]> => {
  const response = await axios.get(`${QUIZZES_API}/course/${courseId}`);
  return response.data;
};

export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (quiz: Partial<Quiz>): Promise<Quiz> => {
  const response = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return response.data;
};

export const updateQuiz = async (quiz: Partial<Quiz> & { _id: string }): Promise<any> => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string): Promise<any> => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId: string): Promise<any> => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`, {});
  return response.data;
};

export const unpublishQuiz = async (quizId: string): Promise<any> => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/unpublish`, {});
  return response.data;
};

export interface QuizAttempt {
  _id: string;
  quiz: string;
  student: string;
  attemptNumber: number;
  score: number;
  maxScore: number;
  startedAt: string;
  submittedAt: string;
  answers: any[];
}

export const getStudentAttempts = async (quizId: string, studentId: string): Promise<QuizAttempt[]> => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/${studentId}`);
  return response.data;
};

