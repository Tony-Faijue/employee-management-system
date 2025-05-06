import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet, RouterLink} from '@angular/router';
import { Employee, UserService } from '../user.service';
import{subscribe} from '@angular/fire/data-connect';


@Component({
  selector: 'app-sign-up',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  //inject userservice
  userService = inject(UserService);

  employee: Employee = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phonenum: '',
    userrole: '',

    //below attributes can be initially null

    companyid: '',
    groupids: [],
    projectids: [],
    taskids: [],
    salary: 0,
    position: ''
  };

  signUp(){
    this.userService.addUser(this.employee);
  }
}
