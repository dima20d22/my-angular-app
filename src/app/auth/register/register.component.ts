import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginActions, registerActions } from '../store/actionGroups';
import { AuthState } from '../types/authState';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FormBuilder],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isPasswordVisible: boolean = false;

  errorMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.initializeForm();

    this.errorMessage$ = this.store.select((state) => state.auth.errorMessage);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find((u: any) => u.username === user.username);

      if (existingUser) {
        this.store.dispatch(
          registerActions.registerFailure({ error: 'Name is already taken' })
        );
        return;
      }

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      this.store.dispatch(registerActions.register({ user }));

      this.router.navigate(['home']);
    }
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  goToLogin() {
    this.store.dispatch(loginActions.loginFailure({ error: '' }));
    this.router.navigate(['login']);
  }
}
