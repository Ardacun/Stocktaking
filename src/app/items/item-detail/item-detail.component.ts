import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  // Item
  item: any;

  // Inject item service
  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  // Get item by id
  ngOnInit(): void {
    this.itemService.getItemById(this.route.snapshot.params['id']).subscribe(item => {
      this.item = item;
    });
  }

}
