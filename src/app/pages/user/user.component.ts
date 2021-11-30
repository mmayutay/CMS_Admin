import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'data-services/data-services.service';
import Swal from 'sweetalert2';
import { UserDetailsService } from '../../../data-services/user-details.service';
import { UserModel } from './user.model';

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
        private usermodel: UserModel
    ) {

    }
    ngOnInit() {
        const user = this.userService.getTheUsersInfo(localStorage.getItem('usersLogged'))
        user.subscribe((data: any) => {
            this.userDetails = data[0]
            const account = this.userService.getUserAccount(localStorage.getItem('usersLogged'));
            account.subscribe((response: any) => {
                this.userAccount = response
            })
        })
    }

    updateUser() {
        const updateUser =  this.userService.updateUser(this.usermodel.returnUpdatedUser(this.userDetails));
        updateUser.subscribe((response: any) => {
            Swal.fire('Hooray!', 'User Updated Successfully!', 'success')
        })
    }
}
