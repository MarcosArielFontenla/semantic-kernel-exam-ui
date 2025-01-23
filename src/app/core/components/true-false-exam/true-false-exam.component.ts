import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionPrefixPipe } from '../../../shared/pipes/question-prefix.pipe';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-true-false-exam',
  imports: [CommonModule, FormsModule, QuestionPrefixPipe, MatRadioModule],
  templateUrl: './true-false-exam.component.html',
  styleUrl: './true-false-exam.component.css'
})
export class TrueFalseExamComponent {
  @Input() question!: Question;
  @Input() currentIndex!: number;
}
