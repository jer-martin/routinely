import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { SharerService } from '../sharer.service';

@Component({
  selector: 'app-weekview',
  templateUrl: './weekview.component.html',
  styleUrls: ['./weekview.component.css']
})
export class WeekviewComponent {



  constructor(private sharerService: SharerService) { }

  color: string = this.sharerService.getColor();
  textcolor: string = this.sharerService.getTextColor();
  colorHSL: string = this.sharerService.getColorHSL();
  accentHSL = this.sharerService.getAccentHSL();

  calTime = this.sharerService.currentCalTime.getValue();
  ngOnInit() {
    this.sharerService.getCalTimeSource().subscribe(calTime => {
      this.calTime = calTime;
      this.month = calTime.monthLong;
      this.year = calTime.year;
    });
    this.color = this.sharerService.getColor();
    this.textcolor = this.sharerService.getTextColor();
    this.colorHSL = this.sharerService.getColorHSL();
    this.year = this.calTime.year;
    this.dayWeekStartTime = this.calTime.startOf('week').minus({ days: 1 });
    this.dayWeekStart = this.dayWeekStartTime.day;
    this.month = this.dayWeekStartTime.monthLong;
    this.sunday = "Sunday";
    this.sundayCheck();
  }
  year = this.calTime.year;
  dayWeekStartTime = this.calTime.startOf('week').minus({ days: 1 });
  dayWeekStart = this.dayWeekStartTime.day;
  month = this.dayWeekStartTime.monthLong;
  sunday = "Sunday";








  iterateWeekUp() {
    document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
    // subtract a month from calTime
    this.calTime = this.calTime.plus({ weeks: 1 });
    this.sendCalTime();
    this.year = this.calTime.year;
    this.dayWeekStartTime = this.calTime.startOf('week').minus({ days: 1 });
    this.dayWeekStart = this.dayWeekStartTime.day;
    this.month = this.dayWeekStartTime.monthLong;


    // 100 ms timer then change back to angle
    setTimeout(() => {
      document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
    }, 100);
  }

  iterateWeekDown() {
    document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';

    // subtract a month from calTime
    this.calTime = this.calTime.minus({ weeks: 1 });
    this.sendCalTime();
    this.year = this.calTime.year;
    this.dayWeekStartTime = this.calTime.startOf('week').minus({ days: 1 });
    this.dayWeekStart = this.dayWeekStartTime.day;
    this.month = this.dayWeekStartTime.monthLong;

    // 300 ms timer then change back to angle
    setTimeout(() => {
      document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
    }
      , 100);
  }

  sendCalTime() {
    this.sharerService.changeCalTime(this.calTime);
  }

  colorToday() {
    const weekStart = this.calTime.startOf('week');
    document.getElementById('today')!.style.backgroundColor = this.accentHSL;
  }

  sundayCheck() {
    if (this.calTime.weekdayLong == this.sunday) {
      this.dayWeekStart = this.calTime.day;
      console.log("suinday")
    }
  }
}

