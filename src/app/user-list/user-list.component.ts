import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import{User, UserService} from '../user.service';
import{subscribe} from '@angular/fire/data-connect';

@Component({
  selector: 'app-user-list',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  //injecting userservice from user.service.ts
  userService = inject(UserService);

  //User Object Used in the Form
  user: User = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phonenum: '',
    userrole: '',
  }

  users: User[] = []
  
  editUserID: string | null = null;

  ngOnInit(){
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  addUser(){
    this.userService.addUser(this.user);
    this.resetFrom();
  }

  resetFrom(){
    this.user = {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      address: '',
      phonenum: '',
      userrole: ''
    }
    this.editUserID = null;
  }

  setEditUser(editUser: User){
    this.user = {... editUser};
    this.editUserID = editUser.id;
  }

  deleteUser(id:string){
    this.userService.deleteUser(id);
  }
  updateUser(){
    this.userService.updateUser(this.user);
    this.resetFrom();
  }



}
