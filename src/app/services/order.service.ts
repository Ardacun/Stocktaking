import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
