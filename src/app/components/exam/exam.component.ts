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
    const subject = this.route.snapshot.queryParams['subject'];
    const examType = this.route.snapshot.queryParams['examType'];

    if (!subject || !examType) {
      this.router.navigate(['/home']);
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
    this.router.navigate(['/home']);
  }

  private initializeExam(): void {
    this.exam = {
      subject: this.subject,
      questions: this.initializeQuestions()
    }
    console.log('Initialized exam:', this.exam);
  }

  private initializeQuestions(): Question[] {
    if (this.examType === 'predefined') {
      return questions_mock.map((questionText) => ({
        questionText,
        studentAnswer: ''
      }));
    } else if (this.examType === 'multiple-choice') {
      const optionsByQuestion: { [key: string]: string[] } = {
        'What is Finance?:': [
          'Finance is the management of money',
          'Finance is the management of people',
          'Finance is the management of time',
        ],
        'The role of Finance in an Organization:': [
          'Finance creates company logos',
          'Finance helps an organization allocate resources, manage risks, and plan for future growth',
          'Finance develops advertising campaigns',
        ],
        'Importance of Data and Technology:': [
          'Data and technology improve decision-making',
          'Data and technology reduce costs in factories',
          'Data and technology are unrelated to Finance'
        ],
        'Career in Finance:': [
          'Finance is a boring career',
          'Finance is a career with no growth opportunities',
          'A career in finance can involve roles like financial analyst, investment banker, accountant, or portfolio manager',
        ],
        'Markets and Participants:': [
          'Markets include stock, bond, and commodity markets, with participants like investors, brokers, and regulatory bodies',
          'Markets include only stock markets',
          'Markets include only bond markets',
        ],
        'Microeconomic and Macroeconomic Matters:': [
          'Microeconomics focuses on individual consumers and businesses, while Macroeconomics focuses on the economy as a whole',
          'Microeconomics focuses on the economy as a whole, while Macroeconomics focuses on individual consumers and businesses',
          'Microeconomics is unrelated to Finance',
        ],
        'Financial Instruments:': [
          'Financial instruments include stocks, bonds, derivatives, and other securities used for investment and risk management',
          'Financial instruments include only stocks',
          'Financial instruments include only bonds',
        ],
        'Concepts of Time and Value:': [
          'The time value of money emphasizes that a dollar today is worth more than a dollar tomorrow due to earning potential',
          'The time value of money emphasizes that a dollar today is worth less than a dollar tomorrow due to inflation',
          'The time value of money is unrelated to Finance',
        ]
      };

      return questions_mock.map((questionText) => ({
        questionText,
        options: optionsByQuestion[questionText],
        studentAnswer: '',
      }));
    } else if (this.examType === 'true-false') {
      const statementsByQuestion: { [key: string]: string[] } = {
        'What is Finance?:': [
          'Finance is the management of money',
          'Finance is the management of people',
        ],
        'The role of Finance in an Organization:': [
          'Finance creates company logos',
          'Finance helps an organization allocate resources, manage risks, and plan for future growth',
        ],
        'Importance of Data and Technology:': [
          'Data and technology improve decision-making',
          'Data and technology reduce costs in factories',
        ],
        'Career in Finance:': [
          'Finance is a boring career',
          'A career in finance can involve roles like financial analyst, investment banker, accountant, or portfolio manager',
        ],
        'Markets and Participants:': [
          'Markets include stock, bond, and commodity markets, with participants like investors, brokers, and regulatory bodies',
          'Markets include only stock markets',
        ],
        'Microeconomic and Macroeconomic Matters:': [
          'Microeconomics focuses on individual consumers and businesses, while Macroeconomics focuses on the economy as a whole',
          'Microeconomics focuses on the economy as a whole, while Macroeconomics focuses on individual consumers and businesses',
        ],
        'Financial Instruments:': [
          'Financial instruments include stocks, bonds, derivatives, and other securities used for investment and risk management',
          'Financial instruments include only stocks',
        ],
        'Concepts of Time and Value:': [
          'The time value of money emphasizes that a dollar today is worth more than a dollar tomorrow due to earning potential',
          'The time value of money emphasizes that a dollar today is worth less than a dollar tomorrow due to inflation',
        ]
      };

      return questions_mock.map((questionText) => {
        const statements = statementsByQuestion[questionText] || ['True statement.', 'False statement.'];
        const randomStatement = statements[Math.floor(Math.random() * statements.length)];

        return {
          questionText: `${questionText} (${randomStatement})`,
          options: ['True', 'False'],
          studentAnswer: '',
        };
      });
    }
    return [];
  }
}
