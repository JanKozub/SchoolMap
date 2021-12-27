import {Component} from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';
import {ViewFrameComponent} from '../../view-frame/view-frame.component';

@Component({
  selector: 'app-floor-zero',
  templateUrl: './floor-zero.component.html',
  styleUrls: ['./floor-zero.component.css']
})
export class FloorZeroComponent extends ViewFrameComponent {

  constructor(data: DataService, router: Router) {
    super(data, router);
  }
}
