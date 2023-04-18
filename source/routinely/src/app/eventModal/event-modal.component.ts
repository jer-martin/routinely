import { Component, ViewChild, EventEmitter, Output } from "@angular/core";
import { SharerService } from "../sharer.service";
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';
import { firstValueFrom,lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ClrModal } from '@clr/angular';


interface IeventList{
  eventName: string
  eventCategory: string
  //description: string
}

// this whole thing can be optimized way better if we use the built-in form stuff, i didn't realize it was a thing until now but will fix later

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  //description = 'Intro to Software Engineering'
  // sorry this is super confusing, will refactor and optimize after submission
  // INPUT NGMODELS
  recurringEvent = false;
  // immutableEvent = false;
  eventName = '';
  eventCategory = '';
  startRecDate : Date | undefined; // recurring event start/end - this is the interval we loop through to do individual post requests for all the dates
  endRecDate : Date | undefined;
  dt : Date | undefined; // date from the input
  startTimeH : number | undefined;
  startTimeM : number | undefined;
  endTimeH : number | undefined;
  endTimeM : number | undefined;
  selectedDays = [false, false, false, false, false, false, false];

  // FORMATTED VARS
  eventStart : Date | undefined; // individual event start/end - this is what goes in the post request
  eventEnd : Date | undefined;

  public eventList: IeventList[] =[]
  catList: Set<string> = this.sharerService.getCategories();

  @Output() eventAdded: EventEmitter<void> = new EventEmitter<void>();

  reset() {
    this.basic = false;
    this.eventName = '';
    //this.description = '';
    this.eventCategory = '';
    this.dt = undefined;
    this.eventStart = undefined;
    this.startRecDate = undefined;
    this.endRecDate = undefined;
    this.recurringEvent = false;
    // this.immutableEvent = false;
    // add code to reset button group
    // this.selectedDays[0] = false;
    // console.log(this.selectedDays);
  }

  async addEvent(){
    if (this.dt) {
      this.sharerService.addEvent(DateTime.fromJSDate(this.dt), this.eventName);
    }
    // console.log("Name: " + this.eventName + " Category: " + this.eventCategory + " Date: " + this.eventStart);
    firstValueFrom(this.httpClient.post('/api/addEvent',{
      eventName: this.eventName,
      eventCategory: this.eventCategory
      //description: this.description
    }))
    this.eventAdded.emit();
    this.reset();
  }
  async loadEvents(){
    const userList = await this.httpClient
    .get<IeventList[]>('/api/viewEvents')
    this.eventList = await lastValueFrom(userList)

   }

  constructor(private httpClient:HttpClient,private sharerService:SharerService) { }

  // validate() {
  //   // non-recurring
  //   if (!this.recurringEvent && this.eventName != '' && this.dt != undefined) {
  //     return true;
  //   }
  //   // recurring
  //   else if (this.recurringEvent && this.eventName != '' && this.startRecDate != undefined && this.endRecDate != undefined) {
  //     return true;
  //   }
  //   return false;
  // }

  // eventNames: string = '';
  //eventCategory: string = '';
  basic: boolean = false;
  colorHSL: string = this.sharerService.getAccentHSL();
  // eventDate: DateTime = DateTime.now();

  // submit() {
  //   this.basic = false;
  //   console.log("name: " + this.eventName + " cat: " + this.eventCategory + " date: " + this.eventDate.toFormat("yyyy-MM-dd") + " time: " + this.eventDate.toFormat("HH:mm:ss"));
  // }
}
