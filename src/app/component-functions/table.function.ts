import { Injectable } from '@angular/core';
import { DataServicesService } from 'data-services/data-services.service';

@Injectable({
    providedIn: 'root'
})

export class TableFunctions {
    public eventsAndAnnouncements = []
    public trainingsAndClasses = []

    public allUsers = [];
    public allEventsAndAnnouncements = []

    constructor(
        private service: DataServicesService
    ) {
        this.getEventsAnnouncementsAndClasses()
    }


    // This function is getting all the members including the admin
    allUsersFromAdminToMembers() {
        const users = this.service.getAllUsers()
        users.subscribe((data: any) => {
            this.allUsers = data;
        })
    }

    getEventsAnnouncementsAndClasses() {
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
        console.log(this.eventsAndAnnouncements)
        console.log(this.trainingsAndClasses)
    }
}