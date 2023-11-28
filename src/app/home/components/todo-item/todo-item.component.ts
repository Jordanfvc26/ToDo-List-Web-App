import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoDetail } from '../../interfaces/todo.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  /*Variables*/
  static type: boolean;
  static task: ToDoDetail = {
    id: 0,
    title: '',
    description: '',
    completed: false
  };
  titleModal: string = "";
  typeLocal!: boolean;
  taskLocal!: ToDoDetail;
  taskDetailForm!: FormGroup;

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private toastr: ToastrService
  ) { }

  /*ngOnInit()*/
  ngOnInit() {
    this.createTaskDetailForm();
    this.taskLocal = TodoItemComponent.task;
    /*If type is true, we use this component to edit the task, else, we use this component to view task detail*/
    if (TodoItemComponent.type) {
      this.titleModal = "Editar tarea";
      this.typeLocal = true;
    }
    else {
      this.titleModal = "Ver detalle de tarea";
      this.typeLocal = false;
    }
    this.getTaskDetailToForm();
  }

  /*Create the form to edit task*/
  createTaskDetailForm() {
    this.taskDetailForm = this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.: ]*$"),
        ],
      ],
      completed: [''],
      description: ['',
        [Validators.required],
      ],
    });
  }

  /*Method that obtains the detail of the task to load in the form*/
  getTaskDetailToForm() {
    this.taskDetailForm.patchValue({
      title: this.taskLocal.title,
      completed: this.taskLocal.completed ? "Completada" : "Pendiente",
      description: this.taskLocal.description
    });
  }

  /*Method for edit task by ID*/
  editTask() {
    console.log(this.taskLocal.id);
    if (this.todoService.editTask(this.taskLocal.id, {
      id: this.taskLocal.id,
      title: this.taskDetailForm.get('title')?.value,
      description: this.taskDetailForm.get('description')?.value,
      completed: false
    }) != null)
      this.showToastSuccess("Tarea actualizada con éxito", "Éxito");
    else
      this.showToastError("Error", "No se pudo actualizar la tarea");

    this.modal.dismissAll();
  }

  /*Alert for success action*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Alert for Error action*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  //Icons
  iconEditTask = iconos.faEdit;
}
