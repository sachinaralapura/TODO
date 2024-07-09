import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'todo-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Input() completed: number;
  @Input() notCompleted: number;

  currentFilter: string = 'all';

  @Output()
  onFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  onFilterChange() {
    this.onFilterEvent.emit(this.currentFilter);
  }
}
