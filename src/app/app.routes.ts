import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { employeeLoginComponent } from './employee-login/employee-login.component';
import { PayStubComponent } from './pay-stub/pay-stub.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminComponent } from './admin-login/admin-login.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { UserListComponent } from './user-list/user-list.component';
import {SignUpComponent} from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: employeeLoginComponent },
  { path: 'employee-info', component: EmployeeInfoComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'pay-stub', component: PayStubComponent },
  { path: 'schedule', component: ScheduleComponent },
  {path: 'user-list', component: UserListComponent},
  {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}