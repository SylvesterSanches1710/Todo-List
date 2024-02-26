import { Component, Input } from '@angular/core';
import { TodoItem } from '../todo-item';
import { TodoApiService } from '../todo-api.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todoItem!: TodoItem;
  @Input() visible: boolean = true;

  constructor(private todoApiService: TodoApiService) { }

  toggleDone() {
    this.todoItem.done = !this.todoItem.done;
    this.todoApiService.editTodoItem(this.todoItem.id, this.todoItem).subscribe();
  }
}


