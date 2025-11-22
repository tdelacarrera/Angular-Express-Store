import { Component, OnInit,NgModule } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

 constructor(private apiService: ApiService) {}
  products?: Array<IProduct>
  totalProducts: number = 0;
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  baseApiUrl = "";

  ngOnInit(): void {
    this.loadProducts()
    this.baseApiUrl = this.apiService.baseURL;
  }

  onChangePage(page: number){
    if(page > 0 && page <= this.totalPages){
      this.currentPage = page
      this.loadProducts()
    }
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

