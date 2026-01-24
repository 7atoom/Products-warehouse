import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Header} from './components/header/header';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentView: 'list' | 'create' = 'list';

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentView = event.url.includes('createProduct') ? 'create' : 'list';
      });
  }

  setView(view: 'list' | 'create') {
    if (view === 'create') {
      this.router.navigate(['/createProduct']).then(() =>
      console.log('Navigated to create product'));
    } else {
      this.router.navigate(['/products']).then(() =>
      console.log('Navigated to products list'));
    }
  }
}
