import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../models/product.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {
  editModal: FormGroup
  product: IProduct

  constructor(private fb: FormBuilder, private apiService: ApiService, @Inject(DIALOG_DATA) public data: IProduct, private dialogRef: DialogRef) {
    this.editModal = this.fb.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      price: [data.price, Validators.required],
      category: [data.category, Validators.required],
      stock: [data.stock, Validators.required],
    })
    this.product = data;
  }

  onEdit() {
    if (this.editModal.valid) {
      this.apiService.updateProduct(this.editModal.value).subscribe({
        next: data => {
          console.log('producto editado', data)
          this.dialogRef.close();
        },
        error: error => {
          console.log('error al editar producto', error)
        }
      })
    }
  }


  onCloseModal() {
    this.dialogRef.close();
  }
}
