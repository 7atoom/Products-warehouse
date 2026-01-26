import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {ProductsService} from '../../services/products-service';
import {ProductsFilterBar} from '../products-filter-bar/products-filter-bar';
import {ProductsStats} from '../products-stats/products-stats';
import {Router} from '@angular/router';
import {ViewStateService} from '../../services/view-state-service';


@Component({
  selector: 'app-products-list',
  imports: [NgClass, CommonModule, ProductsFilterBar, ProductsStats],
  templateUrl: './products-list.html',
  styles: ``,
})
export class ProductsList implements OnInit {
  private productsService = inject(ProductsService);
  private viewStateService = inject(ViewStateService);
  router = inject(Router);

  thClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'
  products = this.productsService.filteredProducts;
  loading = this.productsService.loading;
  error = this.productsService.error;


  ngOnInit() {
    this.productsService.loadProducts();
  }

  viewDetails(id: number) {
    console.log('View product', id);
    this.router.navigate(['/products', id]).then(() =>
      console.log('Navigated to product details', id));
    this.viewStateService.setDetailsView(id);
  }

  editProduct(id: number) {
    console.log('Edit product', id);
    this.router.navigate(['/productForm']).then(() =>
      console.log('Navigated to edit product', id));
      this.viewStateService.setEditView(id);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted successfully', id);
        },
        error: (err) => {
          console.error('Failed to delete product', err);
        }
      });
    }
  }
}
