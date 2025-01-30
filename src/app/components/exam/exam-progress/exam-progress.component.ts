import { Component, Input } from '@angular/core';
import { Exam } from '../../../models/exam-model';

@Component({
  selector: 'app-exam-progress',
  imports: [],
  templateUrl: './exam-progress.component.html',
  styleUrl: './exam-progress.component.css'
})
export class ExamProgressComponent {
  @Input() currentQuestionIndex!: number;
  @Input() exam!: Exam;
}
