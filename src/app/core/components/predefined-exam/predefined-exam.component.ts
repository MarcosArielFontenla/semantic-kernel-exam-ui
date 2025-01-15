import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-predefined-exam',
  imports: [CommonModule, FormsModule],
  templateUrl: './predefined-exam.component.html',
  styleUrl: './predefined-exam.component.css'
})
export class PredefinedExamComponent {
  @Input() questions: Question[] = [];
}
