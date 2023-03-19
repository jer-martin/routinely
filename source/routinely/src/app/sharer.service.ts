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
  private calTime: DateTime = DateTime.local(); // Provide an initial value to the calTime property
  private color: string = "blue";

  constructor() { }

  changeCalTime(calTime: DateTime) {
    this.calTime = calTime;
    this.calTimeSource.next(calTime);
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