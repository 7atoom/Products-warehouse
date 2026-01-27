// src/app/services/toast.service.ts
import { Injectable, signal } from '@angular/core';
import {Toast} from '../utils/Toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  readonly toasts$ = this.toasts.asReadonly();
  private nextId = 0;

  show(type: Toast['type'], message: string, duration = 3000) {
    const id = this.nextId++;
    const toast: Toast = { id, type, message, duration };

    this.toasts.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string, duration = 3000) {
    this.show('success', message, duration);
  }

  error(message: string, duration = 4000) {
    this.show('error', message, duration);
  }

  info(message: string, duration = 3000) {
    this.show('info', message, duration);
  }

  warning(message: string, duration = 3000) {
    this.show('warning', message, duration);
  }

  remove(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}
