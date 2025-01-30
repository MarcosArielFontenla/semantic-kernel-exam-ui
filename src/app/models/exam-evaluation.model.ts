import { EvaluationDetail } from "./exam-evaluation-details.model";

export interface ExamEvaluation {
  score: number;
  feedback: string;
  details: EvaluationDetail[];
}
