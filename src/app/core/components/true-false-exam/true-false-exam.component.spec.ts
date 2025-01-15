import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseExamComponent } from './true-false-exam.component';

describe('TrueFalseExamComponent', () => {
  let component: TrueFalseExamComponent;
  let fixture: ComponentFixture<TrueFalseExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
