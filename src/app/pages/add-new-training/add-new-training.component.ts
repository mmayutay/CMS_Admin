import { Component, OnInit } from '@angular/core';
import { LoginAndLogout } from 'data-services/user-data';
import { DataServicesService } from 'data-services/data-services.service'

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
    public user_data: LoginAndLogout,
    public dataService: DataServicesService
  ) { }

  ngOnInit(): void {
  }

  onaddEvents(addEventsForm){
    this.addTrainings = addEventsForm;
    console.log("Training:: ", addEventsForm.form.value);
  }


}
