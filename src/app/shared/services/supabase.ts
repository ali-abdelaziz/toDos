import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getTodos() {
    return this.supabase.from('todos').select('*');
  }

  addTodo(todo: { title: string; is_done: boolean; user_id: string; created_at: string }) {
    return this.supabase.from('todos').insert([todo]);
  }

  deleteTodo(id: number) {
    return this.supabase.from('todos').delete().eq('id', id);
  }

  updateTodo(id: number, title: string, is_done: boolean) {
    return this.supabase.from('todos').update({ title, is_done }).eq('id', id);
  }
}
