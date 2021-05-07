import { Component, OnInit } from '@angular/core';
import { LoginAndLogout } from 'data-services/user-data';

@Component({
  selector: 'app-add-new-training',
  templateUrl: './add-new-training.component.html',
  styleUrls: ['./add-new-training.component.css']
})
export class AddNewTrainingComponent implements OnInit {
  public addTrainings = {
    newTrainings: {
      code: '',
      title: '',
      description: '',
      level: '',
      instructor: ''
    }
  }

  constructor(
    public user_data: LoginAndLogout
  ) { }

  ngOnInit(): void {
  }

}
