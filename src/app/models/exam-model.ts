import { Question } from "./question-model";

export interface Exam {
  subject: string;
  questions: Question[];
}
