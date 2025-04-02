import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})

export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    // Simple authentication logic (can be replaced with real service calls)
    if (this.username === 'admin' && this.password === 'password') {
      this.router.navigate(['/admin']);
    } else {
      alert('Invalid username or password!');
    }
  }
}