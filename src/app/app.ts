import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './components/header/header';
import {Footer} from './components/footer/footer';
import {ProductsStats} from './components/products-stats/products-stats';
import {ProductsFilterBar} from './components/products-filter-bar/products-filter-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ProductsStats, ProductsFilterBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
