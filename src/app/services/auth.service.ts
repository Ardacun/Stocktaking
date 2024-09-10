import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // API url
  private apiUrl = 'http://localhost:8080/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isLoggedIn$ = this.loggedIn.asObservable();
  // Inject http client and router
  constructor(private http: HttpClient, private router: Router) { }
  
  // Login user
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if(response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  // Register user
  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/register', user);
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    const decoded = this.jwt_decode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
  }

  private jwt_decode(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join(''));

    return JSON.parse(jsonPayload);
  }

  private checkToken(token: string): boolean {
    if (!token) {
      return false;
    }
    const decoded = this.jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  }
}
