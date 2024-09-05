import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  // Categories
  categories: any[] = [];

  // Inject category service
  constructor(private categoryService: CategoryService) { }

  // Get all categories
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(category => {
      this.categories = category;
    });
  }
}
