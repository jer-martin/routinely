import { Component, ElementRef, Renderer2, ViewChild, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';
import { TabSwitchService } from '../tab-switch.service';
import { SharerService } from '../sharer.service';
import { event } from 'jquery';

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.component.html',
  styleUrls: ['./monthview.component.css']
})
export class MonthviewComponent {
  @Output() switchTab = new EventEmitter<number>();

  
  constructor(private router: Router,private sharerService: SharerService, private renderer: Renderer2, private tabSwitchService: TabSwitchService) { }
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
    CalendarMonth(this.calTime, this.sharerService.getTimeEvents());
  }

  switchToTab(tabIndex: number) {
    this.switchTab.emit(tabIndex);
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

  ngAfterViewInit() {
  }

  sendCalTime() {
    this.sharerService.changeCalTime(this.calTime);
  }

  getDay(time: DateTime, event: Event) {

    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.classList.contains('btn-event')) {
      return;
    }
    const box = event.target as HTMLDivElement;
    let color = "";
    let dayNum = "";
    let month = "";

    dayNum = box.innerText;
    // get the computed style of the clicked box
    const style = getComputedStyle(box);
    // update the value of the color variable
    color = style.backgroundColor;

    if (color === 'rgba(0, 0, 0, 0)' && box.parentElement) {
      const parentStyle = getComputedStyle(box.parentElement);
      color = parentStyle.backgroundColor;
    }
    // if the box is gray and the dayNum is above 25, then the user is clicking on the previous month
    // if the box is gray and the dayNum is below 14, then the user is clicking on the next month
    if (color === 'rgb(237, 237, 237)' && parseInt(dayNum) > 25) {
      month = time.minus({ months: 1 }).monthLong
    } else if (color === 'rgb(237, 237, 237)' && parseInt(dayNum) < 14) {
      month = time.plus({ months: 1 }).monthLong
    } else {
      month = time.monthLong
    }

    // print month + daynum
    // console.log(month + ' ' + dayNum);

    // create a new datetime object with the month and daynum
    let monthNum = this.getMonthNum(month);
    const newTime = DateTime.fromObject({ month: monthNum, day: parseInt(dayNum) });
    // set calTime to the newTime using sharerService
    this.sharerService.changeCalTime(newTime);
    // navigate to the day view
    this.switchToTab(3);
  }

  


  // get number of month from string
  getMonthNum(month: string) {
    if (month === 'January') {
      return 1;
    }
    else if (month === 'February') {
      return 2;
    }
    else if (month === 'March') {
      return 3;
    }
    else if (month === 'April') {
      return 4;
    }
    else if (month === 'May') {
      return 5;
    }
    else if (month === 'June') {
      return 6;
    }
    else if (month === 'July') {
      return 7;
    }
    else if (month === 'August') {
      return 8;
    }
    else if (month === 'September') {
      return 9;
    }
    else if (month === 'October') {
      return 10;
    }
    else if (month === 'November') {
      return 11;
    }
    else if (month === 'December') {
      return 12;
    }
    else {
      return 0;
    }
  }

}


function CalendarMonth(dt: DateTime, events: Map<string, [string, DateTime, DateTime][]>) {
  const days = updView(dt, 'month');
  const boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    // @ts-ignore
    boxes[i].innerHTML = '';
  }
  days.map((day, i) => {
    // console.log(events);
    // console.log(day.start.toISO());
    const dayEvents = events.get(day.start.toISODate());
    // console.log(dayEvents);
    const label = document.createElement('label');
    label.style.display = 'flex';
    label.innerText = day.start.day.toString();
    boxes[i].appendChild(label);
    if (dayEvents){
      // for (const [index, [name, start, end]] of dayEvents.entries()) {
      //   const button = document.createElement('button');
      //   console.log("1");
      //   button.innerText = start.hour + ':' + start.minute.toString().padStart(2, '0') + ' ' + name;
      //   button.classList.add('btn', 'btn-primary', 'btn-event', 'btn-sm', 'align-items-center', 'justify-content-center');
      //   button.style.margin = 'auto';
      //   console.log("2");
      //   button.style.top = (1.8 * (index+1)).toString() + 'rem';
      //   boxes[i].appendChild(button);
      //   console.log("3");
      //   // console.log("match");
      // }
      console.log(dayEvents);
      dayEvents.forEach(([name, start, end], index) => {
        const button = document.createElement('button');
        console.log("1");
        button.innerText = start.hour + ':' + start.minute.toString().padStart(2, '0') + ' ' + name;
        button.classList.add('btn', 'btn-primary', 'btn-event', 'btn-sm', 'align-items-center', 'justify-content-center');
        button.style.margin = 'auto';
        console.log("2");
        button.style.top = (1.8 * (index+1)).toString() + 'rem';
        boxes[i].appendChild(button);
        console.log("3");
        // console.log("match");
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

function logButtonHover(): void {
  // Function to handle the mouseover event
  function handleMouseOver(this: HTMLButtonElement): void {
    // Store button text in temp variable
    const originalText = this.textContent || '';

    // Change current button text to X
    this.textContent = 'X';

    // Store the original text in the button's dataset for later retrieval
    // Store the original text in the button's dataset for later retrieval
    this.dataset['originalText'] = originalText;
  }

  // Function to handle the mouseout event
  function handleMouseOut(this: HTMLButtonElement): void {
    // Change current button text to temp variable (original text)
    this.textContent = this.dataset['originalText'] || '';
  }

  // Function to attach event listeners to a button
  function attachListenersToButton(button: HTMLButtonElement): void {
    button.addEventListener('mouseover', handleMouseOver);
    button.addEventListener('mouseout', handleMouseOut);
    //attach click listener to remove button
    button.addEventListener('click', function() {
      console.log("clicked");
      this.parentElement!.removeChild(this);
    });
  }

  // Attach event listeners to existing buttons with the 'btn-event' class
  const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn-event');
  buttons.forEach(attachListenersToButton);

  // Create a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is a button with the 'btn-event' class
          if (node instanceof HTMLButtonElement && node.classList.contains('btn-event')) {
            attachListenersToButton(node);
          }
        });
      }
    });
  });

  // Start observing the entire document for changes
  observer.observe(document.body, { childList: true, subtree: true });
}

// Call the logButtonHover function after the DOM content is loaded
document.addEventListener('DOMContentLoaded', logButtonHover);



