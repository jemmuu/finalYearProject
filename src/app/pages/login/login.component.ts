import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  constructor(
    private fb: FormBuilder,
    private login: LoginService
  ) {

    // login form
    this.loginForm = this.fb.group({
      email: ['', Validators.required,],
      password: ['', Validators.required,],
    })
    
  }

  ngOnInit(): void {
  }

  submit(email, password) {
    this.login.login(email.value, password.value);
  }

  // get loginForm controls
  get loginEmail() {
    return this.loginForm.get('email');
  }
  get loginPassword() {
    return this.loginForm.get('password');
  }

}
