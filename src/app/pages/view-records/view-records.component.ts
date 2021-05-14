import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableFunctions } from 'app/component-functions/table.function';
import { DataServicesService } from 'data-services/data-services.service';
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.component.html',
  styleUrls: ['./view-records.component.css']
})
export class ViewRecordsComponent implements OnInit {
  public classID = ''
  public allUsers = []
  public className = ''
  public studentsNames = []

  constructor(
    public activatedRoute: ActivatedRoute,
    public eventsRequest: EventAndAnnouncementsService,
    public dataRequest: DataServicesService,
    public router: Router,
    public tableFunction: TableFunctions
  ) { }

  ngOnInit(): void {
    let classID = this.activatedRoute.snapshot.paramMap.get('classID')
    this.classID = classID
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

  // Kini siya nga function kay i delete niya ang class 
  deleteSelectedClass() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this class?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const classSelected = this.eventsRequest.deleteSelectedClass(this.classID)
        classSelected.subscribe((response: any) => {
          Swal.fire('Deleted!', 'Class Deleted Successfully!', 'success')
          this.router.navigate(['/eventsandannouncements'])
        })
      }
    })
  }

}
