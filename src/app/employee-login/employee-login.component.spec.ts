import { ComponentFixture, TestBed } from '@angular/core/testing';

import { employeeLoginComponent } from './employee-login.component';

describe('EmployeeLoginComponent', () => {
  let component: employeeLoginComponent;
  let fixture: ComponentFixture<employeeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [employeeLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(employeeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
