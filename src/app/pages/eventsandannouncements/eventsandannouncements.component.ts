import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableFunctions } from 'app/component-functions/table.function';

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
    private builtFunction: TableFunctions
  ) { }

  ngOnInit(): void {
      this.eventsAndAnnouncements = this.builtFunction.eventsAndAnnouncements
      this.trainingsAndClasses = this.builtFunction.trainingsAndClasses
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
