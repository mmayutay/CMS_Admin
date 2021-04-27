import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../../../data-services/data-services.service';

@Component({
  selector: 'app-mynetworkgroup',
  templateUrl: './mynetworkgroup.component.html',
  styleUrls: ['./mynetworkgroup.component.css']
})
export class MynetworkgroupComponent implements OnInit {
  public pastorsWithItsMembers = []

  constructor(
    private service: DataServicesService
  ) { }

  ngOnInit(): void {
    this.allPastorsWithItsLeaders()
  }

  // Kini siya nga function kay kuhaon niya ang tanan nga pastors 
  allPastorsWithItsLeaders() {
    const pastors = this.service.getAllPastorsWithItsLeaders()
    pastors.subscribe((response: any) => {
      console.log(response)
      this.pastorsWithItsMembers = response
    })
  }

  // Kini siya kay mag kuha sa mga members sa usa ka leader 
  getCertainLeadersMembers(leader) {
    console.log(leader)
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
