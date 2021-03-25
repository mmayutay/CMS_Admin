import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AttendanceService {
    public url = "http://localhost:8000/api/"

    constructor(
        private http: HttpClient
    ) { }

    // This function is to get a certain users attendance
    getUserAttendance(userID, month) {
        return this.http.post(this.url + 'current-user-attendance', {currentUserId: userID, month: this.convertMonth(month)});
    }

    convertMonth(monthInput) {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return month;
    }
}