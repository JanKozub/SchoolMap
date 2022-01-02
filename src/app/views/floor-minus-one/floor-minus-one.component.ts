import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DetailsService} from '../../services/details.service';
import {ViewComponent} from '../view.component';

@Component({
  selector: 'app-floor-minus-one',
  templateUrl: './floor-minus-one.component.html'
})
export class FloorMinusOneComponent extends ViewComponent {

  constructor(data: DataService, detailsService: DetailsService) {
    super(data, detailsService);
  }
}
