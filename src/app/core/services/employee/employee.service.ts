import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../../model/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fireStore: AngularFirestore) { }

  // add employee
  createEmployee(employee: Employee){
    return this.fireStore.collection('employees').add(employee);
  }

  // get employees
  getEmployee() {
    return this.fireStore.collection('employees', ref =>
      ref.orderBy('name', 'asc')
    ).snapshotChanges();
  }

  // update employee
  updateEmployee(employee: Employee){
    this.fireStore.doc('employees/' + employee.name).update(employee);
  }

  // delete employee
  deleteEmployee(id: String){
    this.fireStore.doc('employees/' + id).delete();
  }
  
}
