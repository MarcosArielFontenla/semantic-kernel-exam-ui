import { Component, inject, Input, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-custom-loading-spinner',
  imports: [],
  templateUrl: './custom-loading-spinner.component.html',
  styleUrl: './custom-loading-spinner.component.css'
})
export class CustomLoadingSpinnerComponent {
  @Input() isLoading: boolean = false;

  private readonly spinner = inject(SpinnerService);
  spinnerIsLoading = this.spinner.isLoading;
}
