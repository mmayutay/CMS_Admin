import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-classes',
  templateUrl: './add-new-classes.component.html',
  styleUrls: ['./add-new-classes.component.css']
})
export class AddNewClassesComponent implements OnInit {
  public newLesson  = {
    training: '',
    class_name: '',
    description: '',
    type: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
