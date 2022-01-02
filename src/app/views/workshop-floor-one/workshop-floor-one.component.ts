import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DetailsService} from '../../services/details.service';
import {ViewComponent} from '../view.component';

@Component({
  selector: 'app-workshop-floor-one',
  templateUrl: './workshop-floor-one.component.html'
})
export class WorkshopFloorOneComponent extends ViewComponent {

  constructor(data: DataService, detailsService: DetailsService) {
    super(data, detailsService);
  }
}
