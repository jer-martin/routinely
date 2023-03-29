import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';

import { SharerService } from '../sharer.service';

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.component.html',
  styleUrls: ['./monthview.component.css']
})
export class MonthviewComponent {
  constructor(private router: Router,private sharerService: SharerService, private renderer: Renderer2) { }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToFilter() {
    this.router.navigate(['/filter']);
  }
  goToSchedule() {
    this.router.navigate(['/schedule']);
  }
  goToSidebar() {
    this.router.navigate(['/sidebar']);
  }
  // goToEventModal() {
  //   this.router.navigate(['/eventmodal']);
  // }
  monthNum: number | undefined;

  calTime = this.sharerService.currentCalTime.getValue();

  month = this.calTime.monthLong;
  year = this.calTime.year;



  monthOut() {
    return this.month;
  }


  iterateMonthUp(month: string) {
    document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';

    // subtract a month from calTime
    this.calTime = this.calTime.plus({ months: 1 });
    this.month = this.calTime.monthLong;
    this.year = this.calTime.year;
    this.populateBoxes(this.month);
    this.sendCalTime();
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
    this.populateBoxes(this.month);
    this.sendCalTime();
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

  // populate boxes with numbers up to the day count
  populateBoxes(month: string) {
    CalendarMonth(this.calTime, this.sharerService.getEvents());
    // const dayCount = this.checkDayCount(month);
    // const boxes = document.getElementsByClassName('box');
    // //clear boxes before populating
    // for (let i = 0; i < boxes.length; i++) {
    //   boxes[i].innerHTML = '';
    // }
    // for (let i = 0; i < dayCount; i++) {
    //   boxes[i].innerHTML = i + 1 + '';
    // }
  }

  // run populate boxes on init
  color: string = this.sharerService.getColor();
  textColor: string = this.sharerService.getTextColor();
  colorHSL = this.sharerService.getColorHSL();
  ngOnInit() {
    this.populateBoxes(this.month);
    this.sharerService.getCalTimeSource().subscribe(calTime => {
      this.calTime = calTime;
    });
    this.color = this.sharerService.getColor();
    this.textColor = this.sharerService.getTextColor();
    this.colorHSL = this.sharerService.getColorHSL();
  }

  sendCalTime() {
    this.sharerService.changeCalTime(this.calTime);
  }
}

function CalendarMonth(dt: DateTime, events: Map<string, string[]>) {
  const days = updView(dt, 'month');
  const boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    // @ts-ignore
    boxes[i].innerHTML = '';
  }
  days.map((day, i) => {
    console.log(events);
    console.log(day.start.toISO());
    const dayEvents = events.get(day.start.toISO());
    console.log(dayEvents);
    const label = document.createElement('label');
    label.style.display = 'flex';
    label.innerText = day.start.day.toString();
    boxes[i].appendChild(label);
    // @ts-ignore
    if (dayEvents){
      dayEvents.forEach(event => {
        const button = document.createElement('button');
        button.innerText = event;
        button.classList.add('btn', 'btn-primary', 'btn-sm', 'align-items-center', 'justify-content-center');
        button.style.margin = 'auto';
        boxes[i].appendChild(button);
        console.log("match");
      })
    }
    if (day.start.month != dt.month) {
      // console.log(day);
      boxes[i].setAttribute("style", "background-color: hsl(198, 0%, 93%)");
    }
    // this should only light up the actual current day, not current calTime day
    else if (day.start.day === DateTime.local().day && day.start.month === DateTime.local().month && day.start.year === DateTime.local().year) {
      boxes[i].setAttribute("style", "background-color: hsl(198, 81%, 88%)");
    }
    else {
      boxes[i].setAttribute("style", boxes[i].getAttribute("style") + "background-color: hsl(198, 0%, 98%)");
    }
  })
}

function genView(dt: DateTime, view: DurationUnit) {
  switch (view) {
    case "day":
    case "days":
      return genDay(dt);
    case "week":
    case "weeks":
      return genWeek(dt);
    case "month":
    case "months":
      return genBackfillMonth(dt);
    default:
      console.log("something's wrong");
      return genBackfillMonth(dt);
  }
}

export function updView(dt: DateTime, view: DurationUnit): Interval[] {
  return splitByUnit(genView(dt, view), "day");
}

export function splitByUnit(interval: Interval, unit: DurationUnit) {
  return interval.splitBy(unitDuration(unit));
}

export function unitDuration(unit: DurationUnit): Duration {
  return Duration.fromObject({ [unit]: 1 });
}

export function genDay(dt: DateTime): Interval {
  return Interval.fromDateTimes(dt.startOf("day"), dt.endOf("day"));
}

export function genWeek(dt: DateTime): Interval {
  return Interval.fromDateTimes(dt.startOf("week"), dt.endOf("week"));
}

export function genMonth(dt: DateTime): Interval { // ** can update with prev intervals to generate days for prev/future months
  return Interval.fromDateTimes(dt.startOf("month"), dt.endOf("month"));
}

export function genBackfillMonth(dt: DateTime): Interval {
  // create current month interval
  // create previous month interval, starting from beginning of week to start of curMonth
  // create next month interval, starting from end of curMonth with length (42-prevIntervalLength-curIntervalLength)
  const curMonthInterval = genMonth(dt);
  const prevMonthInterval = Interval.fromDateTimes(curMonthInterval.start.minus({ days: curMonthInterval.start.weekday }), curMonthInterval.start);

  let prevMonthLength = 0;
  if (curMonthInterval.start.weekday !== 7) {
    prevMonthLength = Math.round(curMonthInterval.start.diff(prevMonthInterval.start, "days").as("days"));
  }
  // https://stackoverflow.com/questions/63763221/how-to-calculate-a-duration-between-two-dates-in-luxon
  const curMonthLength = Math.round(curMonthInterval.end.diff(curMonthInterval.start, "days").as("days"));
  const nextMonthInterval = Interval.fromDateTimes(curMonthInterval.end, curMonthInterval.end.plus({ days: 42 - prevMonthLength - curMonthLength }));

  if (curMonthInterval.start.weekday === 7) { // if month starts on sunday -- prevents blank space in first week
    return Interval.fromDateTimes(curMonthInterval.start, nextMonthInterval.end);
  }

  return Interval.fromDateTimes(prevMonthInterval.start, nextMonthInterval.end);
}


