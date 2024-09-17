import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  // API url
  private apiUrl = 'http://localhost:8080/api/categories';
  
  // Inject http client
  constructor(private http: HttpClient) { }
  
  // Returns all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  
  // Returns category by id
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this.apiUrl + '/' + id);
  }

  // Returns category id by name
  getIdByName(name: string): Observable<Int16Array> {
    return this.http.get<Int16Array>(this.apiUrl + '/name/' + name);
  }

  // Returns category by name
  getCategoryByName(name: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/name/' + name);
  }

  // Creates new category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }
  
  // Updates category
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.apiUrl, category);
  }
  
  // Deletes category
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
  
}
