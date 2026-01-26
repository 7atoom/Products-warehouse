import { Routes } from '@angular/router';
import {ProductsList} from './pages/products-list/products-list';
import {ProductDetails} from './pages/product-details/product-details';
import {Error} from './pages/error/error';
import {ProductForm} from './pages/product-form/product-form';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsList },
  { path: 'products/:id', component: ProductDetails },
  { path: 'productForm', component: ProductForm },
  { path: '**', component: Error, data: { hideHeader: true } }

];
