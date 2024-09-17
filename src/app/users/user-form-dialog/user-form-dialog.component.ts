import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, forwardRef, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatFormFieldModule],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.css'
})
export class UserFormDialogComponent {
  userForm: FormGroup;
  errorMessage = '';
  roles = ['admin', 'user']; // Roles
  isEditMode = false;

  constructor(private dialogRef: MatDialogRef<UserFormDialogComponent>, 
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) {
    
    this.isEditMode = this.data.isEditMode;
    
    if (this.data && this.data.user) {
      // Populate form with data when in edit mode
      this.userForm = new FormGroup({
        id: new FormControl(this.data.user.id),  // Assign the id here
        username: new FormControl(this.data.user.username, Validators.required),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        password: new FormControl('',Validators.required),
        role: new FormControl(this.data.user.role, Validators.required)
      });
      this.isEditMode = true;
    } else {
      this.userForm = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required)
      });
    }
  }

  // Submit form
  onSubmit(): void {
    if (this.userForm.valid) {
      const user : User = this.userForm.value;
      console.log(user);
      if(this.isEditMode == false) {
      this.authService.register(user).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          err => {
            this.errorMessage = err.error.message;
            console.log(err);
          }
      );
    } else {
      user.id = this.data.user.id;
      this.userService.updateUser(user.id,user).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          err => {
            this.errorMessage = err.error.message;
            console.log(err);
          }
      );
    }
  }
  }
}
