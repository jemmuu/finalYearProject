import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar,
    
  ) {
    
   }

  //login with email-password
  login(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['home']);
        this._snackBar.open('login Success!!','cancle', {
          duration: 500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        
      })
      .catch(err => {
        console.log(err.message);
      })
  }

   logOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }

  chkLogIn()
  {
    this.afAuth.onAuthStateChanged((credential)=>{
      if(credential){
        console.log(credential);
        //this.authStatusSub.next(credential);
        console.log('User is logged in');
      }
      else{
        //this.authStatusSub.next(null); 
        console.log('User is logged out');
      }
    })
  }
}
