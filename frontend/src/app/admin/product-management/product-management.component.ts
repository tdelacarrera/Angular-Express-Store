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
  currentPage: number = 1;
  totalProducts: number = 0;
  totalPages: number = 0;
  productsPerPage: number = 12;
  pages: number[] = [];
  baseApiUrl = "";


  constructor(private dialog: Dialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.baseApiUrl = this.apiService.baseURL;
    this.loadProducts()
    this.loadTotalProducts()
  }

  loadTotalProducts() {
    this.apiService.getProducts().subscribe((data: IProduct[]) => {
      this.totalProducts = data.length;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }

  loadProducts() {
    this.apiService.getProductsPage(this.currentPage, this.productsPerPage).subscribe((data: any) => {
      this.products = Array.isArray(data) ? data : data.data;
    });
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
}



