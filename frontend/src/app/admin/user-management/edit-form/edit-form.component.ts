import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../models/user.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-edit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {
  editModal: FormGroup

  constructor(private fb: FormBuilder, private apiService: ApiService, @Inject(DIALOG_DATA) public data: IUser, private dialogRef: DialogRef) {
    this.editModal = this.fb.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role, Validators.required],
    })
  }

  onEdit() {
    if (this.editModal.valid) {
      this.apiService.updateUser(this.editModal.value).subscribe({
        next: data => {
          console.log('usuario editado', data)
          this.dialogRef.close();
        },

        error: error => {
          console.log('error al editar usuario', error)
        }
      })
    }
  }
  onCloseModal() {
    this.dialogRef.close();
  }

}




