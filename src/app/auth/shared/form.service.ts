import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../types/authState';

@Injectable({
  providedIn: 'root',
})
export class formAuthService {
  registerForm!: FormGroup;
  loading$!: Observable<boolean>;
  isPasswordVisible: boolean = false;
  errorMessage$!: Observable<string | null>;

  constructor(private fb: FormBuilder) {
    this.initializeRegisterForm();
    this.initializeLoginForm();
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    return this.registerForm;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
