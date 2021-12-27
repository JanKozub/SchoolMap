import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Mapa';

  @ViewChild('object', {static: true}) obj: ElementRef;
  @ViewChild('frame', {static: true}) frameElement: ElementRef;

  mouseDownStatus = false;
  clickSwitch = false;

  private currentX = 0;
  private currentY = 0;
  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;
  private maxX = 0;
  private maxY = 0;

  private scale = 1.0;
  private counter = 0;

  message: string;
  subscription: Subscription;

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
  }

  ngAfterViewInit(): void {
    this.maxX = parseInt(getComputedStyle(this.frameElement.nativeElement).width, 10);
    this.maxY = parseInt(getComputedStyle(this.frameElement.nativeElement).height, 10);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onMouseMove(ev: any): void {
    this.currentX = ev.clientX;
    this.currentY = ev.clientY;

    if (this.mouseDownStatus === true) { // If mouse left is down
      this.counter++;

      if (this.counter === 1) { // Get Mouse position at the start
        this.startX = this.currentX;
        this.startY = this.currentY;
        this.offsetX = parseInt(getComputedStyle(this.obj.nativeElement).left, 10);
        this.offsetY = parseInt(getComputedStyle(this.obj.nativeElement).top, 10);
      }

      if (this.startX !== this.currentX && this.startY !== this.currentY) { // If mouse is moving then calculate new img position
        const newLeft = this.offsetX + this.currentX - this.startX;
        const newTop = this.offsetY + this.currentY - this.startY;

        const objSize = this.getObjSize();
        if (newLeft > 0 && newLeft <= (this.maxX - objSize[0])) {
          this.obj.nativeElement.style.left = newLeft + 'px';
        }
        if (newTop > 0 && newTop <= (this.maxY - objSize[1])) {
          this.obj.nativeElement.style.top = newTop + 'px';
        }
        this.clickSwitch = false;
      }

      this.sendClickStatus(); // Inform listeners about mouse left status
    } else {
      this.clickSwitch = false;
      this.counter = 0;
    }
  }

  onMouseUp(ev: any): void {
    this.onMouseMove(ev);
    this.mouseDownStatus = false;
  }

  onMouseWheel(e: any): void {
    if (e.deltaY < 0) {
      this.scale = Math.round((this.scale + 0.1) * 100) / 100;
    } else {
      if (this.scale > 1.0) {
        this.scale = Math.round((this.scale - 0.1) * 100) / 100;
      }
    }
    this.obj.nativeElement.style.transform = 'scale(' + this.scale + ')';
  }

  sendClickStatus(): void {
    this.data.changeMessage(this.clickSwitch);
  }

  getObjSize(): number[] {
    return [
      parseInt(getComputedStyle(this.obj.nativeElement).width, 10),
      parseInt(getComputedStyle(this.obj.nativeElement).height, 10)
    ];
  }
}



