import { Component, OnInit, inject } from '@angular/core';
import { UserService, User } from '../user.service';
import { RouterLink, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  userID: string ='';
  user!: User;

  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID') || '';
    this.fetchUser();
    
  }

  fetchUser(): void {
    if(this.userID){
    this.userService.getUserById(this.userID).subscribe(user => {
      this.user = user;
    });
  }
}
}
