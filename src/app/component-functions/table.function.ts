import { Injectable } from '@angular/core';
import { DataServicesService } from 'app/pages/data-services/data-services.service';

@Injectable({
    providedIn: 'root'
})

export class TableFunctions {
    public allUsers = [];

    constructor(
        private service: DataServicesService
    ) {}


    // This function is getting all the members including the admin
    allUsersFromAdminToMembers() {
        const users = this.service.getAllUsers()
        users.subscribe((data: any) => {
            this.allUsers = data;
            console.log(this.allUsers)
        })
    }
}