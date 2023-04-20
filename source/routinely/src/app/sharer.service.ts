// sharer.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, lastValueFrom} from 'rxjs';
import { DateTime } from 'luxon';
import {HttpClient} from "@angular/common/http";


/*
events = append(events, structs.Event{
			ID:             eventID,
			UserID:         userID,
			EventName:      eventName,
			EventCategory:  category,
			StartEventDate: startEventDate.String,
			EndEventDate:   endEventDate.String,
		})
 */
interface IeventList{
  eventID: number,
  userID: number,
  eventName: string,
  eventCategory: string,
  startEventDate: string,
  endEventDate: string
  //description: string
}

@Injectable({
  providedIn: 'root'
})
export class SharerService {
  public eventList: IeventList[] =[]

  private calTimeSource = new BehaviorSubject<DateTime>(DateTime.local());
  currentCalTime = this.calTimeSource;
  private catList: Set<string> = new Set<string>();
  private categories: Array<string> = new Array<string>();
  private calTime: DateTime = DateTime.local(); // Provide an initial value to the calTime property
  private color: string = "blue";
  private userId: number;
  // private eventStorage : Map<string, string[]> = new Map<string, string[]>(); // local storage for events (temp until we get databases working)
  private newEventStorage : Map<string, [string, DateTime, DateTime, number][]> = new Map<string, [string, DateTime, DateTime, number][]>(); // local storage for events (temp until we get databases working)

  constructor(private httpClient:HttpClient) {
    // default, for now -- need to implement GET request
    this.categories = ["Classes", "Clubs", "Social", "Exercise", "Other"]; // replace with array from get request
    this.categories.forEach(this.catList.add, this.catList);
    this.userId = 0; // replace with user id from backend
    for (let i = 0; i < this.eventList.length; i++) {
      const event = this.eventList[i];
      const dt = DateTime.fromISO(event.startEventDate).toISODate();
      if (this.newEventStorage.has(dt)) {
        const events = this.newEventStorage.get(dt);
        // @ts-ignore
        events.push([event.eventName, DateTime.fromISO(event.startEventDate), DateTime.fromISO(event.endEventDate), event.eventID]);
      } else {
        const events: [string, DateTime, DateTime, number][] = [[event.eventName, DateTime.fromISO(event.startEventDate), DateTime.fromISO(event.endEventDate), event.eventID]];
        this.newEventStorage.set(dt, events);
      }
    }
    // this.todoList = ["Event 1", "Event 2", "Event 3"]
  }

  getUserId() {
    return this.userId;
  }

  changeCalTime(calTime: DateTime) {
    this.calTime = calTime;
    this.calTimeSource.next(calTime);
  }

  // addEvent(dt: DateTime, name : string) { // only dates and names necessary for now
  //   // key is DateTime, val is array of event names (strings)
  //   // console.log(dt);
  //   // console.log(name);
  //   if (this.eventStorage.get(dt.toISO()) != undefined) {
  //     // @ts-ignore
  //     this.eventStorage.set(dt.toISO(), this.eventStorage.get(dt.toISO()).concat(name));
  //   }
  //   else {
  //     let events: string[] = [name];
  //     this.eventStorage.set(dt.toISO(), events);
  //   }
  //   // console.log(this.eventStorage.get(dt));
  // }

  addTimeEvent(dt: DateTime, name: string, start: DateTime, end: DateTime, id: number) {
    console.log(dt.toISODate());
    if (this.newEventStorage.has(dt.toISODate())) {
      const events = this.newEventStorage.get(dt.toISODate());
      // @ts-ignore
      events.push([name, start, end, id]);
    } else {
      const events: [string, DateTime, DateTime, number][] = [[name, start, end, id]];
      this.newEventStorage.set(dt.toISODate(), events);
    }
  }

  async loadEvents(){
    const userList = await this.httpClient.get<IeventList[]>('/api/viewEvents');
    this.eventList = await lastValueFrom(userList);
  }

  deleteEvent(dt: DateTime, id: number) {
    console.log(dt.toISODate());
    const events = this.newEventStorage.get(dt.toISODate());

    if (events) {
      // filter out the matching tuple by name
      const filteredEvents = events.filter(event => event[3] !== id);
      // update the array in the map with the filtered events
      this.newEventStorage.set(dt.toISODate(), filteredEvents);
    }
  }

  getCategories() {
    return this.catList;
  }

  updCategories(newCatList: Set<string>) {
    this.catList = newCatList;
  }

  // getEvents() {
  //   return this.eventStorage;
  // }

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
    else  {
      return "hsl(198, 0%, 50%)";
    }
  }

  getAccentHSL() {
    if (this.color === "blue") {
      return "hsl(198, 100%, 32%)";
    }
    else if (this.color === "purple") {
      return "hsl(282, 44%, 52%)";
    }
    else {
      return "hsl(198, 0%, 30%)";
    }

  }


}
