import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['']);
  }
}
