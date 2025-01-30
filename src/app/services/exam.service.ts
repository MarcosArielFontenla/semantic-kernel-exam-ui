import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from '../models/exam-model';
import { Observable } from 'rxjs';
import { ExamEvaluation } from '../models/exam-evaluation.model';
import { Question } from '../models/question-model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getQuestions(subject: string, examType: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.URL}/Exams/questions`, {
      params: { subject, examType }
    });
  }

  evaluateExam(exam: Exam): Observable<ExamEvaluation> {
    return this.http.post<ExamEvaluation>(`${this.URL}/Exams/evaluate`, exam);
  }
}
