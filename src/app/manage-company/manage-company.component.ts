import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../user.service';
import { CompanyService, Company } from '../company.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-manage-company',
  imports: [RouterLink, FormsModule, AdminDashboardComponent],
  templateUrl: './manage-company.component.html',
  styleUrl: './manage-company.component.css'
})
export class ManageCompanyComponent implements OnInit {
  companyService = inject(CompanyService);
  authService = inject(AuthService);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

currentUser!: User;
userID: string ='';

  company: Company = {
    id: '',
    companyname: '',
    address: '',
    phonenum: '',
  }
  isCompanyCreated: boolean = false;

  ngOnInit() {
    // Subscribe to the current user from AuthService
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID') || '';
    if (this.userID) {
      this.fetchUser();
    }
  }

  loadCompany(): void {
    if (this.currentUser.companyid) {
      this.companyService.getCompanyById(this.currentUser.companyid)
        .subscribe(company => {
          this.company = company;
          this.isCompanyCreated = true;
        });
    }
  }

  addCompany(): void {
    this.companyService.addCompany(this.company)
      .then(() => {
        this.currentUser.companyid = this.company.id;
        this.userService.updateUser(this.currentUser);
        this.isCompanyCreated = true;
        alert('Company created successfully!');
      })
      .catch(error => {
        console.error('Error creating company:', error);
        alert('Error creating company.');
      });
  }

  updateCompany(): void {
    this.companyService.updateCompany(this.company)
      .then(() => {
        alert('Company updated successfully!');
      })
      .catch(error => {
        console.error('Error updating company:', error);
        alert('Error updating company.');
      });
  }

  deleteCompany(): void {
    this.companyService.deleteCompany(this.company.id)
      .then(() => {
        this.currentUser.companyid = '';
        this.userService.updateUser(this.currentUser);
        this.isCompanyCreated = false;
        this.company = {
          id: '',
          companyname: '',
          address: '',
          phonenum: '',
        };
        alert('Company deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting company:', error);
        alert('Error deleting company.');
      });
  }
  fetchUser(): void {// Use the fetched userID to load the user
    this.userService.getUserById(this.userID).subscribe(user => {
      this.currentUser = user;
      // If the user already belongs to a company, load its details.
      if (this.currentUser.companyid) {
        this.loadCompany();
      } else {
        // Otherwise, we're in "create" mode
        this.isCompanyCreated = false;
      }
    });
  }
  
  

}
