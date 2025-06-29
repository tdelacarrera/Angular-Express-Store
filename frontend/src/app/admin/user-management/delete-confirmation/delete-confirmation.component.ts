import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-delete-confirmation',
  imports: [],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {
  user: IUser

  constructor(private apiService: ApiService, @Inject(DIALOG_DATA) private data: IUser, private dialogRef: DialogRef) {
    this.user = data;
  }

  onDelete(id: number) {
    this.apiService.deleteUser(id).subscribe({
      next: data => {
        console.log('usuario eliminado', data)
        this.dialogRef.close();
      },
      error: error =>
        console.log('error al eliminar usuario', error)
    })
  }
  onCloseModal() {
    this.dialogRef.close();
  }
}

