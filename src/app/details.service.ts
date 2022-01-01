import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DetailsService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() {
  }

  changeDetails(title: string, description: string, imgUrl: string, route: string): void {
    this.messageSource.next(title + ';' + description + ';' + imgUrl + ';' + route + ';');
  }
}
