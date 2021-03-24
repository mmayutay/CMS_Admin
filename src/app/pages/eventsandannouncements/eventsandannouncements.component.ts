import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServicesService } from '../data-services/data-services.service';

@Component({
  selector: 'app-eventsandannouncements',
  templateUrl: './eventsandannouncements.component.html',
  styleUrls: ['./eventsandannouncements.component.css']
})
export class EventsandannouncementsComponent implements OnInit {
  public eventsAndAnnouncements = []
  public trainingsAndClasses = []

  constructor(
    private route: Router,
    private service: DataServicesService
  ) { }

  ngOnInit(): void {
    const events = this.service.getEventsAndAnnouncements()
    events.subscribe((evAndAnn: any) => {
        evAndAnn.forEach(element => {
            const user = this.service.getUserDetails(element.eventOwner)
            user.subscribe((response: any) => {
                this.eventsAndAnnouncements.push({events: element, user: response[0]})
            })
        });
    })
    const trainings = this.service.getTrainingsAndClasses()
    trainings.subscribe((trai: any) => {
        trai.trainings.forEach(element => {
            const user = this.service.getUserDetails(element.instructor)
            user.subscribe((response: any) => {
                this.trainingsAndClasses.push({trainings: element, user: response[0]})
            })
        });
    })
  }

      // This function is to show the students belong to a certain class
      showStudent(data, idSelectedItem) {
        if(idSelectedItem == 'Events') {
            this.route.navigate(['/view-events/' + data.events.id + '/'+ idSelectedItem])
        }else {
            this.route.navigate(['/view-events/' + data.trainings.id + '/'+ idSelectedItem])
        }
    }

}
