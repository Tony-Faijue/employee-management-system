import { Component, inject } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';

  errorMessage: string = '';


  //login method
  login():void{
    this.authService.authenticate(this.email, this.password).then(user => {
      console.log('Logged in successfully:', user);

      //navigate to dashboards
      if(user.userrole === 'Admin'){
        this.router.navigate(['/admin-dashboard', user.id]);
      } else if(user.userrole ==='Employee'){
        this.router.navigate(['/employee-dashboard', user.id]);
      } 

    }).catch((error) =>{
      console.error('Login error:', error);
      this.errorMessage = error.message;
      alert('Login Unsuccessful! Incorrect Username or Password!');

    });
  }
  //logout method
  logout():void{
    this.authService.logout().then(() =>{
      console.log('User logged out');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  }
}
