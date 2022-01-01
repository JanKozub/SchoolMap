import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ViewComponent} from '../view.component';
import {DetailsService} from '../../services/details.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html'
})
export class MainViewComponent extends ViewComponent {

  constructor(data: DataService, detailsService: DetailsService) {
    super(data, detailsService);
  }
}
