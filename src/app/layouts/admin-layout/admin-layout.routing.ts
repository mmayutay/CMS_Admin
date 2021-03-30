import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ViewEventsComponent } from '../../view-events/view-events.component';

import { MynetworkgroupComponent } from '../../pages/mynetworkgroup/mynetworkgroup.component';
import { ReportingsComponent } from '../../pages/reportings/reportings.component';
import { EventsandannouncementsComponent } from '../../pages/eventsandannouncements/eventsandannouncements.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    {path: 'view-events/:eventID/:idSelectedItem', component: ViewEventsComponent},
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'mynetworkgroup', component: MynetworkgroupComponent},
    { path: 'reportings', component: ReportingsComponent },
    { path: 'eventsandannouncements', component: EventsandannouncementsComponent },
    { path: 'reportings', component: ReportingsComponent },

];
