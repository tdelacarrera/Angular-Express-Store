import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICartItem } from '../models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

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
}
