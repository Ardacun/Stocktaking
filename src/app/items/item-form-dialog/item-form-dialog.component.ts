import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemService } from '../../services/item.service';
import { CategoryService } from '../../services/category.service';
import { Item } from '../../models/item.model';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-item-form-dialog',
  templateUrl: './item-form-dialog.component.html',
  styleUrls: ['./item-form-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule, MatInputModule, MatFormFieldModule],
})

export class ItemFormDialogComponent implements OnInit {
  
  itemForm!: FormGroup;
  categories = [] as string[]; // List to store categories
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  // Use MAT_DIALOG_DATA if using Angular Material dialog
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Fetch categories from database
    this.categoryService.getCategories().subscribe((category : Category[]) => {
      for(let i = 0; i < category.length; i++) { // Push category names to categories array
        this.categories.push(category[i]["name"]);
      }
    });

    // If there's data passed in, it's edit mode
    this.isEditMode = this.data.isEditMode;
    
    if (this.data && this.data.item) {
      // Populate form with data when in edit mode
      this.itemForm = new FormGroup({
        id: new FormControl(this.data.item.id),  // Assign the id here
        name: new FormControl(this.data.item.name, Validators.required),
        category_id: new FormControl(this.data.item.category_id, Validators.required),
        description: new FormControl(this.data.item.description, Validators.required),
        price: new FormControl(this.data.item.price, Validators.required),
        quantity: new FormControl(this.data.item.quantity, Validators.required),
      });
      this.isEditMode = true;
    } else {
      this.itemForm = this.fb.group({
        name: [this.data?.name || '', Validators.required],
        category_id: [this.data?.category_id || '', Validators.required],
        description: [this.data?.description || '', Validators.required],
        price: [this.data?.price || null, Validators.required],
        quantity: [this.data?.quantity || null, Validators.required],
      });
    }
  }

  onSubmit(): void {
    let item : Item = this.itemForm.value;
    if(this.isEditMode == false) { // Create new item
      this.categoryService.getCategoryByName(item.category_id.toString()).subscribe(category => {
        item.category_id = category[0].id;
        this.itemService.createItem(item).subscribe((newItem: Item) => {
          this.dialogRef.close(true);
        });
      });
    } else { // Update item
      item.id = this.data.item.id;
      console.log(item);
      this.categoryService.getCategoryByName(item.category_id.toString()).subscribe(category => {
            console.log(category);
            item.category_id = category[0].id; // Assign the correct category_id
            this.itemService.updateItem(item.id, item).subscribe((updatedItem: Item) => {
              this.dialogRef.close(true);
            });
        });
    }
  }
}


