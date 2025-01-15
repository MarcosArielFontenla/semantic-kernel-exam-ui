import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multiple-choice-exam',
  imports: [CommonModule],
  templateUrl: './multiple-choice-exam.component.html',
  styleUrl: './multiple-choice-exam.component.css'
})
export class MultipleChoiceExamComponent {
  @Input() questions: Question[] = [];

  onCheckboxChange(event: Event, question: Question, option: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    let selectedAnswers = question.studentAnswer ? question.studentAnswer.split(',') : [];

    if (isChecked) {
      if (!selectedAnswers.includes(option)) {
        selectedAnswers.push(option);
      }
    } else {
      selectedAnswers = selectedAnswers.filter((answer) => answer !== option);
    }

    question.studentAnswer = selectedAnswers.join(',');
  }
}
