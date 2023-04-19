// sharer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class SharerService {
  private calTimeSource = new BehaviorSubject<DateTime>(DateTime.local());
  currentCalTime = this.calTimeSource;
  private catList: Set<string> = new Set<string>();
  private categories: Array<string> = new Array<string>();
  private todoList: Array<string> = new Array<string>();
  private calTime: DateTime = DateTime.local(); // Provide an initial value to the calTime property
  private color: string = "blue";
  private eventStorage : Map<string, string[]> = new Map<string, string[]>(); // local storage for events (temp until we get databases working)
  private newEventStorage : Map<string, [string, DateTime, DateTime][]> = new Map<string, [string, DateTime, DateTime][]>(); // local storage for events (temp until we get databases working)

  constructor() {
    // default, for now -- need to implement GET request
    this.categories = ["Classes", "Clubs", "Social", "Exercise", "Other"]; // replace with array from get request
    this.categories.forEach(this.catList.add, this.catList);
    // this.todoList = ["Event 1", "Event 2", "Event 3"]
  }

  changeCalTime(calTime: DateTime) {
    this.calTime = calTime;
    this.calTimeSource.next(calTime);
  }

  addEvent(dt: DateTime, name : string) { // only dates and names necessary for now
    // key is DateTime, val is array of event names (strings)
    // console.log(dt);
    // console.log(name);
    if (this.eventStorage.get(dt.toISO()) != undefined) {
      // @ts-ignore
      this.eventStorage.set(dt.toISO(), this.eventStorage.get(dt.toISO()).concat(name));
    }
    else {
      let events: string[] = [name];
      this.eventStorage.set(dt.toISO(), events);
    }
    // console.log(this.eventStorage.get(dt));
  }

  addTimeEvent(dt: DateTime, name: string, start: DateTime, end: DateTime) {
    console.log(dt.toISODate());
    if (this.newEventStorage.has(dt.toISODate())) {
      const events = this.newEventStorage.get(dt.toISODate());
      // @ts-ignore
      events.push([name, start, end]);
    } else {
      const events: [string, DateTime, DateTime][] = [[name, start, end]];
      this.newEventStorage.set(dt.toISODate(), events);
    }
  }

  getCategories() {
    return this.catList;
  }

  getTodo() {
    return this.newEventStorage.get(this.currentCalTime.getValue().toISO());
  }

  updCategories(newCatList: Set<string>) {
    this.catList = newCatList;
  }

  updTodo(newTodo: Array<string>) {
    this.todoList = newTodo;
  }

  getEvents() {
    return this.eventStorage;
  }

  getTimeEvents() {
    return this.newEventStorage;
  }

  getCalTimeSource() {
    return this.calTimeSource;
  }

  getColor() {
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
  }

  getTextColor() {
    if (this.color === "purple" || this.color === "slate") {
      return "white";
    }
    else {
      return "black";
    }
  }

  getColorHSL() {
    if (this.color === "blue") {
      return "hsl(198, 78%, 78%)";
    }
    else if (this.color === "purple") {
      return "hsl(282, 44%, 62%)";
    }
    else if (this.color === "slate") {
      return "hsl(198, 0%, 30%)";
    }
    else {
      return "hsl(0, 0%, 0%)";
    }
  }

  getAccentHSL() {
    if (this.color === "blue") {
      return "hsl(198, 100%, 32%)";
    }
    else if (this.color === "purple") {
      return "hsl(282, 44%, 52%)";
    }
    else if (this.color === "slate") {
      return "hsl(198, 0%, 20%)";
    }
    else {
      return "hsl(0, 0%, 0%)";
    }
  }


}
