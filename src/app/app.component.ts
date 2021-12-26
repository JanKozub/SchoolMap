import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Mapa';

  private mouseDownStatus = false;
  private counter = 0;
  clickSwitch = false;

  private currentX = 0;
  private currentY = 0;

  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;

  private scale = 1.0;

  get GetClickSwitch(): boolean {
    return this.clickSwitch;
  }

  ngOnInit(): void {
    const frame = $('#frame');
    const object = $('#object');

    object.on('mousedown', () => {
      this.mouseDownStatus = true;
    });

    object.on('mouseup', () => {
      this.mouseDownStatus = false;
    });

    frame.on('mousemove', (ev) => {
      this.currentX = ev.clientX;
      this.currentY = ev.clientY;
    });

    frame.on('mousewheel', (e) => {
      if (e.originalEvent.deltaY < 0) {
        this.scale = Math.round((this.scale + 0.1) * 100) / 100;
      } else {
        if (this.scale > 1.0) {
          this.scale = Math.round((this.scale - 0.1) * 100) / 100;
        }
      }
      object.css('transform', 'scale(' + this.scale + ')');
    });

    setInterval(() => {
      if (this.mouseDownStatus === true) {
        this.counter++;
        this.clickSwitch = true;

        if (this.counter === 1) {
          this.startX = this.currentX;
          this.startY = this.currentY;
          this.offsetX = parseInt(object.css('left'), 10);
          this.offsetY = parseInt(object.css('top'), 10);
        }

        if (this.startX !== this.currentX && this.startY !== this.currentY) {
          onMove(this.startX, this.startY, this.currentX, this.currentY, this.offsetX, this.offsetY);
          this.clickSwitch = false;
        }
      } else {
        this.clickSwitch = false;
        this.counter = 0;
      }

    }, 1);

    function onMove(startX, startY, newX, newY, offsetX, offsetY): void {
      const newLeft = offsetX + newX - startX;
      const newTop = offsetY + newY - startY;

      if (newLeft > 0 && newLeft <= 300) {
        object.css('left', newLeft);
      }

      if (newTop > 0 && newTop <= 300) {
        object.css('top', newTop);
      }

    }
  }
}



