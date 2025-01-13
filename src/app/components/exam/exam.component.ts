import { Component, OnInit } from '@angular/core';
import { questions_mock } from '../../Utils/questions-mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Exam } from '../../models/exam-model';
import { Question } from '../../models/question-model';

@Component({
  selector: 'app-exam',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit {

  subject: string = '';
  exam: Exam = { subject: '', questions: [] };
  questionsMock = questions_mock;
  loading: boolean = false;

  constructor(private examService: ExamService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const subject = this.route.snapshot.queryParams['subject'];

    if (!subject) {
      this.router.navigate(['/home']);
    } else {
      this.subject = subject;
      this.initializeExam();
    }
  }

  submitExam(): void {
    if (this.loading) return;

    this.loading = true;
    this.examService.evaluateExam(this.exam).subscribe({
      next: (evaluation) => {
        this.router.navigate(['/exam-result'], { state: { evaluation } });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error evaluating exam:', error);
        this.loading = false;
      }
    })
  }

  private initializeExam(): void {
    this.exam = {
      subject: this.subject,
      questions: this.initializeQuestions()
    }
  }

  private initializeQuestions(): Question[] {
    return questions_mock.map((questionText) => ({
      questionText,
      studentAnswer: ''
    }));
  }
}
