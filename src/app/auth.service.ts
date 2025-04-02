import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private validEmployee = { username: 'employee1', password: 'password123' }; // Example credentials

  authenticate(username: string, password: string): boolean {
    return (
      username === this.validEmployee.username &&
      password === this.validEmployee.password
    );
  }
}

