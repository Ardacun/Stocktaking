import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  
  // Items
  items: any[] = [];
  
  // Inject item service
  constructor(private itemService: ItemService) { }

  // Get all items
  ngOnInit(): void {
    this.itemService.getItems().subscribe(item => {
      this.items = item;
    });
  }
}
