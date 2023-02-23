import { Component } from '@angular/core';
import {Router} from '@angular/router';


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


  constructor(private router: Router) { }
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
    // run changeHeaderColor() to set the header color
    if (headerColor) {
      this.changeHeaderColor(headerColor);
    }
  }

}



