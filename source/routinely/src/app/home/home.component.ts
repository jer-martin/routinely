import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DateTime, Duration, DurationUnit, Interval} from 'luxon';
import { SharerService } from '../sharer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private sharerService: SharerService) { }
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
    CalendarMonth(this.calTime);
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
  ngOnInit() {
    this.populateBoxes(this.month);
    this.sharerService.getCalTimeSource().subscribe(calTime => {
      this.calTime = calTime;
    });
  }

  sendCalTime() {
    const calTime = this.calTime;
    this.sharerService.changeCalTime(calTime);
  }
}

function CalendarMonth(dt : DateTime) {
  const days = updView(dt, 'month');
  const boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = '';
  }
  console.log(days);
  let firstDay : number = days[0].start.weekday;
  if (firstDay === 7) {
    firstDay = 0;
  }
  days.map((day, i) => {
    // cards are 0-indexed and days are 1-indexed, starting at monday
    let weekday : number= day.start.weekday;
    // remap sunday
    if (weekday === 7) {weekday = 0;}
    // fill boxes according to: day+firstDay+1
    boxes[day.start.day+firstDay-1].innerHTML = day.start.day.toString();
  })
}

function genView(dt : DateTime, view : DurationUnit) {
  switch (view) {
    case "day":
    case "days":
      return genDay(dt);
    case "week":
    case "weeks":
      return genWeek(dt);
    case "month":
    case "months":
      return genMonth(dt);
    default:
      console.log("something's wrong");
      return genMonth(dt);
  }
}

function updView(dt : DateTime, view : DurationUnit) : Interval[] {
  return splitByUnit(genView(dt, view), 'day');
}

function splitByUnit(interval : Interval, unit : DurationUnit) {
  return interval.splitBy(unitDuration(unit));
}

function unitDuration(unit : DurationUnit) : Duration {
  return Duration.fromObject({[unit]: 1});
}

export function genDay(dt: DateTime): Interval {
  return Interval.fromDateTimes(dt.startOf('day'), dt.endOf('day'));
}

function genWeek(dt : DateTime) : Interval {
  let interval = Interval.fromDateTimes(dt.startOf('week'), dt.endOf('week'));
  if (dt.weekday === 7) {
    interval = Interval.fromDateTimes(dt.plus(unitDuration('week')).startOf('week'), dt.plus(unitDuration('week')).endOf('week'));
  }
  return interval.mapEndpoints(dt => dt.minus(unitDuration('day')));
}

function genMonth(dt : DateTime) : Interval { // ** can update with prev intervals to generate days for prev/future months
  const month = Interval.fromDateTimes(dt.startOf('month'), dt.endOf('month'));

  const prevStart = month.start.minus({ days: month.start.weekday });
  const prevEnd = month.start.minus({ days: 1 }).endOf('day');
  const prevMonthInterval = Interval.fromDateTimes(prevStart, prevEnd);

  return month;
}
