import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-exam',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, PredefinedExamComponent, MultipleChoiceExamComponent, TrueFalseExamComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit {

  subject: string = '';
  examType: string = '';
  exam: Exam = { subject: '', questions: [] };
  questionsMock: string[] = questions_mock;
  loading: boolean = false;

  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute) {

    }

  ngOnInit(): void {
    const { subject, examType } = this.route.snapshot.queryParams;

    if (!subject || !examType) {
      this.router.navigate(['/home']);
      return;
    } else {
      this.subject = subject;
      this.examType = examType;
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

  onCheckboxChange(event: Event, questionIndex: number, option: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    let selectedAnswers = this.exam.questions[questionIndex].studentAnswer ? this.exam.questions[questionIndex].studentAnswer.split(',') : [];

    if (isChecked) {
      if (!selectedAnswers.includes(option)) {
        selectedAnswers.push(option);
      }
    } else {
      selectedAnswers = selectedAnswers.filter((answer) => answer !== option);
    }

    this.exam.questions[questionIndex].studentAnswer = selectedAnswers.join(',');
  }

  goBack(): void {
    this.navigateToHome();
  }

  private initializeExam(): void {
    this.exam = {
      subject: this.subject,
      questions: this.generateQuestionsByType()
    };
    console.log('Initialized exam:', this.exam);
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

  private navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
