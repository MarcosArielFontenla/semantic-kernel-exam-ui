import { Component, OnInit } from '@angular/core';
import { ExamEvaluation } from '../../models/exam-evaluation.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {

  evaluation: ExamEvaluation | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras.state) {
      this.evaluation = navigation.extras.state?.['evaluation'] || null;
    }
  }

  ngOnInit(): void {
    if (!this.evaluation) {
      this.router.navigate(['/home']);
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

}
