import {Component} from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';
import {ViewFrameComponent} from '../../view-frame/view-frame.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent extends ViewFrameComponent {

  constructor(dataService: DataService, router: Router) {
    super(dataService, router);
  }
}
