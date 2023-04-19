import { Component, ChangeDetectorRef } from '@angular/core';
import {Router} from "@angular/router";
import { SharerService } from '../sharer.service';
import {DateTime} from "luxon";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  constructor(private router: Router, private sharerService: SharerService, private cd: ChangeDetectorRef) {}

  colorHSL: string = this.sharerService.getAccentHSL();
  toDoList: [string, DateTime, DateTime][] = [];
  completed = 0;

  ngOnInit() {
    console.log(this.toDoList.length);
    console.log(DateTime.local().toISO());
    if (this.sharerService.getTimeEvents().get(DateTime.local().toISODate())) {
      // @ts-ignore
      this.toDoList = this.sharerService.getTimeEvents().get(DateTime.local().toISODate());
    }
  }
    // this.sharerService.getCalTimeSource().subscribe(calTime => {
    //   this.calTime = calTime;
    // });

  toggleStrikeThrough(event: MouseEvent) {
    const target = event.target as HTMLLabelElement;
    if (target.classList.contains('strikethrough')) {
      this.completed--;
    }
    else this.completed++;
    target.classList.toggle('strikethrough');
  }

  goToHome() {
    this.router.navigate(['']);
  }


}
