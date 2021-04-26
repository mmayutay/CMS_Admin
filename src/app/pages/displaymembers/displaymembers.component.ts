import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DataServicesService } from 'data-services/data-services.service';


@Component({
  selector: 'app-displaymembers',
  templateUrl: './displaymembers.component.html',
  styleUrls: ['./displaymembers.component.css']
})
export class DisplaymembersComponent implements OnInit {
  public content = "";
  public listAllTheMembers;
  public active = []
  public inactive = []
  public currentTime = new Date();

  constructor(    
    private activeRoute: ActivatedRoute,
    private dataService: DataServicesService
    ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.pipe(
      filter((params => params.content))
    ).subscribe(params => {
      this.content = params.content;
      console.log("Member Content:: ", this.content);

      if (this.content == "VIP Members") {
        this.listAllTheMembers = this.getTheVipMembers()
        console.log(this.listAllTheMembers)
      } else if (this.content == "Regular Members") {
        this.listAllTheMembers = this.getTheRegularMembers()
      } else if (this.content == "Inactive Members") {
        this.listAllTheMembers = this.inactive
      }
      else {
        this.listAllTheMembers = this.active
      }
    });
  }

  userIsActiveOrNot() {
    var partialDataHandler;
    this.dataService.getAllUsersId().subscribe(data => {
      partialDataHandler = data
      partialDataHandler.forEach(element => {
        this.dataService.getEventAndSCAttendance(element).subscribe(data => {
          this.classifyActiveAndInactive(element, data[0].currentUserAttendance);
        })
      })
    })
  }

  classifyActiveAndInactive(owner, users) {
    var counter = 0
    var dateToApproved = [];
    var toJudgeDate;
    var newDate;
    toJudgeDate = new Date(2021, this.currentTime.getMonth(), 0)
    for (let index = 0; index < 30; index++) {
      newDate = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth() - 1, index + 1)
      if (newDate.getDay() == 0) {
        dateToApproved.push(newDate)
      }
    }
    users.forEach(i => {
      dateToApproved.forEach(j => {
        if (new Date(i.date).getDate() == j.getDate()) {
          counter += 1
        }
      })
    })
    if (counter < 4 && counter > 0) {
      dateToApproved.length = 0
      for (let index = 0; index < this.currentTime.getDate(); index++) {
        newDate = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth(), index + 1)
        if (newDate.getDay() == 0) {
          dateToApproved.push(newDate)
        }
      }
      users.forEach(i => {
        dateToApproved.forEach(j => {
          if (new Date(i.date).getDate() == j.getDate()) {
            counter += 1
          }
        })
      })
    }
    if (counter >= 4) {
      this.dataService.addMemberToInactive({ id: owner, boolean: true }).subscribe(result => {
        this.dataService.getTheCurrentUser({ userID: result[0].userId }).subscribe(data => {
          this.active.push(data[0].firstname + " " + data[0].lastname)
        })
      })
    } else {
      this.dataService.addMemberToInactive({ id: owner, boolean: false }).subscribe(result => {
        this.dataService.getTheCurrentUser({ userID: result[0].userId }).subscribe(data => {
          this.inactive.push(data[0].firstname + " " + data[0].lastname)
        })
      })
    }
  }

  counter(i: number) {
    return new Array(i);
  }
  
  //This function will return all VIP Members
  getTheVipMembers() {
    var arrayVipMembers = []
    var partialDataHandler;
    this.dataService.allVipUsers().subscribe(data => {
      partialDataHandler = data
      partialDataHandler.forEach(element => {
        arrayVipMembers.push(element.firstname + " " + element.lastname)
      })
    })
    return arrayVipMembers;
  }
  //This function will return all Regular Members 
  getTheRegularMembers() {
    var arrayRegularMembers = []
    var regularMembers;
    this.dataService.getRegularMembers().subscribe(result => {
      regularMembers = result
      regularMembers.forEach(element => {
        arrayRegularMembers.push(element.firstname + ' ' + element.lastname)
      });
    })
    return arrayRegularMembers;
  }
}
