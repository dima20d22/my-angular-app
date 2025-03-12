import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginActions, registerActions } from '../store/actionGroups';
import { AuthState } from '../types/authState';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectErrorMessage } from '../store/features';
import { formAuthService } from '../shared/form.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FormBuilder],
})
export class RegisterComponent {
  errorMessage$!: Observable<string | null>;
  registerForm!: FormGroup;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    public formAuthService: formAuthService
  ) {
    this.registerForm = this.formAuthService.initializeRegisterForm();
    this.errorMessage$ = this.store.select(selectErrorMessage);
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
      this.registerForm.reset();
      this.router.navigate(['home']);
    }
  }

  goToLogin() {
    this.store.dispatch(loginActions.loginFailure({ error: '' }));
    this.router.navigate(['login']);
    this.registerForm.reset();
  }
}
