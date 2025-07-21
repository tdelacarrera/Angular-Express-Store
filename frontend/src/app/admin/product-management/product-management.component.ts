import { Component, OnInit, NgModule } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product.model';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFormComponent } from './edit-form/edit-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { CreateFormComponent } from './create-form/create-form.component';
import { DeleteFormComponent } from './delete-form/delete-form.component';

@Component({
  selector: 'app-product-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit {

  products?: Array<IProduct>
  totalProducts: number = 0;
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  baseApiUrl = "";


  constructor(private dialog: Dialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.baseApiUrl = this.apiService.baseURL;
    this.loadProducts()
  }

  onChangePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page
      this.loadProducts()
    }
  }

  openEditModal(product: IProduct) {
    const dialogRef = this.dialog.open(EditFormComponent, {
      maxWidth: 'auto',
      maxHeight: 'auto',
      hasBackdrop: true,
      autoFocus: true,
      data: product
    });

    dialogRef.closed.subscribe(result => {
      this.ngOnInit();
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      maxWidth: 'auto',
      maxHeight: 'auto',
      hasBackdrop: true,
      autoFocus: true
    });

    dialogRef.closed.subscribe(result => {
      this.ngOnInit();
    });
  }

  openDeleteModal(product: IProduct) {
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: 'auto',
      height: 'auto',
      hasBackdrop: true,
      autoFocus: true,
      data: product
    });

    dialogRef.closed.subscribe(result => {
      this.ngOnInit();
    });
  }

  loadProducts(): void {
  this.apiService.getProducts(this.currentPage, this.pageSize).subscribe((data: any) => {
    this.products = data.products;
    this.totalProducts = data.totalProducts;
    this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
  });
}
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  onImageError(event: Event) : void {
    const img = event.target as HTMLImageElement;
    img.src = 'default-image.jpg';
  }

}



