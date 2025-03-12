import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectErrorMessage, selectLoading } from '../store/features';
import { Store } from '@ngrx/store';
import { AuthState } from '../types/authState';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class formAuthService {
  registerForm!: FormGroup;
  loading$!: Observable<boolean>;
  isPasswordVisible: boolean = false;
  errorMessage$!: Observable<string | null>;

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>
  ) {
    this.initializeRegisterForm();
  }
  initializeRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    return this.registerForm;
  }

  initializeLoginForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    return this.registerForm;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
