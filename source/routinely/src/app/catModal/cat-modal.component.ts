import { Component, ViewChild } from "@angular/core";
import { SharerService } from "../sharer.service";
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';
import { firstValueFrom,lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ClrModal } from '@clr/angular';


interface IeventList{
  //description: string
}
@Component({
  selector: 'app-cat-modal',
  templateUrl: './cat-modal.component.html',
  styleUrls: ['./cat-modal.component.css']
})
export class CatModalComponent {
  catList = this.sharerService.getCategories();
  updCatList: Array<string> = new Array<string>();

  reset() {
    this.basic = false;
    // Hide and reset the form
  }

  async updCategories(){
    // add some code to take in the inputs
    this.sharerService.updCategories(this.updCatList);
    this.reset();
  }

  constructor(private httpClient:HttpClient,private sharerService:SharerService) { }

  basic: boolean = false;
  colorHSL: string = this.sharerService.getAccentHSL();

}
