import { Component, OnInit } from '@angular/core';
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';

@Component({
  selector: 'app-add-new-classes',
  templateUrl: './add-new-classes.component.html',
  styleUrls: ['./add-new-classes.component.css']
})
export class AddNewClassesComponent implements OnInit {
  public newLesson  = {
    training: '',
    class_name: '',
    description: '',
    type: ''
  }

  constructor(
    public eventsRequest: EventAndAnnouncementsService
  ) { }

  ngOnInit(): void {
  }

  // Kini siya nga function kay ang pag add ug class 

}
