import { Injectable, OnInit } from '@angular/core';
import { ICartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ICartItem[] = [];

  constructor() { 
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart)
    }

  }

  addCartItem(item: ICartItem) {
    this.cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }



    updateCartItem(item: ICartItem) {
    const index = this.cartItems.findIndex(i => i.id === item.id);

    if (index !== -1) {
      this.cartItems[index].quantity = item.quantity;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }


  removeCartItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
  }

  getCartItems(): ICartItem[] {
    return this.cartItems;
  }

  getCartItem(item: ICartItem) {
    return this.cartItems.find(i => i.id === item.id);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }

}
