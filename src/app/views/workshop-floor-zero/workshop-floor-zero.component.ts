import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DetailsService} from '../../services/details.service';
import {ViewComponent} from '../view.component';

@Component({
  selector: 'app-workshop-floor-zero',
  templateUrl: './workshop-floor-zero.component.html'
})
export class WorkshopFloorZeroComponent extends ViewComponent {

  constructor(data: DataService, detailsService: DetailsService) {
    super(data, detailsService);
  }
}
