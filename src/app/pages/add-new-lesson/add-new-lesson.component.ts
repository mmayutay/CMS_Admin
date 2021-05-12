import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-lesson',
  templateUrl: './add-new-lesson.component.html',
  styleUrls: ['./add-new-lesson.component.css']
})
export class AddNewLessonComponent implements OnInit {
  public newLesson  = {
    lesson: '',
    title: '',
    description: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
