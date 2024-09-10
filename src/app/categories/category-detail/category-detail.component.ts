import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})

export class CategoryDetailComponent {
  // Category
  category: any;

  // Inject category service
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  // Get category by id
  ngOnInit(): void {
    this.categoryService.getCategoryById(this.route.snapshot.params['id']).subscribe(category => {
      this.category = category;
    });
  }
}
