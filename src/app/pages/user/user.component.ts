import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../../data-services/user-details.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    public userDetails =  {
        firstname: '',
        lastname: '',
        birthday: '',
        age: '',
        address: '',
        marital_status: '',
        email: '',
        contact_number: '',
        facebook: '',
        instagram: '',
        twitter: '',
        username: ''
    };
    public userAccount = {
        firstname: '',
        lastname: '',
        birthday: '',
        age: '',
        address: '',
        marital_status: '',
        email: '',
        contact_number: '',
        facebook: '',
        instagram: '',
        twitter: '',
        username: ''
    };

    constructor(
        private userService: UserDetailsService,
    ) {

    }
    ngOnInit() {
        const user = this.userService.getTheUsersInfo(localStorage.getItem('usersLogged'))
        user.subscribe((data: any) => {
            console.log(data)
            this.userDetails = data[0]
            const account = this.userService.getUserAccount(localStorage.getItem('usersLogged'));
            account.subscribe((response: any) => {
                this.userAccount = response
            })
        })
    }
}

export interface User {
    
}