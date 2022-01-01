import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import database from '../database.json';
import {DataService} from '../data.service';
import {DetailsFieldComponent} from '../details-field/details-field.component';
import {DetailsService} from '../details.service';

@Component({
  selector: 'app-view-frame',
  template: ''
})

export abstract class ViewComponent<T = any> implements AfterViewInit, OnDestroy {
  clickStatus: boolean;
  subscription: Subscription;

  public classesList: { title: string, ids: string[], description: string, route: string }[] = database;

  protected constructor(private data: DataService, private detailsService: DetailsService) {
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
      this.classesList.forEach(entry => {
        entry.ids.forEach(e => {
          if (e === id) {
            DetailsFieldComponent.openWindow();
            this.detailsService.changeDetails(entry.title, entry.description, entry.route);
          }
        });
      });
    }
  }
}
