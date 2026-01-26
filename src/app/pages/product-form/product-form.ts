import {Component, inject, OnInit, effect} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products-service';
import {Product} from '../../utils/Product';
import {FormHeader} from '../../components/form-header/form-header';
import {FormActions} from '../../components/form-actions/form-actions';
import {ViewStateService} from '../../services/view-state-service';
import {CommonModule} from '@angular/common';
import {CategoriesService} from '../../services/categories-service';


@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, FormHeader, FormActions, CommonModule],
  templateUrl: './product-form.html',
  styles: ``,
})
export class ProductForm implements OnInit {
  router = inject(Router);
  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService);
  viewStateService = inject(ViewStateService);


  mode = this.viewStateService.currentView;
  editingProductId = this.viewStateService.editingProductId;
  categories = this.categoriesService.categories;
  categoriesLoading = this.categoriesService.loading;

  loading = false;
  error: string | null = null;


  // Store original product data
  private originalProduct: Product | null = null;

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    PCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z0-9]{2,10}-[0-9]{4}$/i)
    ]),
    category: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    description: new FormControl('', [Validators.maxLength(500)]),
    quantity: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(999999)
    ]),
    minStock: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(999999)
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(999999.99)
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.pattern(/^Aisle\s\d$/i)
    ]),
    lastRestocked: new FormControl<string>(''),
  });

  constructor() {
    effect(() => {
      const productId = this.editingProductId();
      const currentMode = this.mode();

      if (currentMode === 'edit' && productId) {
        this.loadProductForEdit(productId);
      }
    });
  }

  ngOnInit() {
    // Load categories from API
    this.categoriesService.fetchCategories();

    if (this.mode() === 'edit' && this.editingProductId()) {
      this.loadProductForEdit(this.editingProductId()!);
    }
  }


  loadProductForEdit(productId: number) {
    this.loading = true;
    this.error = null;

    this.productsService.getProductById(productId).subscribe({
      next: (product) => {
        this.originalProduct = product;
        this.populateForm(product);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load product', err);
        this.error = 'Failed to load product for editing';
        this.loading = false;
      }
    });
  }

  populateForm(product: Product) {
    this.productForm.patchValue({
      name: product.name,
      PCode: product.productCode,
      category: product.category,
      supplier: product.supplier,
      description: product.description,
      quantity: product.quantity,
      minStock: product.minStock,
      price: product.price,
      location: product.location,
      lastRestocked: this.formatDateForInput(product.lastRestocked),
    });
  }

  // Convert ISO date string to yyyy-MM-dd format for date input
  private formatDateForInput(isoDate: string | null | undefined): string {
    if (!isoDate) return '';
    try {
      return new Date(isoDate).toISOString().split('T')[0];
    } catch {
      return '';
    }
  }

  // Convert date string to ISO format
  private formatDateToISO(dateStr: string | null | undefined): string {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toISOString();
    } catch {
      return '';
    }
  }

  // Calculate status based on quantity and minStock
  private calculateStatus(quantity: number, minStock: number): 'inStock' | 'lowStock' | 'outOfStock' {
    if (quantity === 0) return 'outOfStock';
    if (quantity <= minStock) return 'lowStock';
    return 'inStock';
  }

  // Build product data from form values
  private buildProductData(): Partial<Product> {
    const formValue = this.productForm.value;
    const quantity = formValue.quantity ?? 0;
    const minStock = formValue.minStock ?? 0;

    return {
      name: formValue.name || '',
      productCode: formValue.PCode || '',
      category: formValue.category || '',
      supplier: formValue.supplier || '',
      description: formValue.description || '',
      quantity,
      minStock,
      price: formValue.price ?? 0,
      location: formValue.location || '',
      status: this.calculateStatus(quantity, minStock),
      lastRestocked: this.formatDateToISO(formValue.lastRestocked),
    };
  }

  // Helper method to get error messages for template
  getErrorMessage(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;
    const label = this.getFieldLabel(fieldName);

    if (errors['required']) return `${label} is required.`;
    if (errors['minlength']) return `${label} must be at least ${errors['minlength'].requiredLength} characters.`;
    if (errors['maxlength']) return `${label} cannot exceed ${errors['maxlength'].requiredLength} characters.`;
    if (errors['min']) return `${label} must be at least ${errors['min'].min}.`;
    if (errors['max']) return `${label} cannot exceed ${errors['max'].max}.`;

    if (errors['pattern']) {
      if (fieldName === 'PCode') {
        return 'PCode must follow format: CODE-1234 (2-10 alphanumeric characters, hyphen, 4 digits)';
      }
      if (fieldName === 'location') {
        return 'Location must follow format: Aisle 1';
      }
    }

    return 'Invalid input.';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'Product Name',
      PCode: 'PCode',
      category: 'Category',
      supplier: 'Supplier',
      description: 'Description',
      quantity: 'Quantity',
      minStock: 'Minimum Stock',
      price: 'Price',
      location: 'Location',
      lastRestocked: 'Last Restocked',
    };
    return labels[fieldName] || fieldName;
  }

  onCancel() {
    this.viewStateService.setListView();
    this.router.navigate(['/products']);
  }

  handleSubmit() {
    this.productForm.markAllAsTouched();

    if (!this.productForm.valid) {
      console.log('Form is invalid. Please check all required fields.');
      return;
    }

    const productData = this.buildProductData();

    // Check if we're editing or creating
    if (this.mode() === 'edit' && this.editingProductId()) {
      this.updateProduct(this.editingProductId()!, productData);
    } else {
      this.createProduct(productData);
    }
  }

  private createProduct(product: Partial<Product>) {
    const newProduct: Product = {
      ...product,
      createdAt: new Date().toISOString(),
      imageUrl: '',
      lastOrdered: '',
    } as Product;

    this.productsService.createProduct(newProduct).subscribe({
      next: () => {
        console.log('Product created successfully');
        this.navigateToProductsList();
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.error = 'Failed to create product';
      }
    });
  }

  private updateProduct(id: number, product: Partial<Product>) {
    if (!this.originalProduct) {
      this.error = 'Original product data not found';
      return;
    }

    const updatedProduct: Product = {
      ...this.originalProduct,
      ...product,
    };

    this.productsService.updateProduct(id, updatedProduct).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.navigateToProductsList();
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.error = 'Failed to update product';
      }
    });
  }

  private navigateToProductsList() {
    this.viewStateService.setListView();
    this.router.navigate(['/products']);
  }
}
