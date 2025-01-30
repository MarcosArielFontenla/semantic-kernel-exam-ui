import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamButtonActionsComponent } from './exam-button-actions.component';

describe('ExamButtonActionsComponent', () => {
  let component: ExamButtonActionsComponent;
  let fixture: ComponentFixture<ExamButtonActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamButtonActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamButtonActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
