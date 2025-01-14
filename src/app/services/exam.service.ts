import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from '../models/exam-model';
import { Observable } from 'rxjs';
import { ExamEvaluation } from '../models/exam-evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private examController: string = 'Exams';
  private examEvaluateEndpoint: string = 'evaluate';

  private apiUrl: string = `https://localhost:44318/api/${this.examController}/${this.examEvaluateEndpoint}`;

  constructor(private http: HttpClient) { }

  evaluateExam(exam: Exam): Observable<ExamEvaluation> {
    return this.http.post<ExamEvaluation>(`${this.apiUrl}`, exam);
  }
}
