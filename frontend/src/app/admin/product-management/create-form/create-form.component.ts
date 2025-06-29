import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {

  createModal: FormGroup
  selectedFile: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: DialogRef) {
    this.createModal = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
      file: [null, Validators.required]
    })
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

onCreate() {
    if (this.createModal.valid) {
        const formData = new FormData();

        // Append form data fields
        formData.append('name', this.createModal.value.name);
        formData.append('description', this.createModal.value.description);
        formData.append('price', this.createModal.value.price);
        formData.append('category', this.createModal.value.category);
        formData.append('stock', this.createModal.value.stock);
        formData.append('file', this.selectedFile, this.selectedFile.name);

        // Make API call with FormData
        this.apiService.createProduct(formData).subscribe({
            next: (data) => {
                console.log('Producto creado', data);
                this.dialogRef.close();
            },
            error: (error) => {
                console.log('Error al crear producto', error);
            }
        });
    }
}

/*
  onCreate() {
    if (this.createModal.valid) {
      this.apiService.createProduct(this.createModal.value).subscribe({
        next: data => {
          console.log('producto creado', data)
          this.dialogRef.close();
        },
        error: error => {
          console.log('error al crear producto', error)
        }
      })
    }
  }*/



  onCloseModal() {
    this.dialogRef.close();
  }
}
