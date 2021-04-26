import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { MynetworkgroupComponent } from './pages/mynetworkgroup/mynetworkgroup.component';
import { ReportingsComponent } from './pages/reportings/reportings.component';
import { EventsandannouncementsComponent } from './pages/eventsandannouncements/eventsandannouncements.component';
import { ClassesComponent } from './pages/trainings/classes/classes.component';
import { LoginComponent } from './pages/login/login.component';
import { DisplaymembersComponent } from './pages/displaymembers/displaymembers.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MynetworkgroupComponent,
    ReportingsComponent,
    EventsandannouncementsComponent,
    ClassesComponent,
    ViewEventsComponent,
    LoginComponent,
    DisplaymembersComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
