import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MynetworkgroupComponent } from './pages/mynetworkgroup/mynetworkgroup.component';
import { ReportingsComponent } from './pages/reportings/reportings.component';
import { EventsandannouncementsComponent } from './pages/eventsandannouncements/eventsandannouncements.component';
import { ClassesComponent } from './pages/trainings/classes/classes.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MynetworkgroupComponent,
    ReportingsComponent,
    EventsandannouncementsComponent,
    ClassesComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
