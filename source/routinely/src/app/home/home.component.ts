import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';
import { SharerService } from '../sharer.service';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { MonthviewComponent } from '../monthview/monthview.component';
import { HttpClient} from '@angular/common/http';
import { TabSwitchService } from '../tab-switch.service';
import { firstValueFrom } from 'rxjs';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { ClrTabs } from '@clr/angular';
import { WeekviewComponent } from "../weekview/weekview.component";
import { DayviewComponent} from "../dayview/dayview.component";
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  @ViewChild(WeekviewComponent) weekView: WeekviewComponent | undefined;
  @ViewChild(DayviewComponent) dayView: WeekviewComponent | undefined;
  @ViewChild(MonthviewComponent) monthView: WeekviewComponent | undefined;


  activeTabIndex = 1;
  @ViewChild('cardContainer', { read: ViewContainerRef,static: true }) container!: ViewContainerRef;
  @ViewChild('tabsComponent') tabsComponent!: ClrTabs;
  activeTab: string = 'month';
  constructor(private router: Router,private httpClient: HttpClient,private sharerService: SharerService, private resolver: ComponentFactoryResolver, private tabSwitchService: TabSwitchService, private renderer: Renderer2, private elementRef: ElementRef) { }
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

  goToEventModal() {
    this.router.navigate(['/eventmodal']);
  }
  monthNum: number | undefined;

  calTime = this.sharerService.currentCalTime.getValue();

  month = this.calTime.monthLong;
  year = this.calTime.year;



  monthOut() {
    return this.month;
  }

  setActiveTab(tabIndex: number) {
    this.tabSwitchService.setActiveTab(tabIndex);
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
    this.router.navigate(['/monthview']);
    const factory = this.resolver.resolveComponentFactory(MonthviewComponent);
    const componentRef = factory.create(this.container.injector);
    this.container.insert(componentRef.hostView);
    this.tabSwitchService.getActiveTab().subscribe((tabIndex) => {
      this.onSwitchTab(tabIndex);
    });
  }

  sendCalTime() {
    this.sharerService.changeCalTime(this.calTime);
  }


  onSwitchTab(tabIndex: number) {
    switch (tabIndex) {
      case 2:
        this.activeTab = 'week';
        this.weekView?.ngOnInit();
        break;
      case 3:
        this.activeTab = 'day';
        this.dayView?.ngOnInit();
        break;
      default:
        this.activeTab = 'month';
        this.monthView?.ngOnInit();
        break;
    }
  }
}

function CalendarMonth(dt: DateTime) {
  const days = updView(dt, 'month');
  const boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = '';
  }
  // console.log(days);
  // let firstDay : number = days[0].start.weekday;
  /*
  prevMonth: get interval for previous month, then fill backwards until box index = 0
  how to keep track of both day and box indices?
  alternative: include the prev/next days when generating the month interval
   */
  // cards are 0-indexed and days are 1-indexed, starting at monday -- remap sunday to solve this
  // if (firstDay === 7) {
  //   firstDay = 0;
  // }
  // curMonth
  // days.map((day, i) => {
  //   boxes[day.start.day+firstDay-1].innerHTML = day.start.day.toString();
  // })
  days.map((day, i) => {
    boxes[i].innerHTML = day.start.day.toString();
    // console.log(day.end.day.toString());
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

// todo:
//  (1) implement views for day/week
//  (2) render components as tabs rather than different pages
//  (3) attach IDs to each card using .toISO() to easily display events from database
//  (4) highlight today, create variable for to-do list
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

export function validateRecurringInterval(start: DateTime, end: DateTime) {
  return start.startOf("day") < end.startOf("day");
}

export function generateTimes(): string[] {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
}
