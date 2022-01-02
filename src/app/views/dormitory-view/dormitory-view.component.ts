import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DetailsService} from '../../services/details.service';
import {ViewComponent} from '../view.component';

@Component({
  selector: 'app-dormitory-view',
  templateUrl: './dormitory-view.component.html'
})
export class DormitoryViewComponent extends ViewComponent {

  constructor(data: DataService, detailsService: DetailsService) {
    super(data, detailsService);
  }
}
