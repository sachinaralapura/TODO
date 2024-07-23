import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchText: string = '';

  //create a event
  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    this.searchEvent.emit(this.searchText);
  }
}
