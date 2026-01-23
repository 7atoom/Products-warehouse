import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductsService} from '../../services/products-service';

@Component({
  selector: 'app-products-filter-bar',
  imports: [FormsModule],
  templateUrl: './products-filter-bar.html',
  styles: ``,
})
export class ProductsFilterBar {
  private productsService = inject(ProductsService);
  searchTerm: string = '';
  categoryFilter: string = 'All categories';
  statusFilter: string = 'All statuses';

  categories = this.productsService.categories;
  statuses = this.productsService.statuses;

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.productsService.searchTerm.set(this.searchTerm);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.categoryFilter = target.value;
    this.productsService.selectedCategory.set(this.categoryFilter);
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusFilter = target.value;
    this.productsService.selectedStatus.set(this.statusFilter);
  }

  // statusOptions = [
  //   { value: 'all', label: 'All Statuses' },
  //   { value: 'inStock', label: 'In Stock' },
  //   { value: 'lowStock', label: 'Low Stock' },
  //   { value: 'outOfStock', label: 'Out of Stock' },
  // ];

  // categories = [
  //   { value: 'all', label: 'All Categories' },
  //   { value: 'electronics', label: 'Electronics' },
  //   { value: 'clothing', label: 'Clothing' },
  //   { value: 'books', label: 'Books' },
  //   { value: 'furniture', label: 'Furniture' },
  // ];
}
