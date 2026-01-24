import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  @Input() currentView: 'list' | 'create' = 'list';
  @Output() viewChange = new EventEmitter<'list' | 'create'>();

  addProduct() {
    this.viewChange.emit('create');
  }
}
