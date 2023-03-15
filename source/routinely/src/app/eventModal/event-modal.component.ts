import { Component } from "@angular/core";
import { SharerService } from "../sharer.service";
import { firstValueFrom,lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
interface IeventList{
  eventName: string
  description: string
}
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  eventName = 'CEN3031';
  description = 'Intro to Software Engineering'
  public eventList: IeventList[] =[]

  async addEvent(){
    firstValueFrom(this.httpClient.post('/api/addEvent',{
      eventName: this.eventName,
      description: this.description
    }))
    this.eventName = '';
    this.description = ''
  }
  async loadEvents(){
    const userList = await this.httpClient
    .get<IeventList[]>('/api/viewEvents')
    this.eventList = await lastValueFrom(userList)
 
   }
  constructor(private httpClient:HttpClient,private sharerService:SharerService) { }
  
  eventNames: string = '';
  eventCategory: string = '';
  basic: boolean = false;
  colorHSL: string = this.sharerService.getAccentHSL();

  submit() {
    this.basic = false;
    console.log("name: " + this.eventNames + " cat: " + this.eventCategory + " date: ")
  }
}
