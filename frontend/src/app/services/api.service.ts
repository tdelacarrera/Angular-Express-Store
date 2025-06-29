import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseURL = "http://localhost:3000"

  constructor(private _httpClient: HttpClient) { }

  public getProductsPage(page: number, productsPerPage: number) : Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${this.baseURL}/products?_page=${page}&_per_page=${productsPerPage}`);

  }
  
  public getProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(`${this.baseURL}/products`);
  }

  public getProductById(id: number)  : Observable<IProduct> {
        return this._httpClient.get<IProduct>(`${this.baseURL}/products/${id}`);
  }

  public getUsers() : Observable<IUser[]> {
        return this._httpClient.get<IUser[]>(`${this.baseURL}/users`); 
  }

  public getUserById(id: number) : Observable<IUser>{
    return this._httpClient.get<IUser>(`${this.baseURL}/users?id=${id}`)
  }
/*
  public createProduct(product: IProduct) : Observable<IProduct>{
    return this._httpClient.post<IProduct>(`${this.baseURL}/products`, product)
  }
*/
    public createProduct(formData: FormData): Observable<FormData> {
    return this._httpClient.post<FormData>(`${this.baseURL}/products`, formData);
}

  public updateProduct(product: IProduct) : Observable<IProduct>{
    return this._httpClient.put<IProduct>(`${this.baseURL}/products/${product.id}`, product)
  }

  public deleteProduct(id: number): Observable<IProduct>{
    return this._httpClient.delete<IProduct>(`${this.baseURL}/products/${id}`);
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
