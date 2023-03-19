import { Component } from '@angular/core';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent {
  eventName: string = '';
  eventCategory: string = '';
  basic: boolean = false;

  submit() {
    this.basic = false;
    console.log("name: " + this.eventName + " cat: " + this.eventCategory + " date: ")
  }
}
