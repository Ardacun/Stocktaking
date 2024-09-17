import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Item } from '../../models/item.model';
import { OrderItem } from '../../models/orderitem.model';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';
import { getCookie } from '../../../../cookie-utils';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CustomJwtPayload } from '../../models/custom-jwt-payload.model';
@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.css'],
  imports: [ReactiveFormsModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatOptionModule, HttpClientModule, CommonModule],
  standalone: true
})
export class OrderDialogComponent implements OnInit {
  @Input() order: any;  // Optional input to receive order data for editing
  orderForm: FormGroup; // Form to collect order details
  items: Item[] = [];  // List to store items fetched from the database
  userId: number | null = null; // User ID from the cookie
  userName: string | null = null; // User name from the cookie
  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
    private itemService: ItemService,
    private orderService: OrderService,
    private authService: AuthService) {
    this.orderForm = new FormGroup({
      items: new FormControl('', Validators.required)
    });
  }

  // Fetch items from inventory
  ngOnInit(): void {
    // Fetch items from inventory
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.items = items;
    });

    // Get user ID from cookie
    const token = getCookie('auth_token');
    console.log('Token:', token);
    if (token) {
      try{
      const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      this.userId = Number(decoded.id);
      this.userName = decoded.username;
      console.log('User ID:', this.userId);
      console.log('Username:', this.userName);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.error('No token found in cookie.');
    }
  }

  // Function to format Date to MySQL-compatible string (YYYY-MM-DD HH:MM:SS)
  formatDateToMySQL(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Submit the order form
  onSubmit(): void {
    // Get order-related details from the form or session
    const orderDetails: Omit<Order, 'id'> = {
      user_id: Number(this.userId), // Assuming you're getting user ID from the auth service
      order_date: this.formatDateToMySQL(new Date()),  // Current date for the order
      order_status: 'Pending',  // Initial status of the order
      order_total: 100,  // Function to calculate the total from the items
    };
    const items = this.orderForm.value.items; // Get items from the form
    console.log('Item:', items);
    // Create the order first
    this.orderService.createOrder(orderDetails as Order).subscribe(newOrder => {
      console.log('New order:', newOrder);
  
      
      // Create order items for the newly created order
      for (let i = 0; i < items.length; i++) {
  
        
        // Create order item data, use newOrder.id as the order_id
        const orderItemData = {
          item_id: items[i].id,
          quantity: items[i].quantity,
          order_id: newOrder[0].id,
          price: items[i].price = 100
        };
  
        // Create the order item
        this.orderService.addOrderItem(orderItemData as OrderItem).subscribe(newOrderItem => {
          this.order.push(newOrderItem);
        });
      }
  
      // Once all operations are done, close the dialog
      this.dialogRef.close(true);
    });
  }  
  
  // Calculate total
  calculateTotal(): number {
    let total = 0;
    const items = this.orderForm.value.items;
    items.forEach((item: any) => {
      total += item.price * item.quantity; // Assuming each item has a price and quantity
    });
    return total;
  }
  
}
