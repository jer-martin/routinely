import {Component, ViewChild} from "@angular/core";
import {ClrModal} from "@clr/angular";
import '@cds/core/modal/register.js';

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
