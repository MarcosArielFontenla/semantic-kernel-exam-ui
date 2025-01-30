import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExamComponent } from './components/exam/exam.component';
import { ResultComponent } from './components/result/result.component';
import { ExamPreviewComponent } from './components/exam/exam-preview/exam-preview.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'exam', 
    component: ExamComponent 
  },
  { 
    path: 'exam-preview', 
    component: ExamPreviewComponent 
  },
  { 
    path: 'exam-result', 
    component: ResultComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
