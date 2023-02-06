import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'routinely';
  form = {username: '', password: '', rememberMe: false};
  

  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['']);
  }
}