import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CustomModalService } from '../services/custom-modal.service';

@Directive({
  selector: '[appValidateAnswer]'
})
export class ValidateAnswerDirective {
  @Input('appValidateAnswer') canProceed!: boolean;
  @Output() validationFailed = new EventEmitter<void>();

  constructor(private modalService: CustomModalService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (!this.canProceed) {
      event.preventDefault();
      event.stopPropagation();
      this.modalService.show();
      this.validationFailed.emit();
    }
  }
}
