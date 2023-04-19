import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabSwitchService {
  private activeTab = new BehaviorSubject<number>(1);

  constructor() {}

  setActiveTab(tabIndex: number) {
    this.activeTab.next(tabIndex);
    console.log(tabIndex);
  }

  getActiveTab() {
    return this.activeTab.asObservable();
  }
}

