import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableFunctions } from 'app/component-functions/table.function';
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';
import { LoginAndLogout } from 'data-services/user-data';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-new-training',
  templateUrl: './add-new-training.component.html',
  styleUrls: ['./add-new-training.component.css']
})
export class AddNewTrainingComponent implements OnInit {
  // public allUsers;
  public addTrainings = {
    newTrainings: {
      code: '',
      title: '',
      description: '',
      level: '',
      instructor: ""
    }
  }

  constructor(
    public user_data: LoginAndLogout,
    public eventsAndAnnouncements: EventAndAnnouncementsService,
    public router: Router,
    public builtFunction: TableFunctions
  ) { }

  ngOnInit(): void {
    // this.allUsers = this.user_data;    
  }

  addNewTraining(training) {
    const addNewTraining = this.eventsAndAnnouncements.addTraining(this.addTrainings.newTrainings)
    addNewTraining.subscribe((response: any) => {
      this.builtFunction.trainingsAndClasses.push(response)
      Swal.fire('Added!', 'A training is added successfully', 'success')
      this.router.navigate(['/eventsandannouncements'])
    })
  }
}
