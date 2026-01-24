import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {ProductsService} from '../../services/products-service';
import {ProductsFilterBar} from '../products-filter-bar/products-filter-bar';
import {ProductsStats} from '../products-stats/products-stats';
import {Router} from '@angular/router';


@Component({
  selector: 'app-products-list',
  imports: [NgClass, CommonModule, ProductsFilterBar, ProductsStats],
  templateUrl: './products-list.html',
  styles: ``,
})
export class ProductsList implements OnInit {
  private productsService = inject(ProductsService);
  router = inject(Router);

  thClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
  products = this.productsService.filteredProducts;
  loading = this.productsService.loading;
  error = this.productsService.error;


  ngOnInit() {
    this.productsService.loadProducts();
  }

    getStatusIcon(status: string): string {
      switch (status) {
        case 'inStock':
          return '✔️';
        case 'lowStock':
          return '⚠️';
        case 'outOfStock':
          return '❌';
        default:
          return '';
      }
    }

    getStatusBadgeClass(status: string): string {
      switch (status) {
        case 'inStock':
          return 'badge-success';
        case 'lowStock':
          return 'badge-warning';
        case 'outOfStock':
          return 'badge-danger';
        default:
          return '';
      }
    }



  viewDetails(id: number) {
    console.log('View product', id);
    this.router.navigate(['/products', id]).then(() =>
      console.log('Navigated to product details', id));
  }

  editProduct(id: number) {
    console.log('Edit product', id);
  }

  deleteProduct(id: number) {
    console.log('Delete product', id);
  }
}
