import { Component, OnInit,NgModule } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

 constructor(private apiService: ApiService) {}
  products?: Array<IProduct>
  currentPage: number = 1;
  totalProducts: number = 0;
  totalPages: number = 0;
  productsPerPage: number = 12;
  baseApiUrl = "";
  pages: number[] = []; 

  ngOnInit(): void {
    this.loadProducts()
    this.loadTotalProducts()
    this.baseApiUrl = this.apiService.baseURL;
  }

  loadTotalProducts() {
    this.apiService.getProducts().subscribe((data: any) => {
    this.totalProducts = data.length;  // Obtener la cantidad total de productos
    this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);  // Calcular el total de páginas
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }

  loadProducts() {
    this.apiService.getProductsPage(this.currentPage, this.productsPerPage).subscribe((data: any) => {
       this.products = Array.isArray(data) ? data : data.data; 
    });
  }
  onChangePage(page: number){
    if(page > 0 && page <= this.totalPages){
      this.currentPage = page
      this.loadProducts()
    }
  }
} 

