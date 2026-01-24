import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProductsService} from '../../services/products-service';
import {Product} from '../../utils/Product';
import {FormHeader} from '../form-header/form-header';
import {FormActions} from '../form-actions/form-actions';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, FormHeader, FormActions],
  templateUrl: './product-form.html',
  styles: ``,
})
export class ProductForm {
  router = inject(Router);
  mode: 'create' | 'edit' = 'create';
  productsService = inject(ProductsService);
  productForm = new FormGroup({
    name : new FormControl(''),
    PCode : new FormControl(''),
    category : new FormControl(''),
    supplier : new FormControl(''),
    description : new FormControl(''),
    quantity : new FormControl(0),
    minStock : new FormControl(0),
    price : new FormControl(0),
    location : new FormControl(''),
    lastRestocked : new FormControl(''),
    lastOrdered : new FormControl(''),
  });

  onCancel() {
    this.router.navigate(['/products']).then(() =>
      console.log('Navigated to products list'));
  }

  handleSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      const newProduct: Partial<Product> = {
        name: formValue.name || '',
        productCode: formValue.PCode || '',
        category: formValue.category || '',
        description: formValue.description || '',
        quantity: formValue.quantity ?? 0,
        minStock: formValue.minStock ?? 0,
        price: formValue.price ?? 0,
        location: formValue.location || '',
        // Optional fields
        status: 'inStock',
        createdAt: new Date().toISOString(),
        imageUrl: '',
      };

      this.productsService.createProduct(newProduct as Product).subscribe({
        next: (createdProduct) => {
          console.log('Product created:', createdProduct);
          this.router.navigate(['/products']).then(() =>
            console.log('Navigated to products list')
          );
        },
        error: (err) => {
          console.error('Error creating product:', err);
        }
      });
    }
  }

}
