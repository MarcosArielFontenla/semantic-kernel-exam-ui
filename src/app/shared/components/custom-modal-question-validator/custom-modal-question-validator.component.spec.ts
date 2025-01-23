import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalQuestionValidatorComponent } from './custom-modal-question-validator.component';

describe('CustomModalQuestionValidatorComponent', () => {
  let component: CustomModalQuestionValidatorComponent;
  let fixture: ComponentFixture<CustomModalQuestionValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomModalQuestionValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomModalQuestionValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
