import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../data-services/user-details.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    public userDetails;
    public userAccount;

    constructor(
        private userService: UserDetailsService
    ) {

    }
    ngOnInit(){
        const user = this.userService.getTheUsersInfo(1)
        user.subscribe((data: any) => {
            this.userDetails = data[0]
            const account = this.userService.getUserAccount(1);
            account.subscribe((response: any) => {
                this.userAccount = response
            })
        })
    }
}
