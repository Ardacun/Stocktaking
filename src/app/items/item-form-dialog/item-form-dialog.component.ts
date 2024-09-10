import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-item-form-dialog',
  templateUrl: './item-form-dialog.component.html',
  styleUrls: ['./item-form-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule, MatInputModule, MatFormFieldModule],
})
export class ItemFormDialogComponent implements OnInit {
  @Input() item: any;  // Optional input to receive item data for editing
  itemForm!: FormGroup;
  categories = ['Electronics', 'Clothing', 'Books', 'Furniture'];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // Use MAT_DIALOG_DATA if using Angular Material dialog
  ) {}

  ngOnInit(): void {
    // If there's data passed in, it's edit mode
    this.isEditMode = !!this.data;
    
    this.itemForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      category: [this.data?.category || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      price: [this.data?.price || null, Validators.required],
      quantity: [this.data?.quantity || null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.dialogRef.close(this.itemForm.value); // Return form value when dialog is closed
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
