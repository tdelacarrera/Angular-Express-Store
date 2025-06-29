import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-delete-form',
  imports: [],
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.css'
})
export class DeleteFormComponent{

  product: IProduct

  constructor(private apiService: ApiService, @Inject(DIALOG_DATA) private data: IProduct, private dialogRef: DialogRef){
    this.product = data
  }


  onDelete(id: number) {
    this.apiService.deleteProduct(id).subscribe({
      next: data => {
        console.log('producto eliminado', data)
        this.dialogRef.close();
      },
      error: error =>
        console.log('error al eliminar producto', error)
    })
  }

  onCloseModal() {
    this.dialogRef.close();
  }
}
