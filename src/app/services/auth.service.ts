import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // API url
  private apiUrl = 'http://localhost:8080/api/auth';
  
  // Inject http client
  constructor(private http: HttpClient) { }
  
  // Login user
  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Register user
  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/register', user);
  }

  // Logout user
  logout(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/logout');
  }

  // Check if user is logged in
  isLoggedIn(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/isloggedin');
  }

}
