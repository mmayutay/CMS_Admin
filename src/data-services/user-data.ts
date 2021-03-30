import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class LoginAndLogout {
    public url = 'http://localhost:8000/api/'
    public authenticationKey = 'usersLogged'

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    logIn(userID) {
        const login = this.http.post(this.url + 'login', userID);
        login.subscribe((data: any) => {
            if(data.length != 0) {
                localStorage.setItem(this.authenticationKey, data[0].id)
                this.router.navigate(['/dashboard'])
            }else {
                Swal.fire('Ooopssss', 'Username or password is incorrect!', 'warning');
            }
        })
    }
    
    logOut() {
        localStorage.removeItem(this.authenticationKey)
        this.router.navigate(['/login'])
    }
}