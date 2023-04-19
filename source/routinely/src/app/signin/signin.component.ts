import { Component } from '@angular/core';
import { SharerService } from '../sharer.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  title = 'routinely';
  form = {id: 0, username: '', password: '', rememberMe: false};
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
    
  }
}
