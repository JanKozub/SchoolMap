import {Component} from '@angular/core';
import {DataService} from '../../data.service';
import {ViewComponent} from '../view.component';
import {DetailsService} from '../../details.service';

@Component({
  selector: 'app-floor-zero',
  templateUrl: './floor-zero.component.html'
})
export class FloorZeroComponent extends ViewComponent {

  constructor(data: DataService, detailsService: DetailsService) {
    super(data, detailsService);
  }
}
