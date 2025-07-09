import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICartItem } from '../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { IPurchase } from '../models/purchase.model';
import { IUser } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

  }

  removeCartItem(id: number) {
    this.cartService.removeCartItem(id)
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();

  }
  finishPurchase() {
    const user = this.authService.getUser();
      if (!user) {
        return;
      }

  const purchase: IPurchase = {
    id: 0,
    price: this.totalPrice,
    user: user,
    products: this.cartItems.map(item => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity
    }))
  };
  this.apiService.createPurchase(purchase).subscribe({
    next: (response) => {
      this.cartService.clearCart();
      this.cartItems = [];
      this.totalPrice = 0;
    },
    error: (error) => {
      console.error(error);
    }
  });
  this.cartService.clearCart();
}
}
