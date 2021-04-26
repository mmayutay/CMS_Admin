import { Component, OnInit } from '@angular/core';
import { TableFunctions } from '../../component-functions/table.function'
import { DataServicesService } from '../../../data-services/data-services.service';

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

export class TableComponent implements OnInit{
    public usersCounter = 0
    public allUsers = []
    public tableData1: TableData;
    public tableData2: TableData;

    constructor(
        private service: DataServicesService
    ) {}
    ngOnInit(){
        this.allUsersFromAdminToMembers()
    }
    allUsersFromAdminToMembers() {
        const accounts = this.service.getAllAccounts()
        accounts.subscribe((data: any) => {
            this.usersCounter = data.length
            data.forEach(element => {
                const user = this.service.getUserDetails(element.userid)
                user.subscribe((details: any) => {
                    this.allUsers.push({account: element, userDetails: details[0], role: this.roleConverter(element.roles)})
                })
            });
        })
    }

    roleConverter(role) {
        var roles = new Array();
        roles[1] = "Admin"
        roles[2] = "Pastor"
        roles[3] = "Leader"
        roles[4] = "Member"
        return roles[Number(role)]
    }


}
