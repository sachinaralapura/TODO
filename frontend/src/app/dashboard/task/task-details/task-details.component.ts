import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../Models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  @Output() CloseDetailsEvent: EventEmitter<null> = new EventEmitter<null>();
  @Input() task: Task;
  
  closeDetails() {
    this.CloseDetailsEvent.emit(null);
  }
}
