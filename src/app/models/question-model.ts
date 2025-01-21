export interface Question {
  questionText: string;
  studentAnswer: string;
  options?: string[];
  isCompleted?: boolean;
}
