import { Component, OnInit } from '@angular/core';
import { TableFunctions } from 'app/component-functions/table.function';
import { DataServicesService } from '../../../data-services/data-services.service';

@Component({
  selector: 'app-mynetworkgroup',
  templateUrl: './mynetworkgroup.component.html',
  styleUrls: ['./mynetworkgroup.component.css']
})
export class MynetworkgroupComponent implements OnInit {
  public membersOfSelectedLeader = []
  public selectedLeadersMembers  = []
  public pastorsWithItsMembers = []

  constructor(
    private service: DataServicesService,
    private built: TableFunctions
  ) { }

  ngOnInit(): void {
    this.allPastorsWithItsLeaders()
  }

  // Kini siya nga function kay kuhaon niya ang tanan nga pastors 
  allPastorsWithItsLeaders() {
    const pastors = this.service.getAllPastorsWithItsLeaders()
    pastors.subscribe((response: any) => {
      this.pastorsWithItsMembers = response
      console.log(this.pastorsWithItsMembers)
    })
  }

  // Kini siya nga function kay kuhaon ang members sa selected leader 
  returnMembersOfLeader(leaderID) {
    console.log(leaderID.target.value)
  }

  // Kini siya kay mag kuha sa mga members sa usa ka leader 
  getCertainLeadersMembers(leader, hideAndShow) {
    if(hideAndShow  == 'show') {
      this.selectedLeadersMembers = []
      this.service.allMembers.forEach(element => {
        if(element.leader == leader.id) {
          this.selectedLeadersMembers.push(element)
        }
      })
    }else {
      this.selectedLeadersMembers = []
    }
  }


  roleConverter(role) {
    var roles = new Array();
    roles[1] = "Admin"
    roles[2] = "Pastor"
    roles[3] = "Leader"
    roles[4] = "Member"
    return roles[Number(role)]
  }

  // Kini siya nga function kay kuhaon ang mga members under anang certain leader 
  getMembers(members) {
    this.built.listOfLeadersAndItsMembers.forEach(element => {
      console.log(element)
      if(element.leader.id == members) {
        this.membersOfSelectedLeader = element.members
        this.membersOfSelectedLeader.forEach(member => {
            this.built.returnMembersMembers(member.id)
        });
      }
    });
  }
}
