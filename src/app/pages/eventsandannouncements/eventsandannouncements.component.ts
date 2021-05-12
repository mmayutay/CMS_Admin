import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableFunctions } from '../../component-functions/table.function';
import { EventAndAnnouncementsService } from '../../../data-services/events-announcements-classes.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ViewTrainingsAndClassesComponent } from '../view-trainings-and-classes/view-trainings-and-classes.component';

@Component({
    selector: 'app-eventsandannouncements',
    templateUrl: './eventsandannouncements.component.html',
    styleUrls: ['./eventsandannouncements.component.css']
})
export class EventsandannouncementsComponent implements OnInit {
    public selectedTraining = ''
    public lessonsOfTraining = []
    public selectedTrainingID = ''

    public eventsAndAnnouncements;
    public trainingsAndClasses;
    public classOfCertainTraining;
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
        private modalService: NgbModal,
    ) { }

    showMessagesModal() {
        const modalRef = this.modalService.open(ViewTrainingsAndClassesComponent);
    }


    ngOnInit(): void {
        this.returnAllUsers = this.builtFunction.allUsers
        this.eventsAndAnnouncements = this.builtFunction.eventsAndAnnouncements
        this.trainingsAndClasses = this.builtFunction.trainingsAndClasses
        this.classOfCertainTraining = this.builtFunction.classOfCertainTraining
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

    addEvent() {
        this.isShow = false;
    }

    addNewTrainings() {
        this.route.navigate(['/add-new-training'])
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

    // Kini siya nga function kay pag kuha sa mga lessons sa certain training 
    displayLessons(value) {
        this.selectedTraining = value.title
        this.selectedTrainingID = value.id
        const lessons = this.eventsRequest.returnLessons(value.id)
        lessons.subscribe((trainingLessons: any) => {
            this.lessonsOfTraining = trainingLessons
        })
    }

    // Kini siya nga function kay i delete ang selected lesson 
    deleteSelectedLesson(lesson) {
        console.log(lesson)
    }

    // Kini siya nga function kay i delete ang selected training 
    deleteSelectedTraining() {
        this.trainingsAndClasses.forEach(element => {
            if (element.id == this.selectedTrainingID) {
                this.trainingsAndClasses.splice(this.trainingsAndClasses.indexOf(element), 1)
            }
        })
        const deleteTraining = this.eventsRequest.deleteTrainingWithLessons(this.selectedTrainingID)
        deleteTraining.subscribe((response: any) => {
            Swal.fire(
                'Deleted!',
                'Selected training has been deleted.',
                'success'
              )
        })
    }

    // Kini siya nga function kay i clear ang array sa lessons 
    clearLessonsArray() {
        this.lessonsOfTraining = []
    }


    // Kini siya nga function kay para sa loader 
    loadFunction() {
        let timerInterval
        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 5000,
            timerProgressBar: true,
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }
    
    // Kini siya nga function kay ask ug confirmation delete 
    deleteConfirmation() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this " + this.selectedTraining + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.loadFunction()
              this.deleteSelectedTraining()
            }
          })
    }
}


