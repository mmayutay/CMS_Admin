import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DataServicesService {
  public url = "http://localhost:8000/api/"


    constructor(
        private http: HttpClient
    ) {}

    // This function is to get all the users except to the admin
    getAllUsers() {
        return this.http.get(this.url + 'list')
    }
}