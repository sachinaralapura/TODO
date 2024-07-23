import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Task } from '../../Models/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  @Output() CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() EmitTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() editTask: Task | null = null;
  @Input() editMode: boolean;
  @ViewChild('formRef') formRef: NgModel;

  OnCloseForm() {
    this.CloseForm.emit(false);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.formRef.control.patchValue(this.editTask);
    }, 0);
  }

  onSubmit() {
    let complete = false;
    if (this.formRef.value.completed == true) {
      complete = true;
    }
    const task: Task = {
      completed: complete,
      title: this.formRef.value.title,
      description: this.formRef.value.description,
      notes: this.formRef.value.notes,  
      schedule: this.formRef.value.schedule,
    };

    this.EmitTask.emit(task);
  }
}
