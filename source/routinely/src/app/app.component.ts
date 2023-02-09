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


  // if at home page, set home to true. else set home to false
  checkHome() {
    if (this.router.url === '/') {
      this.home = true;
    }
    else {
      this.home = false;
    }
  }

}



