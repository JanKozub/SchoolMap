import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, OnDestroy {

  clickStatus: boolean;
  subscription: Subscription;

  constructor(private data: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => {
      this.clickStatus = message.toString() === 'true';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBuildingClick(newRoute: string): void {
    if (this.clickStatus) {
      this.router.navigate([newRoute]).then(() => console.log('navigated to ' + newRoute));
    }
  }

}
