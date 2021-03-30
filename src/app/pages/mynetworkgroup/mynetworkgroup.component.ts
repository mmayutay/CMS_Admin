import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../../../data-services/data-services.service';

@Component({
  selector: 'app-mynetworkgroup',
  templateUrl: './mynetworkgroup.component.html',
  styleUrls: ['./mynetworkgroup.component.css']
})
export class MynetworkgroupComponent implements OnInit {
  public allUsers = []

  constructor(
    private service: DataServicesService
  ) { }

  ngOnInit(): void {
    this.allUsersFromAdminToMembers()
  }

  allUsersFromAdminToMembers() {
    const accounts = this.service.getAllAccounts()
    accounts.subscribe((data: any) => {
      data.forEach(element => {
        const user = this.service.getUserDetails(element.userid)
        user.subscribe((details: any) => {
          this.allUsers.push({ account: element, userDetails: details[0], role: this.roleConverter(element.roles) })
        })
      });
    })
  }

  roleConverter(role) {
    var roles = new Array();
    roles[1] = "Admin"
    roles[2] = "Pastor"
    roles[3] = "Leader"
    roles[4] = "Member"
    return roles[Number(role)]
  }
}
