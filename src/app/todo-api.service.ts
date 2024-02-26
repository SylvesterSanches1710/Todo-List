import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  getTodoItem(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  addTodoItem(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, { title: todoItem.title, done: todoItem.done });
  }

  editTodoItem(id: number, todoItem: TodoItem): Observable<TodoItem> {
    return this.http.patch<TodoItem>(`${this.apiUrl}/${id}`, todoItem);
  }

  deleteTodoItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  searchTodoItems(query: string): Observable<TodoItem[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<TodoItem[]>(`${this.apiUrl}/search`, { params });
  }
}


