import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AttendanceService {
    public url = "http://localhost:8000/api/"
    public allMembers = []

    constructor(
        private http: HttpClient
    ) {
        // console.log(this.returnDatesOfMonth(new Date().getMonth(), new Date().getFullYear()))
        
    }

    // This function is to get a certain users attendance
    getUserAttendance(userID, month) {
        return this.http.post(this.url + 'current-user-attendance', { currentUserId: userID, month: this.convertMonth(month) });
    }

    // Kini siya nga function kay kuhaon ang tanan nga attendance sa cellgroup 
    returnCellgroupAttendance() {
        return this.http.get(this.url + 'add-attendance/get-all-cell-group-attendance')
    }

    // Kini siya nga function kay kuhaon ang tanan nga sunday celebration attendance 
    returnSCAttendance() {
        return this.http.get(this.url + 'add-attendance/get-all-sunday-attendance')
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
        return month[monthInput];
    }

    returnMonth() {
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
        return month
    }

    retunYears() {
        var startYear = new Date().getFullYear() - 20
        var currentYear = new Date().getFullYear(), years = [];
        startYear = startYear || 1980;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        return years;
    }

    returnQuarterly() {
        return ['1st Quarter(Jan, Feb, Mar, Apr)', '2ns Quarter(May, Jun, Jul, Aug)', '3rd Quarter(Sep, Oct, Nov, Dec)']
    }

    // Kini siya kay i return ra niya ang date for a week 
    dates(current) {
        var week = new Array();
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay() + 1));
        for (var i = 0; i < 7; i++) {
            week.push(
                new Date(current)
            );
            current.setDate(current.getDate() + 1);
        }
        return week;
    }

    // Kini siya nga function kay iyang i return ang array sa percentage nga basihan sa statistics 
    getMonthlyStats(dataAttendance: any, month: string, year: number) {
        var allAverage = 0
        var arrayPercent = []
        arrayPercent.length = 0
        for (let count = 0; count < 6; count++) {
            this.getWeekOfMonth(dataAttendance, count, month + " " + year).forEach(data => {
                allAverage += data
            })
            arrayPercent.push(Math.ceil((allAverage / this.allMembers.length) * 100))
            allAverage = 0
        }
        return arrayPercent;
    }

    // get the week of the month
    getWeekOfMonth(arrayOfDates: any, week: number, monthAndYear: string) {
        var arrayOfPercent = []
        var eventCounter = 0
        // console.log(this.returnWeek(monthAndYear, week))
        this.returnWeek(monthAndYear, week).forEach(event => {
            arrayOfDates.forEach(element => {
                if ((new Date(event).getMonth() + '-' + new Date(event).getDate() + '-' + new Date(event).getFullYear())
                    ==
                    (new Date(element.date).getMonth() + '-' + new Date(element.date).getDate() + '-' + new Date(element.date).getFullYear())) {
                    eventCounter += 1
                }
            })
            // console.log(eventCounter / this.allMembers.length)
            arrayOfPercent.push(eventCounter)
            eventCounter = 0
        })
        return arrayOfPercent;
    }

    // Kini siya nga function kay iyang i return kung ika pila nga week sa month ang given nga date 
    returnWeek(date, chosenWeek) {
        var arrayOfSelectedMonth = []
        var firstDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 1).getDay();
        this.getDaysInMonth(new Date(date).getMonth(), new Date(date).getFullYear()).forEach(element => {
            if (chosenWeek == Math.ceil((new Date(element).getDate() + firstDate) / 7)) {
                arrayOfSelectedMonth.push(element)
            }
        })
        return arrayOfSelectedMonth
    }

    getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }
}