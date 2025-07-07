import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/components/home/home').then(c => c.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/components/login/login').then(c => c.Login)
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/components/todos/todos').then(c => c.Todos)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
