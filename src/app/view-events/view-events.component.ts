import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'data-services/attendance.service';
import { DataServicesService } from 'data-services/data-services.service';
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  public eventsOrClass = false
  public studentToAdd = {
    trainings: null,
    classes: null,
    students: '',
    type: '',
    score: 0,
    over_all: 0,
    remarks: 'Add a note!',
    level: 'Senior Citizen',
    isAttended: true
  }
  public allUsers = this.service.allUsers
  public students = []
  public event = {
    title: "",
    description: ""
  }
  public eventDetails;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: DataServicesService,
    private eventsAndAnnouncements: EventAndAnnouncementsService,
    private attendance: AttendanceService
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap.get('eventID')
    let type = this.activatedRoute.snapshot.paramMap.get('idSelectedItem')
    if (type == 'Events') {
      this.eventsOrClass = true
      const trainingsDetails = this.eventsAndAnnouncements.returnTrainingsDetails(params)
      trainingsDetails.subscribe((response: any) => {
        this.eventDetails = response
        response.start_time = new Date(response.start_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        response.end_time = new Date(response.end_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        response.start_date = this.attendance.convertMonth(new Date(response.start_date).getMonth()) + '/' + new Date(response.start_date).getDate() + '/' + new Date(response.start_date).getFullYear()
        response.end_date = this.attendance.convertMonth(new Date(response.end_date).getMonth()) + '/' + new Date(response.end_date).getDate() + '/' + new Date(response.end_date).getFullYear()
        console.log(response)
      })
    } else {
      this.studentToAdd.trainings = params
      this.eventsOrClass = false
      const trainings = this.service.retrieveTraining(params, type)
      trainings.subscribe((response: any) => {
        this.event = response
        this.studentToAdd.type = response.lesson
      })

      const trainingsStudents = this.service.getStudentsTrainings(type, params)
      trainingsStudents.subscribe((data: any) => {
        data.forEach(element => {
          const studentsData = this.service.getStudentDetailsFromRecord(element.students_id)
          studentsData.subscribe((data: any) => {
            this.students.push(data[0])
          })
        });
      })
    }
  }

  deleteSelectedStudent(student) {
    console.log(this.students.indexOf(student))
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
        this.students.splice(this.students.indexOf(student), 1)
        const students = this.eventsAndAnnouncements.getTheStudentsDetails(student.id)
        students.subscribe((response: any) => {
          const recordToDelete = this.eventsAndAnnouncements.deleteStudentRecord(response[0].id)
          recordToDelete.subscribe((deleted: any) => {
            Swal.fire(
              'Deleted!',
              student.firstname + ' deleted successfully!',
              'success'
            )
          })
        })
      }
    })
  }

  addStudent(studentsData) {
    this.studentToAdd.students = studentsData.id
    const addStudent = this.eventsAndAnnouncements.addStudent(this.studentToAdd)
    addStudent.subscribe((response: any) => {
      console.log(studentsData)
      this.students.push(studentsData)
    })
  }

}
