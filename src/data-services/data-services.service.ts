import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DataServicesService {
    public leaders = []
    public allUsers = []

  public url = "http://localhost:8000/api/"


    constructor(
        private http: HttpClient
    ) {
        this.returnLeaders()
        this.returnAllUsers()
    }
    // This function is to get all the Trainings and classes 
    getTrainingsAndClasses() {
        return this.http.get(this.url + "trainings-and-classes/return-all")
    }

    // This function is to get all the events and announcements
    getEventsAndAnnouncements() {
        return this.http.get(this.url + 'add-event-announcement/display')
    }

    // This function is to get all the users except to the admin
    getAllUsers() {
        return this.http.get(this.url + 'list')
    }

    // This function is to get the certain user's role
    getUserRole(id) {
        return this.http.post(this.url + 'currentUserRole', {id: id})
    }

    // This function is to get all accounts
    getAllAccounts() {
        return this.http.get(this.url + 'allAccounts')
    }

    // This function is to get the details of a certain user
    getUserDetails(id) {
        return this.http.post(this.url + 'info', {userID: id})
    }

    // This function is to get all the students of a certain events and announcements
    getStudents(eventId) {
        return this.http.get(this.url + 'add-event-announcement/return-all-students/' + eventId)
    }

    // This function is to get all the students of a certain trainings or class
    getStudentsTrainings(type, itemID) {
        return this.http.post(this.url + 'trainings-by-instructor/get-student-of-a-class-training', {typeSelected: type, training: itemID})
    }

    // This function is to get the students data from the records
    getStudentDetailsFromRecord(id) {
        return this.http.get(this.url + 'student-trainings-or-class/get-student/' + id)
    }

    // This function is to return the selected event
    retrieveEvent(eventId) {
        return this.http.get(this.url + 'event-return/' + eventId)
    }

    // This function is to return the selected trainings
    retrieveTraining(itemID, type) {
        return this.http.post(this.url + 'trainings-by-instructor/get-selected-class', {typeSelected: type, idSelectedItem: itemID})
    }

    // This function is to return all the leaders listed in the database
    returnLeaders() {
        const leaders = this.http.get(this.url + 'get-leaders');
        leaders.subscribe((data: any) => {
            data.forEach(element => {
                const members = this.http.post(this.url + 'return-members-group', {leaderID: element.id})
                members.subscribe((response: any) => {
                    this.leaders.push({leader: element, members: response})
                })
            })
        console.log(this.leaders)
        })
    }

    // This function is to store all members in an Array
    returnAllUsers() {
        const members = this.getAllUsers()
        members.subscribe((data: any) => {
            this.allUsers = data
            console.log(data)
        })
    }
}