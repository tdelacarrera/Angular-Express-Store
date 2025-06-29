import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService){
    this.registerForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirm_password: ['',Validators.required],

    })
  }

  onSubmit(){
    if(this.registerForm.valid){
    this.apiService.createUser(this.registerForm.value).subscribe( {
      next: data => {
        console.log('usuario creado', data)
      },
      error: error => {
        console.error('error al crear usuario', error)
      }
    })
  }
    }
}
