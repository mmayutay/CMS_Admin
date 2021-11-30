import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class UserModel {
    public newUser = {
        id: "",
        Lastname: "",
        Firstname: "",
        Birthday: "",
        Age: "",
        Gender: "",
        Address: "",
        Marital_status: "",
        Email: "",
        Contact_number: "",
        Facebook: "",
        Instagram: "",
        Twitter: "",
        Category: "",
        Description: "",
        isCGVIP: "",
        isSCVIP: ""
    }

    constructor() { }


    returnUpdatedUser(newData) {
        this.newUser.id = newData.id
        this.newUser.Lastname = newData.lastname
        this.newUser.Firstname = newData.firstname
        this.newUser.Birthday = newData.birthday
        this.newUser.Age = newData.age
        this.newUser.Gender = newData.gender
        this.newUser.Address = newData.address
        this.newUser.Marital_status = newData.marital_status
        this.newUser.Email = newData.email
        this.newUser.Contact_number = newData.contact_number
        this.newUser.Facebook = newData.facebook
        this.newUser.Instagram = newData.instagram
        this.newUser.Twitter = newData.twitter
        return {newUser:this.newUser}
    }
}