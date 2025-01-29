import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent {
  isLogin = true; // Toggle between login and signup forms
  loginForm: FormGroup;
  signupForm: FormGroup;
  errorMessage: string = '';
  loading=false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {
    // Initialize Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Initialize Signup Form
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getters for Login Form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Getters for Signup Form controls
  get signupEmail() {
    return this.signupForm.get('email');
  }

  get signupPassword() {
    return this.signupForm.get('password');
  }

  // Toggle between Login and Signup forms
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  // Handle Login Submission
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loading = true;
    this.spinnerService.show();
    this.authService.login(email, password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.errorMessage = ''; // Clear any error messages
        this.router.navigate(['/product']);
        this.loading = false;
        this.spinnerService.hide();
      },
      (error) => {
        this.errorMessage = 'Invalid email or password.';
        this.loading = false;
        this.spinnerService.hide();
      }
    );
  }

  // Handle Signup Submission
  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    const { email, password } = this.signupForm.value;

    this.authService.signin(email, password).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        this.errorMessage = ''; // Clear error messages
        this.toggleForm(); // Redirect back to login form after successful signup
      },
      (error) => {
        this.errorMessage = 'Error during signup. Please try again.';
        console.error('Signup failed:', error);
      }
    );
  }
}
