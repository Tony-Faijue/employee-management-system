import { Component, Input, OnInit, inject } from '@angular/core';
import {UserService, User} from '../user.service';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [RouterLink],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
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
