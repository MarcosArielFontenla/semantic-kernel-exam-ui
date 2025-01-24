import { Directive, HostListener, Input, ViewChild } from '@angular/core';
import { CustomModalService } from '../services/custom-modal.service';
import { CustomModalQuestionValidatorComponent } from '../components/custom-modal-question-validator/custom-modal-question-validator.component';

@Directive({
  selector: '[appValidateAnswer]'
})
export class ValidateAnswerDirective {
  @Input('appValidateAnswer') answer: string | undefined;

  constructor(private modalService: CustomModalService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (!this.answer?.trim()) {
      event.preventDefault();
      this.modalService.show();
    }
  }
}
