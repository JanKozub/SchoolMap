import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {

  private clickSource = new BehaviorSubject('default message'); // przechowuje aktualnie klikniętą salę
  clickStatus = this.clickSource.asObservable();

  private floorSource = new BehaviorSubject('default message'); // przechowuje aktualnie ustawione piętro budynku
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
