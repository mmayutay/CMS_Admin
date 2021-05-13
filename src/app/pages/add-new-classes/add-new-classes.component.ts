import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServicesService } from 'data-services/data-services.service';
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-classes',
  templateUrl: './add-new-classes.component.html',
  styleUrls: ['./add-new-classes.component.css']
})
export class AddNewClassesComponent implements OnInit {
  public selectedStudents = []
  public allUsers = []
  public newClass = {
    selectedTrainingID: '',
    Name: '',
    Description: ''
  }
  public newLesson = ''
  public classType = ''

  constructor(
    public eventsRequest: EventAndAnnouncementsService,
    public activatedRoute: ActivatedRoute,
    public dataService: DataServicesService,
    public router: Router
  ) { }

  ngOnInit(): void {
    let trainingID = this.activatedRoute.snapshot.paramMap.get('trainingID')
    this.newClass.selectedTrainingID = trainingID
    const training = this.eventsRequest.returnTrainingDetails(trainingID)
    training.subscribe((response: any) => {
      this.newLesson = response[0].title
    })
    this.getAllUser()
  }

  // Kini siya nga function kay ang pag add ug class 
  addNewClass() {
    var records = {
      selectedTrainingID: this.newClass.selectedTrainingID,
      classesID: '',
      studentID: '',
      type: this.classType
    }
    const addNewClass = this.eventsRequest.addCLassOfCertainTraining({className: this.newClass})
    addNewClass.subscribe((response: any) => {
      this.selectedStudents.forEach(element => {
        records.classesID = response.id
        records.studentID = element.id
        const addStudent = this.eventsRequest.addStudent(records)
        addStudent.subscribe((student: any) => {
          console.log(student)
        })
      })
      Swal.fire('Successfully Created and Added', 'Class created and student successfully enrolled to the class', 'success')
      this.router.navigate(['/eventsandannouncements'])
    })

  }

  // Kini siya nga function kay kuhaon niya ang tanan nga mga user 
  getAllUser() {
    const allUser = this.dataService.getAllUsers()
    allUser.subscribe((response: any) => {
      this.allUsers = response
    })
  }

  // Kini siya nga function kay ang pag add ug student sa created class 
  addStudent(user) {    
    if (this.selectedStudents.length == 0) {
      this.selectedStudents.push(user)
    } else {
      this.selectedStudents.forEach(element => {
        if (element.id != user.id) {
          if(!this.selectedStudents.includes(user)) {
            this.selectedStudents.push(user)
          }         
        } else {
          this.selectedStudents.splice(this.selectedStudents.indexOf(user), 1)
        }
      })
    }
    console.log(this.selectedStudents)
  }
}
