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
import { AuthState } from '../types/authState';
import { loginActions } from '../store/actionGroups';
import { selectErrorMessage, selectLoading } from '../store/features';
import { formAuthService } from '../shared/form.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    public formAuthService: formAuthService
  ) {
    this.loginForm = this.formAuthService.initializeLoginForm();
    this.errorMessage$ = this.store.select(selectErrorMessage);
    this.loading$ = this.store.select(selectLoading);
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

  goToRegister() {
    this.store.dispatch(loginActions.loginFailure({ error: '' }));
    this.router.navigate(['register']);
    this.loginForm.reset();
  }
}
