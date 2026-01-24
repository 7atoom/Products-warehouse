import { Component , inject } from '@angular/core';
import {ProductsService} from '../../services/products-service';

@Component({
  selector: 'app-products-stats',
  imports: [],
  templateUrl: './products-stats.html',
  styles: ``,
})
export class ProductsStats {
  private productsService = inject(ProductsService);

  statCardClass = 'bg-white p-6 rounded-lg border border-gray-200'
  statTitleClass = 'text-md text-gray-600'

  stats = {
    totalProducts: this.productsService.totalProducts,
    pInStock: this.productsService.inStockCount,
    pLowStock: this.productsService.lowStockCount,
    pOutOfStock: this.productsService.outOfStockCount,
    totalInventoryValue: this.productsService.totalInventoryValue
  }
}
