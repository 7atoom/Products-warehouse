import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ViewStateService} from '../../services/view-state-service';

@Component({
  selector: 'app-form-header',
  imports: [],
  templateUrl: './form-header.html',
  styles: ``,
})
export class FormHeader {
  router = inject(Router);
  viewStateService = inject(ViewStateService);
  mode = this.viewStateService.currentView;
  @Input() onCancel(){
    this.router.navigate(['/products']).then(() =>
      console.log('Navigated to products list'));
    this.viewStateService.setListView();
  }


}
