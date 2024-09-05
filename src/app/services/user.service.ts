import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }
  
  // Returns all users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  // Returns user by id
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }
  
  // Creates new user
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
  
  // Updates user
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, user);
  }
  
  // Deletes user
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
