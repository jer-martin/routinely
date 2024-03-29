import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewChild } from "@angular/core";
import { SharerService } from "../sharer.service";
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';
import { firstValueFrom,lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ClrModal } from '@clr/angular';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'routinely';
  form = {username: '', password: '', rememberMe: false};
  hasError = false;
  userRegex = new RegExp(/^[a-zA-Z0-9]+$|^$/);

  routeSignin() {
    this.router.navigate(['signin']);
  }

  constructor(private httpClient:HttpClient,private sharerService:SharerService, private router: Router) { }
  goToHome() {
    this.router.navigate(['']);
  }
  ngOnChanges() {
    this.errorCheck();
  }

  errorCheck(){

    console.log("error check");
    const errorElement = document.querySelector('.error');
    if (!this.userRegex.test(this.form.username)) {
        this.hasError = true;
    } else {
        this.hasError = false;
    }

     if (this.hasError) {
        errorElement?.classList.add('active');
    } else {
        errorElement?.classList.remove('active');
    }
  }

  async loginRequest(){
    console.log( "Name: " + this.form.username + " Password: " + this.form.password);
    const resp = await firstValueFrom(this.httpClient.post('http://localhost:4200/login',{

      username: this.form.username,
      password: this.form.password
      //description: this.description
    }))
    if (resp) {
      this.router.navigate(['']);
    }
    this.reset();
  }
  reset() {
    this.form = { username: '', password: '', rememberMe: false};
  }
}

function getRandomID(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
