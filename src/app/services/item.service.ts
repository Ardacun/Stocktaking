import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  
  // API url
  private apiUrl = 'http://localhost:8080/api/items';
  
  // Inject http client
  constructor(private http: HttpClient) { }
  
  // Returns all items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Returns item by id
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(this.apiUrl + '/' + id);
  }

  // Creates new item
  createItem(item: Item): Observable<Item> {
    return this.http.post<any>(this.apiUrl, item);
  }

  // Updates item
  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(this.apiUrl + '/' + id, item);
  }

  // Deletes item
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

}
