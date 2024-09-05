import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  // Users
  users: any[] = [];
  
  // Inject user service
  constructor(private userService: UserService) { }

  // Get all users
  ngOnInit(): void {
    this.userService.getUsers().subscribe(user => {
      this.users = user;
    });
  }
}
