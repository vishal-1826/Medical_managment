import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';  // Your backend API
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  setCurrentUser(user: any, token: string) {
    localStorage.setItem('currentUser', JSON.stringify({ email: user.email, token }));
    this.currentUserSubject.next({ email: user.email, token });
  }

  // Other methods...
}
