import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductsService} from '../../services/products-service';
import {CategoriesService} from '../../services/categories-service';

@Component({
  selector: 'app-products-filter-bar',
  imports: [FormsModule],
  templateUrl: './products-filter-bar.html',
  styles: ``,
})
export class ProductsFilterBar {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  
  searchTerm: string = '';
  categoryFilter: string = 'All categories';
  statusFilter: string = 'All statuses';

  categories = this.categoriesService.categories;
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
}
