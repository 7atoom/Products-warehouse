import {Component, EventEmitter, inject, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-actions',
  imports: [],
  templateUrl: './form-actions.html',
  styles: ``,
})
export class FormActions {
  router = inject(Router);
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() onCancel = new EventEmitter<void>();

  handleCancel() {
    this.onCancel.emit();
  }
}
