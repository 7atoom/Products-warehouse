import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../../utils/Category';
import {Observable, tap, catchError, of, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000/api/categories';

  // Signals for reactive state management
  private readonly _categories = signal<Category[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Read-only signals exposed to components
  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();


  fallbackCategories: Category[] = [
    { _id: '1', name: 'Electronics' },
    { _id: '2', name: 'Accessories' },
    { _id: '3', name: 'Furniture' },
    { _id: '4', name: 'Office Supplies' }
  ];  

  fetchCategories(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<{ status: string; data: { categories: Category[] } }>(this.apiBaseUrl).subscribe({
      next: (response) => {
        this._categories.set(response.data.categories);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this._error.set('Failed to load categories');
        this._categories.set(this.fallbackCategories); // Use fallback
        this._loading.set(false);
      },
    });
  }

  // Alternative: Return Observable for more control
  getCategories(): Observable<Category[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<{ status: string; data: { categories: Category[] } }>(this.apiBaseUrl).pipe(
      map(response => response.data.categories),
      tap((data) => {
        this._categories.set(data);
        this._loading.set(false);
      }),
      catchError((err) => {
        console.error('Failed to load categories:', err);
        this._error.set('Failed to load categories');
        this._categories.set(this.fallbackCategories);
        this._loading.set(false);
        return of(this.fallbackCategories); // Return fallback
      })
    );
  }

  // Get category by ID
  getCategoryById(id: string): Category | undefined {
    return this._categories().find(cat => cat._id === id);
  }

  // Get category by name
  getCategoryByName(name: string): Category | undefined {
    return this._categories().find(cat => cat.name === name);
  }
}
