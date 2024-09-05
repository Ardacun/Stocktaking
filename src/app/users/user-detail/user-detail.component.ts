import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  // User
  user: any;

  // Inject user service
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  // Get user by id
  ngOnInit(): void {
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe(user => {
      this.user = user;
    });
  }
}
