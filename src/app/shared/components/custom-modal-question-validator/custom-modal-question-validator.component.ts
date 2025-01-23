import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CustomModalService } from '../../services/custom-modal.service';

@Component({
  selector: 'app-custom-modal-question-validator',
  imports: [CommonModule],
  templateUrl: './custom-modal-question-validator.component.html',
  styleUrl: './custom-modal-question-validator.component.css'
})
export class CustomModalQuestionValidatorComponent implements OnInit {
  @Input() title: string = '';
  @Input() message: string = '';

  private modalInstance: bootstrap.Modal | null = null;

  constructor(private modalService: CustomModalService) {}

  ngOnInit(): void {
    this.modalService.showModal$.subscribe(() => {
      this.showModal();
    })
  }

  showModal(): void {
    const modalElement = document.getElementById('customValidationModal');

    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();

      modalElement.addEventListener('hidden.bs.modal', () => {
        this.cleanupBackdrop();
      })
    }
  }

  private cleanupBackdrop(): void {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }
}
