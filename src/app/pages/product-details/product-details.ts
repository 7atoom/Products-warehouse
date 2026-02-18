import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products-service';
import { ViewStateService } from '../../core/services/view-state-service';
import { Product } from '../../utils/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './product-details.html',
  styles: ``
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productsService = inject(ProductsService);
  private viewStateService = inject(ViewStateService);

  product = signal<Product | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Helper method to get product ID
  getProductId(product: Product): string {
    return product._id || '';
  }

  // Helper method to get category name
  getCategoryName(product: Product): string {
    if (typeof product.category === 'string') {
      return product.category;
    }
    return product.category?.name || '';
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProduct(id);
    } else {
      this.error.set('Invalid product ID');
    }
  }

  loadProduct(id: string) {
    this.loading.set(true);
    this.error.set(null);
    this.product.set(null);

    this.productsService.getProductById(id).subscribe({
      next: (data) => {
        console.log('Product loaded:', data);
        this.product.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.error.set('Could not find product');
        this.loading.set(false);
      }
    });
  }

  onBack() {
    this.viewStateService.setListView();
    this.router.navigate(['/products']);
  }

  onEdit(id: string) {
    this.viewStateService.setEditView(id);
    this.router.navigate(['/productForm']);
  }

  onDelete(id: string) {
    const currentProduct = this.product();

    if (!currentProduct) return;

    const productId = this.getProductId(currentProduct);

    Swal.fire({
      title: `Delete "${currentProduct.name}"?`,
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#286fef',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Product has been removed.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });

            this.viewStateService.setListView();
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Failed to delete product', err);

            Swal.fire({
              title: 'Error',
              text: 'Failed to delete product.',
              icon: 'error'
            });

            this.error.set('Failed to delete product');
          }
        });
      }
    });
  }

  getStatusLabel(status: string): string {
    return status
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  getStockPercentage(): number {
    const p = this.product();
    if (!p || p.minStock === 0) return 100;
    const percentage = (p.quantity / (p.minStock * 2)) * 100;
    return Math.min(percentage, 100);
  }

  getTotalValue(): number {
    const p = this.product();
    if (!p) return 0;
    return p.price * p.quantity;
  }

  getDaysSinceRestock(): number {
    const p = this.product();
    if (!p || !p.lastRestocked) return 0;
    const lastRestocked = new Date(p.lastRestocked);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastRestocked.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  getStockCoverage(): number {
    const p = this.product();
    if (!p || p.minStock === 0) return 0;
    return Math.floor((p.quantity / p.minStock) * 100);
  }

  isReorderNeeded(): boolean {
    const p = this.product();
    if (!p) return false;
    return p.quantity < p.minStock;
  }
}
