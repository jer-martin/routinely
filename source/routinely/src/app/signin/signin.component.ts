import { Component } from '@angular/core';
import { SharerService } from '../sharer.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  title = 'routinely';
  form = { username: '', password: '', rememberMe: false};
  hasError = false;
  userRegex = new RegExp(/^[a-zA-Z0-9]+$|^$/);

  routeSignin() {
    this.router.navigate(['signin']);
  }
  
  async signinRequest(){
    console.log( "Name: " + this.form.username + " Password: " + this.form.password);
    await firstValueFrom(this.httpClient.post('http://localhost:4200/createUser',{
      
      username: this.form.username,
      password: this.form.password
      //description: this.description
    }))
    this.reset();
  }
  reset() {
    this.form = { username: '', password: '', rememberMe: false};
  }

  constructor(private httpClient:HttpClient,private sharerService:SharerService, private router: Router) { }
  goToHome() {
    this.router.navigate(['']);
  }
  ngOnChanges() {
    
  }
}
