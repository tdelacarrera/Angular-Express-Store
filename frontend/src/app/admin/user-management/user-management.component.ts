import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IUser } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { CreateFormComponent } from './create-form/create-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})

export class UserManagementComponent implements OnInit {
  users?: Array<IUser>

  constructor(private dialog: Dialog, private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: IUser[]) => {
      this.users = data
    })
  }


  openCreateModal() {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      width: 'auto',
      height: 'auto',
      hasBackdrop: true,
      autoFocus: true
    });
    
    dialogRef.closed.subscribe(result => {
      this.ngOnInit();
    });
  }

  openEditModal(user: IUser) {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: 'auto',
      height: 'auto',
      hasBackdrop: true,
      autoFocus: true,
      data: user
    });

    dialogRef.closed.subscribe(result => {
      this.ngOnInit();
    });
  }

  openDeleteModal(user: IUser) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: 'auto',
      height: 'auto',
      hasBackdrop: true,
      autoFocus: true,
      data: user
    });

    dialogRef.closed.subscribe(result => {
      this.ngOnInit();
    });
  }


  onDelete(id: number) {
    this.apiService.deleteUser(id).subscribe({
      next: data => {
        console.log('usuario eliminado', data)
        this.ngOnInit()
      },
      error: error =>
        console.log('error al eliminar usuario', error)
    })
  }

}


