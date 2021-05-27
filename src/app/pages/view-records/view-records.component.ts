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
  public trainingID = ''
  public classType = ''
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
    this.trainingID = this.activatedRoute.snapshot.paramMap.get('trainingID')
    const training = this.eventsRequest.returnTrainingDetails(this.trainingID)
    training.subscribe((response: any) => {
      this.trainingID = response[0].id
    })
    this.classID = classID
    this.getStudents(classID)
    this.classDetails(classID)
    this.getAllUsers()
  }


  // Kini siya nga function kay kuhaon ang tanan nga student sa selected class 
  getStudents(classID) {
    const students = this.eventsRequest.getAllStudentsOfAClass(classID)
    students.subscribe((response: any) => {
      if (response.length != 0) {
        this.classType = response[0].type
        response.forEach(element => {
          const studentNames = this.dataRequest.getUserDetails(element.students_id)
          studentNames.subscribe((names: any) => {
            this.studentsNames.push(names[0])
          })
        })
      }
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

  // Kini siya nga function kay mag add ug student sa class 
  addStudentToAClass(studentID) {
    this.studentsNames.push(studentID)
    var studentData = {
      selectedTrainingID: this.trainingID,
      classesID: this.classID,
      studentID: studentID.id,
      type: this.classType
    }
    const studentsData = this.eventsRequest.addStudent(studentData)
    studentsData.subscribe((response: any) => {
      Swal.fire('Added!', studentID.firstname + ' ' + studentID.lastname + ' successfully added to the class!', 'success')
    })
  }

  // Kini siya nga function kay i delete ang selected student 
  deleteSelectedStudent(student) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete " + student.firstname + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {        
        const recordToDelete = this.eventsRequest.deleteStudentOfAClass(student.id, this.classID)
        recordToDelete.subscribe((deleted: any) => {
          this.studentsNames.splice(this.studentsNames.indexOf(student), 1)
          Swal.fire(
            'Deleted!',
            student.firstname + ' deleted successfully!',
            'success'
          )
        })
      }
    })
  }

}
