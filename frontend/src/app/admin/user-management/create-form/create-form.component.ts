import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent{
  createModal: FormGroup

  constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: DialogRef) {
    this.createModal = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['client', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    })
  }


  onCreate() {
    if (this.createModal.valid) {
      this.apiService.createUser(this.createModal.value).subscribe({
        next: data => {
          console.log('usuario creado', data)
          this.dialogRef.close();
        },
        error: error => {
          console.log('error al crear usuario', error)
        }
      })
    }
  }
  onCloseModal() {
    this.dialogRef.close();
  }
}
