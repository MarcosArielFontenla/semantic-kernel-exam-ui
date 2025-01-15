import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedExamComponent } from './predefined-exam.component';

describe('PredefinedExamComponent', () => {
  let component: PredefinedExamComponent;
  let fixture: ComponentFixture<PredefinedExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinedExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
