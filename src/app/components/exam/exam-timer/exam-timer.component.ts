import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ExamTimerService } from '../../../services/exam-timer.service';

@Component({
  selector: 'app-exam-timer',
  imports: [MatCardModule],
  templateUrl: './exam-timer.component.html',
  styleUrl: './exam-timer.component.css'
})
export class ExamTimerComponent implements OnInit {

  constructor(public timerService: ExamTimerService) { }

  ngOnInit(): void {
    this.timerService.startTimer(600);

    this.timerService.onTimerEnded.subscribe(() => {
      alert('Time is up!');
    });
  }
}
