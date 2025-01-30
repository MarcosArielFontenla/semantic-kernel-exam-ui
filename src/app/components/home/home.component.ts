import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { subjects_mock } from '../../Utils/subjects-mock';
import { FormsModule } from '@angular/forms';
import { exam_types_mock } from '../../Utils/exam-types-mock';
import { CustomDropdownComponent } from '../../shared/components/custom-dropdown/custom-dropdown.component';
import { HomeEnum } from '../../core/enums/home.enum';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CustomDropdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  subjects: string[] = subjects_mock;
  examTypes: string[] = exam_types_mock;

  selectedSubject: string = '';
  selectedExamType: string = '';

  chooseSubject: HomeEnum = HomeEnum.CHOOSE_SUBJECT;
  chooseExamType: HomeEnum = HomeEnum.CHOOSE_EXAM_TYPE;

  constructor(private router: Router) { }

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
}
