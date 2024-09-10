import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {

  // Order
  order: any;

  // Inject order service
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  // Get order by id
  ngOnInit(): void {
    this.orderService.getOrderById(this.route.snapshot.params['id']).subscribe(order => {
      this.order = order;
    });
  }

}
