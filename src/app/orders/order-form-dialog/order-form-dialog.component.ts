import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.css'],
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatOptionModule, HttpClientModule],
  standalone: true
})
export class OrderDialogComponent implements OnInit {
  orderForm: FormGroup;
  items: any[] = [];  // List to store items fetched from the database

  constructor(private orderService: OrderService, public dialogRef: MatDialogRef<OrderDialogComponent>) {
    this.orderForm = new FormGroup({
      items: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Fetch items from inventory
    
  }

  onNoClick(): void {
    console.log("No button clicked");
  }

  onSubmit(): void {
    console.log("Submit button clicked");
  }
}
