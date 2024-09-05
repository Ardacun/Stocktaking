import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  
  // API url
  private apiUrl = 'http://localhost:8080/api/items';
  
  // Inject http client
  constructor(private http: HttpClient) { }
  
  // Returns all items
  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Returns item by id
  getItemById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  // Creates new item
  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }

  // Updates item
  updateItem(item: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, item);
  }

  // Deletes item
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }

}
