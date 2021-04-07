import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DataServicesService } from 'data-services/data-services.service';




@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  public url = "http://localhost:8000/api/"
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
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
    ) {

    }

    ngOnInit(){
      console.log(this.returnTypeOfMember())
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
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
    returnTypeOfMember() {
      var members = [];
      this.dataRequest.allVipUsers().subscribe((data:any) => {
        members.push({type: "VIP Members", length:data.length});
        console.log(members);
      })
  
      this.dataRequest.getRegularMembers().subscribe((data:any) => {
        members.push({type: "Regular Members", length:data.length});
        console.log(members);
      })
  
      members.push({type: "Active Members", length: this.activeMember.length });
      members.push({type: "Inactive Members", length: this.inactiveMember.length });
      
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
}
