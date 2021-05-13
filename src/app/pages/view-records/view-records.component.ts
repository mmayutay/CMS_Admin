import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServicesService } from 'data-services/data-services.service';
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.component.html',
  styleUrls: ['./view-records.component.css']
})
export class ViewRecordsComponent implements OnInit {
  public allUsers = []
  public className = ''
  public studentsNames = []

  constructor(
    public activatedRoute: ActivatedRoute,
    public eventsRequest: EventAndAnnouncementsService,
    public dataRequest: DataServicesService
  ) { }

  ngOnInit(): void {
    let classID = this.activatedRoute.snapshot.paramMap.get('classID')

    console.log(classID)
    this.getStudents(classID)
    this.classDetails(classID)
    this.getAllUsers()
  }


  // Kini siya nga function kay kuhaon ang tanan nga student sa selected class 
  getStudents(classID) {
    const students = this.eventsRequest.getAllStudentsOfAClass(classID)
    students.subscribe((response: any) => {
      response.forEach(element => {
        const studentNames = this.dataRequest.getUserDetails(element.students_id)
        studentNames.subscribe((names: any) => {
          this.studentsNames.push(names[0])
        })
      });
    })
  }

  // Kini siya nga function kay kuhaon ang details sa certain class 
  classDetails(classID) {
    const classDetails = this.eventsRequest.returnClassDetails(classID)
    classDetails.subscribe((response: any) => {
      this.className = response[0].name
    })
  }

  // Kini siya nga function kay kuhaon ang tanan nga mga users
  getAllUsers() {
    const allUsers = this.dataRequest.getAllUsers()
    allUsers.subscribe((response: any) => {
      this.allUsers = response
    })
  } 

}
