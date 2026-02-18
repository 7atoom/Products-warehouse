import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ViewStateService} from '../../services/view-state-service';

@Component({
  selector: 'app-form-actions',
  imports: [],
  templateUrl: './form-actions.html',
  styles: ``,
})
export class FormActions {
  router = inject(Router);
  viewStateService = inject(ViewStateService);
  mode = this.viewStateService.currentView;
  @Input() onCancel(){
    this.router.navigate(['/products']).then(() =>
      console.log('Navigated to products list'));
    this.viewStateService.setListView();
  }
}
