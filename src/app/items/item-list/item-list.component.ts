import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
//import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemFormDialogComponent } from '../item-form-dialog/item-form-dialog.component';
@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  
  // Items
  items: any[] = [];
  categories = ['Electronics', 'Furniture', 'Clothing']; // Categories
  searchTerm = ''; // For search input
  selectedCategory = ''; // For filtering by category
  currentPage = 1; // For pagination

  
  // Inject item service
  constructor(private itemService: ItemService, private dialog: MatDialog,  /* private CategoryService: CategoryService */) { }

  // Get all items
  ngOnInit(): void {
    this.itemService.getItems().subscribe(item => {
      this.items = item;
    });
  }

  // Filter items based on search term and category
  get filteredItems(): any[] {
    if (this.searchTerm) { // Filter by search term
      return this.items.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else if (this.selectedCategory) { // Filter by category
      return this.items.filter(item => item.category === this.selectedCategory);
    } else { // No filter
      return this.items;
    }
  }

  // Edit item
  editItem(item: any): void {
    /*
    this.itemService.updateItem(item).subscribe(updatedItem => {
      const index = this.items.findIndex(i => i.id === updatedItem.id);
      this.items[index] = updatedItem;
    });
    */
    const dialogRef = this.dialog.open(ItemFormDialogComponent, {
      width: '500px',
      data: {
        item: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Updated item: " + result);
      }
    });
  }

  // Delete item
  deleteItem(item: any): void {
    this.itemService.deleteItem(item).subscribe(() => {
      const index = this.items.findIndex(i => i.id === item.id);
      this.items.splice(index, 1);
    });
  }

  // Change page
  changePage(page: number): void {
    this.currentPage = page;
  }

  /*
  onSubmit(): void {
    const item = this.form.value;
     this.CategoryService.getCategoryByName(item.category).subscribe(category => {
      item.categoryId = category.id;
    }); 
    this.itemService.createItem(item).subscribe(newItem => {
      this.items.push(newItem);
    });
    this.form.reset();
  }
  */

  addItem(): void {
    const dialogRef = this.dialog.open(ItemFormDialogComponent, {
      width: '500px',
      data: {
        categories: this.categories
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("New item: " + result);
      }
    });
  }


}
