import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Task } from '../Models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  http: HttpClient = inject(HttpClient);
  errorMessage: string | null = null;

  getAllTask() {
    // const headers = new HttpHeaders({
    //   authorization:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhjMzllMDQ1MmVlYjE4Y2FkZTgyMmUiLCJlbWFpbCI6InNhY2hpbi5hcmFsYXB1cmFAZ21haWwuY29tIiwiaWF0IjoxNzIwNTEzMDY4fQ.krAC_tiAByNDXG33krSfBGVOjH97MjQoCt0k4n5JaII',
    // });

    return this.http.get<Task[]>('http://localhost:5000/todo/tasks/all').pipe(
      catchError((err) => {
        this.setErrorMessage(err);
        return throwError(() => this.errorMessage);
      })
    );
  }

  createTask(task: Task) {
    // const headers = new HttpHeaders({
    //   authorization:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhjMzllMDQ1MmVlYjE4Y2FkZTgyMmUiLCJlbWFpbCI6InNhY2hpbi5hcmFsYXB1cmFAZ21haWwuY29tIiwiaWF0IjoxNzIwNTEzMDY4fQ.krAC_tiAByNDXG33krSfBGVOjH97MjQoCt0k4n5JaII',
    // });

    return this.http
      .post<Task>('http://localhost:5000/todo/tasks/newTask', task)
      .pipe(
        catchError((err) => {
          this.setErrorMessage(err);
          return throwError(() => this.errorMessage);
        })
      );
  }

  editTask(task: Task) {
    // const headers = new HttpHeaders({
    //   authorization:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhjMzllMDQ1MmVlYjE4Y2FkZTgyMmUiLCJlbWFpbCI6InNhY2hpbi5hcmFsYXB1cmFAZ21haWwuY29tIiwiaWF0IjoxNzIwNTEzMDY4fQ.krAC_tiAByNDXG33krSfBGVOjH97MjQoCt0k4n5JaII',
    // });

    return this.http
      .put<Task>(`http://localhost:5000/todo/tasks/editTask/${task._id}`, task)
      .pipe(
        catchError((err) => {
          this.setErrorMessage(err);
          return throwError(() => this.errorMessage);
        })
      );
  }

  deleteTask(id: string) {
    // const headers = new HttpHeaders({
    //   authorization:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhjMzllMDQ1MmVlYjE4Y2FkZTgyMmUiLCJlbWFpbCI6InNhY2hpbi5hcmFsYXB1cmFAZ21haWwuY29tIiwiaWF0IjoxNzIwNTEzMDY4fQ.krAC_tiAByNDXG33krSfBGVOjH97MjQoCt0k4n5JaII',
    // });

    return this.http
      .delete(`http://localhost:5000/todo/tasks/deleteTask/${id}`)
      .pipe(
        catchError((err) => {
          this.setErrorMessage(err);
          return throwError(() => this.errorMessage);
        })
      );
  }

  setErrorMessage(httpError: HttpErrorResponse) {
    this.errorMessage = httpError.error.message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 1000);
  }
}
