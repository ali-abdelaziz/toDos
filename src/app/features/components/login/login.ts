import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../shared/services/supabase';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async login() {
    const { error } = await this.supabase.signIn(this.email, this.password);
    if (!error) {
      this.router.navigate(['/todos']);
    } else {
      alert('Login failed');
    }
  }
}
