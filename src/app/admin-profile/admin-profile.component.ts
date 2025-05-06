import { Component, inject, Input, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-admin-profile',
  imports: [RouterLink, AdminDashboardComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

  userID: string ='';
  user !: User;

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
