import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { SharerService } from '../sharer.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(private router: Router, private sharerService: SharerService) { }

  colorHSL: string = this.sharerService.getAccentHSL();

  goToHome() {
    this.router.navigate(['']);
  }
}
