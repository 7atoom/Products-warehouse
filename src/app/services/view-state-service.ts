import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  readonly currentView = signal<'list' | 'create' | 'edit' | 'details'>('list');
  readonly editingProductId = signal<string | null>(null);

  setCreateView() {
    this.currentView.set('create');
    this.editingProductId.set(null);
  }

  setEditView(productId: string) {
    this.currentView.set('edit');
    this.editingProductId.set(productId);
  }

  setListView() {
    this.currentView.set('list');
    this.editingProductId.set(null);
  }

  setDetailsView(productId: string) {
    this.currentView.set('details');
    this.editingProductId.set(productId);
  }
}
