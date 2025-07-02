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


  constructor(private dialog: Dialog, private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getPurchases().subscribe((data: IPurchase[]) => {
      this.purchases = data
          console.log(this.purchases);
    })
  }
}



