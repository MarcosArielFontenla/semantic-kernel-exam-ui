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
import { Subject } from 'rxjs';
import { CustomModalQuestionValidatorComponent } from '../../shared/components/custom-modal-question-validator/custom-modal-question-validator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExamStateService } from '../../services/exam-state.service';
import { ExamTypeEnum } from '../../core/enums/exam-type.enum';
import { ExamEnum } from '../../core/enums/exam.enum';
import { ExamProgressComponent } from './exam-progress/exam-progress.component';
import { ExamButtonActionsComponent } from './exam-button-actions/exam-button-actions.component';

@Component({
  selector: 'app-exam',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    PredefinedExamComponent,
    MultipleChoiceExamComponent,
    TrueFalseExamComponent,
    CustomModalQuestionValidatorComponent,
    ExamProgressComponent,
    ExamButtonActionsComponent
  ],
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
  predefined: ExamTypeEnum = ExamTypeEnum.PREDEFINED;
  multipleChoice: ExamTypeEnum = ExamTypeEnum.MULTIPLE_CHOICE;
  trueFalse: ExamTypeEnum = ExamTypeEnum.TRUE_FALSE;
  modalValidatorTitle: ExamEnum = ExamEnum.MODAL_VALIDATOR_TITLE;
  modalValidatorMessage: ExamEnum = ExamEnum.MODAL_VALIDATOR_MESSAGE;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private examService: ExamService,
    private examStateService: ExamStateService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const { subject, examType } = this.route.snapshot.queryParams;
    const savedState = this.examStateService.getExamState();

    // if there is a saved state, restore it
    if (savedState) {
      this.subject = savedState.subject;
      this.examType = savedState.examType;
      this.exam = {
        subject: savedState.subject,
        questions: savedState.questions
      };
      this.currentQuestionIndex = savedState.currentQuestionIndex || 0;
    } else {
      // If there is no saved state, initialize the exam
      if (!subject || !examType) {
        this.router.navigate(['/home']);
        return;
      }
      this.subject = subject;
      this.examType = examType;
      this.initializeExam();
    }
  }

  protected submitExam(): void {
    if (this.loading || !this.canProceedToNextQuestion) return;

    this.loading = true;
    
    this.examService.evaluateExam(this.exam).subscribe({
      next: (evaluation) => {
        this.clearExamState();
        this.router.navigate(['/exam-result'], { state: { evaluation } });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error evaluating exam:', error);
        this.loading = false;
      }
    });
  }

  protected goBack(): void {
    this.navigateToHome();
  }

  protected previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.saveState();
    }
  }

  protected onNextQuestion(): void {
    if (this.canProceedToNextQuestion && !this.isLastQuestion) {
      this.currentQuestion.isCompleted = true;
      this.currentQuestionIndex++;
      this.saveState();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearExamState();
  }

  // PRIVATE METHODS
  private initializeExam(): void {
    const questions = this.generateQuestionsByType();

    if (questions.length === 0) {
      this.router.navigate(['/home']);
      return;
    }

    this.exam = {
      subject: this.subject,
      questions: questions,
    };
    this.saveState();
  }

  private generateQuestionsByType(): Question[] {
    switch (this.examType) {
      case this.predefined:
        return this.generatePredefinedQuestions();
      case this.multipleChoice:
        return this.generateMultipleChoiceQuestions();
      case this.trueFalse:
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
    if (!this.exam.questions) {
      return;
    }

    const state = {
      subject: this.subject,
      questions: this.exam.questions,
      examType: this.examType,
      currentQuestionIndex: this.currentQuestionIndex,
    };
    this.examStateService.setExamState(state);
  }

  private navigateToHome(): void {
    this.clearExamState();
    this.router.navigate(['/home']);
  }

  private clearExamState(): void {
    this.examStateService.clearExamState();
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
