import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './passwordEnter.component.html',
  styleUrls: ['./passwordEnter.component.css']
})
export class passwordEnterComponent {
  //title = 'routinely';
 // form = {username: '', password: '', rememberMe: false};
  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['']);
  }

  checkUserStatus(){ 
    this.router.navigate(['/api/createUser/bryan'])
    
  }
} 