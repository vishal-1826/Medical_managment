import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // Your backend API

  constructor(private http: HttpClient) {
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if a token exists
  }
  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, { email, password });
  }

 addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  getProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/products`);
  }

  updateProduct(productId: number, product: any): Observable<any> {
    // Convert the date format
    if (product.expirationDate) {
      const date = new Date(product.expirationDate);
      product.expirationDate = date.toISOString().split('T')[0];
    }
    return this.http.put(`${this.apiUrl}/products/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }
}
