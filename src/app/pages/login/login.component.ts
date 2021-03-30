import { Component, OnInit } from '@angular/core';
import { LoginAndLogout } from 'data-services/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginDetails = {
    username: '',
    password: ''
  }
  public type = 'password';
  public showPass = false;

  constructor(
    private loginAndLogout: LoginAndLogout
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.loginAndLogout.logIn(this.loginDetails)
  }
}
