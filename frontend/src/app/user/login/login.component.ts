import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup
  loginError = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }
  
  onSubmit() {

    if (this.loginForm.valid) {
       const credentials = this.loginForm.value;
       this.apiService.loginUser(credentials).subscribe({
        next: response => {
          this.authService.login(response.token, response.user)
          this.router.navigate(['/products']); 
        },
        error: error => {
          console.error('Error en el login:', error);
          this.loginError = true;
        }}); 
    }  
 }
}