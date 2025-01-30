import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidateAnswerDirective } from '../../../shared/directives/validate-answer.directive';

@Component({
  selector: 'app-exam-button-actions',
  imports: [ValidateAnswerDirective],
  templateUrl: './exam-button-actions.component.html',
  styleUrl: './exam-button-actions.component.css'
})
export class ExamButtonActionsComponent {
  @Input() currentQuestionIndex!: number;
  @Input() isLastQuestion!: boolean;
  @Input() canProceedToNextQuestion!: boolean;

  @Output() goBack = new EventEmitter<void>();
  @Output() previousQuestion = new EventEmitter<void>();
  @Output() nextQuestion = new EventEmitter<void>();
}
