import { Injectable } from '@angular/core';
import { DataServicesService } from 'data-services/data-services.service';

@Injectable({
    providedIn: 'root'
})

export class TableFunctions {
    public leaderCounter = 0
    public listOfLeadersAndItsMembers = [];
    public membersMembers = []
    public pastorsData = { firstname: '', lastname: '' };

    public eventsAndAnnouncements = []
    public trainingsAndClasses = []
    public classOfCertainTraining = []

    public allUsers = [];
    public allEventsAndAnnouncements = []

    constructor(
        private service: DataServicesService
    ) {
        this.getEventsAnnouncementsAndClasses()
        this.returnLeadersAndMembers();
        this.allUsersFromAdminToMembers();
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
                    this.eventsAndAnnouncements.push({ events: element, user: response[0] })
                })
            });
        })
        const trainingAndClass = this.service.returnAllTrainings()
        trainingAndClass.subscribe((trainings: any) => {
            trainings.forEach(element => {
                const classes = this.service.returnClassesOfTraining(element.id)
                classes.subscribe((allClass: any) => {
                    this.classOfCertainTraining.push(allClass)
                    this.trainingsAndClasses.push(element)
                })
            });
        })
    }

    // Kini siya nga function kay para sa network ni siya 
    returnLeadersAndMembers() {
        const getPastor = this.service.getAllPastorsWithItsLeaders()
        getPastor.subscribe((response: any) => {
            this.pastorsData = response[1].pastor
            response[1].leaders.forEach(element => {
                const members = this.service.returnMembersOfACertainLeader(element.id)
                members.subscribe((member: any) => {
                    this.listOfLeadersAndItsMembers.push({ leader: element, members: member })
                    this.leaderCounter += 1
                })
            });
        })
    }

    // Kini siya nga function kay i return ang member's members
    returnMembersMembers(leaderid) {
        // conso
        const members = this.service.returnMembersOfACertainLeader(leaderid)
        members.subscribe((response: any) => {
            console.log(response)
            this.membersMembers.push(response)
        })
    } 

    // Kini siya nga function kay mauy mu add sa bag o nga events and announcements 
    addNewEventsAndAnnouncements(newEvent) {
        console.log(newEvent)
        const addEvent = this.service.addEventsOrAnnouncements(newEvent)
        addEvent.subscribe((response: any) => {
            this.eventsAndAnnouncements.length = 0
            this.getEventsAnnouncementsAndClasses()
        })
    }
}