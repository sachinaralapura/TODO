import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Models/task.model';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task;
  @Output() DeleteTaskEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() EditTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() CheckedEvent: EventEmitter<Task> = new EventEmitter<Task>();

  emitTaskToDelete(id: string) {
    this.DeleteTaskEvent.emit(id);
  }

  emitTaskToEdit(task: Task) {
    this.EditTaskEvent.emit(task);
  }

  taskChecked(task: Task) {
    this.CheckedEvent.emit(task);
  }
}
