import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DetailsService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() {
  }

  changeDetails(entry: any): void {
    this.messageSource.next(
      entry.title + ';'
      + entry.ids + ';'
      + entry.highlight + ';'
      + entry.description + ';'
      + entry.imgUrl + ';'
      + entry.route + ';');
  }
}
