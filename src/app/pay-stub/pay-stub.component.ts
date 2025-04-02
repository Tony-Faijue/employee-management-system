import { Component } from '@angular/core';

@Component({
  selector: 'app-pay-stub',
  templateUrl: './pay-stub.component.html',
  styleUrls: ['./pay-stub.component.css']
})
export class PayStubComponent {
  // Example employee pay stub data
  payStub = {
    employeeName: 'John Doe',
    position: 'Software Engineer',
    payPeriod: 'March 1 - March 15, 2025',
    grossPay: 5000,
    taxes: 1200,
    deductions: 300,
    netPay: 3500
  };
}