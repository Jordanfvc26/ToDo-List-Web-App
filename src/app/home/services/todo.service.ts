import { Injectable } from '@angular/core';
import { ToDoDetail } from '../interfaces/todo.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private tasksArray: ToDoDetail[] = [];
  private todosSubject: BehaviorSubject<ToDoDetail[]> = new BehaviorSubject<ToDoDetail[]>(this.tasksArray);

  /*Method to get all tasks*/
  getAllTasks(): Observable<ToDoDetail[]> {
    return this.todosSubject.asObservable();
  }

  /*Method to add a task to the list*/
  addTask(todo: ToDoDetail) {
    this.tasksArray.push(todo);
    return this.tasksArray;
  }

  /*Method to delete a task from list by ID*/
  deleteTask(idTask: number) {
    const index = this.tasksArray.findIndex(todo => todo.id === idTask);
    if (index !== -1) {
      this.tasksArray.splice(index, 1);
      this.todosSubject.next([...this.tasksArray]);
    }
    return this.tasksArray;
  }

  /*Method to get a task by ID for edit*/
  getTaskById(idTask: number) {
    const index = this.tasksArray.findIndex(todo => todo.id === idTask);
    if (index !== -1) {
      return this.tasksArray[index];
    }
    return null;
  }

  /*Method for edit task by ID*/
  editTask(idTask: number, taskDetail: ToDoDetail) {
    const index = this.tasksArray.findIndex(todo => todo.id === idTask);
    if (index !== -1) {
      this.tasksArray[index].title = taskDetail.title;
      this.tasksArray[index].description = taskDetail.description;
      return this.tasksArray[index];
    }
    return null;
  }

  /*Method for delete all tasks (clear the array)*/
  deleteAllTasks(){
    this.tasksArray = [];
    return this.tasksArray;
  }
}
