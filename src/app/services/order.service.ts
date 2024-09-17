import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderitem.model';
@Injectable({
  providedIn: 'root'
})

export class OrderService {
private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + '/' + id);
  }

  createOrder(order: Omit<Order, 'id'>): Observable<Order[]> {
    return this.http.post<Order[]>(this.apiUrl, order);
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.put<any>(this.apiUrl, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

  addOrderItem(OrderItem: OrderItem): Observable<OrderItem[]> {
    return this.http.post<OrderItem[]>(this.apiUrl + 'items', OrderItem);
  }

}
