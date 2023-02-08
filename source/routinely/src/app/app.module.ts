import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FilterComponent } from './filter/filter.component';
import { SettingsComponent } from './settings/settings.component';

import { CalendarSettingsComponent } from './calendar-settings/calendar-settings.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { BugReportComponent } from './bug-report/bug-report.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    ScheduleComponent,
    FilterComponent,
    SettingsComponent,
   
    CalendarSettingsComponent,
    PreferencesComponent,
    BugReportComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 



   // if at home page, home = true. anywhere else, home = false
   
}
