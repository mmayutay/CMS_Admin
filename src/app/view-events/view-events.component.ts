import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServicesService } from 'data-services/data-services.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  public allUsers = this.service.allUsers
  public students = []
  public event = {
    title: "",
    description: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: DataServicesService
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap.get('eventID')
    let type = this.activatedRoute.snapshot.paramMap.get('idSelectedItem')
    if(type == 'Events') {
      const eventsName = this.service.retrieveEvent(params)
      eventsName.subscribe((event: any) => {
        this.event = event
        // this.event = event[0]
      })
  
      const eventStudents = this.service.getStudents(params)
      eventStudents.subscribe((data: any) => {
        data.forEach(element => {
          const studentsData = this.service.getUserDetails(element)
          studentsData.subscribe((details: any) => {
            this.students = details
          })
        });
      })
    }else {
      const trainings = this.service.retrieveTraining(params, type) 
      trainings.subscribe((response: any) => {
        this.event = response
        console.log(response)
      })

      const trainingsStudents = this.service.getStudentsTrainings(type, params)
      trainingsStudents.subscribe((data: any) => {
        data.forEach(element => {
            const studentsData = this.service.getStudentDetailsFromRecord(element.students_id)
            studentsData.subscribe((data: any) => {
              this.students = data
            })
        });
      })
    }
  }

}
