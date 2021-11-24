import { Component, OnInit } from '@angular/core';
import { TableFunctions } from 'app/component-functions/table.function';
import { DataServicesService } from '../../../data-services/data-services.service';

@Component({
  selector: 'app-mynetworkgroup',
  templateUrl: './mynetworkgroup.component.html',
  styleUrls: ['./mynetworkgroup.component.css']
})
export class MynetworkgroupComponent implements OnInit {
  public selectedLeadersMembers = []
  public pastorsWithItsMembers = []

  constructor(
    private service: DataServicesService,
    private built: TableFunctions
  ) { }

  ngOnInit(): void {
    this.allPastorsWithItsLeaders()
    this.built.returnLeadersAndMembers()
  }

  // Kini siya nga function kay kuhaon niya ang tanan nga pastors 
  allPastorsWithItsLeaders() {
    const pastors = this.service.getAllPastorsWithItsLeaders()
    pastors.subscribe((response: any) => {
      this.pastorsWithItsMembers = response
      response.forEach(element => {
        this.getMembers(element.pastor.id)
      });
    })
  }

  // Kini siya nga function kay kuhaon ang members sa selected leader 
  returnMembersOfLeader(leaderID) {
    console.log(leaderID.target.value)
  }

  // Kini siya kay mag kuha sa mga members sa usa ka leader 
  getCertainLeadersMembers(leader, hideAndShow) {
    if (hideAndShow == 'show') {
      this.selectedLeadersMembers = []
      this.service.allMembers.forEach(element => {
        if (element.leader == leader.id) {
          this.selectedLeadersMembers.push(element)
        }
      })
    } else {
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
      if (element.leader.id == members) {
        this.built.membersOfCertainLeader = element.members
        this.built.membersOfCertainLeader.forEach(member => {
          this.built.returnMembersMembers(member.id)
        });
      }
    })
  }
}
