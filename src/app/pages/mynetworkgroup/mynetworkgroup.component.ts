import { Component, OnInit } from '@angular/core';
import { TableFunctions } from 'app/component-functions/table.function';
import { DataServicesService } from '../../../data-services/data-services.service';

@Component({
  selector: 'app-mynetworkgroup',
  templateUrl: './mynetworkgroup.component.html',
  styleUrls: ['./mynetworkgroup.component.css']
})
export class MynetworkgroupComponent implements OnInit {
  public selectedLeadersMembers  = []
  public pastorsWithItsMembers = []

  constructor(
    private service: DataServicesService,
    private built: TableFunctions
  ) { }

  ngOnInit(): void {
    // this.allPastorsWithItsLeaders()
  }

  // Kini siya nga function kay kuhaon niya ang tanan nga pastors 
  allPastorsWithItsLeaders() {
    const pastors = this.service.getAllPastorsWithItsLeaders()
    pastors.subscribe((response: any) => {
      this.pastorsWithItsMembers = response
      console.log(this.pastorsWithItsMembers)
    })
  }

  // Kini siya kay mag kuha sa mga members sa usa ka leader 
  getCertainLeadersMembers(leader, hideAndShow) {
    console.log(this.service.allMembers)
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
}
