import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionPrefixPipe } from '../../../shared/pipes/question-prefix.pipe';

@Component({
  selector: 'app-predefined-exam',
  imports: [CommonModule, FormsModule, QuestionPrefixPipe],
  templateUrl: './predefined-exam.component.html',
  styleUrl: './predefined-exam.component.css'
})
export class PredefinedExamComponent {
  @Input() question!: Question;
  @Input() currentIndex!: number;
}
