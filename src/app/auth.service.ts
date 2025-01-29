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
}
