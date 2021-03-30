import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  //login with email-password
  login(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        // this.router.navigate(['home']);
        alert('login Successful');
      })
      .catch(err => {
        console.log(err.message);
      })
  }

}
