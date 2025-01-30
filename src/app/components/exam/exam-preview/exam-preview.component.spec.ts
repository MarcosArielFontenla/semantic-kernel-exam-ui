import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPreviewComponent } from './exam-preview.component';

describe('ExamPreviewComponent', () => {
  let component: ExamPreviewComponent;
  let fixture: ComponentFixture<ExamPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
