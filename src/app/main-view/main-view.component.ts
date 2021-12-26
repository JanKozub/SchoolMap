import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  @Input() clickSwitch: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  onBuildingClick(name: string): void {
    if (this.clickSwitch) {
      console.log(name);
    }
  }

}
