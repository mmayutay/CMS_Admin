import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EventAndAnnouncementsService {
    // public url = "https://group8finalthesis.herokuapp.com/api/"
    public url = "http://localhost:8000/api/"

    constructor(
        private http: HttpClient
    ) { }

    // This function is to add a student to a class or a trainings
    addStudent(dataToAdd) {
        return this.http.post(this.url + 'trainings-and-classes/add-students-records', dataToAdd)
    }

    // This function is to get the details of a selected events
    returnEventsDetails(eventID) {
        return this.http.get(this.url + 'event-return/' + eventID)
    }

    // This function is to get the student from the students collection 
    getTheStudentsDetails(studentsID) {
        return this.http.get(this.url + 'student-trainings-or-class/get-student-using-cms-ID/' + studentsID)
    }

    // This function is to delete the record of a student inside the collection record and collection student
    deleteStudentRecord(studentID) {
        return this.http.get(this.url + 'student-trainings-or-class/delete-student/' + studentID)
    }

    deleteSelectedEvent(id) {
        return this.http.delete(this.url + 'event-announcement/delete/' + id)
    }

    //   Kini siya nga function kay i return niya ang tanan nga lessons sa selected training 
    returnLessons(trainingID) {
        return this.http.get(this.url + 'trainings-and-classes/return-lesson-of-selected-training/' + trainingID)
    }

    // Kini siya nga function kay i delete ang selected lesson 
    deleteSelectedLesson(lessonID) {
        return this.http.get(this.url + 'trainings-and-classes/deleteLessonOfTraining/' + lessonID)
    }

    // Kini siya nga function kay i return ang details sa training 
    returnTrainingDetails(trainingID) {
        return this.http.get(this.url + 'trainings-and-classes/return-selected-training/' + trainingID)
    }
    // Kini siya nga function kay ang pag sa admin ug new training 
    addTraining(trainingData) {
        return this.http.post(this.url + 'trainings-and-classes/add-trainings-with-lessons', trainingData)
    }

    // Kini siya nga function kay i delete ang certain trainings at the same time kay i delete na sad ang lessons under ana nga training
    deleteTrainingWithLessons(trainingID) {
        return this.http.delete(this.url + 'trainings-and-classes/delete-selected-training/' + trainingID)
    }

    // Kini siya nga function kay mag add ug new class sa certain training 
    addCLassOfCertainTraining(classAdded) {
        return this.http.post(this.url + 'trainings-and-classes/add-classes-with-students', classAdded)
    }

    // Kini siya nga function kay kuhaon ang tanan nga student sa selected class 
    getAllStudentsOfAClass(classID) {
        return this.http.get(this.url + 'trainings-and-classes/students-of-the-class/' + classID)
    }

    // Kini siya nga function kay i return ang class details 
    returnClassDetails(classID) {
        return this.http.get(this.url + 'trainings-and-classes/return-selected-class/' + classID)
    }

    // Kini siya nga function kay i delete ang selected class 
    deleteSelectedClass(classID) {
        return this.http.delete(this.url + 'trainings-and-classes/delete-selected-class/' + classID)
    }

    // Kini siya nga function kay pag modify sa user to active or inactive 
    isActive(boolean) {
        return this.http.post(this.url + 'addInactiveUser', boolean)
    }


    // Kini siya nga function kay kung ang user kay vip pa.. himoon niya regular 
    toRegularMember(userID) {
        return this.http.get(this.url + 'current-vip-to-regular/' + userID)
    }

}