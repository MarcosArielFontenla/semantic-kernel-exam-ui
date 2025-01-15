import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-true-false-exam',
  imports: [CommonModule, FormsModule],
  templateUrl: './true-false-exam.component.html',
  styleUrl: './true-false-exam.component.css'
})
export class TrueFalseExamComponent {
  @Input() questions: Question[] = [];
}
