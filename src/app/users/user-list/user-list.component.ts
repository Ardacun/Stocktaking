import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  // Users
  users: User[] = [];
  
  // Inject user service
  constructor(private userService: UserService, public dialog: MatDialog) { }

  // Get all users
  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      data: {
        user: null,
        isEditMode: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("New user: " + result);
        this.userService.getUsers().subscribe((users: User[]) => {
          this.users = users;
        });
      }
    });
  }
  
  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      data: {
        user: user,
        isEditMode: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Updated user: " + result);
        this.userService.getUsers().subscribe((users: User[]) => {
          this.users = users;
        });
      }
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      const index = this.users.findIndex(i => i.id === user.id);
      this.users.splice(index, 1);
    });
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
