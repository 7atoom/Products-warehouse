import {Injectable, inject, signal, computed} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import { Product } from '../utils/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000/products';

  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);


  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  private readonly _deleting = signal<boolean>(false);
  readonly deleting = this._deleting.asReadonly();

  readonly totalProducts = computed(() => this._products().length);
  readonly inStockCount = computed(() =>
    this._products().filter(p => p.status === 'inStock').length
  );
  readonly lowStockCount = computed(() =>
    this._products().filter(p => p.status === 'lowStock').length
  );
  readonly outOfStockCount = computed(() =>
    this._products().filter(p => p.status === 'outOfStock').length
  );
  readonly totalInventoryValue = computed(() =>
    this._products().reduce((sum, p) => sum + p.price * p.quantity, 0)
  );

  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<string>('All categories');
  readonly selectedStatus = signal<string>('All statuses');

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const search = this.searchTerm().toLowerCase();
    const products = this._products();

    return products.filter(product => {
      const matchesCategory =
        category === 'All categories' || product.category === category;
      const matchesStatus =
        this.selectedStatus() === 'All statuses' ||
        product.status === this.selectedStatus();
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.productCode.toLowerCase().includes(search);
      return matchesCategory && matchesSearch && matchesStatus;
    });
  });

  readonly categories = computed(() => {
    const cats = this._products().map(p => p.category);
    return ['All categories', ...Array.from(new Set(cats))];
  });

  readonly statuses = computed(() => {
    const stats = this._products().map(p => p.status);
    return ['All statuses', ...Array.from(new Set(stats))];
  });

  loadProducts(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Product[]>(this.apiBaseUrl).subscribe({
      next: (data) => {
        this._products.set(data);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load products');
        this._loading.set(false);
      },
    });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiBaseUrl}/${id}`).pipe(
      catchError(err => {
        this._error.set('Failed to load product details');
        throw err;
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.apiBaseUrl, product)
      .pipe(tap(() => this.loadProducts()));
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiBaseUrl}/${id}`, product)
      .pipe(tap(() => this.loadProducts()));
  }

  deleteProduct(id: string): Observable<void> {
    this._deleting.set(true);
    return this.http
      .delete<void>(`${this.apiBaseUrl}/${id}`)
      .pipe(
        tap(() => {
          this.loadProducts();
          this._deleting.set(false);
        }),
        catchError(err => {
          this._deleting.set(false);
          throw err;
        })
      );
  }
}
