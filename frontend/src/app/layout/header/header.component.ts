import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.isLogin();
    this.authService.isAuthenticatedSubject.subscribe(auth => {
    this.isAuth = auth;
    const userData = localStorage.getItem('auth_user');
    if(userData){
      const user = JSON.parse(userData);
      this.isAdmin = user.role == 'admin';
    }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}