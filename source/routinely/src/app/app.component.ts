import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { DateTime } from 'luxon';
import { SharerService } from './sharer.service';
import { ClarityIcons } from '@cds/core/icon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'
]
})
export class AppComponent {
  title = 'routinely';
  form = {username: '', password: '', rememberMe: false};

  home: boolean = true;
  calTime = DateTime.local();


  constructor(private router: Router, private sharerService: SharerService) { }
  goToLogin() {
    this.router.navigate(['/login']);
    this.checkHome();
  }
  goToFilter() {
    this.router.navigate(['/filter']);
    this.checkHome();
  }
  goToSchedule() {
    this.router.navigate(['/schedule']);
  }
  goToSidebar() {
    this.router.navigate(['/sidebar']);
  }
  goToSettings() {
    this.router.navigate(['/preferences']);
  }
  goToHome() {
    this.router.navigate(['/']);
    this.checkHome();
  }


  // if at home page, set home to true. else set home to false
  checkHome() {
    if (this.router.url === '/') {
      this.home = true;
    }
    else {
      this.home = false;
    }
  }

  checkTime() {
    return this.calTime;
  }

  //write changeHeaderColor() that takes in a string
  changeHeaderColor(color : string) {
    // remove header-n class
    for (let i = 0; i < 8; i++) {
      document.getElementById("header")?.classList.remove("header-" + i);
    }

    // add header-n class depending on color
    if (color === "purple") {
      document.getElementById("header")?.classList.add("header-3");
    }
    else if (color === "blue") {
      document.getElementById("header")?.classList.add("header-6");
    }
    else if (color === "slate") {
      document.getElementById("header")?.classList.add("header-1");
    }
    else if (color === "green") {
      document.getElementById("header")?.style.setProperty("--clr-header-background-color", "#2e7d32");
    }

    // make current header color the new default even after refresh or page change
    localStorage.setItem("headerColor", color);

  }

  // on load grab the header color from local storage and set it
  ngOnInit() {
    this.checkHome();
    let headerColor = localStorage.getItem("headerColor");
    let color = this.sharerService.getColor();
    // run changeHeaderColor() to set the header color
    if (headerColor) {
      this.changeHeaderColor(headerColor);
      this.sharerService.setColor(headerColor);
    }
    addIcon();
  }

  toSettings(){
    this.router.navigate(['/preferences']);
  }

}


function addIcon() {
  ClarityIcons.addIcons(['logo-icon', '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 27 27"><path d="M11.61 2.529c-0.324 0.801 -0.648 1.467 -0.72 1.494s-0.378 0.144 -0.684 0.261l-0.549 0.216 -1.602 -0.72c-0.882 -0.396 -1.647 -0.72 -1.692 -0.72C6.246 3.06 4.05 5.229 4.05 5.346c0 0.054 0.27 0.801 0.594 1.647L5.247 8.55l-0.297 0.648c-0.162 0.36 -0.333 0.702 -0.378 0.756 -0.045 0.063 -0.765 0.387 -1.602 0.72l-1.53 0.621 0.018 1.656 0.027 1.665 1.26 0.513c1.548 0.639 1.539 0.63 1.611 0.999 0.027 0.162 0.198 0.639 0.369 1.062l0.315 0.765 -0.693 1.548 -0.684 1.548 1.098 1.152c0.612 0.63 1.134 1.161 1.179 1.179 0.036 0.018 0.765 -0.252 1.629 -0.594l1.548 -0.621 0.486 0.216c0.261 0.126 0.684 0.297 0.936 0.387l0.468 0.162 0.585 1.449 0.594 1.449h3.339l0.585 -1.449 0.585 -1.449 0.567 -0.207c0.306 -0.108 0.765 -0.306 1.017 -0.432l0.459 -0.225 1.494 0.666 1.485 0.666 0.774 -0.711c0.423 -0.396 0.963 -0.909 1.197 -1.152l0.432 -0.441 -0.666 -1.665 -0.666 -1.665 0.324 -0.999 0.333 -1.008 1.125 -0.468c0.621 -0.252 1.26 -0.513 1.422 -0.585l0.288 -0.117 -0.018 -1.647 -0.027 -1.647 -1.566 -0.639c-1.53 -0.63 -1.557 -0.648 -1.719 -1.008 -0.09 -0.198 -0.234 -0.504 -0.315 -0.684l-0.153 -0.315 0.648 -1.458 0.639 -1.458 -0.477 -0.504c-0.261 -0.279 -0.774 -0.81 -1.134 -1.188l-0.657 -0.684 -1.602 0.63 -1.602 0.621 -0.801 -0.315 -0.801 -0.324 -0.585 -1.44 -0.585 -1.449h-3.339L11.61 2.529zm3.654 2.34c1.746 0.306 3.249 1.116 4.491 2.43 1.071 1.134 1.71 2.277 2.124 3.825 0.261 0.954 0.288 3.096 0.054 4.032 -0.783 3.114 -2.979 5.418 -5.976 6.282 -0.603 0.171 -0.909 0.207 -2.097 0.198 -1.242 -0.009 -1.476 -0.027 -2.187 -0.243 -2.835 -0.864 -4.896 -2.997 -5.751 -5.958 -0.18 -0.63 -0.207 -0.909 -0.198 -2.25 0.009 -1.395 0.027 -1.602 0.243 -2.322 0.972 -3.177 3.483 -5.49 6.525 -6.003 0.63 -0.108 2.16 -0.099 2.772 0.009z"/><path d="M13.5 9.477v3.627l2.52 2.511c1.386 1.386 2.574 2.529 2.637 2.547 0.063 0.009 0.216 -0.081 0.333 -0.207l0.225 -0.243 -2.493 -2.466 -2.502 -2.475V5.85h-0.72v3.627z"/></svg>']); 
}
