import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, RouterLink, NgIf, NgFor],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminComponent {
username: any;
password: any;
  constructor(private router: Router) {}

  isLoggedIn: boolean = false; // ✅ Define isLoggedIn

  login(): void {
    // Sample logic for authentication
    this.isLoggedIn = true; // Change state on successful login
    alert('Login successful!');
  }

  logout(): void {
    this.isLoggedIn = false; // Change state on logout
  }

}