import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceExamComponent } from './multiple-choice-exam.component';

describe('MultipleChoiceExamComponent', () => {
  let component: MultipleChoiceExamComponent;
  let fixture: ComponentFixture<MultipleChoiceExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoiceExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
