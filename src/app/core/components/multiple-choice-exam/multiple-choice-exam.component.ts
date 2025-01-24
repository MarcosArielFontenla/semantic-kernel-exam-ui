import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question-model';
import { CommonModule } from '@angular/common';
import { QuestionPrefixPipe } from '../../../shared/pipes/question-prefix.pipe';

@Component({
  selector: 'app-multiple-choice-exam',
  imports: [CommonModule, QuestionPrefixPipe],
  templateUrl: './multiple-choice-exam.component.html',
  styleUrl: './multiple-choice-exam.component.css'
})
export class MultipleChoiceExamComponent {
  @Input() question!: Question;
  @Input() currentIndex!: number;

  isOptionSelected(option: string): boolean {
    return this.question.studentAnswer?.split(',').includes(option) ?? false;
  }

  onCheckboxChange(event: Event, option: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    let selectedAnswers = this.question.studentAnswer ? this.question.studentAnswer.split(',') : [];

    if (isChecked) {
      if (!selectedAnswers.includes(option)) {
        selectedAnswers.push(option);
      }
    } else {
      selectedAnswers = selectedAnswers.filter((answer) => answer !== option);
    }

    this.question.studentAnswer = selectedAnswers.join(',');
  }
}
