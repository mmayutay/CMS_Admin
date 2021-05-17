import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DataServicesService {
    public allMembers = []

    public leaders = []
    public allUsers = []

    public url = "http://localhost:8000/api/"


    constructor(
        private http: HttpClient
    ) {
        this.returnLeaders()
        this.returnAllUsers()
        this.returnMembersOfALeader()
    }
    // Kini siya nga function kay i return niya ang tanan nga trainings 
    returnAllTrainings() {
        return this.http.get(this.url + 'trainings-and-classes/return-all-traininings')
    }

    // Kini siya nga function kay i return niya ang tanan nga classes sa certain training 
    returnClassesOfTraining(trainingID) {
        return this.http.get(this.url + 'trainings-and-classes/return-classes-of-selected-training/' + trainingID)
    }

    // Kini siya nga function kay ang pag add ug new lesson sa certain training 
    addLessonOfCertainTraining(trainingID, newLessons) {
        return this.http.post(this.url + 'trainings-and-classes/add-lesson-of-training/' + trainingID, newLessons)
    }

    // This function is to get all the events and announcements
    getEventsAndAnnouncements() {
        return this.http.get(this.url + 'add-event-announcement/display')
    }

    // This function is to add a new events or announcements 
    addEventsOrAnnouncements(newEvent) {
        return this.http.post(this.url + 'add-event-announcement', newEvent)
    }

    // This function is to get all the users except to the admin
    getAllUsers() {
        return this.http.get(this.url + 'list')
    }

    // Kini siya nga function kay kuhaon ang mga inactive or active users
    getInactiveOrActiveUsers(boolean) {
        return this.http.get(this.url + 'get-active-or-inactive-users/' + boolean)
    } 

    // This function is to get the certain user's role
    getUserRole(id) {
        return this.http.post(this.url + 'currentUserRole', { id: id })
    }

    // This function is to get all accounts
    getAllAccounts() {
        return this.http.get(this.url + 'allAccounts')
    }

    // This function is to get the details of a certain user
    getUserDetails(id) {
        return this.http.post(this.url + 'info', { userID: id })
    }

    // Kini siya nga function kay i return niya ang log in account sa certain user 
    getUserAccount(id) {
        return this.http.get(this.url + 'user-account/' + id)
    }

    // This function is to get all the students of a certain events and announcements
    getStudents(eventId) {
        return this.http.get(this.url + 'add-event-announcement/return-all-students/' + eventId)
    }

    // This function is to get all the students of a certain trainings or class
    getStudentsTrainings(type, itemID) {
        return this.http.post(this.url + 'trainings-by-instructor/get-student-of-a-class-training', { typeSelected: type, training: itemID })
    }

    // This function is to get the students data from the records
    getStudentDetailsFromRecord(id) {
        return this.http.get(this.url + 'student-trainings-or-class/get-student/' + id)
    }

    // This function is to return the selected event
    retrieveEvent(eventId) {
        return this.http.get(this.url + 'event-return/' + eventId)
    }

    // This function is to return the selected trainings
    retrieveTraining(itemID, type) {
        return this.http.post(this.url + 'trainings-by-instructor/get-selected-class', { typeSelected: type, idSelectedItem: itemID })
    }

    // This function is to return all the leaders listed in the database
    returnLeaders() {
        const leaders = this.http.get(this.url + 'get-leaders/12');
        leaders.subscribe((data: any) => {
            data.forEach(element => {
                const members = this.http.post(this.url + 'return-members-group', { leaderID: element.id })
                members.subscribe((response: any) => {
                    this.leaders.push({ leader: element, members: response })
                })
            })
        })
    }

    // This function is to store all members in an Array
    returnAllUsers() {
        const members = this.getAllUsers()
        members.subscribe((data: any) => {
            this.allUsers = data
        })
    }
    //This is for the admin to get all VIP Users
    allVipUsers() {
        return this.http.get(this.url + 'vip-users')
    }
    //This function will fetch all member users from the database except to the VIP members
    getRegularMembers() {
        let membersCode = "144"
        return this.http.get(this.url + 'regular-members/' + membersCode)
    }

    getAllUsersId() {
        return this.http.get(this.url + 'allMemberUsers')
    }

    getMemberSCAndEventsAttendance(currentUserId) {
        return this.http.post(this.url + 'leader-sc-cg', { currentUserId: currentUserId })
    }

    getEventAndSCAttendance(currentUserId) {
        return this.http.post(this.url + 'viewAttendancesOfSCandEvents', { currentUserId: currentUserId })
    }

    //data to pass is the current user's id
    getTheCurrentUserAttendance(currentUserId, month) {
        return this.http.post(this.url + 'current-user-attendance', { currentUserId: currentUserId, month: month });
    }
    //This function will get the current users attendance through his/her chosed year 
    usersAttendanceChosenYear(monthChose, yearChose, currentUserId) {
        return this.http.post(this.url + 'user-attendance-year-selected', { currentUserId: currentUserId, month: monthChose, year: yearChose })
    }

    //This function fetch all the vip users but this function includes to get the leader 
    getAllVipUsersWithLeader() {
        return this.http.get(this.url + 'vip-user-with-leader')
    }

    //This function is for the notification who displays the leader and the member
    vipUsersToDisplayAsNotification() {
        return this.http.get(this.url + 'all-new-unvip-members');
    }

    //This function will add the user to inactive where his/her attendance for sunday celebration is less than 4
    addMemberToInactive(user) {
        return this.http.post(this.url + 'addInactiveUser', { memberId: user.id, active: user.boolean })
    }

    addClassStudent(id, classes) {
        return this.http.post(this.url + "classes/add/" + id.id, { classes: classes });
    }

    // A function to get the students data
    getStudentsData(id) {
        return this.http.get(this.url + 'student-trainings-or-class/get-student/' + id);
    }


    //   Kini siya nga function kay kuhaon niya ang tanan nga pastors 
    getAllPastorsWithItsLeaders() {
        return this.http.get(this.url + 'get-pastors');
    }

    // Kini siya nga function kay i return niya ang tanan nga mga members  
    returnMembersOfALeader() {
        let getMembersCode = "144"
        const allMembers = this.http.get(this.url + 'regular-members/' + getMembersCode)
        allMembers.subscribe((response: any) => {
            this.allMembers = response
        })
    }

    // Kini siya nga function kay i return ang members under ana nga certain leader 
    returnMembersOfACertainLeader(leaderID) {
        return this.http.post(this.url + 'return-members-group', {leaderID: leaderID})
    }


    getTheCurrentUser(userId) {
        return this.http.post(this.url + "info", userId);
    }
}