import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { UserProfileComponent } from './pages/user-profile/user-profile.component';


import {MatTableModule} from '@angular/material/table';



import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './material-module';





import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { HomeComponent } from './pages/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    ProfileEmployeeComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
   

    BrowserAnimationsModule,
   
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireMessagingModule, 
    MatNativeDateModule,
    DemoMaterialModule

  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent]
})
export class AppModule { }
