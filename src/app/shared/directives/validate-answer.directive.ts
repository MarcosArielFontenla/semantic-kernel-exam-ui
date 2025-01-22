import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValidateAnswer]'
})
export class ValidateAnswerDirective {
  @Input('appValidateAnswer') answer: string | undefined;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (!this.answer?.trim()) {
      event.preventDefault();
      alert('Please fill or select an answer before proceeding!');
    }
  }
}
