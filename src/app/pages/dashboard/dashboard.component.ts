import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DataServicesService } from 'data-services/data-services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AttendanceService } from 'data-services/attendance.service';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.css']
})

export class DashboardComponent implements OnInit{
  public today = ''
  public allUsersAttendance  = []
  public chosenTypeOfDisplay = 'Weekly'
  public choices = [
    {value: '1', choice: '1st Week'},
    {value: '2', choice: '2nd Week'},
    {value: '3', choice: '3rd Week'},
    {value: '4', choice: '4th Week'}
  ]
  public all144and1728Members = []
  public selectedMemberType = {
    type: '',
    length: []
  };

  public allVipUsers = []
  public url = "http://localhost:8000/api/"
  public canvas : any;
  public sundayCelebration : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public sundayStats;
  public activeMember = [];
  public inactiveMember = [];
  public active = []
  public inactive = []
  //This will list all the VIP and Regular members
  public vipMembers = [];
  public regularMembers = [];

  public typeOfViewMember = this.returnTypeOfMember()

  public length;

    constructor( 
      public dataRequest:DataServicesService,
      public router: Router,
      public attendanceService: AttendanceService 
    ) {

      // this.computeStats()
      this.getChosenDate({target: {value: this.chosenTypeOfDisplay}})
    }

    ngOnInit(){
      this.today = new Date().toISOString().split('T')[0];
      this.statistics("chartHours", [])
      this.statistics("sundayCelebration",  [])
      // this.get144And1728Users()
    }
    returnTypeOfMember() {
      var members = [];
      this.dataRequest.allVipUsers().subscribe((data:any) => {
        this.allVipUsers = data
        members.push({type: "VIP/New Members", length: data});
      })
  
      this.dataRequest.getAllUsers().subscribe((data:any) => {
        data.forEach(user => {
          this.allVipUsers.forEach(vip => {
            if(user.id == vip.id) {
              data.splice(data.indexOf(user), 1)
            }
          })
        })
        members.push({type: "Regular Members", length: data});
      })
  
      members.push({type: "Active Members", length: this.activeMember });
      members.push({type: "Inactive Members", length: this.inactiveMember });
      
      return members;
    }

    getTheVipMembers() {
      var partialDataHandler;
      this.dataRequest.allVipUsers().subscribe(data => {
        console.log(this.dataRequest)
        partialDataHandler = data
        partialDataHandler.forEach(element => {
          this.vipMembers.push(element.firstname + " " + element.lastname)
  
          this.length = this.vipMembers.length;
          // console.log(this.length);
  
        })
      })
    }
    getTheRegularMembers() {
      var regularMembers;
      this.dataRequest.getRegularMembers().subscribe(result => {
        regularMembers = result
        regularMembers.forEach(element => {
          this.regularMembers.push(element.firstname + ' ' + element.lastname)
  
          this.length = this.regularMembers.length;
        });
      })
    }
    optMember(value) {
      this.router.navigate(['displaymembers/' + value.type])
    }

    statistics(id, values) {
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById(id);
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["1st", "2nd", "3rd", "4th", "5th", "6th"],
          datasets: [
            {
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: values
            }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });

    }


    // Kini siya nga functions kay i return niya ang tanan nga mga members 
    showMembers(value) {
      this.selectedMemberType = value
    }


    // Kini siya nga function kay kuhaon ang stats attendance sa cellgroup 
    cellGroupStatsAttendance(id) {
      const cgAttendance = this.attendanceService.returnCellgroupAttendance()
      cgAttendance.subscribe((response: any) => {
        this.get144And1728Users(response, id)
      })
    }

    // Kini siya nga function kay kuhaon ang stats attendance sa sunday celebration 
    sundayCelebrationAttendance(id) {
      const scAttendance = this.attendanceService.returnSCAttendance()
      scAttendance.subscribe((response: any) => {
        this.get144And1728Users(response, id)
      })
    }

    // Kini siya nga function kay kuhaon ang tanan nga member 144 ug 1728 nga user 
    get144And1728Users(usersArray, statsID) {
      const allUsers = this.dataRequest.getAllUsers()
      allUsers.subscribe((users: any) => {
        this.attendanceService.allMembers = users
        if(this.chosenTypeOfDisplay == 'Weekly') {
          this.statistics(statsID, this.weeklyStats(users ,usersArray, this.attendanceService.dates(new Date('05-09-2021'))))
        }else if(this.chosenTypeOfDisplay == 'Monthly') {
          this.statistics(statsID, this.attendanceService.getMonthlyStats(usersArray, 'May', 2021))
        }else if(this.chosenTypeOfDisplay == 'Quarterly') {

        }
      })
    }


    // Kini siya nga function kay kuhaon ang date nga gipili sa user 
    getChosenDate(value) {
      this.chosenTypeOfDisplay = value.target.value
      if(value.target.value == 'Monthly') {
        this.choices = []
        this.attendanceService.retunYears().reverse().forEach(element => {
          this.choices.push({value: element, choice: element})
        })
      }
      this.cellGroupStatsAttendance("chartHours")
      this.sundayCelebrationAttendance("sundayCelebration")
      // this.statistics("chartHours", )
      // this.statistics("sundayCelebration",  )
    } 


    // Kini siya nga function kay mao ang mu compute sa stats 
    weeklyStats(allusers: any, usersAttendance: any, dates: any) {
      var arrayOfStats = []
      var counter = 0
      for (let date = 0; date < dates.length; date++) {
        for (let user = 0; user < usersAttendance.length; user++) {
          if(
            new Date(dates[date]).getMonth() + '-'  + new Date(dates[date]).getDate() + '-' + new Date(dates[date]).getFullYear() == 
            new Date(usersAttendance[user].date).getMonth() + '-'  + new Date(usersAttendance[user].date).getDate() + '-' + new Date(usersAttendance[user].date).getFullYear()
          ) {
            counter += 1
          }
        }
        if(counter != 0) {
          arrayOfStats.push(Math.floor(((counter + 2) / allusers.length) * 100))
        }else {
          arrayOfStats.push(0)
        }
        counter = 0
      }
      return arrayOfStats
    }

}
