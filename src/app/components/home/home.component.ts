import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { subjects_mock } from '../../Utils/subjects-mock';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  subjects = subjects_mock;
  selectedSubject: string = '';

  constructor(private router: Router) {
  }

  startExam(): void {
    if (this.selectedSubject) {
      this.router.navigate(['/exam'], { queryParams: { subject: this.selectedSubject } });
    }
  }

  onSubjectChange() {
    console.log('Selected subject:', this.selectedSubject);
  }
}
