import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'routinely';
//  form = {username: '', password: '', rememberMe: false};


constructor(
  private httpClient: HttpClient
) {}


}





