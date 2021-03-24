import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataServicesService } from '../data-services/data-services.service';

@Component({
    selector: 'icons-cmp',
    moduleId: module.id,
    templateUrl: 'icons.component.html'
})

export class IconsComponent{
    public eventsAndAnnouncements = []
    public trainingsAndClasses = []

    constructor(
        private route: Router,
        private service: DataServicesService
    ) {}

    ngOnInit() {
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
