import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [FormsModule, CommonModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class Todos implements OnInit {
  todos: any[] = [];
  newTodoTitle = '';
  newTodoIsDone: boolean = false;
  newTodoUserId = '';
  newTodoCreatedAt: string = '';
  showAddModal: boolean = false;
  editTodoId: number | null = null;
  editTitle = '';
  editIsDone: boolean = false;
  showEditModal: boolean = false;
  editUserId: string = '';
  editCreatedAt: string = '';

  constructor(private supabase: SupabaseService) {}

  ngOnInit() {
    this.loadTodos();
  }

  async loadTodos() {
    const { data, error } = await this.supabase.getTodos();
    if (!error) this.todos = data;
  }

  async openAddModal() {
    this.showAddModal = true;
    this.newTodoTitle = '';
    this.newTodoIsDone = false;
    // Get logged in user id
    const user = await this.supabase.getUser();
    this.newTodoUserId = user?.data?.user?.id || '';
    this.newTodoCreatedAt = new Date().toISOString();
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  async addTodo() {
    if (!this.newTodoTitle.trim()) return;
    await this.supabase.addTodo({
      title: this.newTodoTitle,
      is_done: this.newTodoIsDone,
      user_id: this.newTodoUserId,
      created_at: this.newTodoCreatedAt
    });
    this.closeAddModal();
    this.loadTodos();
  }

  editTodo(todo: any) {
    this.editTodoId = todo.id;
    this.editTitle = todo.title;
    this.editIsDone = todo.is_done;
    this.editUserId = todo.user_id;
    this.editCreatedAt = todo.created_at;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editTodoId = null;
    this.editTitle = '';
    this.editIsDone = false;
    this.editUserId = '';
    this.editCreatedAt = '';
  }

  async saveEdit() {
    if (this.editTodoId && this.editTitle.trim()) {
      await this.supabase.updateTodo(this.editTodoId, this.editTitle, this.editIsDone);
      this.closeEditModal();
      this.loadTodos();
    }
  }

  cancelEdit() {
    this.closeEditModal();
  }

  showDeleteModal: boolean = false;
  todoToDelete: any = null;

  confirmDelete(todo: any) {
    this.todoToDelete = todo;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.todoToDelete = null;
  }

  async deleteTodoConfirmed() {
    if (this.todoToDelete) {
      await this.supabase.deleteTodo(this.todoToDelete.id);
      this.closeDeleteModal();
      this.loadTodos();
    }
  }
}
