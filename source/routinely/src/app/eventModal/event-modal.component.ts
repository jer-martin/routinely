import { Component } from "@angular/core";

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  eventName: string = '';
  eventCategory: string = '';
  basic: boolean = false;

  submit() {
    this.basic = false;
    console.log("name: " + this.eventName + " cat: " + this.eventCategory + " date: ")
  }
}
