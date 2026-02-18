import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../../utils/Product';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ViewStateService } from '../../../../core/services/view-state-service';
import { ProductsService } from '../../../../core/services/products-service';
import Swal from 'sweetalert2';


@Component({
  selector: '[app-product-card]',
  imports: [NgClass, CurrencyPipe],
  templateUrl: './product-card.html',
  styles: ``,
  host: {
    class: 'hover:bg-gray-50 transition-colors'
  }
})
export class ProductCard {
  @Input() product?: Product;
  @Input() getProductId: any;

  router = inject(Router);
  viewStateService = inject(ViewStateService);
  productsService = inject(ProductsService);

  // Helper method to get category name
  getCategoryName(product: any): string {
    if (typeof product.category === 'string') {
      return product.category;
    }
    return product.category?.name || '';
  }


  viewDetails(id: string) {
    console.log('View product', id);
    this.router
      .navigate(['/products', id])
      .then(() => console.log('Navigated to product details', id));
    this.viewStateService.setDetailsView(id);
  }

  editProduct(id: string) {
    console.log('Edit product', id);
    this.router.navigate(['/productForm']).then(() => console.log('Navigated to edit product', id));
    this.viewStateService.setEditView(id);
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: 'Delete product?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#286fef',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The product has been removed.', 'success');
            console.log('Product deleted successfully', id);
          },
          error: (err: any) => {
            Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
            console.error('Failed to delete product', err);
          },
        });
      }
    });
  }


}
