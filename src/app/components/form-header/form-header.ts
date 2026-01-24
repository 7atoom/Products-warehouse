import {Component, EventEmitter, inject, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-header',
  imports: [],
  templateUrl: './form-header.html',
  styles: ``,
})
export class FormHeader {
  router = inject(Router);
  @Input() mode: 'create' | 'edit' = 'create'; // <-- this receives the value from parent
  @Input() onCancel = new EventEmitter<void>();

  handleCancel() {
    this.onCancel.emit();
  }
}
