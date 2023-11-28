import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoDetail } from '../../interfaces/todo.interface';
import { SweetAlerts } from '../../alerts/alerts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, FontAwesomeModule, DragDropModule],
      declarations: [TodoListComponent],
      providers: [TodoService, SweetAlerts],
    });
    
    
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    /*Call function for create form before each test*/
    component.createAddTaskForm();
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should add task to tasksTodo', () => {
    const initialTasksLength = component.tasksTodo.length;
    /*Test data entry*/
    component.addTaskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
    });
    /*Function that adds the task*/
    component.addTask();

    expect(component.tasksTodo.length).toEqual(initialTasksLength + 1);

    /*Check that the task has the correct values*/
    const addedTask: ToDoDetail = component.tasksTodo[initialTasksLength];
    expect(addedTask.title).toEqual('Test Task');
    expect(addedTask.description).toEqual('Test Description');
    expect(addedTask.completed).toBeFalsy();
  });

  it('should reset the form after adding task', () => {
    component.addTaskForm.setValue({
      title: 'Task for test',
      description: 'Description of task for test',
    });

    /*Call the function to add the task*/
    component.addTask();

    /*To verify that the form has been reset*/
    expect(component.addTaskForm.value.title).toEqual('');
    expect(component.addTaskForm.value.description).toEqual('');
  });
});
