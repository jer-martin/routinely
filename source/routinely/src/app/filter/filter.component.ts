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
  catList: Array<string> = this.sharerService.getCategories();
  showInput: boolean = false;
  newCategory: string = '';

  goToHome() {
    this.router.navigate(['']);
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }

  addCategory() {
    if (this.newCategory != '') {
      this.catList.push(this.newCategory);
      this.newCategory = '';
      this.showInput = false;
    }
    this.sharerService.updCategories(this.catList);
  }

}
