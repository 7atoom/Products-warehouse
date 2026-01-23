import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  currentView : 'list' | 'create' = "list";

  setView(view: 'list' | 'create') {
    this.currentView = view;
  }

}
