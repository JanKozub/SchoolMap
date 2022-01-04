import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {

  private clickSource = new BehaviorSubject('default message');
  clickStatus = this.clickSource.asObservable();

  private floorSource = new BehaviorSubject('default message');
  currentFloor = this.floorSource.asObservable();

  constructor() {
  }

  changeClickStatus(status: boolean): void {
    this.clickSource.next(String(status));
  }

  changeFloor(floor: number): void {
    this.floorSource.next(String(floor));
  }
}
