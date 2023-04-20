import {Component} from '@angular/core';
import { DateTime } from 'luxon';
import {ClrIconModule} from "@clr/angular";
import { SharerService } from '../sharer.service';

@Component({
  selector: 'app-dayview',
  templateUrl: './dayview.component.html',
  styleUrls: ['./dayview.component.css']
})
export class DayviewComponent {

    times: string[] = [];
    events: { time: string; hour: number, minute: number, duration: number; title: string }[] = [
      // { time: '09:30', duration: 1, title: 'Meeting with team' },
      // { time: '14:00', duration: 1, title: 'Project deadline' },
      // { time: '16:00', duration: 1, title: 'Call with client' },
    ];

    getPos(event: any) : number {
      if (event.minute === 0) {
        return 100 * event.hour;
      }
      else
        return (100 * event.hour) + 50
    }

    generateTimes(): void {
        for (let i = 0; i < 24; i++) {
          for (let j = 0; j < 60; j += 30) {
            const hour = i.toString().padStart(2, '0');
            const minute = j.toString().padStart(2, '0');
            this.times.push(`${hour}:${minute}`);
          }
        }
    }

    constructor(private sharerService: SharerService) {
      this.generateTimes();
    }

    color: string = this.sharerService.getColor();
    textcolor: string = this.sharerService.getTextColor();
    eventList: [string, DateTime, DateTime, number][] | undefined;
    colorHSL: string = "";

    calTime = this.sharerService.currentCalTime.getValue();
    ngOnInit() {
      this.sharerService.getCalTimeSource().subscribe(calTime => {
        this.calTime = calTime;
        this.events = [];
        this.eventList = this.sharerService.getTimeEvents().get(this.calTime.toISODate());

        // @ts-ignore
        this.events = this.eventList.map(([title, start, end]) => {
          const durationInMinutes = Math.round((end.valueOf() - start.valueOf()) / 1000 / 60);
          const roundedDurationInMinutes = Math.round(durationInMinutes / 30) * 30;
          return {
            time: start.hour.toString().padStart(2, '0') + ':' + start.minute.toString().padStart(2, '0'),
            hour: start.hour,
            minute: start.minute,
            duration: roundedDurationInMinutes/30,
            title,
          };
        });
      });
      this.color = this.sharerService.getColor();
      this.textcolor = this.sharerService.getTextColor();
      this.colorHSL = this.sharerService.getColorHSL();

      this.eventList = this.sharerService.getTimeEvents().get(this.calTime.toISODate());

      // @ts-ignore
      this.events = this.eventList.map(([title, start, end]) => {
        const durationInMinutes = Math.round((end.valueOf() - start.valueOf()) / 1000 / 60);
        const roundedDurationInMinutes = Math.round(durationInMinutes / 30) * 30;
        return {
          time: start.hour.toString().padStart(2, '0') + ':' + start.minute.toString().padStart(2, '0'),
          hour: start.hour,
          minute: start.minute,
          duration: roundedDurationInMinutes/30,
          title,
        };
      });

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
