import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {

  private showModalSource = new Subject<void>();
  showModal$ = this.showModalSource.asObservable();

  show(): void {
    this.showModalSource.next();
  }
}
