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
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  eventName = '';
  //description = 'Intro to Software Engineering'
  eventCategory = '';
  eventDate : Date | undefined;
  startDate : Date | undefined;
  endDate : Date | undefined;
  recurringEvent = false;
  immutableEvent = false;
  public eventList: IeventList[] =[]
  catList: Set<string> = this.sharerService.getCategories();

  @Output() eventAdded: EventEmitter<void> = new EventEmitter<void>();

  reset() {
    this.basic = false;
    this.eventName = '';
    //this.description = '';
    this.eventCategory = '';
    // Hide and reset the form
    this.eventDate = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.recurringEvent = false;
    this.immutableEvent = false;
    // add code to reset button group
  }

  async addEvent(){
    console.log("Name: " + this.eventName + " Category: " + this.eventCategory + " Date: " + this.eventDate);
    if (this.eventDate) {
      this.sharerService.addEvent(DateTime.fromJSDate(this.eventDate), this.eventName);
    }
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
