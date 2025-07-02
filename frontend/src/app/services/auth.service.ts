import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLogin());

  constructor(private cartService: CartService) {}


  login(token: string, user: IUser) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.isAuthenticatedSubject.next(false);
    this.cartService.clearCart();
  }
  isLogin() {
    return !!localStorage.getItem('auth_token');
  }

  getUser(): IUser | null {
    const user = localStorage.getItem('auth_user');
    if (user) {
      return JSON.parse(user) as IUser;
    }
    return null;
  }

}
