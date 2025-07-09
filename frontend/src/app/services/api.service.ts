import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { IUser } from '../models/user.model';
import { IPurchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseURL = "http://localhost:3000"

  constructor(private _httpClient: HttpClient) { }

  //Product

  public getProductsPage(page: number, productsPerPage: number) : Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${this.baseURL}/products?_page=${page}&_per_page=${productsPerPage}`);

  }
  
  public getProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(`${this.baseURL}/products`);
  }

  public getProductById(id: number)  : Observable<IProduct> {
        return this._httpClient.get<IProduct>(`${this.baseURL}/products/${id}`);
  }

  public getUserById(id: number) : Observable<IUser>{
    return this._httpClient.get<IUser>(`${this.baseURL}/users?id=${id}`)
  }

   public createProduct(formData: FormData): Observable<FormData> {
    return this._httpClient.post<FormData>(`${this.baseURL}/products`, formData);
  }

  public updateProduct(product: IProduct) : Observable<IProduct>{
    return this._httpClient.put<IProduct>(`${this.baseURL}/products/${product.id}`, product)
  }

  public deleteProduct(id: number): Observable<IProduct>{
    return this._httpClient.delete<IProduct>(`${this.baseURL}/products/${id}`);
  }

  //Purchase

  public getPurchases(currentPage: number, pageSize: number) : Observable<IPurchase[]> {
        return this._httpClient.get<IPurchase[]>(`${this.baseURL}/purchases?page=${currentPage}&pageSize=${pageSize}`);
  }

  public createPurchase(purchase: IPurchase) : Observable<IPurchase>{
    return this._httpClient.post<IPurchase>(`${this.baseURL}/purchases`, purchase)
  }

  //Users
  public getUsers(currentPage: number, pageSize: number): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(`${this.baseURL}/users?page=${currentPage}&pageSize=${pageSize}`);
  }

  public createUser(user: IUser) : Observable<IUser>{
    return this._httpClient.post<IUser>(`${this.baseURL}/users`, user)
  }

  public updateUser(user: IUser) : Observable<IUser>{
    return this._httpClient.put<IUser>(`${this.baseURL}/users/${user.id}`, user)
  }

  public deleteUser(id: number): Observable<IUser>{
    return this._httpClient.delete<IUser>(`${this.baseURL}/users/${id}`);
  }

  public loginUser(credentials: { email: string, password: string }): Observable<{ token: string, user: IUser }>{
    return this._httpClient.post<{ token: string, user: IUser }>(`${this.baseURL}/users/login`, credentials)
  }
}
