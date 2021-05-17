import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ViewEventsComponent } from '../../view-events/view-events.component';
import { AddNewUserComponent } from '../../pages/add-new-user/add-new-user.component'

import { MynetworkgroupComponent } from '../../pages/mynetworkgroup/mynetworkgroup.component';
import { ReportingsComponent } from '../../pages/reportings/reportings.component';
import { EventsandannouncementsComponent } from '../../pages/eventsandannouncements/eventsandannouncements.component';
import { DisplaymembersComponent } from '../../pages/displaymembers/displaymembers.component';
import { AddNewTrainingComponent } from 'app/pages/add-new-training/add-new-training.component';
import { AddNewLessonComponent } from 'app/pages/add-new-lesson/add-new-lesson.component';
import { AddNewClassesComponent } from 'app/pages/add-new-classes/add-new-classes.component';
import { ViewRecordsComponent } from 'app/pages/view-records/view-records.component';

import { AuthGuard } from '../../pages/_helpers/auth.guard'




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'user',           component: UserComponent, canActivate: [AuthGuard] },
    { path: 'table',          component: TableComponent, canActivate: [AuthGuard] },
    { path: 'typography',     component: TypographyComponent, canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'add-new-user',   component:  AddNewUserComponent, canActivate: [AuthGuard]},
    // { path: 'add-new-user',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent, canActivate: [AuthGuard] },
    {path: 'view-events/:eventID/:idSelectedItem', component: ViewEventsComponent, canActivate: [AuthGuard]},
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'mynetworkgroup', component: MynetworkgroupComponent, canActivate: [AuthGuard]},
    { path: 'reportings', component: ReportingsComponent, canActivate: [AuthGuard] },
    { path: 'eventsandannouncements', component: EventsandannouncementsComponent, canActivate: [AuthGuard] },
    { path: 'reportings', component: ReportingsComponent, canActivate: [AuthGuard] },
    { path: 'displaymembers/:type', component: DisplaymembersComponent, canActivate: [AuthGuard] },
    { path: 'add-new-training', component: AddNewTrainingComponent, canActivate: [AuthGuard]},
    { path: 'add-new-lesson/:trainingID', component: AddNewLessonComponent, canActivate: [AuthGuard]},
    { path: 'add-new-classes/:trainingID', component: AddNewClassesComponent, canActivate: [AuthGuard]},
    { path: 'view-records/:classID', component: ViewRecordsComponent, canActivate: [AuthGuard] }

    
];
