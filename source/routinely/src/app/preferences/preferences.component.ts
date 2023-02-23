import { Component } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  
    constructor() { }

    //write changeHeaderColor() that takes in a string
    changeHeaderColor(color : string) {
      // remove header-n class
      for (let i = 0; i < 8; i++) {
        document.getElementById("header")?.classList.remove("header-" + i);
      }

      // add header-n class depending on color
      if (color === "purple") {
        document.getElementById("header")?.classList.add("header-3");
      }
      else if (color === "blue") {
        document.getElementById("header")?.classList.add("header-6");
      }
      else if (color === "slate") {
        document.getElementById("header")?.classList.add("header-1");
      }
      else if (color === "green") {
        document.getElementById("header")?.style.setProperty("$clr-header-background-color", "#228B22");
      }

      // make current header color the new default even after refresh or page change
      localStorage.setItem("headerColor", color);

    }

    themeDark() {
      localStorage.setItem("theme", "dark");
    }

    themeLight() {
      document.getElementById("body")?.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
}
