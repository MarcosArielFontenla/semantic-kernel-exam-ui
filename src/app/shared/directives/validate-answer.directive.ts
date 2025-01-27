import { Directive, HostListener, Input } from '@angular/core';
import { CustomModalService } from '../services/custom-modal.service';

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
