import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { PurchaseManagementComponent } from './admin/purchase-management/purchase-management.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin/users', component: UserManagementComponent },
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'admin/products', component: ProductManagementComponent },
    { path: 'admin/purchases', component: PurchaseManagementComponent },
];
