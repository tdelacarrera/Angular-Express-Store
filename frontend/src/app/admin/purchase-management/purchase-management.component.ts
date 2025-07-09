import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { IPurchase } from '../../models/purchase.model';

@Component({
  selector: 'app-purchase-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-management.component.html',
  styleUrl: './purchase-management.component.css'
})

export class PurchaseManagementComponent implements OnInit {
  purchases?: Array<IPurchase>
  totalPurchases: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;


  constructor(private dialog: Dialog, private apiService: ApiService) {}
  ngOnInit(): void {
    this.loadPurchases()
  }
  
  loadPurchases(): void {
    this.apiService.getPurchases(this.currentPage, this.pageSize).subscribe((data: any) => {
    this.purchases = data.purchases;
    this.totalPurchases = data.totalPurchases;
    this.totalPages = Math.ceil(this.totalPurchases / this.pageSize);
  });
}
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPurchases();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPurchases();
    }
  }
}



