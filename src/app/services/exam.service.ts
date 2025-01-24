import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from '../models/exam-model';
import { Observable } from 'rxjs';
import { ExamEvaluation } from '../models/exam-evaluation.model';
import { Question } from '../models/question-model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private apiUrl: string = 'https://localhost:44318/api';

  constructor(private http: HttpClient) { }

  getQuestions(subject: string, examType: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/Exams/questions`, {
      params: { subject, examType }
    });
  }

  evaluateExam(exam: Exam): Observable<ExamEvaluation> {
    return this.http.post<ExamEvaluation>(`${this.apiUrl}/Exams/evaluate`, exam);
  }
}
