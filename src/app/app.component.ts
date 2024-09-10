import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Item } from './models/item.model';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './services/item.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from './services/order.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, SidebarComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ItemService, AuthService, UserService, OrderService, CategoryService],
})
export class AppComponent {
  title = 'stocktaking';
}
