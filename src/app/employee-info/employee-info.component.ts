import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

interface Employee {
  id: number;
  name: string;
  address: string;
  maritalStatus: string;
  position: string;
  resume?: File;
  skills: string[];
}

@Component({
  selector: 'app-employee-info',
  imports: [FormsModule, RouterLink, RouterOutlet, ReactiveFormsModule, NgFor],
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent {
  employeeForm: FormGroup;
  employee: Employee = {
    id: 1,
    name: 'John Doe',
    address: '123 Main St, Cityville',
    maritalStatus: 'Single',
    position: 'Software Developer',
    skills: ['JavaScript', 'Angular']
  };
  uploadedResume?: File;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: [this.employee.name, Validators.required],
      address: [this.employee.address, Validators.required],
      maritalStatus: [this.employee.maritalStatus, Validators.required],
      position: [this.employee.position, Validators.required],
      skills: ['']
    });
  }

  handleFileInput(event: any): void {
    this.uploadedResume = event.target.files[0];
    console.log('Uploaded resume:', this.uploadedResume?.name);
  }

  addSkill(skill: string): void {
    if (skill && !this.employee.skills.includes(skill)) {
      this.employee.skills.push(skill);
      this.employeeForm.controls['skills'].reset();
    }
  }

  removeSkill(skill: string): void {
    this.employee.skills = this.employee.skills.filter(s => s !== skill);
  }

  saveEmployee(): void {
    if (this.employeeForm.valid) {
      this.employee = { ...this.employee, ...this.employeeForm.value };
      console.log('Updated employee info:', this.employee);
      alert('Employee details updated successfully!');
    }
  }
}