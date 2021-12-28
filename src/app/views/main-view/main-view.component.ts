import {Component} from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';
import {ViewComponent} from '../view.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent extends ViewComponent {

  constructor(dataService: DataService, router: Router) {
    super(dataService, router);
  }
}
