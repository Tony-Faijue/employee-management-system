import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { User, UserService } from '../user.service';
import { Group, GroupService } from '../group.service';
import { Project, ProjectService } from '../project.service';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-manage-employees',
  imports: [FormsModule, RouterLink],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.css'
})
export class ManageEmployeesComponent implements OnInit {
  userService = inject(UserService);
  groupService = inject(GroupService);
  projectService = inject(ProjectService);
  taskService = inject(TaskService);
  activatedRoute = inject(ActivatedRoute);

  currentUser!: User;
  

  userID: string = '';
  employees: User[] =[];
  adminAndemp: User[] =[];
  groups: Group[] = [];
  projects: Project[] = [];
  tasks: Task[] = [];

  selectedEmployee: User = {
    id:'',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phonenum: '',
    userrole: '',
    companyid: '',

  }

  ngOnInit(): void {
    // Get the admin's userID from the route parameters.
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID') || '';
    if (this.userID) {
      this.fetchCurrentUser();
    }
  }

  fetchCurrentUser(): void {
    // Fetch the admin user from their userID.
    this.userService.getUserById(this.userID).subscribe(user => {
      this.currentUser = user;
      // Once the admin's info is available, load employees for their company.
      if (this.currentUser.companyid) {
        this.loadEmployees();
        this.loadEmployeesandAdmin();
      }
    });
  }

  loadEmployees(): void{
        // Retrieve ALL users and filter those that are employees in the same company.
    this.userService.getUsers().subscribe(users => {
      this.employees = users.filter(u =>
        u.companyid === this.currentUser.companyid && u.userrole === 'Employee'
      );
    });
  }

  loadEmployeesandAdmin():void{
    this.userService.getUsersByCompanyId(this.currentUser.companyid!).subscribe(users => {
      this.adminAndemp = users;
    });
  }

  updateEmployee(): void {
    // Update the employee using your userService.
    this.userService.updateUser(this.selectedEmployee);
    alert('Employee updated successfully!');
    this.loadEmployees();
    // Clear the selected employee.
    this.selectedEmployee = {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      address: '',
      phonenum: '',
      userrole: 'Employee',
      companyid: ''
    };
  }

  deleteEmployee(employeeId: string): void {
    // Fetch the employee record, remove the company affiliation, then update it.
    this.userService.getUserById(employeeId).subscribe(employee => {
      // Remove the company association.
      employee.companyid = ''; // or set to null if preferred
      this.userService.updateUser(employee);
      alert('Employee disassociated from the company successfully!');
      this.loadEmployees();
    });
  }

  setSelectedEmployee(employee: User): void {
    // Create a copy of the employee data so that the form is prefilled.
    this.selectedEmployee = { ...employee };
  }


}
