import { Exam } from "./exam-model";

export interface ExamState extends Exam {
  examType: string;
  currentQuestionIndex: number;
}
