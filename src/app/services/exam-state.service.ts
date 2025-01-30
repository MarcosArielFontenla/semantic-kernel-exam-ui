import { Injectable, signal } from '@angular/core';
import { ExamState } from '../models/exam-state-model';

@Injectable({
  providedIn: 'root'
})
export class ExamStateService {

  private examState = signal<ExamState | null>(this.getStateFromStorage());

  getExamState(): ExamState | null {
    const state = this.examState();
    return state;
  }

  setExamState(state: ExamState): void {
    this.examState.set(state);
    this.saveStateToStorage(state);
  }

  clearExamState(): void {
    this.examState.set(null);
    this.removeStateFromStorage();
  }

  private getStateFromStorage(): ExamState | null {
    const state = localStorage.getItem('examState');
    return state ? JSON.parse(state) : null;
  }

  private saveStateToStorage(state: ExamState): void {
    localStorage.setItem('examState', JSON.stringify(state));
  }

  private removeStateFromStorage(): void {
    localStorage.removeItem('examState');
  }
}
