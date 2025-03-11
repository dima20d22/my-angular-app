// registerForm!: FormGroup;
//   isPasswordVisible: boolean = false;

//   errorMessage$: Observable<string | null>;

// ngOnInit(): void {
//     this.loading$ = this.store.select(selectLoading);
//     this.errorMessage$ = this.store.select(selectErrorMessage);
//   }

//   constructor(
//     private fb: FormBuilder,
//     private store: Store<{ auth: AuthState }>,
//     private router: Router
//   ) {
//     this.initializeForm();

//     this.errorMessage$ = this.store.select((state) => state.auth.errorMessage);
//   }

//  initializeForm() {
//      this.registerForm = this.fb.group({
//        username: ['', [Validators.required, Validators.minLength(3)]],
//        password: ['', [Validators.required, Validators.minLength(6)]],
//      });
//    }

//  togglePasswordVisibility() {
//     this.isPasswordVisible = !this.isPasswordVisible;
//   }
