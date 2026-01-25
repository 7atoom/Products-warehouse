import { Routes } from '@angular/router';
import {ProductsList} from './components/products-list/products-list';
import {ProductDetails} from './components/product-details/product-details';
import {Error} from './components/error/error';
import {ProductForm} from './components/product-form/product-form';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsList },
  { path: 'productForm', component: ProductForm },
  { path: 'products/:id', component: ProductDetails },
  { path: '**', component: Error}

];
