import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../todo-item';
import { TodoApiService } from '../todo-api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoItems: TodoItem[] = [];
  filteredTodoItems: TodoItem[] = [];
  newTodoItem: TodoItem = { id: 0, title: '', done: false }; 
  editingTodoItem: TodoItem | null = null;
  filter: string = 'all';
  searchQuery: string = '';

  constructor(private todoApiService: TodoApiService) { }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(): void {
    this.todoApiService.getTodoList()
      .subscribe(todoItems => {
        this.todoItems = todoItems;
        this.applyFilter();
      });
  }

  applyFilter(): void {
    if (this.filter === 'all') {
      this.filteredTodoItems = this.todoItems;
    } else {
      this.filteredTodoItems = this.todoItems.filter(item => {
        if (this.filter === 'completed') {
          return item.done;
        } else {
          return !item.done;
        }
      });
    }
    this.filterTodoItems();
  }

  filterTodoItems(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredTodoItems = this.filteredTodoItems;
    } else {
      this.filteredTodoItems = this.filteredTodoItems.filter(item =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  addTodoItem(): void {
    if (this.newTodoItem.title.trim()) {
      this.todoApiService.addTodoItem(this.newTodoItem)
        .subscribe(todoItem => {
          this.todoItems.push(todoItem);
          this.applyFilter();
          this.newTodoItem = { id: this.newTodoItem.id + 1, title: '', done: false }; // Reset newTodoItem after adding
        });
    }
  }

  editTodoItem(todoItem: TodoItem): void {
    this.editingTodoItem = todoItem; 
  }

  saveEditedTodoItem(): void {
    if (this.editingTodoItem) {
      this.todoApiService.editTodoItem(this.editingTodoItem.id, this.editingTodoItem)
        .subscribe(() => {
          const index = this.todoItems.findIndex(item => item.id === this.editingTodoItem!.id);
          if (index !== -1) {
            this.todoItems[index] = { ...this.editingTodoItem! };
            this.applyFilter();
          }
          this.editingTodoItem = null; 
        });
    }
  }

  cancelEdit(): void {
    this.editingTodoItem = null; 
  }

  deleteTodoItem(id: number): void {
    this.todoApiService.deleteTodoItem(id)
      .subscribe(() => {
        this.todoItems = this.todoItems.filter(item => item.id !== id);
        this.applyFilter();
      });
  }

  onFilterChange(event: any): void {
    this.filter = event.target.value;
    this.applyFilter();
  }

  onSearchInputChange(): void {
    this.applyFilter();
  }
}





