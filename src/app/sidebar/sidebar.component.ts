import { Component, OnInit } from '@angular/core';
import { LoginAndLogout } from 'data-services/user-data';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/reportings',    title: 'Reportings',        icon:'nc-tile-56', class: '' },
    { path: '/eventsandannouncements',    title: 'Events and Announcements',        icon:'nc-tile-56', class: '' },

    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'My Cell Group',        icon:'nc-tile-56',    class: '' },
    { path: '/mynetworkgroup',    title: 'My Network Group',        icon:'nc-tile-56', class: '' },
    { path: '/add-new-user', title: 'Add New User',     icon:'nc-simple-add',    class: '' },

    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },

    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(
        private loginAndLogout: LoginAndLogout
    ) {

    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    logout() {
        this.loginAndLogout.logOut()
    }
}
