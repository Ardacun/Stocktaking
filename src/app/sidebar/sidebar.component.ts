import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isLoggedIn = false; // Check if user is logged in

  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.authService.isAuthenticated();
  }
  
  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
