import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DataServicesService } from 'data-services/data-services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.css']
})

export class DashboardComponent implements OnInit{
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
      public router: Router
    ) {

    }

    ngOnInit(){
      this.statistics("chartHours")
      this.statistics("sundayCelebration")
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

    statistics(id) {
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById(id);
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [20, 10, 80, 40, 70, 30, 50, 80, 30, 40, 100, 100]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [25, 15, 85, 45, 75, 35, 55, 85, 35, 45, 100, 100]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [30, 20, 90, 50, 80, 40, 60, 90, 40, 50, 100, 100]
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
}
