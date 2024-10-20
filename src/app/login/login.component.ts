import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service'; // Import the AuthService
import { Inject } from '@angular/core';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  loginSuccess: string = '';
  username: string = '';
  password: string = '';
  
  loginError: string = '';

  constructor( private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    // Add your initialization logic here
    
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log('Login check', username + ' pwd:' + password);

    this.authService.login(username, password).subscribe(
      (user) => {
        if (user && user.password === password) {
          // Handle successful login
          console.log('Login successful');
          this.loginSuccess = 'Login successful';
          if (user.role === 'receptionist') {
            this.router.navigate(['/patient']);
          } else {
          this.router.navigate(['/visits']);
          }
        } else {
          this.errorMessage = 'Invalid username/password';
          console.log('Invalid username/password');
        }
      },
      (error: any) => { // Explicitly type 'error' as 'any'
        this.errorMessage = 'An error occurred';
      }
    );
  }

  login(): void {
    console.log('Login check', this.username + ' pwd:' + this.password);

    this.authService.login(this.username, this.password).subscribe(
      (user) => {
        if (user && user.password === this.password) {
          // Handle successful login
          console.log('Login successful');
          this.loginSuccess = 'Login successful';
          if (user.role === 'patient' ) {
            this.router.navigate(['/visits']);
          }
          if (user.role === 'receptionist' || user.role === 'doctor') {
            this.router.navigate(['/patient']);
          }
        } else {
          // Handle login error
          this.loginError = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Login error', error);
        this.loginError = 'An error occurred during login';
      }
    );
  }
}

//if user type is receptionist, navigate to patient page" and press enter   
 
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
