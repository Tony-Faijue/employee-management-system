import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { employeeLoginComponent } from './employee-login/employee-login.component';
import { PayStubComponent } from './pay-stub/pay-stub.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminComponent } from './admin-login/admin-login.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'emplog', component: employeeLoginComponent },
  { path: 'employee-info', component: EmployeeInfoComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'pay-stub', component: PayStubComponent },
  { path: 'schedule', component: ScheduleComponent },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'employee-dashboard/:userID', component: EmployeeDashboardComponent},
  {path: 'employee-profile/:userID', component: EmployeeProfileComponent},
  {path: 'admin-dashboard/:userID', component: AdminDashboardComponent},
  {path: 'admin-profile/:userID', component: AdminProfileComponent},
  {path: 'manage-company/:userID', component: ManageCompanyComponent},
  {path: 'manage-groups/:userID', component: ManageGroupsComponent},
  {path: 'manage-project/:userID', component: ManageProjectComponent},
  {path: 'manage-tasks/:userID', component: ManageTasksComponent},
  {path: 'manage-employees/:userID', component: ManageEmployeesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}