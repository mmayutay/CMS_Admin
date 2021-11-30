import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataServicesService } from './data-services.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class LoginAndLogout {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public url = 'https://group8finalthesis.herokuapp.com/api/'
    // public url = "http://localhost:8000/api/"
    public authenticationKey = 'usersLogged'
    public allUsers = []

    constructor(
        private router: Router,
        private http: HttpClient,
        private dataRequest: DataServicesService
    ) {
        this.getAllUsers()
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this.authenticationKey)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    logIn(userID) {
        const login = this.http.post(this.url + 'login', userID);
        login.subscribe((data: any) => {
            console.log(data)
            if (data.length != 0) {
                if (data[0].roles != 0) {
                    Swal.fire('User Unacceptable', "You can't logged because it is for ADMIN user only", 'warning')
                } else {
                    localStorage.setItem(this.authenticationKey, data[0].userid)
                    location.reload()
                }
            } else {
                Swal.fire('Ooopssss', 'Username or password is incorrect!', 'warning');
            }
        })
    }

    addNewUser(newUser) {
        return this.http.post(this.url + 'sign-up', newUser)
    }

    // Kini siya nga function kay kuhaon ang tanan nga leaders 
    getAllLeaders() {
        return this.http.get(this.url + 'get-leaders');
    }

    // Kini siya nga function kay kuhaon depende sa role 
    getUsersRole(code) {
        console.log(code)
        return this.http.get(this.url + 'return-all-pastors/' + code)
    }

    logOut() {
        localStorage.removeItem(this.authenticationKey)
        // this.router.navigate(['/login'])
        location.reload()
    }

    // Kini siya nga function kay gi render niya daan nga iyaha na nga kuhaon tanan nga user 
    getAllUsers() {
        const users = this.dataRequest.getAllUsers()
        users.subscribe((response: any) => {
            this.allUsers = response
        })

    }
}