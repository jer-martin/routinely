import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    buttonOpen: boolean = false;

  
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router) {}
 
  goToHome() {
    this.router.navigate(['']);
  }

  goToAccount() {
    this.router.navigate(['/accountsettings']);
  }

  // when button is clicked, open the settings menu and change buttonOpen to true
  buttonOpenMethod() {
    if (!this.buttonOpen) {
    this.buttonOpen = true;
    
    }
    else {
      this.buttonOpen = false;
    }
  }

  // here begins theme implementation?:w

  themeDark() {
   this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1a1a1a'; 
  }

  themeRed() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f03f3f';
  }

  themeBlue() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#4db2b2';
  }

  themeGreen() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#56ad57';
  }

  themeWhite() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }


  // figure out barTheme event
  barThemeRed() {
   this.elementRef.nativeElement.ownerDocument.header.style.backgroundColor = '#f03f3f !important'; 
    
  }
}