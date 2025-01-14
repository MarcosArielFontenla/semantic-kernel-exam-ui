import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { subjects_mock } from '../../Utils/subjects-mock';
import { FormsModule } from '@angular/forms';
import { exam_types_mock } from '../../Utils/exam-types-mock';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  subjects: string[] = subjects_mock;
  examTypes: string[] = exam_types_mock;
  selectedSubject: string = '';
  selectedExamType: string = '';

  constructor(private router: Router) {
  }

  startExam(): void {
    if (this.selectedSubject && this.selectedExamType) {
      this.router.navigate(['/exam'], {
        queryParams: {
          subject: this.selectedSubject,
          examType: this.selectedExamType
        },
      });
    }
  }

  onSubjectChange() {
    console.log('Selected subject:', this.selectedSubject);
  }

  onExamTypeChange() {
    console.log('Selected exam type:', this.selectedExamType);
  }
}
