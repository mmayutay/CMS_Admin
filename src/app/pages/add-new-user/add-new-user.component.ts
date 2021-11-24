import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../../../data-services/data-services.service';
import { LoginAndLogout } from 'data-services/user-data';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {
  public roles = [
    { code: '1', role: 'Pastor' },
    { code: '12', role: 'Primary' },
    { code: '144', role: 'Member(144)' },
    { code: '1728', role: 'Member(1728)' },
  ]
  public marital_status = ["Single", "Married", "Divorce", "Widowed"]
  public listOfLeaders = []
  public birthdate;
  public signup = {
    newUser: {
      Lastname: '',
      Firstname: '',
      Birthday: '',
      Age: '',
      Gender: '',
      Address: '',
      Marital_status: '',
      Email: '',
      Contact_number: '',
      Facebook: '',
      Instagram: '',
      Twitter: '',
      Category: '',
      Description: '',
      isCGVIP: '',
      isSCVIP: ''
    }, groupBelong: {
      Leader: ''
    }, role: {
      code: ''
    }
  };

  constructor(
    private userService: LoginAndLogout,
    private dataService: DataServicesService
  ) { }

  ngOnInit(): void {
    // const getAllLeaders = this.userService.getAllLeaders()
    // getAllLeaders.subscribe((leaders: any) => {
    //   this.listOfLeaders = leaders
    // })
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
      this.signup.newUser.Age = (today.getFullYear() - this.birthdate[0]).toString()
    } else {
      this.signup.newUser.Age = (today.getFullYear() - this.birthdate[0] - 1).toString()
    }
    console.log(this.signup.newUser.Age)
  }

  // Kini siya nga function kay ang pag add new user nga makita sa submit nga button 
  submitUser(memberInfo) {
    if (!this.inputValidation()) {
      if (this.signup.role.code == '1') {
        this.signup.groupBelong.Leader = '1'
      }
      const newUser = this.userService.addNewUser(this.signup)
      newUser.subscribe((response: any) => {
        console.log(response)
        memberInfo.reset()
        Swal.fire({
          title: 'Successfully added!',
          text: this.signup.newUser.Firstname + ' is successfully added to as a new member of BHCF, click show to see what is his/her account',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Show'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'User Account',
              response.username + ' is the username and the password is ' + this.signup.newUser.Lastname + 'Member' + response.userid,
              'success'
            )
          }
        })
      })
    } else {
      Swal.fire('Missing Field', 'You forgot to fill an input field, please check the fields', 'error')
    }
  }

  // Kini siya nga function kay i identify kung unsa ang role nga iyang gipili 
  getRoleChosen(value) {
    var listOfSelectedLeaders = []
    const leadersOfChosen = this.userService.getUsersRole(String(Number(value.target.value) / 12))
    leadersOfChosen.subscribe((response: any) => {
      console.log(response)
      response.forEach(element => {
        if (element.gender == this.signup.newUser.Gender) {
          listOfSelectedLeaders.push(element)
        }
      })
      this.listOfLeaders = listOfSelectedLeaders
    })
    this.getUserGender({ target: { value: "Male" } })
  }

  // Kini siya nga function kay kuhaon ang gender sa new added member 
  getUserGender(value) {
    const allUsers = this.dataService.getAllUsers()
    allUsers.subscribe((response: any) => {
      response.forEach(element => {
        if (element.gender == value.target.value) {
          const userAccount = this.dataService.getUserAccount(element.id)
          userAccount.subscribe((user: any) => {
            if (user.roles == (Number(this.signup.role.code) / 12).toString()) {
              console.log(element)
              this.listOfLeaders.length = 0
              this.listOfLeaders.push(element)
            }
          })
        }
      });
    })
  }


  // Kini siya nga function kay haha.. manual nga validation 
  inputValidation() {
    if (
      this.signup.newUser.Address == "" ||
      this.signup.newUser.Age == null ||
      this.signup.newUser.Birthday == "" ||
      this.signup.newUser.Contact_number == "" ||
      this.signup.newUser.Email == "" ||
      this.signup.newUser.Firstname == "" ||
      this.signup.newUser.Gender == "" ||
      this.signup.newUser.Lastname == "" ||
      this.signup.newUser.Marital_status == "" ||
      this.signup.newUser.isCGVIP == "" ||
      this.signup.newUser.isSCVIP == ""
    ) {
      return true
    } else {
      return false
    }
  }
}
