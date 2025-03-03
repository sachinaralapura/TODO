import { Component, inject } from "@angular/core";
import { TaskServices } from "../Services/task.services";
import { Task } from "../Models/task.model";
import { tick } from "@angular/core/testing";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  taskservice: TaskServices = inject(TaskServices);
  showCreateTaskForm: boolean = false;
  errorMessage: string;
  sucessMessage: string;
  editMode: boolean = false;
  editTask: Task | null = null;
  searchText: string = "";
  Tasks: Task[] = [];
  completed: number;
  notComleted: number;
  currentFilter: string = "all";

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll() {
    this.taskservice.getAllTask().subscribe({
      next: (result) => {
        this.Tasks.push(...result);
        this.completed = this.Tasks.filter((t) => t.completed === true).length;
        this.notComleted = this.Tasks.length - this.completed;
      },
      error: (errormessage) => (this.errorMessage = errormessage),
      complete: () => console.log("all tasks fetched"),
    });
  }

  // ----------------------------------------------------

  deleteTask(id: string) {
    this.taskservice.deleteTask(id).subscribe({
      next: (_result) => {
        this.Tasks = this.Tasks.filter((task) => task._id !== id); // this is delete in Task which is memory
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.log("deletion completed"),
    });
  }

  // -------------------------------------------------------

  createOrEditTask(task: Task) {
    // for editing

    if (this.editMode) {
      const editedTask: Task = {
        title: task.title,
        description: task.description,
        schedule: task.schedule,
        completed: task.completed,
        updated: Date().toString(),
        _id: this.editTask._id,
        notes: task.notes,
        created: this.editTask.created,
      };
      console.log(task.created);
      this.taskservice.editTask(editedTask).subscribe({
        next: (result) => {
          console.log(result);
          // remove the item in the Task and concating result this ( this gives fast response)
          this.Tasks = this.Tasks.filter(
            (task) => task._id !== this.editTask._id,
          );
          this.Tasks = this.Tasks.concat(result);
          // set the edit mode back
          this.editMode = false;
          this.editTask = null;
        },
        error: (errormessage) => (this.errorMessage = errormessage),
        complete: () => console.log("Edit sucessfull"),
      });

      // for creating new task
    } else {
      this.taskservice.createTask(task).subscribe({
        next: (result) => {
          console.log(result);
          this.Tasks = this.Tasks.concat(result); // pushing the result doesn't change the reference of Task
        },
        error: (errormessage) => {
          this.errorMessage = errormessage;
          console.log(errormessage);
        },
        complete: () => console.log("task added complete"),
      });
    }

    this.CloseCreateTaskForm();
  }

  // --------------------------------------------------------
  taskChecked(task: Task) {
    this.editMode = true;
    this.editTask = task;
    this.createOrEditTask(task);
  }

  openEdit(task: Task) {
    this.editTask = task;
    this.editMode = true;
    this.showCreateTaskForm = true;
  }

  OpenCreateTaskForm() {
    this.editMode = false;
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  search(searchText: string) {
    this.searchText = searchText;
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }
}
