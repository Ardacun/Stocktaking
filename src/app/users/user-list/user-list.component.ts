import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  // Users
  users: any[] = [];
  
  // Inject user service
  constructor(private userService: UserService, public dialog: MatDialog) { }

  // Get all users
  ngOnInit(): void {
    this.userService.getUsers().subscribe(user => {
      this.users = user;
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      data: {
        user: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("New user: " + result);
      }
    });
  }
  
  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      data: {
        user: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Updated user: " + result);
      }
    });
  }

  deleteUser(user: any): void {
    this.userService.deleteUser(user).subscribe(() => {
      const index = this.users.findIndex(i => i.id === user.id);
      this.users.splice(index, 1);
    });
  }
}
