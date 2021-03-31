
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireService : AngularFirestore) { }

  addEmloyee(record : object) 
  {
     try {
       
      return this.fireService.collection('employeeTest').add(record);
     } catch(error)  {
       throw throwError(error);
     }
  }

  getEmloyee()
  {
     try {
       
      return this.fireService.collection('employeeTest').snapshotChanges();
     } catch(error)  {
      throw throwError(error);
     }
  }

  updateEmloyee( recordid: any ,record : object)
  {
     try {
       
       this.fireService.doc('employeeTest/' + recordid).update(record);
     } catch(error)   {
      throw throwError(error);
     }
  }

  deleteEmployee(dataId : any)
  {
    try {
       this.fireService.doc('employeeTest/' + dataId).delete();
    } catch(error)  {
      throw throwError(error);
    }
  }



}