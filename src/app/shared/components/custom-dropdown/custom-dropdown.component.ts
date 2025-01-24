import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-dropdown',
  imports: [FormsModule],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.css'
})
export class CustomDropdownComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = '';
  @Input() selected: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  onChange(value: string): void {
    this.selectionChange.emit(value);
  }
}
