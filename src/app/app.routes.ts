import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExamComponent } from './components/exam/exam.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'exam-result', component: ResultComponent },
  { path: '**', redirectTo: '' }
];
