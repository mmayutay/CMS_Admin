import { Component, OnInit } from '@angular/core';
// import { TableFunctions } from '../../component-functions/table.function'
import { DataServicesService } from '../../../data-services/data-services.service';
import Swal from 'sweetalert2'
import { EventAndAnnouncementsService } from 'data-services/events-announcements-classes.service';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['./table.css']
})

export class TableComponent implements OnInit {
    public usersCounter = 0
    public allUsers = []
    public tableData1: TableData;
    public tableData2: TableData;

    constructor(
        private service: DataServicesService,
        public eventsRequest: EventAndAnnouncementsService
    ) { }
    ngOnInit() {
        this.allUsersFromAdminToMembers()
    }
    allUsersFromAdminToMembers() {
        const accounts = this.service.getAllAccounts()
        accounts.subscribe((data: any) => {
            data.forEach(element => {
                const user = this.service.getUserDetails(element.userid)
                user.subscribe((details: any) => {
                    this.allUsers.push({ account: element, userDetails: details[0], role: this.roleConverter(element.roles) })
                })
            })
            this.usersCounter = data.length
        })
    }

    roleConverter(role) {
        var roles = new Array();
        roles[0] = "Admin"
        roles[1] = "Pastor"
        roles[12] = "Primary Leader"
        roles[144] = "Member(144)"
        roles[1728] = "Member(1728)"
        return roles[Number(role)]
    }


    // Kini siya nga function kay ang modal ni para mu choose ang user 
    toInactiveUser(selectedUser, userID) {
        var userInactive = {
            memberId: '',
            active: ''
        }
        userInactive.memberId = userID
        Swal.fire({
            title: 'Active or Inactive?',
            text: 'Do you want to add ' + selectedUser +' to Inactive or Active?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Active`,
            denyButtonText: `Inactive`,
        }).then((result) => {
            console.log(result.isConfirmed)

            if (result.isConfirmed) {
                userInactive.active  = 'true'
                const toActive = this.eventsRequest.isActive(userInactive)
                toActive.subscribe((response: any) => {
                    Swal.fire('Saved!', 'Successfully moved to Active', 'success')
                })
            } else if (result.isDenied) {
                userInactive.active = 'false'
                const toInactive = this.eventsRequest.isActive(userInactive)
                toInactive.subscribe((response: any) => {
                    console.log(response)
                    Swal.fire('Saved!', 'Successfully moved to Inactive', 'success')                 
                })
            }
        })
    }


}
