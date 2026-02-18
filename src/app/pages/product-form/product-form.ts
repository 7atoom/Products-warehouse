import { Component, effect, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../core/services/products-service';
import { Product } from '../../utils/Product';
import { FormHeader } from '../../core/components/form-header/form-header';
import { FormActions } from '../../core/components/form-actions/form-actions';
import { ViewStateService } from '../../core/services/view-state-service';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/services/categories-service';
import { ToastService } from '../../core/services/toast-service';
import { firstValueFrom } from 'rxjs';

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
  toastService = inject(ToastService);

  mode = this.viewStateService.currentView;
  editingProductId = this.viewStateService.editingProductId;

  categories = this.categoriesService.categories;
  categoriesLoading = this.categoriesService.loading;

  loading = false;
  submitting = false;
  error: string | null = null;

  private originalProduct: Product | null = null;

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    PCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z0-9]{2,10}-[0-9]{4}$/i),
    ]),
    category: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999999)]),
    minStock: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999999)]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(999999.99),
    ]),
    location: new FormControl('', [Validators.required, Validators.pattern(/^Aisle\s\d+$/i)]),
    lastRestocked: new FormControl<string>(''),
  });

  constructor() {
    effect(() => {
      const productId = this.editingProductId();
      const currentMode = this.mode();

      if (currentMode === 'edit' && productId) {
        void this.loadProductForEdit(productId);
      }
    });
  }

  ngOnInit() {
    this.categoriesService.fetchCategories();
  }

  private async loadProductForEdit(productId: string) {
    this.loading = true;
    this.error = null;

    try {
      const product = await firstValueFrom(this.productsService.getProductById(productId));
      this.originalProduct = product;
      this.populateForm(product);
    } catch (err) {
      console.error('Failed to load product', err);
      this.error = 'Failed to load product for editing';
      this.toastService.error(this.error);
    } finally {
      this.loading = false;
    }
  }

  populateForm(product: Product) {
    const categoryValue =
      typeof product.category === 'string' ? product.category : (product.category?.name ?? '');

    this.productForm.patchValue(
      {
        name: product.name ?? '',
        PCode: product.productCode ?? '',
        category: categoryValue,
        supplier: product.supplier ?? '',
        description: product.description ?? '',
        quantity: product.quantity ?? 0,
        minStock: product.minStock ?? 0,
        price: product.price ?? 0,
        location: product.location ?? '',
        lastRestocked: this.formatDateForInput(product.lastRestocked),
      },
      { emitEvent: false },
    );
  }

  private formatDateForInput(isoDate: string | null | undefined): string {
    if (!isoDate) return '';
    try {
      return new Date(isoDate).toISOString().split('T')[0];
    } catch {
      return '';
    }
  }

  private formatDateToISO(dateStr: string | null | undefined): string | null {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toISOString();
    } catch {
      return null;
    }
  }

  private calculateStatus(
    quantity: number,
    minStock: number,
  ): 'inStock' | 'lowStock' | 'outOfStock' {
    if (quantity === 0) return 'outOfStock';
    if (quantity <= minStock) return 'lowStock';
    return 'inStock';
  }

  private buildProductData(): Partial<Product> {
    const formValue = this.productForm.value as any;

    const quantity = Number(formValue.quantity ?? 0);
    const minStock = Number(formValue.minStock ?? 0);
    const price = Number(formValue.price ?? 0);

    return {
      name: (formValue.name ?? '').toString().trim(),
      productCode: (formValue.PCode ?? '').toString().trim(),
      category: (formValue.category ?? '').toString().trim(),
      supplier: (formValue.supplier ?? '').toString().trim() || null,
      description: (formValue.description ?? '').toString().trim(),
      quantity,
      minStock,
      price,
      location: (formValue.location ?? '').toString().trim(),
      status: this.calculateStatus(quantity, minStock),
      lastRestocked: this.formatDateToISO(formValue.lastRestocked) ?? null,
    };
  }

  getErrorMessage(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;
    const label = this.getFieldLabel(fieldName);

    if (errors['required']) return `${label} is required.`;
    if (errors['minlength'])
      return `${label} must be at least ${errors['minlength'].requiredLength} characters.`;
    if (errors['maxlength'])
      return `${label} cannot exceed ${errors['maxlength'].requiredLength} characters.`;
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

  private extractErrorMessages(err: any): string {
    if (err?.error?.errors && Array.isArray(err.error.errors)) {
      const errorMessages = err.error.errors
        .map((error: any) => error.msg || error.message)
        .filter(Boolean)
        .join('. ');
      return errorMessages || 'Validation failed';
    }

    // Check for single error message
    if (err?.error?.message) {
      return err.error.message;
    }

    return '';
  }

  onCancel() {
    this.viewStateService.setListView();
    this.router.navigate(['/products']);
  }

  async handleSubmit() {
    this.productForm.markAllAsTouched();

    if (!this.productForm.valid) {
      this.toastService.error('Please fix the errors in the form before submitting.');
      return;
    }

    if (this.submitting) return;
    this.submitting = true;

    const productData = this.buildProductData();

    try {
      if (this.mode() === 'edit' && this.editingProductId()) {
        await this.updateProduct(this.editingProductId()!, productData);
      } else {
        await this.createProduct(productData);
      }
    } finally {
      this.submitting = false;
    }
  }

  private async createProduct(product: Partial<Product>) {
    this.loading = true;
    this.error = null;

    let categoryValue: string = (product.category as string) || '';
    const categories = this.categoriesService.categories();
    const matchedCategory = categories.find((c) => c.name === categoryValue);
    if (matchedCategory) {
      categoryValue = matchedCategory._id || categoryValue;
    }

    const newProduct: any = {
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      supplier: product.supplier ?? null,
      category: categoryValue,
      productCode: product.productCode || '',
      location: product.location || '',
      quantity: product.quantity || 0,
      minStock: product.minStock || 0,
      status: product.status || 'inStock',
      lastRestocked: product.lastRestocked ?? null,
    };

    console.log('Sending create data:', newProduct);

    try {
      await firstValueFrom(this.productsService.createProduct(newProduct));
      this.toastService.success('Product created successfully');
      this.navigateToProductsList();
    } catch (err: any) {
      console.error('Error creating product:', err);
      console.error('Server error body:', err?.error);

      // Extract validation errors from API response
      const errorMessages = this.extractErrorMessages(err);
      this.error = errorMessages || 'Failed to create product';
      if (this.error) {
        this.toastService.error(this.error);
      }
    } finally {
      this.loading = false;
    }
  }

  private async updateProduct(id: string, product: Partial<Product>) {
    if (!this.originalProduct) {
      this.error = 'Original product data not found';
      this.toastService.error(this.error);
      return;
    }

    this.loading = true;
    this.error = null;

    let categoryValue: string = product.category as string;
    const categories = this.categoriesService.categories();
    const matchedCategory = categories.find((c) => c.name === categoryValue);
    if (matchedCategory) {
      categoryValue = matchedCategory._id || categoryValue;
    }

    const updatedProduct: any = {
      name: product.name,
      productCode: product.productCode,
      category: categoryValue,
      supplier: product.supplier,
      description: product.description,
      quantity: product.quantity,
      minStock: product.minStock,
      price: product.price,
      location: product.location,
      status: product.status,
      lastRestocked: product.lastRestocked,
    };

    console.log('Sending update data:', updatedProduct);

    try {
      await firstValueFrom(this.productsService.updateProduct(id, updatedProduct));
      this.toastService.success('Product updated successfully');
      this.navigateToProductsList();
    } catch (err: any) {
      console.error('Error updating product:', err);
      console.error('Server error body:', err?.error);

      // Extract validation errors from API response
      const errorMessages = this.extractErrorMessages(err);
      this.error = errorMessages || 'Failed to update product';
      if (this.error) {
        this.toastService.error(this.error);
      }
    } finally {
      this.loading = false;
    }
  }

  private navigateToProductsList() {
    this.viewStateService.setListView();
    this.router.navigate(['/products']);
  }
}
