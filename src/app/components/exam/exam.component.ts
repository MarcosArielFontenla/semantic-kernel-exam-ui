import { Component, OnDestroy, OnInit } from '@angular/core';
import { questions_mock } from '../../Utils/questions-mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Exam } from '../../models/exam-model';
import { Question } from '../../models/question-model';
import { QuestionsData } from '../../Utils/questions-data-mock';
import { PredefinedExamComponent } from '../../core/components/predefined-exam/predefined-exam.component';
import { MultipleChoiceExamComponent } from '../../core/components/multiple-choice-exam/multiple-choice-exam.component';
import { TrueFalseExamComponent } from '../../core/components/true-false-exam/true-false-exam.component';
import { ValidateAnswerDirective } from '../../shared/directives/validate-answer.directive';
import { Subject } from 'rxjs';
import { CustomModalQuestionValidatorComponent } from '../../shared/components/custom-modal-question-validator/custom-modal-question-validator.component';

@Component({
  selector: 'app-exam',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, PredefinedExamComponent, MultipleChoiceExamComponent, TrueFalseExamComponent, ValidateAnswerDirective, CustomModalQuestionValidatorComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit, OnDestroy {

  subject: string = '';
  examType: string = '';
  exam: Exam = { subject: '', questions: [] };
  questionsMock: string[] = questions_mock;
  loading: boolean = false;
  currentQuestionIndex: number = 0;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const { subject, examType } = this.route.snapshot.queryParams;
    const savedState = localStorage.getItem('examState');

    if (savedState) {
      const state = JSON.parse(savedState);

      if (state.examType !== examType || state.subject !== subject) {
        this.subject = subject;
        this.examType = examType;
        this.initializeExam();
      } else {
        this.subject = state.subject || subject;
        this.examType = state.examType || examType;
        this.exam = state.exam;
        this.currentQuestionIndex = state.currentQuestionIndex;
      }
    } else {
      if (!subject || !examType) {
        this.router.navigate(['/home']);
        return;
      }
      this.subject = subject;
      this.examType = examType;
      this.initializeExam();
    }
    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  protected submitExam(): void {
    if (this.loading || !this.canProceedToNextQuestion) return;

    this.loading = true;

    setTimeout(() => {
      this.examService.evaluateExam(this.exam).subscribe({
        next: (evaluation) => {
          localStorage.removeItem('examState');
          this.router.navigate(['/exam-result'], { state: { evaluation } });
          this.loading = false;
        },
        error: (error) => {
          console.error('Error evaluating exam:', error);
          this.loading = false;
        }
      });
    }, 2000);
  }

  protected goBack(): void {
    this.navigateToHome();
  }

  protected previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  protected onNextQuestion(): void {
    if (this.canProceedToNextQuestion && !this.isLastQuestion) {
      this.currentQuestion.isCompleted = true;
      this.currentQuestionIndex++;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('beforeunload', this.saveState.bind(this));
  }

  // PRIVATE METHODS
  private initializeExam(): void {
    this.exam = {
      subject: this.subject,
      questions: this.generateQuestionsByType()
    };
  }

  private generateQuestionsByType(): Question[] {
    switch (this.examType) {
      case 'predefined':
        return this.generatePredefinedQuestions();
      case 'multiple-choice':
        return this.generateMultipleChoiceQuestions();
      case 'true-false':
        return this.generateTrueFalseQuestion();
      default:
        console.warn('Invalid exam type:', this.examType);
        return [];
    }
  }

  private generatePredefinedQuestions(): Question[] {
    return questions_mock.map(questionText => ({
      questionText,
      studentAnswer: '',
    }));
  }

  private generateMultipleChoiceQuestions(): Question[] {
    const optionsByQuestion = QuestionsData.getOptionsForMultipleChoice();

    return questions_mock.map(questionText => ({
      questionText,
      options: optionsByQuestion[questionText] || [],
      studentAnswer: '',
    }));
  }

  private generateTrueFalseQuestion(): Question[] {
    const statementsByQuestion = QuestionsData.getStatementsForTrueFalse();

    return questions_mock.map(questionText => {
      const statements = statementsByQuestion[questionText] || ['True statement.', 'False statement.'];
      const randomStatement = statements[Math.floor(Math.random() * statements.length)];

      return {
        questionText: `${questionText} (${randomStatement})`,
        options: ['True', 'False'],
        studentAnswer: '',
      };
    });
  }

  private saveState(): void {
    const state = {
      subject: this.subject,
      examType: this.examType,
      exam: this.exam,
      currentQuestionIndex: this.currentQuestionIndex,
    };
    localStorage.setItem('examState', JSON.stringify(state));
  }

  private navigateToHome(): void {
    localStorage.removeItem('examState');
    this.router.navigate(['/home']);
  }

  get currentQuestion(): Question {
    return this.exam.questions[this.currentQuestionIndex];
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.exam.questions.length - 1;
  }

  get canProceedToNextQuestion(): boolean {
    return this.currentQuestion?.studentAnswer?.trim().length > 0;
  }
}
