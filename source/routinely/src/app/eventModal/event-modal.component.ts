import { Component } from "@angular/core";
import { SharerService } from "../sharer.service";

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  constructor(private sharerService:SharerService) { }
  
  eventName: string = '';
  eventCategory: string = '';
  basic: boolean = false;
  colorHSL: string = this.sharerService.getAccentHSL();

  submit() {
    this.basic = false;
    console.log("name: " + this.eventName + " cat: " + this.eventCategory + " date: ")
  }
}
