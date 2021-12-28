import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import database from '../database.json';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-frame',
  template: ''
})

export abstract class ViewComponent<T = any> implements AfterViewInit, OnDestroy {

  clickStatus: boolean;
  subscription: Subscription;

  public classesList: { title: string, ids: string[], route: string }[] = database;

  protected constructor(private data: DataService, private router: Router) {
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('*[id]').forEach(e => {
      if (e.id !== 'frame' && e.id !== 'object') {
        const el = document.getElementById(e.id);
        el.onclick = () => this.onClick(e.id);
      }
    });

    this.subscription = this.data.currentMessage.subscribe(message => {
      this.clickStatus = message.toString() === 'true';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(id: string): void {
    if (this.clickStatus) {
      this.classesList.forEach(value => {
        value.ids.forEach(e => {
          if (e === id) {
            this.router.navigate([value.route]).then(
              () => console.log('navigated to ' + value.title + ' with route ' + value.route)
            );
          }
        });
      });
    }
  }
}
