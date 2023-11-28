import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';


//Children routers 
const routes: Routes = [
  {
    path: 'todo-list', component: TodoListComponent
  },
  {
    path: 'todo-item', component: TodoItemComponent
  },
  {
    path: "",
    redirectTo: "todo-list",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }