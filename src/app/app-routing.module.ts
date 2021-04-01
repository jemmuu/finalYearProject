import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path:'addemployee', component:AddEmployeeComponent},
  {path:'home',component:HomeComponent},





  {path:'employeeList', component : EmployeeListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
