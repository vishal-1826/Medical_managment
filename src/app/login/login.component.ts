import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService,private http: HttpClient,private router: Router) {
    // Initialize the form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  // Getters for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    // Call AuthService to login
    this.authService.login(email, password).subscribe(
      (response) => {
        // If successful, store the token and navigate
        localStorage.setItem('token', response.token);

        this.errorMessage = '';  // Clear any previous error
        // Optionally, navigate to a protected route
        console.log('Login successful:', response);
        this.router.navigate(['/product']);
      },
      (error) => {
        // If error, display message
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed:', error);
      }
    );
  }
}
