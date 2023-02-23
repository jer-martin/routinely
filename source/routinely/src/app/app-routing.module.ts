import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from "./filter/filter.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { SettingsComponent } from './settings/settings.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { CalendarSettingsComponent } from './calendar-settings/calendar-settings.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { WeekviewComponent } from './weekview/weekview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'bugreport', component: BugReportComponent},
  { path: 'calendarsettings', component: CalendarSettingsComponent},
  { path: 'preferences', component: PreferencesComponent},
  { path: 'weekview', component: WeekviewComponent},


  // otherwise redirect to Routinely
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
