import { Component, OnInit } from '@angular/core';
import { LoginAndLogout } from 'data-services/user-data';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {
  public roles = [
    {code: '2', role: 'Pastor'},
    {code: '3', role: 'Leader'},
    {code: '4', role: 'Member'}
  ]
  public marital_status = ["Single", "Married", "Divorce", "Widowed"]
  public listOfLeaders = []
  public birthdate;
  public signup = {
    newUser: {
      Lastname: '',
      Firstname: '',
      Birthday: '',
      Age: null,
      Gender: '',
      Address: '',
      Marital_status: '',
      Email: '',
      Contact_number: null,
      Facebook: '',
      Instagram: '',
      Twitter: '',
      Category: '',
      Description:'A new member added!',
      isCGVIP: 'true',
      isSCVIP: 'true'
    }, groupBelong: {
      Leader: ''
    }, role: {
      code: ''
    }
  };

  constructor(
    private userService: LoginAndLogout
  ) { }

  ngOnInit(): void {
    const getAllLeaders = this.userService.getAllLeaders()
    getAllLeaders.subscribe((leaders: any) => {
      this.listOfLeaders = leaders
    })
  }


  // Kini siya nga function kay iyang i calculate ang age sa iyang i add nga member 
  getTheBirthday(data) {
    this.signup.newUser.Birthday = (<HTMLInputElement>document.getElementById('birth')).value;
    this.CalculateAge();
  }

  CalculateAge() {
    var today = new Date();

    this.birthdate = this.signup.newUser.Birthday.split('-');

    if (today.getMonth() > this.birthdate[1]) {
      this.signup.newUser.Age = today.getFullYear() - this.birthdate[0]
    } else {
      this.signup.newUser.Age = today.getFullYear() - this.birthdate[0] - 1
    }
    console.log(this.signup.newUser.Age)
  }

  // Kini siya nga function kay ang pag add new user nga makita sa submit nga button 
  submitUser() {
    const newUser = this.userService.addNewUser(this.signup)
    newUser.subscribe((response: any) => {
      console.log(response)
    })
  }

}
