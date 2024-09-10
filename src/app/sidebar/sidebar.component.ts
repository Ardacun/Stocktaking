import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
