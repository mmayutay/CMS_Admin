import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-trainings-and-classes',
  templateUrl: './view-trainings-and-classes.component.html',
  styleUrls: ['./view-trainings-and-classes.component.css']
})
export class ViewTrainingsAndClassesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
