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
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(loginActions.login({ username, password }));
      // const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      // if (
      //   storedUser.username === username &&
      //   storedUser.password === password
      // ) {
      //   this.router.navigate(['home']);
      // } else if (this.loginForm.value.username == '') {
      //   console.log('error');
      // }
    }
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  goToRegister() {
    this.router.navigate(['register']);
  }
}
