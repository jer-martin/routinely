import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from "./filter/filter.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ScheduleComponent } from "./schedule/schedule.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'schedule', component: ScheduleComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
