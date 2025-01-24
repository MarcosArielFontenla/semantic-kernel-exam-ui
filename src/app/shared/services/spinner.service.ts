import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = signal<boolean>(false);

  public hideSpinner(): void {
    this.isLoading.set(false);
  }

  public showSpinner(): void {
    this.isLoading.set(true);
  }
}
