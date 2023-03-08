import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { SharerService } from '../sharer.service';

@Component({
  selector: 'app-dayview',
  templateUrl: './dayview.component.html',
  styleUrls: ['./dayview.component.css']
})
export class DayviewComponent {
  
    constructor(private sharerService: SharerService) { }
  
    color: string = this.sharerService.getColor();
    textcolor: string = this.sharerService.getTextColor(); 
    colorHSL: string = ""; 
  
    calTime = this.sharerService.currentCalTime.getValue();
    ngOnInit() {
      this.sharerService.getCalTimeSource().subscribe(calTime => {
        this.calTime = calTime;
      });
      this.color = this.sharerService.getColor();
      this.textcolor = this.sharerService.getTextColor();
      this.colorHSL = this.sharerService.getColorHSL();
    }
    month = this.calTime.monthLong;
    year = this.calTime.year;
    week = this.calTime.weekNumber;
    day = this.calTime.day;
    sunday = this.calTime.set({weekday: 7}).weekdayLong;
  
    monthOut() {
      return this.month;
    }
  
  
    iterateMonthUp(month: string) {
      document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
     
      // subtract a month from calTime
      this.calTime = this.calTime.plus({ months: 1 });
      this.month = this.calTime.monthLong;
      this.year = this.calTime.year;
     
      // 100 ms timer then change back to angle
      setTimeout(() => {
        document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
      }, 100);
    }
  
    iterateMonthDown(month: string) {
      document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
      
      // subtract a month from calTime
      this.calTime = this.calTime.minus({ months: 1 });
      this.month = this.calTime.monthLong;
      this.year = this.calTime.year;
      
      // 300 ms timer then change back to angle
      setTimeout(() => {
        document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
      }, 100);
    }
  
    checkDayCount(month: string) {
      if (month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
        return 31;
      }
      else if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
        return 30;
      }
      else if (month === 'February') {
        return 28;
      }
      else {
        return 0;
      }
    }
  
    iterateWeekUp() {
      document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
     
      // subtract a month from calTime
      this.calTime = this.calTime.plus({ weeks: 1 });
      this.month = this.calTime.monthLong;
      this.year = this.calTime.year;
      this.week = this.calTime.weekNumber;
      this.calTime = this.calTime.startOf('week');
      this.day = this.calTime.day;
     
      // 100 ms timer then change back to angle
      setTimeout(() => {
        document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
      }, 100);
    }
  
    iterateWeekDown() {
      document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
  
      // subtract a month from calTime
      this.calTime = this.calTime.minus({ weeks: 1 });
      this.month = this.calTime.monthLong;
      this.year = this.calTime.year;
      this.week = this.calTime.weekNumber;
      this.calTime = this.calTime.startOf('week');
      this.day = this.calTime.day;
  
      // 300 ms timer then change back to angle
      setTimeout(() => {
        document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
      }
      , 100);
    }
  
    sendCalTime() {
      const calTime = this.calTime;
      this.sharerService.changeCalTime(calTime);
    }
  
    iterateDayUp() {
      document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
  
      // subtract a month from calTime
      this.calTime = this.calTime.plus({ days: 1 });
      this.month = this.calTime.monthLong;
      this.year = this.calTime.year;
      this.week = this.calTime.weekNumber;
      this.day = this.calTime.day;
      this.sendCalTime();
      this.checkSunday();
  
      // 100 ms timer then change back to angle
      setTimeout(() => {
        document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
      }, 100);
    }

    iterateDayDown() {
      document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
  
      // subtract a month from calTime
      this.calTime = this.calTime.minus({ days: 1 });
      this.month = this.calTime.monthLong;
      this.year = this.calTime.year;
      this.week = this.calTime.weekNumber;
      this.day = this.calTime.day;
      this.sendCalTime();
      this.checkSunday();
  
      // 300 ms timer then change back to angle
      setTimeout(() => {
        document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
      }, 100);
    }

    checkSunday() {
      if (this.calTime.weekdayLong == this.sunday) {
        console.log("its sunday");
      }
    }
  
}
