import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'data-services/attendance.service';
import { DataServicesService } from '../../../data-services/data-services.service';

@Component({
  selector: 'app-reportings',
  templateUrl: './reportings.component.html',
  styleUrls: ['./reportings.component.css']
})
export class ReportingsComponent implements OnInit {
  public data = []

  constructor(
    private dataService: DataServicesService,
    private attendance: AttendanceService
  ) { }

  ngOnInit(): void {
    this.data = this.dataService.leaders;
  }

  counter(i: number) {
    return new Array(i)
  }

  // This function will decide if the member of the certain leader attended a sunday celebration or event
  getInputedDate(dateChosen, members) {
    members.forEach(element => {
      const attendances = this.attendance.getUserAttendance(element.id, new Date(dateChosen.target.value).getMonth())
      attendances.subscribe((response: any) => {
        if (response.length != 0) {
          response.forEach(date => {
            if ((new Date(date).getMonth() == new Date(dateChosen.target.value).getMonth()) && (new Date(date).getDate() == new Date(dateChosen.target.value).getDate()) && (new Date(date).getFullYear() == new Date(dateChosen.target.value).getFullYear())) {
              document.getElementById(element.id).innerHTML = "Attended";
              if (new Date(date).getDay() == 0) {
                document.getElementById('sunday' + element.id).innerHTML = "Attended"
              } else {
                document.getElementById('sunday' + element.id).innerHTML = "Didn't Attend"
              }
            } else {
              document.getElementById(element.id).innerHTML = "Didn't Attend"
              document.getElementById('sunday' + element.id).innerHTML = "Didn't Attend"
            }
          });
        } else {
          document.getElementById(element.id).innerHTML = "Didn't Attend"
        }
      })
    });
  }
}
