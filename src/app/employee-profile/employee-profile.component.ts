import { Component, inject, Input, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';


@Component({
  selector: 'app-employee-profile',
  imports: [RouterLink, EmployeeDashboardComponent],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit {
  
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
