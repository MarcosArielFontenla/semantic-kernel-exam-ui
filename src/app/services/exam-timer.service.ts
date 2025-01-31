import { EventEmitter, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamTimerService {
  private readonly TIMER_KEY = 'examTimer';
  private timerEnded = new EventEmitter<void>();
  public timeLeft = signal<number>(0);
  private intervalId: any;

  constructor() { 
    this.loadFromLocalStorage();
  }

  startTimer(durationInSeconds: number): void {
    this.timeLeft.set(durationInSeconds);
    this.saveToLocalStorage();

    this.intervalId = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update((time) => time - 1);
        this.saveToLocalStorage();
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.intervalId);
    this.timerEnded.emit();
  }

  formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  get onTimerEnded() {
    return this.timerEnded.asObservable();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.TIMER_KEY, this.timeLeft().toString());
  }

  private loadFromLocalStorage(): void {
    const savedTime = localStorage.getItem(this.TIMER_KEY);;

    if (savedTime) {
      this.timeLeft.set(parseInt(savedTime, 10));
    }
  }
}
