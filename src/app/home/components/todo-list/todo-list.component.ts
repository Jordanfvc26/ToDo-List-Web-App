import { Component } from '@angular/core';
import { ToDoDetail } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SweetAlerts } from '../../alerts/alerts.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  /*Variables*/
  addTaskForm!: FormGroup;
  totalTasksTodo: number = 0;
  totalTasksCompleted: number = 0;
  tasksTodo: ToDoDetail[] = [];
  tasksCompleted: ToDoDetail[] = [];

  /*Drop event to tasks and change status*/
  drop(event: CdkDragDrop<ToDoDetail[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      /*Get the task to be dragged and change the status*/
      const taskSelected: ToDoDetail = event.previousContainer.data[event.previousIndex];
      if (!taskSelected.completed)
        taskSelected.completed = true;
      else
        taskSelected.completed = false;

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      /*For update counters of tasks*/
      this.totalTasksTodo = this.tasksTodo.length;
      this.totalTasksCompleted = this.tasksCompleted.length;
    }
  }

  /*Constructor*/
  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private sweetAlerts: SweetAlerts,
    private modal: NgbModal,
    private toastr: ToastrService) { }

  /*ngOnInit()*/
  ngOnInit(): void {
    this.createAddTaskForm();
  }

  /*Add task to list*/
  addTask() {
    const lastId = this.tasksTodo.length > 0 ? this.tasksTodo[this.tasksTodo.length - 1].id : 0;
    let body: ToDoDetail = {
      id: lastId + 1,
      title: this.addTaskForm.get('title')?.value,
      description: this.addTaskForm.get('description')?.value,
      completed: false
    }
    this.tasksTodo = this.todoService.addTask(body);
    this.addTaskForm.reset();
    this.totalTasksTodo = this.tasksTodo.length;
    this.showToastSuccess("Tarea agregada con éxito", "Éxito");
  }

  /*Method for delete a task by ID*/
  deleteTask(taskName: string, idTask: number) {
    this.sweetAlerts.alertConfirmCancel("Eliminar tarea", "¿Está seguro de eliminar la tarea \"" + taskName + "\"?").then(respuesta => {
      if (respuesta.value == true) {
        this.tasksTodo = this.todoService.deleteTask(idTask);
        this.totalTasksTodo = this.tasksTodo.length;
        this.showToastSuccess("Tarea eliminada", "Éxito");
      }
    });
  }

  /*Method to open the modal that allows editing a task*/
  openModalTodoItem(viewTaskDetail: any, task: ToDoDetail, type: boolean) {
    this.modal.open(viewTaskDetail, { size: 'lg', centered: true });
    TodoItemComponent.task = task;
    TodoItemComponent.type = type;
  }

  /*Method for edit a task by ID*/
  editTask(idTask: number) {
    this.todoService.getTaskById(idTask);
  }

  /*Method for delete all task*/
  deleteAllTasks() {
    this.sweetAlerts.alertConfirmCancel("Eliminar todas las tareas", "¿Está seguro de eliminar todas las tareas pendientes y completadas, de su listado?").then(respuesta => {
      if (respuesta.value == true) {
        this.tasksTodo = this.todoService.deleteAllTasks();
        this.tasksCompleted = [];
        this.totalTasksTodo = this.tasksTodo.length;
        this.showToastSuccess("Tareas eliminadas con éxtio", "Éxito");
      }
    });
  }

  /*Create the form to add task*/
  createAddTaskForm() {
    this.addTaskForm = this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.: ]*$"),
        ],
      ],
      description: ['',
        [Validators.required],
      ],
    });
  }

  /*Alert for success action*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons*/
  iconAddTask = iconos.faPlusCircle;
  iconTodoTasks = iconos.faListUl;
  iconCompletedTasks = iconos.faCircleCheck;
  iconDeleteTask = iconos.faTrashAlt;
  iconEditTask = iconos.faEdit;
  iconViewTask = iconos.faEye;
  iconCompletedTask = iconos.faCircleCheck;
}
