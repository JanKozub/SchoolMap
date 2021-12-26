import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Subscription} from 'rxjs';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Mapa';

  mouseDownStatus = false;
  private counter = 0;
  clickSwitch = false;

  private currentX = 0;
  private currentY = 0;

  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;

  private scale = 1.0;

  private object: any;

  message: string;
  subscription: Subscription;

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);

    this.object = $('#object');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onMouseMove(ev: any): void {
    this.currentX = ev.clientX;
    this.currentY = ev.clientY;

    if (this.mouseDownStatus === true) {
      this.counter++;
      this.clickSwitch = true;

      if (this.counter === 1) {
        this.startX = this.currentX;
        this.startY = this.currentY;
        this.offsetX = parseInt(this.object.css('left'), 10);
        this.offsetY = parseInt(this.object.css('top'), 10);
      }

      if (this.startX !== this.currentX && this.startY !== this.currentY) {
        const newLeft = this.offsetX + this.currentX - this.startX;
        const newTop = this.offsetY + this.currentY - this.startY;

        if (newLeft > 0 && newLeft <= 300) {
          this.object.css('left', newLeft);
        }
        if (newTop > 0 && newTop <= 300) {
          this.object.css('top', newTop);
        }
        this.clickSwitch = false;
      }

      this.sendClickStatus();
    } else {
      this.clickSwitch = false;
      this.counter = 0;
    }
  }

  onMouseWheel(e: any): void {
    if (e.deltaY < 0) {
      this.scale = Math.round((this.scale + 0.1) * 100) / 100;
    } else {
      if (this.scale > 1.0) {
        this.scale = Math.round((this.scale - 0.1) * 100) / 100;
      }
    }
    this.object.css('transform', 'scale(' + this.scale + ')');
  }

  sendClickStatus(): void {
    this.data.changeMessage(this.clickSwitch);
  }
}



