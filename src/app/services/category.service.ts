import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  // API url
  private apiUrl = 'http://localhost:8080/api/categories';
  
  // Inject http client
  constructor(private http: HttpClient) { }
  
  // Returns all categories
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  // Returns category by id
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  // Returns category by name
  getCategoryByName(name: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/name/' + name);
  }

  // Creates new category
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }
  
  // Updates category
  updateCategory(category: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, category);
  }
  
  // Deletes category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
  
}
