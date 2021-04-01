

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebaseServiec/firebase.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { SharedDataService } from 'src/app/core/services/sharedData/shared-data.service';
import { ProfileEmployeeComponent } from 'src/app/profile-employee/profile-employee.component';





 @Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
  })
export class EmployeeListComponent implements AfterViewInit {
  displayedColumns: string[] = ['EmpId', 'name', 'designation', 'email', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   private _employee: any;
   

  constructor(private firestoreService : FirebaseService,
             private sharedData :SharedDataService,
             private _bottomSheet: MatBottomSheet,
             private loginService :LoginService,
             private _snackBar: MatSnackBar,
             public router :Router ) {   
    
  }

  ngOnInIt()
  {
   this.loginService.chkLogIn();
  }
  ngAfterViewInit() {
    this.firestoreService.getEmloyee().subscribe(data => {

      this._employee = data.map(e => {
       // console.log(e.payload.doc.data()); 
       
        return {

          id: e.payload.doc['id'],
          isEdit: false, // for showing profile pupose 
          name: (e.payload.doc.data() as any)['name'],
          firstname: (e.payload.doc.data() as any)['firstname'],
          lastname: (e.payload.doc.data() as any)['lastname'],
          email: (e.payload.doc.data() as any)['email'],
          password: (e.payload.doc.data() as any)['password'],
          designation: (e.payload.doc.data() as any)['designation'],
          yearOfExperience : (e.payload.doc.data() as any)['yearOfExperience'],
          EmpId: (e.payload.doc.data() as any)['EmpId'],
          aadharNumber: (e.payload.doc.data() as any)['aadharNumber'],
          address: (e.payload.doc.data() as any)['address'],
          city: (e.payload.doc.data() as any)['name'],
          contactNumber: (e.payload.doc.data() as any)['contactNumber'],
          joiningDate: (e.payload.doc.data() as any)['joiningDate'],
          panNumber: (e.payload.doc.data() as any)['panNumber'],
          pincode: (e.payload.doc.data() as any)['pincode'],
          state: (e.payload.doc.data() as any)['state']
        };
        
      }
      )
      console.log(this._employee);
        // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
      let users = this._employee;
      console.log(users);

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(id : any)
  {
      this.firestoreService.deleteEmployee(id);
      this._snackBar.open('employee Deleted !!', 'cancle', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
  }

  openBottomSheet(data : any) {
    console.log(data);
    this.sharedData.changeData(data);
    this._bottomSheet.open(ProfileEmployeeComponent);
  }

  
}


