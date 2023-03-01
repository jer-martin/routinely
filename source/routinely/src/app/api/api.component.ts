import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';




interface userList{
  id: string
  userType: string
}

@Component({
  selector: 'app-root',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class apiComponent {
  id = '';
  userType = ''
  public userList: userList[] = [
    {
      id: 'Bryan',
      userType: 'student'
    },
  ]
  
  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['']);
  }
  listUsers(){
    this.router.navigate(['../userList'])
  }
  checkUserStatus(){ 
    this.router.navigate(['../userList'])
  }

  
  addUser(){
    this.userList.push({
      id: this.id,
      userType: this.userType
    })
    this.id = 'BRYAN';
    this.userType = 'ASS'
  }
}