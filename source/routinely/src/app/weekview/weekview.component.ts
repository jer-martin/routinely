import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { SharerService } from '../sharer.service';

@Component({
  selector: 'app-weekview',
  templateUrl: './weekview.component.html',
  styleUrls: ['./weekview.component.css']
})
export class WeekviewComponent {



  constructor(private sharerService: SharerService) {
    this.generateTimes();
  }

  color: string = this.sharerService.getColor();
  textcolor: string = this.sharerService.getTextColor();
  colorHSL: string = this.sharerService.getColorHSL();
  accentHSL = this.sharerService.getAccentHSL();

  times: string[] = [];

  events: { time: string; title: string }[] = [
    { time: '09:30', title: 'Meeting with team' },
    { time: '14:00', title: 'Project deadline' },
    { time: '16:00', title: 'Call with client' },
  ];

  generateTimes(): void {
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        this.times.push(`${hour}:${minute}`);
      }
    }
  }

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
    this.populateBoxes();
  }
  year = this.calTime.year;
  dayWeekStartTime = this.calTime.startOf('week').minus({ days: 1 });
  dayWeekStart = this.dayWeekStartTime.day;
  month = this.dayWeekStartTime.monthLong;
  sunday = "Sunday";

  populateBoxes() {
    setTimeout(() => {
      const weekboxes = document.querySelectorAll('.weekbox');
      for (let i = 0; i < weekboxes.length; i++) {
        const weekbox = weekboxes[i] as HTMLElement;
        weekbox.innerHTML = '';
        weekbox.style.backgroundColor = '';
      }
    }, 5);

    console.log("run");
    const events = this.sharerService.getTimeEvents();
    let weekEvents : [string, DateTime, DateTime][] | undefined = [];
    for (let i = 1; i <= 7; i++) {
      const day = this.dayWeekStartTime.plus(i * 8.64e+7).toISODate();
      const dayEvents = events.get(day);
      if (dayEvents) {
        console.log("run" + i);
        weekEvents = weekEvents.concat(dayEvents);
      }
    }
    console.log("weekEvents: " + weekEvents);
    if (weekEvents) {
      weekEvents.forEach(([name, start, end], index) => {
        const durationInMinutes = Math.round((end.valueOf() - start.valueOf()) / 1000 / 60);
        const roundedDurationInMinutes = Math.round(durationInMinutes / 30) * 30;
        let weekday : string;
        const hour = start.hour;
        const min = start.minute;
        const duration = roundedDurationInMinutes/30;
        switch (start.weekday) {
          case 7: weekday = 'Sunday'; break;
          case 1: weekday = 'Monday'; break;
          case 2: weekday = 'Tuesday'; break;
          case 3: weekday = 'Wednesday'; break;
          case 4: weekday = 'Thursday'; break;
          case 5: weekday = 'Friday'; break;
          case 6: weekday = 'Saturday'; break;
          default: weekday = 'Sunday'; break;
        }
        console.log('Task'+(1+hour*2+(min%30))+weekday);
        setTimeout(() => {
          let boxId = (min % 60 === 0) ? (1 + hour * 2) : (2 + hour * 2);
          let startBox = document.querySelector('#Task'+boxId+weekday);
          console.log(startBox);
          // @ts-ignore
          startBox.textContent = name;
          // @ts-ignore
          startBox.setAttribute("style", "background-color:"+this.colorHSL);
          for (let i = duration; i--; i>1) {
            let newBoxId = boxId+i;
            let newBox = document.querySelector('#Task'+newBoxId+weekday);
            // @ts-ignore
            newBox.setAttribute("style", "background-color:"+this.colorHSL);
          }
        }, 10);
      })
    }


  }

  iterateWeekUp() {
    document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
    // subtract a month from calTime
    this.calTime = this.calTime.plus({ weeks: 1 });
    this.sendCalTime();
    this.year = this.calTime.year;
    this.dayWeekStartTime = this.calTime.startOf('week').minus({ days: 1 });
    this.dayWeekStart = this.dayWeekStartTime.day;
    this.month = this.dayWeekStartTime.monthLong;
    this.populateBoxes();


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
    this.populateBoxes();

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

  // return div id
  getDayId(day: number) {
    return "day" + day;
  }

}

