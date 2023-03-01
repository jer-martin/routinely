import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { firstValueFrom } from 'rxjs';


interface IuserList{
  id: string
  userType: string
}
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'routinely';
  form = {username: '', password: '', rememberMe: false};
  
  //async ngOnInit() {
   // await this.loadUsers();
 // }

  id = '';
  userType = ''
  public userList: IuserList[] =[]
  
  constructor(private router: Router,
      private httpClient: HttpClient
    ) { }

  goToHome() {
    this.router.navigate(['']);
  }

  goToPassword() { 
    this.router.navigate(['/passwordEnter'])
  }

  async loadUsers(){
   const userList = await this.httpClient
   .get<IuserList[]>('/api/userList')
   this.userList = await lastValueFrom(userList)

  }
  async addUser(){
    firstValueFrom(this.httpClient.post('/api/createUser',{
      id: this.id,
      userType: this.userType
    }))
    this.id = '';
    this.userType = ''
  }
}