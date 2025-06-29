import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { ICartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product?: IProduct;
  productAdded = false;
  productUpdated = false;
  productRemoved = false;
  quantityError = false;
  addToCartForm: FormGroup
  baseApiUrl = "";

  constructor(private apiService: ApiService, private cartService: CartService, private _route: ActivatedRoute, private fb: FormBuilder) {
    this.addToCartForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.baseApiUrl = this.apiService.baseURL;
    this._route.params.subscribe(params => {
      const id = params['id'];
      this.apiService.getProductById(id).subscribe(data => {
        this.product = data;
      });
    });
  }

  onRemoveFromCart() {
    if (this.product) {
      this.cartService.removeCartItem(this.product.id);
      this.productRemoved = true;
    }
    setTimeout(() => {
      this.productRemoved = true;
    },
    3000
    );
  }

  onAddToCart() {
    if (this.product) {
      const cartItem: ICartItem = {
        id: this.product.id,
        quantity: this.addToCartForm.value.quantity,
        price: this.product.price,
        name: this.product.name
      };

      if (cartItem.quantity <= 0) {
        this.quantityError = true;
        return;
      }

      if (this.cartService.getCartItem(cartItem)) {
        this.cartService.updateCartItem(cartItem);
        this.productUpdated = true;
      }
      else {
        this.cartService.addCartItem(cartItem)
        this.productAdded = true;
      }
    }
    setTimeout(() => {
      this.productAdded = false;
      this.productUpdated = false;
      this.quantityError = false;
    }, 3000
    );
  }
}
