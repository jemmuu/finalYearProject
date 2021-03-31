
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FirebaseService } from 'src/app/core/services/firebaseServiec/firebase.service';





 @Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
  })
export class EmployeeListComponent implements AfterViewInit {
  displayedColumns: string[] = ['EmpId', 'name', 'designation', 'email'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   private _employee: any;

  constructor(private firestoreService : FirebaseService) {   
    
  }

  ngOnInIt()
  {
   
  }
  ngAfterViewInit() {
    this.firestoreService.getEmloyee().subscribe(data => {

      this._employee = data.map(e => {
       // console.log(e.payload.doc.data()); 
       
        return {

          id: e.payload.doc['id'],
          isEdit: false, // for showing profile pupose 
          name: (e.payload.doc.data() as any)['name'],
          email: (e.payload.doc.data() as any)['email'],
          password: (e.payload.doc.data() as any)['password'],
          designation: (e.payload.doc.data() as any)['designation'],
        };
        
      }
      )
      console.log(this._employee.value);
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
}

/** Builds and returns a new User. */
