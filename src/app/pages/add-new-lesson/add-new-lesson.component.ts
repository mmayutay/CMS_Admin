import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServicesService } from 'data-services/data-services.service';
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';

@Component({
  selector: 'app-add-new-lesson',
  templateUrl: './add-new-lesson.component.html',
  styleUrls: ['./add-new-lesson.component.css']
})
export class AddNewLessonComponent implements OnInit {
  public selectedTrainingID = ''
  public lessonNumber = 0
  public index = 0
  public lessonCounter = []
  public listOfLessons = []
  public newLesson  = {
    lesson: 0,
    title: [],
    description: [],
    name: []
  }

  constructor(
    public eventsAnnouncements: EventAndAnnouncementsService,
    public activatedRoute: ActivatedRoute,
    public dataRequest: DataServicesService
  ) { }

  ngOnInit(): void {
    let trainingID = this.activatedRoute.snapshot.paramMap.get('trainingID')
    this.selectedTrainingID = trainingID
    const lessonNumber = this.eventsAnnouncements.returnLessons(trainingID)
    lessonNumber.subscribe((response: any) => {
      if(response == []) {
        this.lessonNumber = Number(response[response.length - 1].lesson)
        this.lessonCounter.push(this.lessonNumber)
      }
    })
  }

  onaddEvents(lesson) {
    this.lessonNumber += 1
    this.lessonCounter.push(this.lessonNumber)
    var lessonsDetails = {
      lesson: 0,
      title: '',
      description: '',
      name: ''
    }
    lessonsDetails.description = this.newLesson.description[this.index]
    lessonsDetails.title = this.newLesson.title[this.index]
    this.listOfLessons.push(lessonsDetails)
  }

  // Kini siya nga function kay i delete ang selected lesson
  deleteSelectedLesson(lesson) {
    this.listOfLessons.splice(this.listOfLessons.indexOf(lesson), 0)
    this.lessonCounter.splice(this.lessonCounter.length - 1, 0)
    this.lessonNumber -= 1
  }

  // Kini siya nga function i add sa database ang mga lessons nga iyang g create 
  submitCreatedLessons() {
    for (let index = 0; index < this.listOfLessons.length; index++) {
      console.log(this.lessonCounter)
      this.listOfLessons[index].lesson = this.lessonCounter[index]
      this.listOfLessons[index].name = "Lesson " + this.lessonCounter[index]
      const addLesson = this.dataRequest.addLessonOfCertainTraining(this.selectedTrainingID,  this.listOfLessons[index])
      addLesson.subscribe((response: any) => {
        console.log(response)
      })
    }
  }

}
