import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserDetailsService {
    public url = "https://group8finalthesis.herokuapp.com/api/"
    // public url = "http://localhost:8000/api/"

    constructor(
        private http: HttpClient
    ) { }

    // This function is to get the current users details
    getTheUsersInfo(userID) {
        return this.http.post(this.url + 'info', { userID: userID })
    }
    // This function is to get the account of a certain user
    getUserAccount(id) {
        return this.http.get(this.url + 'user-account/' + id);
    }

    updateUser(updatedData) {
        return this.http.post(this.url + 'updateUser', updatedData);
    }

}