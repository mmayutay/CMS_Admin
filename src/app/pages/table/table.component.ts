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
    public selectedUserIndex  = 0
    public toShowInModal = {
        id: '',
        selectedUser: ''
    };

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
                    element.password = details[0].lastname + 'Member' + details[0].id
                    this.allUsers.push({ account: element, userDetails: details[0], role: this.roleConverter(element.roles) })
                })
            })
            console.log(this.allUsers)
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


    // Kini siya nga function kay i execute ni kung ang mu select ang user ug certain user 
    toInactiveUser(selectedUser, userID, index) {
        this.selectedUserIndex = index
        var userInactive = {
            memberId: '',
            active: ''
        }
        userInactive.memberId = userID
        this.toShowInModal.selectedUser = selectedUser
        this.toShowInModal.id = userID

        // Swal.fire({
        //     title: 'Active or Inactive?',
        //     text: 'Do you want to add ' + selectedUser + ' to Inactive or Active?',
        //     showDenyButton: true,
        //     showCancelButton: true,
        //     confirmButtonText: `Active`,
        //     denyButtonText: `Inactive`,
        // }).then((result) => {
        //     console.log(result.isConfirmed)

        //     if (result.isConfirmed) {
        //         userInactive.active = 'true'
        //         const toActive = this.eventsRequest.isActive(userInactive)
        //         toActive.subscribe((response: any) => {
        //             Swal.fire('Saved!', 'Successfully moved to Active', 'success')
        //         })
        //     } else if (result.isDenied) {
        //         userInactive.active = 'false'
        //         const toInactive = this.eventsRequest.isActive(userInactive)
        //         toInactive.subscribe((response: any) => {
        //             console.log(response)
        //             Swal.fire('Saved!', 'Successfully moved to Inactive', 'success')
        //         })
        //     }
        // })
    }

    // Kini siya nga function kay ang certain execution sa selected action
    toInactiveActiveOrRegular(type: string) {
        var userInactive = {
            memberId: '',
            active: ''
        }
        userInactive.memberId = this.toShowInModal.id
        if (type == 'Inactive') {
            userInactive.active = 'false'
            console.log(userInactive)
            const toInactive = this.eventsRequest.isActive(userInactive)
            toInactive.subscribe((response: any) => {
                console.log(response)
                document.getElementById('id01').style.display='none'
            })
        } else if (type == 'Active') {
            userInactive.active = 'true'
            const toActive = this.eventsRequest.isActive(userInactive)
            toActive.subscribe((response: any) => {
                console.log(response)
                document.getElementById('id01').style.display='none'
            })
        } else {
            const vipToRegular = this.eventsRequest.toRegularMember(this.toShowInModal.id)
            vipToRegular.subscribe((response: any) => {
                console.log(response)
                document.getElementById('id01').style.display='none'
            })
        }
    }

    // Kini siya nga function kay for the deletion of the certain user 
    deleteUser() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(this.selectedUserIndex.toString()).style.display = 'none'
                const deleteUser = this.service.deleteSelectedUser(this.toShowInModal.id)
                deleteUser.subscribe((response: any) => {
                    this.service.deleteUsersAccount(this.toShowInModal.id).subscribe((response: any) => {
                        document.getElementById('id01').style.display='none'
                        Swal.fire(
                            'Deleted!',
                            'User you selected is successfully deleted.',
                            'success'
                        )
                    })
                })
            }
        })
    }


}
