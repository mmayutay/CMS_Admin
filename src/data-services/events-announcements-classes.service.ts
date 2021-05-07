import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EventAndAnnouncementsService {
    public url = "http://localhost:8000/api/"

    constructor(
        private http: HttpClient
    ) {}

    // This function is to add a student to a class or a trainings
    addStudent(dataToAdd) {
        return this.http.post(this.url + 'student-trainings-or-class/addToRecords', dataToAdd)
    }

    // This function is to get the details of a selected trainings and announcements
    returnTrainingsDetails(eventID) {
        return this.http.get(this.url +  'event-return/' + eventID)
    }

    // This function is to get the student from the students collection 
    getTheStudentsDetails(studentsID) {
        return this.http.get(this.url + 'student-trainings-or-class/get-student-using-cms-ID/' + studentsID)
    }

    // This function is to delete the record of a student inside the collection record and collection student
    deleteStudentRecord(studentID) {
        return this.http.get(this.url  + 'student-trainings-or-class/delete-student/' + studentID)
    }

    deleteSelectedEvent(id) {
        return this.http.delete(this.url + 'event-announcement/delete/' + id)
      }

    //   Kini siya nga function kay i return niya ang tanan nga lessons sa selected training 
    returnLessons(trainingID) {
        return this.http.get(this.url + 'trainings-and-classes/return-lesson-of-selected-training/' + trainingID)
    }
    
}