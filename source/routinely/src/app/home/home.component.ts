import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }
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
  month = 'January';

  monthOut() {
    return this.month;
  }

  monthNumCheck(month: string) {
    // take in month and check against an array of every month, return index
    // if month is not in array, return -1
    if (this.month == null) {
      this.month = 'January';
    }
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    for (let i = 0; i < months.length; i++) {
      if (month === months[i]) {
        this.monthNum = i;
        return this.monthNum;
      }
    }
    return -1;
  }

  iterateMonthUp(month: string) {
    document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let curIndex = this.monthNumCheck(month);
    if (curIndex === 11) {
      curIndex = -1;
    }
    this.month = months[curIndex + 1];
    // 100 ms timer then change back to angle
    setTimeout(() => {
      document.getElementById('right-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
    }, 100);
  }

  iterateMonthDown(month: string) {
    document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle-double';
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let curIndex = this.monthNumCheck(month);
    if (curIndex === 0) {
      curIndex = 12;
    }
    this.month = months[curIndex - 1];
    // 300 ms timer then change back to angle
    setTimeout(() => {
      document.getElementById('left-arrow')!.attributes.getNamedItem('shape')!.value = 'angle';
    }, 100);
  }
}
