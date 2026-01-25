import {Component, inject} from '@angular/core';
import {ViewStateService} from '../../services/view-state-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  router = inject(Router);
  viewStateService = inject(ViewStateService);
  mode = this.viewStateService.currentView;

  addProduct() {
    this.viewStateService.setCreateView();
    this.router.navigate(['/productForm']).then(() =>
      console.log('Navigated to product form'));
      this.viewStateService.setCreateView();
    }
}
