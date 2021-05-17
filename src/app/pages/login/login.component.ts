import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAndLogout } from 'data-services/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public passwordType = 'password'
  public loginDetails = {
    username: '',
    password: ''
  }
  public type = 'password';
  public showPass = false;

  constructor(
    private loginAndLogout: LoginAndLogout,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem(this.loginAndLogout.authenticationKey) != null) {
      this.router.navigate(['/dashboard']) 
    }
  }

  logIn() {
    this.loginAndLogout.logIn(this.loginDetails)
  }

  showPassword() {
    if(this.showPass) {
      this.showPass = false
      this.passwordType = 'password'
    }else {
      this.showPass = true
      this.passwordType = 'text'
    }
  }
}
