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

  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;
  private maxX = 0;
  private maxY = 0;

  private startSize = {w: 0, h: 0};

  private scale = 1.0;
  private oldScale = 0;
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
    this.startSize = this.getObjSize();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onMouseMove(ev: any): void {
    const currentX = ev.clientX;
    const currentY = ev.clientY;

    if (this.mouseDownStatus === true) { // If mouse left is down
      this.counter++;

      if (this.counter === 1) { // Get Mouse position at the start
        this.startX = currentX;
        this.startY = currentY;
        this.offsetX = this.getObjLeft();
        this.offsetY = this.getObjTop();
      }

      if (this.startX !== currentX && this.startY !== currentY) { // If mouse is moving then calculate new img position
        const newLeft = this.offsetX + currentX - this.startX;
        const newTop = this.offsetY + currentY - this.startY;

        // if object is in frame then =>
        if (newTop > this.getObjSize().h / -2 && newTop + this.getObjSize().h < this.maxY + this.getObjSize().h / 2) {
          this.setObjTop(newTop);
        } else {
          this.startY = currentY;
          this.offsetY = this.getObjTop();
        }

        if (newLeft > this.getObjSize().w / -2 && newLeft + this.getObjSize().w < this.maxX + this.getObjSize().w / 2) {
          this.setObjLeft(newLeft);
        } else {
          this.startX = currentX;
          this.offsetX = this.getObjLeft();
        }
        // <=
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

    const pgX = e.pageX;
    const pgY = e.pageY;

    const parentRect = this.frameElement.nativeElement.getBoundingClientRect();
    const rect = this.obj.nativeElement.getBoundingClientRect();

    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    this.oldScale = this.scale;
    this.scale += (delta / 5);


    if (this.scale < 1) {
      this.scale = 1;
    } else if (this.scale > 5) {
      this.scale = 5;
    } else {
      const xPercent = parseFloat(((pgX - rect.left) / rect.width).toFixed(2));
      const yPercent = parseFloat(((pgY - rect.top) / rect.height).toFixed(2));
      const left = Math.round(pgX - parentRect.left - (xPercent * (rect.width * this.scale / this.oldScale)));
      const top = Math.round(pgY - parentRect.top - (yPercent * (rect.height * this.scale / this.oldScale)));

      this.obj.nativeElement.style.width = this.startSize.w * this.scale + 'px';
      this.obj.nativeElement.style.height = this.startSize.h * this.scale + 'px';

      this.setObjLeft(left);
      this.setObjTop(top);
    }

    e.preventDefault();
  }

  sendClickStatus(): void {
    this.data.changeMessage(this.clickSwitch);
  }

  getObjSize(): any {
    return {
      w: parseInt(getComputedStyle(this.obj.nativeElement).width, 10),
      h: parseInt(getComputedStyle(this.obj.nativeElement).height, 10)
    };
  }

  getObjLeft(): number {
    return parseInt(getComputedStyle(this.obj.nativeElement).left, 10);
  }

  setObjLeft(newLeft: number): void {
    this.obj.nativeElement.style.left = newLeft + 'px';
  }

  getObjTop(): number {
    return parseInt(getComputedStyle(this.obj.nativeElement).top, 10);
  }

  setObjTop(newTop: number): void {
    this.obj.nativeElement.style.top = newTop + 'px';
  }
}
