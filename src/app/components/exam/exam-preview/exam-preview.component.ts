import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ExamStateService } from '../../../services/exam-state.service';
import { Router } from '@angular/router';
import { ExamTypeEnum } from '../../../core/enums/exam-type.enum';

@Component({
  selector: 'app-exam-preview',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './exam-preview.component.html',
  styleUrl: './exam-preview.component.css'
})
export class ExamPreviewComponent {
  
  predefined: ExamTypeEnum = ExamTypeEnum.PREDEFINED;
  multipleChoice: ExamTypeEnum = ExamTypeEnum.MULTIPLE_CHOICE;
  trueFalse: ExamTypeEnum = ExamTypeEnum.TRUE_FALSE;

  private examStateService = inject(ExamStateService);
  router = inject(Router);

  examState = this.examStateService.examStateSignal();

  get exam() {
    return this.examState;
  }

  protected navigateToQuestion(index: number): void {
    this.router.navigate(['/exam'], {
      queryParamsHandling: 'preserve',
      state: { navigateToQuestion: index }
    });
  }

  protected submitExam(): void {
    this.router.navigate(['/exam'], {
      queryParamsHandling: 'preserve',
      state: { submitFromReview: true}
    });
  }
}
