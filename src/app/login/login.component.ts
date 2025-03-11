import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth/types/authState';
import { loginActions } from '../auth/store/actionGroups';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.initializeForm();
    this.loading$ = this.store.select((state) => state.auth.loading);
    this.errorMessage$ = this.store.select((state) => state.auth.errorMessage);
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.store.dispatch(
        loginActions.loginFailure({ error: 'All fields must be filled' })
      );
      return;
    }

    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find(
        (u: any) => u.username === user.username && u.password === user.password
      );

      if (existingUser) {
        this.router.navigate(['home']);
      } else {
        this.store.dispatch(
          loginActions.loginFailure({ error: 'Incorrect name or password' })
        );
      }
    }
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  goToRegister() {
    this.store.dispatch(loginActions.loginFailure({ error: '' }));
    this.router.navigate(['register']);
  }
}
