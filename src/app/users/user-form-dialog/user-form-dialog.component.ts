import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

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
  roles = ['Admin', 'User']; // Roles
  

  constructor(private dialogRef: MatDialogRef<UserFormDialogComponent>, private authService: AuthService) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      
      const user = this.userForm.value;
  
      this.authService.register(user).subscribe(
        () => {
          this.dialogRef.close(true);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
