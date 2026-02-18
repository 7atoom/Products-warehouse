import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ProductsService } from '../../core/services/products-service';
import { ProductsFilterBar } from './components/products-filter-bar/products-filter-bar';
import { ProductsStats } from './components/products-stats/products-stats';
import { Router } from '@angular/router';
import { ProductCard } from "./components/product-card/product-card";

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductsFilterBar, ProductsStats, ProductCard],
  templateUrl: './products-list.html',
  styles: ``,
})
export class ProductsList implements OnInit {
  private productsService = inject(ProductsService);
  router = inject(Router);

  thClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase';
  products = this.productsService.filteredProducts;
  loading = this.productsService.loading;
  error = this.productsService.error;

  // Helper method to get product ID
  getProductId(product: any): string {
    return product._id || '';
  }

  ngOnInit() {
    this.productsService.loadProducts();
    console.log('Products loaded:', this.products());
  }

  
}
