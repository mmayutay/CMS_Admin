import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserDetailsService {
    public url = "http://thesisprojectgroup8.herokuapp.com/api/"

    constructor(
        private http: HttpClient
    ) {}

    // This function is to get the current users details
    getTheUsersInfo(userID) {
        return this.http.post(this.url + 'info', {userID: userID})
    }
    // This function is to get the account of a certain user
    getUserAccount(id) {
        return this.http.get(this.url + 'user-account/' + id);
    }

}