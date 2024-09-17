import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDialogComponent } from '../order-form-dialog/order-form-dialog.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders: Order[] = [];
  statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  searchTerm = ''; // For search input
  selectedStatus = ''; // For filtering by status
  currentPage = 1; // For pagination
  
  constructor( private router: Router, private dialog: MatDialog, private orderService: OrderService) { }

  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  openOrderDialog(order: any): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '500px',
      data: {
        order: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("New order: " + result);
      }
    });
  }
  // Filter orders based on search term and status
  get filteredOrders(): Order[] {
    if (this.searchTerm) { // Filter by search term
      return this.orders.filter(orders => orders.order_date);
    } else if (this.selectedStatus) { // Filter by status
      return this.orders.filter(order => order.order_status === this.selectedStatus);
    } else { // No filter
      return this.orders;
    }
  }

  // Change page
  changePage(page: number): void {
    this.currentPage = page;
  }

  // Add order
  addOrder(): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '500px',
      data: {
        order: this.orders
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("New order: " + result);
      }
      this.orderService.getOrders().subscribe((orders: Order[]) => {
        this.orders = orders;
      });
    });
  }
}