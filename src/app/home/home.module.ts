import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    NavBarComponent
  ]
})
export class HomeModule { }
