import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableFunctions } from '../../component-functions/table.function';
import { EventAndAnnouncementsService } from '../../../data-services/events-announcements-classes.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
    selector: 'app-eventsandannouncements',
    templateUrl: './eventsandannouncements.component.html',
    styleUrls: ['./eventsandannouncements.component.css']
})
export class EventsandannouncementsComponent implements OnInit {
    public eventsAndAnnouncements = []
    public trainingsAndClasses = []
    public returnAllUsers = []
    public isShow = true;
    public createdEventOrAnnouncement = {
        newEvents: {
            Title: '',
            Description: '',
            Start_date: '',
            Start_time: '',
            End_date: '',
            End_time: '',
            Location: ''
        },
        currentUser: {
            userID: ''
        }
    }

    constructor(
        private route: Router,
        private builtFunction: TableFunctions,
        private eventsRequest: EventAndAnnouncementsService,
    ) { }

    ngOnInit(): void {
        this.returnAllUsers = this.builtFunction.allUsers
        console.log(this.builtFunction.allUsers)
        this.eventsAndAnnouncements = this.builtFunction.eventsAndAnnouncements
        this.trainingsAndClasses = this.builtFunction.trainingsAndClasses
    }

    // Kini siya nga function kay iyang i navigate sa view training 
    navigateToView(trainingID) {
        this.route.navigate(['/view-selected-class/' + trainingID])
    }

    // This function is to show the students belong to a certain class
    showStudent(data, idSelectedItem) {
        if (idSelectedItem == 'Events') {
            this.route.navigate(['/view-events/' + data.events.id + '/' + idSelectedItem])
        } else {
            this.route.navigate(['/view-events/' + data.id + '/' + idSelectedItem])
        }
    }

    deleteEvent(data, idSelectedItem) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this " + data.events.title + "!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    addEvent(){
        this.isShow = false;
    }

    deleteTraining(data, idSelectedItem) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this " + data.trainings.title + "!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    // Kini siya nga function kay ang pag add ug new event or training
    addNewEventOrTraining() {
        this.builtFunction.addNewEventsAndAnnouncements(this.createdEventOrAnnouncement)
    }
}


