import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamStateService {

  private subjectSource = new BehaviorSubject<string>('');
  private examTypeSource = new BehaviorSubject<string>('');

  currentSubject$ = this.subjectSource.asObservable();
  currentExamType$ = this.examTypeSource.asObservable();

  setSubject(subject: string): void {
    this.subjectSource.next(subject);
  }

  setExamType(examType: string): void {
    this.examTypeSource.next(examType);
  }
}
