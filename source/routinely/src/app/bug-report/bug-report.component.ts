import { Component } from '@angular/core';
import '@cds/core/input/register.js';
import '@cds/core/select/register.js';
import '@cds/core/textarea/register.js';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.css']
})
export class BugReportComponent {
  name: string = '';
  email: string = '';
  description: string = '';
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT; 

  
  say() {
    console.log('hello');
  }
  

  validateDemo() {
    this.validateBtnState = ClrLoadingState.LOADING;
    //Validating Logic
    
    
      // demo logic so that it does animation
      setTimeout(() => {
        console.log('validating...');
        this.validateBtnState = ClrLoadingState.SUCCESS;
      }, 1500);
    
    


  

    

    //window.location.reload();
  }
}
