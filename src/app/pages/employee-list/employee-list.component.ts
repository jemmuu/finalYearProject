
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface UserData {
  EmpId: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
 @Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
  })
export class EmployeeListComponent implements AfterViewInit {
  displayedColumns: string[] = ['EmpId', 'name', 'designation', 'email'];
  dataSource: MatTableDataSource<UserData>;

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
function createNewUser(EmpId: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    EmpId: EmpId.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
