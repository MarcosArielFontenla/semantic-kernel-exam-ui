import { TestBed } from '@angular/core/testing';

import { ExamTimerService } from './exam-timer.service';

describe('ExamTimerService', () => {
  let service: ExamTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
