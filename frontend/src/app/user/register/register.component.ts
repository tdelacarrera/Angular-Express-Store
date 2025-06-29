import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerSucess = false;
  registerError = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router){
    this.registerForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirm_password: ['',[Validators.required]],

    } ,
    {validators: (group) => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirm_password')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  });

  }

  onSubmit(){
    this.registerError = false;

    if(this.registerForm.valid){
    this.apiService.createUser(this.registerForm.value).subscribe( {
      next: data => {
        console.log('usuario creado', data)
        this.registerSucess = true;
        setTimeout(() => {
            this.router.navigate(['/products']);
        }, 1000 );
      },
      error: error => {
        console.error('error al crear usuario', error)
        this.registerError = true;
      }
    })
  }
    }
}
